import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
	const headersList = await headers();
	const protocol = headersList.get("x-forwarded-proto");
	const host = headersList.get("host");
	const url = `${protocol}://${host}`;

	return {
		metadataBase: new URL(url),
		title: "Image Dash - Reverse Image & Text Search",
		keywords: [
			"reverse image search",
			"image finder",
			"search by image",
			"photo search",
			"Image Dash",
			"text to image search",
		],
		description:
			"Find any image fast with Image Dash's powerful reverse image search. Upload an image, paste a URL, or describe an image to search across Google, Yandex, Bing, and more.",
		alternates: {
			canonical: url,
		},
		openGraph: {
			title: "Image Dash - Reverse Image & Text Search",
			description: "The quickest way to find any image on the web.",
			url: new URL(url),
			siteName: "Image Dash",
			images: [
				{
					url: "/preview.png",
					alt: "Image Dash helping find an image on the web",
				},
			],
			locale: "en_US",
			type: "website",
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-body antialiased flex flex-col min-h-screen">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
