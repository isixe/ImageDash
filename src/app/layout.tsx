import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google'
import { ImageIcon } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Image Dash - Reverse Image & Text Search',
  description: "Find any image fast with Image Dash's powerful reverse image search. Upload an image, paste a URL, or describe an image to search across Google, Yandex, Bing, and more.",
  keywords: ['reverse image search', 'image finder', 'search by image', 'photo search', 'Image Dash', 'text to image search'],
  authors: [{ name: 'Image Dash' }],
  creator: 'Image Dash',
  publisher: 'Image Dash',
  openGraph: {
    title: 'Image Dash - Reverse Image & Text Search',
    description: "The quickest way to find any image on the web.",
    url: 'https://imagedash.com',
    siteName: 'Image Dash',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', 
        width: 1200,
        height: 630,
        alt: 'Image Dash helping find an image on the web',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Dash - Reverse Image & Text Search',
    description: "The quickest way to find any image on the web.",
    images: ['https://placehold.co/1200x630.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
                <div className="container flex h-16 items-center">
                    <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
                        <ImageIcon className="h-6 w-6"/>
                        Image Dash
                    </h1>
                    <div className="flex flex-1 items-center justify-end">
                      <ThemeToggle />
                    </div>
                </div>
            </header>
            <div className="flex-1">
                {children}
            </div>
            <Toaster />
            <footer className="border-t border-border/50">
                <div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Image Dash. All rights reserved.</p>
                </div>
            </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
