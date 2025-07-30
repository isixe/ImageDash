import { ImageIcon } from "lucide-react";
import { ThemeToggle } from "../widget/theme-toggle";
import Image from "next/image";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
			<div className="container flex h-16 items-center">
				<h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
					<Image src="/favicon.ico" width={20} height={20} alt="Logo" className="h-8 w-8" />
					Image Dash
				</h1>
				<div className="flex flex-1 items-center justify-end">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
