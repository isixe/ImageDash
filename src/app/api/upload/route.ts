import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename") || `${Date.now()}.png`;

	// 上传到 Vercel Blob
	const blob = await put(filename, request.body, {
		access: "public",
	});

	// 5分钟后自动删除
	setTimeout(async () => {
		try {
			await del(blob.url);
			console.log(`Deleted blob: ${blob.url}`);
		} catch (err) {
			console.error(`Failed to delete blob: ${blob.url}`, err);
		}
	}, 5 * 60 * 1000);

	return NextResponse.json({ url: blob.url });
}
