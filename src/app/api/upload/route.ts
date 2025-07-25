import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import sharp from "sharp";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const filename = searchParams.get("filename") || `${Date.now()}.png`;

		const buffer = await request.arrayBuffer();
		const base64 = Buffer.from(buffer).toString("base64");

		await redis.set(filename, base64, { ex: 300 });

		return NextResponse.json({ key: filename });
	} catch (error) {
		console.error("Error storing image:", error);
		return NextResponse.json({ error: "Failed to store image" }, { status: 500 });
	}
}

export async function GET(request: Request): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	if (!filename) {
		return NextResponse.json({ error: "Filename is required" }, { status: 400 });
	}

	try {
		const base64Image = await redis.get(filename);
		if (!base64Image) {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}

		// Convert base64 to Buffer
		const imageBuffer = Buffer.from(base64Image as string, "base64");

		// Use Sharp library to convert Buffer to WebP format
		const webpBuffer = await sharp(imageBuffer).webp().toBuffer();

		// Return the image buffer with proper headers
		return new NextResponse(webpBuffer, {
			headers: {
				"Content-Type": "image/webp",
				"Cache-Control": "public, max-age=300", // Cache for 5 minutes
			},
		});
	} catch (error) {
		console.error("Error processing image:", error);
		return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
	}
}
