import { Camera, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import FeatureCard from "../widget/feature-card";
import TestimonialCard from "../widget/testimonial-card";

export default function LandingView() {
	return (
		<>
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
		</>
	);
}
