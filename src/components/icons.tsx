import type { SVGProps } from "react";

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>Google</title>
		<path
			d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.63 1.9-3.87 0-7-3.15-7-7s3.13-7 7-7c2.25 0 3.63.89 4.49 1.72l2.4-2.4C17.43 2.89 15.25 2 12.48 2c-5.48 0-9.88 4.38-9.88 9.88s4.4 9.88 9.88 9.88c5.8 0 9.43-3.85 9.43-9.56 0-.6-.08-1.12-.2-1.68z"
			fill="currentColor"
		/>
	</svg>
);

const BingIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>Bing</title>
		<path
			d="M10.254 24v-9.695l-4.57 6.423-3.48-2.523L6.8 12 2.204 5.795 5.684 3.27l4.57 6.423V0l11.542 4.61v14.78z"
			fill="currentColor"
		/>
	</svg>
);

const YandexIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>Yandex</title>
		<path
			d="M10.323 0H5.795L0 11.998l5.795 12.002h4.528l-5.77-12.002L10.323 0zm7.882 11.237v12.76H24V11.237h-5.795zM18.205 0v8.61h5.795V0h-5.795z"
			fill="currentColor"
		/>
	</svg>
);

const TinEyeIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>TinEye</title>
		<path
			d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.588c4.095 0 7.412 3.317 7.412 7.412S16.095 19.412 12 19.412 4.588 16.095 4.588 12 7.905 4.588 12 4.588z"
			fill="currentColor"
		/>
		<path
			d="M12 6.706a5.294 5.294 0 1 0 0 10.588 5.294 5.294 0 0 0 0-10.588zm0 2.118a3.176 3.176 0 1 1 0 6.353 3.176 3.176 0 0 1 0-6.353z"
			fill="currentColor"
		/>
	</svg>
);

const SogouIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>Sogou</title>
		<path
			d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.48 17.48a1.2 1.2 0 0 1-1.7 1.7l-3.2-3.2a6 6 0 1 1 .7-.7l3.2 3.2z"
			fill="currentColor"
		/>
		<path d="M13.2 13.2a4.2 4.2 0 1 1-6-6 4.2 4.2 0 0 1 6 6z" fill="currentColor" />
	</svg>
);

export const Icons = {
	google: GoogleIcon,
	bing: BingIcon,
	yandex: YandexIcon,
	tineye: TinEyeIcon,
	sogou: SogouIcon,
};
