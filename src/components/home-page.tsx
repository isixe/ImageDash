"use client";

import * as React from "react";
import { UploadCloud, Search, Upload, Loader2, Rocket, ShieldCheck, Sparkles, Camera, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useImageSearch } from "@/hooks/useImageSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { searchEngines } from "@/data/searchEngines";
import type { SearchEngine } from "@/data/searchEngines";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
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

const Uploader = ({ onFileSelect, disabled }: { onFileSelect: (file: File) => void; disabled: boolean }) => {
	const [isDragging, setIsDragging] = React.useState(false);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleFileSelect = (file: File) => {
		onFileSelect(file);
	};

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFileSelect(e.target.files[0]);
		}
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!disabled) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFileSelect(e.dataTransfer.files[0]);
		}
	};

	return (
		<div
			className={cn(
				"relative flex w-full max-w-lg cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 text-center transition-all duration-300",
				!disabled && "hover:border-primary hover:bg-primary/5",
				isDragging && !disabled && "border-primary bg-primary/10 scale-105 shadow-lg",
				disabled && "cursor-not-allowed opacity-60"
			)}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={() => !disabled && fileInputRef.current?.click()}>
			<div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
				<UploadCloud className="h-8 w-8" />
			</div>
			<p className="font-headline text-xl font-semibold text-foreground">Drag & drop or click to upload</p>
			<p className="mt-2 text-sm text-muted-foreground">PNG, JPG, or WEBP. Max 30MB.</p>
			<Input
				ref={fileInputRef}
				type="file"
				className="hidden"
				onChange={onFileChange}
				accept="image/png, image/jpeg, image/webp"
				disabled={disabled}
			/>
		</div>
	);
};

