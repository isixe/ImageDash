import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
	title: "Image Dash - Reverse Image & Text Search",
	description:
		"Find any image fast with Image Dash's powerful reverse image search. Upload an image, paste a URL, or describe an image to search across Google, Yandex, Bing, and more.",
	keywords: [
		"reverse image search",
		"image finder",
		"search by image",
		"photo search",
		"Image Dash",
		"text to image search",
	],
	openGraph: {
		title: "Image Dash - Reverse Image & Text Search",
		description: "The quickest way to find any image on the web.",
		url: "https://image-dash.itea.dev/",
		siteName: "Image Dash",
		images: [
			{
				url: "https://placehold.co/1200x630.png",
				width: 1200,
				height: 630,
				alt: "Image Dash helping find an image on the web",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Image Dash - Reverse Image & Text Search",
		description: "The quickest way to find any image on the web.",
		images: ["https://placehold.co/1200x630.png"],
	},
};

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
