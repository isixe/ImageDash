export default function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-card p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:-translate-y-2">
			<div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
				{icon}
			</div>
			<h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
			<p className="text-muted-foreground">{description}</p>
		</div>
	);
}