const TestimonialCard = ({ name, quote, avatarUrl }: { name: string; quote: string; avatarUrl: string }) => (
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

const getIconComponent = (iconName: keyof typeof Icons) => {
	return Icons[iconName] || null;
};

export function HomePage() {
	const searchAreaRef = React.useRef<HTMLDivElement>(null);

	const handleScrollToSearchArea = () => {
		searchAreaRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const {
		imagePreview,
		imageUrl,
		isLoading,
		searchQuery,
		isQueryImageUrl,
		handleFileSelect,
		resetState,
		setSearchQuery,
		handleSearch,
	} = useImageSearch({ onReset: handleScrollToSearchArea });

	const handleSearchAll = () => {
		searchEngines.forEach((engine) => {
			let url = "";
			if (imageUrl && engine.url) {
				url = `${engine.url}${encodeURIComponent(imageUrl)}`;
			} else if (searchQuery && engine.textSearchUrl) {
				url = `${engine.textSearchUrl}${encodeURIComponent(searchQuery)}`;
			}

			if (url) {
				window.open(url, "_blank");
			}
		});
	};

	const showResults = imagePreview || (searchQuery && !isQueryImageUrl);

	return (
		<div className="flex w-full flex-col bg-background">
			<main className="flex-1">
				<section id="hero" className="py-20 sm:py-32">
					<div className="container px-4 md:px-6 text-center flex flex-col items-center">
						<h1 className="text-4xl font-extrabold tracking-tighter font-headline sm:text-5xl md:text-6xl lg:text-7xl">
							Find Any Image, Fast
						</h1>
						<p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
							Reverse search with an image, URL, or text to find what you're looking for across the web's top image
							search engines.
						</p>

						<div className="mt-8 w-full max-w-xl">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Describe an image or paste an image URL..."
									className="w-full rounded-[15px] h-14 pl-12 pr-4 text-base shadow-lg"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
						<p className="mt-4 text-sm text-muted-foreground">Or</p>

						<div ref={searchAreaRef} className="mt-4 flex flex-col items-center justify-center gap-8 w-full">
							{isLoading ? (
								<div className="relative flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
									<Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
									<p className="font-headline text-xl font-semibold text-foreground">Uploading Image...</p>
									<p className="text-sm text-muted-foreground">This will just take a moment.</p>
								</div>
							) : showResults ? (
								<Card className="w-full max-w-2xl shadow-xl animate-in fade-in-50 zoom-in-95 duration-500 border-primary/20">
									<CardContent className="p-4 sm:p-6 space-y-6">
										{imagePreview && (
											<div className="relative w-full max-h-[500px] flex justify-center items-center overflow-hidden rounded-lg border shadow-inner">
												<img
													src={imagePreview}
													alt="Uploaded preview"
													className="w-full h-auto object-contain rounded-md max-h-[500px]"
												/>
											</div>
										)}

										{searchQuery && !imagePreview && (
											<div className="p-6 text-center">
												<p className="text-lg font-medium text-foreground">
													Searching for: <span className="font-bold text-primary">{searchQuery}</span>
												</p>
											</div>
										)}

										<div className="space-y-4">
											<Button
												onClick={handleSearchAll}
												className="w-full h-14 text-lg font-bold"
												disabled={isLoading || (!imageUrl && !searchQuery)}>
												<Sparkles className="mr-2 h-5 w-5" />
												Search All Engines
											</Button>
											<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
												{searchEngines.map((engine) => {
													const IconComponent = getIconComponent(engine.icon);
													return (
														<Button
															key={engine.name}
															variant="outline"
															className="h-12 text-base font-semibold bg-card hover:bg-muted/50 border-border/50 group transition-all duration-300 transform hover:border-primary"
															disabled={
																isLoading ||
																(!imageUrl && !searchQuery) ||
																(searchQuery && !engine.textSearchUrl && !isQueryImageUrl) ||
																(imageUrl && !engine.url)
															}
															onClick={() => handleSearch(engine)}>
															{IconComponent && (
																<IconComponent className="h-6 w-6 text-foreground transition-transform duration-300 group-hover:scale-110" />
															)}
															<span>{engine.name}</span>
														</Button>
													);
												})}
											</div>
										</div>

										<Button
											variant="ghost"
											onClick={resetState}
											className="w-full text-primary hover:bg-primary/10 hover:text-primary">
											<Upload className="mr-2 h-4 w-4" />
											Start New Search
										</Button>
									</CardContent>
								</Card>
							) : (
								<Uploader onFileSelect={handleFileSelect} disabled={isLoading} />
							)}
						</div>
					</div>
				</section>

				<section id="how-it-works" className="py-20 sm:py-24 bg-muted/50">
					<div className="container px-4 md:px-6">
						<div className="text-center max-w-2xl mx-auto">
							<h2 className="text-3xl font-bold font-headline tracking-tight">Simple, Fast, Effective</h2>
							<p className="mt-4 text-lg text-muted-foreground">Three ways to find what you're looking for.</p>
						</div>
						<div className="mt-16 grid gap-12 md:grid-cols-3">
							<div className="text-center flex flex-col items-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto mb-6 shadow-lg shadow-primary/30">
									<span className="text-3xl font-bold">1</span>
								</div>
								<h3 className="text-xl font-bold font-headline">Provide an Image, URL or Text</h3>
								<p className="mt-2 text-muted-foreground max-w-xs mx-auto">
									Drag and drop an image, paste a URL, or type a description in the search box.
								</p>
							</div>
							<div className="text-center flex flex-col items-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto mb-6 shadow-lg shadow-primary/30">
									<span className="text-3xl font-bold">2</span>
								</div>
								<h3 className="text-xl font-bold font-headline">We Handle the Rest</h3>
								<p className="mt-2 text-muted-foreground max-w-xs mx-auto">
									For images, a temporary, secure link is generated for the search.
								</p>
							</div>
							<div className="text-center flex flex-col items-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto mb-6 shadow-lg shadow-primary/30">
									<span className="text-3xl font-bold">3</span>
								</div>
								<h3 className="text-xl font-bold font-headline">Launch Your Search</h3>
								<p className="mt-2 text-muted-foreground max-w-xs mx-auto">
									Click your preferred search engine to see the results in a new tab.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="features" className="py-20 sm:py-24">
					<div className="container px-4 md:px-6">
						<div className="text-center max-w-2xl mx-auto">
							<h2 className="text-3xl font-bold font-headline tracking-tight">Powerful Features, Total Privacy</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Everything you need for a quick and private image search.
							</p>
						</div>
						<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
							<FeatureCard
								icon={<Rocket size={24} />}
								title="Blazing Fast"
								description="Our optimized process ensures your search results are ready in a flash."
							/>
							<FeatureCard
								icon={<Sparkles size={24} />}
								title="Multi-Engine Search"
								description="Go beyond Google. Search Yandex, Bing, and DuckDuckGo to find exactly what you need."
							/>
							<FeatureCard
								icon={<Camera size={24} />}
								title="URL & Text Search"
								description="Paste an image URL or describe an image with text to find what you're looking for."
							/>
							<FeatureCard
								icon={<ShieldCheck size={24} />}
								title="100% Private"
								description="Your images are deleted from our servers after 5 minutes. We don't keep your data."
							/>
						</div>
					</div>
				</section>

				<section id="testimonials" className="py-20 sm:py-24 bg-muted/50">
					<div className="container px-4 md:px-6">
						<div className="text-center max-w-2xl mx-auto">
							<h2 className="text-3xl font-bold font-headline tracking-tight">What Our Users Say</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Join thousands of satisfied users who find images faster with Image Dash.
							</p>
						</div>
						<div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							<TestimonialCard
								name="Emily Carter"
								quote="This is a game-changer for finding the source of images. Incredibly fast and easy to use. I found the original artist for a wallpaper I loved in seconds!"
								avatarUrl="https://placehold.co/100x100.png"
							/>
							<TestimonialCard
								name="David Chen"
								quote="As a designer, I'm constantly looking for image sources and variations. Image Dash has streamlined my workflow. The multi-engine search is brilliant."
								avatarUrl="https://placehold.co/100x100.png"
							/>
							<TestimonialCard
								name="Sophia Rodriguez"
								quote="I love that it's private and my uploads are temporary. It gives me peace of mind. Plus, the text search works surprisingly well for finding specific image styles."
								avatarUrl="https://placehold.co/100x100.png"
							/>
							<TestimonialCard
								name="Alex Johnson"
								quote="The URL paste feature is genius! It saves me so much time. I don't have to download and re-upload images anymore. A must-have tool for any creative."
								avatarUrl="https://placehold.co/100x100.png"
							/>
							<TestimonialCard
								name="Mia Williams"
								quote="Image Dash is my secret weapon for fact-checking. The ability to quickly search across multiple engines helps me verify the authenticity of photos instantly."
								avatarUrl="https://placehold.co/100x100.png"
							/>
							<TestimonialCard
								name="Liam Brown"
								quote="Simple, effective, and respects my privacy. It does exactly what it promises without any fuss. The 'Search All' button is the cherry on top. Highly recommended!"
								avatarUrl="https://placehold.co/100x100.png"
							/>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
