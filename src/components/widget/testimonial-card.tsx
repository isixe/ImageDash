import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import { Avatar } from "../ui/avatar";

export default function TestimonialCard({
	name,
	quote,
	avatarUrl,
}: {
	name: string;
	quote: string;
	avatarUrl: string;
}) {
	return (
		<Card className="p-6 bg-card border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
			<CardContent className="p-0">
				<div className="flex items-center mb-4">
					<Avatar className="h-12 w-12 mr-4">
						<AvatarImage src={avatarUrl} alt={name} data-ai-hint="person portrait" />
						<AvatarFallback>{name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<h4 className="font-bold text-lg font-headline">{name}</h4>
						<div className="flex text-primary">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="h-5 w-5 fill-current" />
							))}
						</div>
					</div>
				</div>
				<p className="text-muted-foreground">"{quote}"</p>
			</CardContent>
		</Card>
	);
}
