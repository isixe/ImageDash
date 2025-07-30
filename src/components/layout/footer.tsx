export default function Footer() {
	return (
		<footer className="border-t border-border/50">
			<div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
				<p className="text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} Image Dash. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
