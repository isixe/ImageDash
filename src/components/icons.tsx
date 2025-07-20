import type { SVGProps } from "react";

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.63 1.9-3.87 0-7-3.15-7-7s3.13-7 7-7c2.25 0 3.63.89 4.49 1.72l2.4-2.4C17.43 2.89 15.25 2 12.48 2c-5.48 0-9.88 4.38-9.88 9.88s4.4 9.88 9.88 9.88c5.8 0 9.43-3.85 9.43-9.56 0-.6-.08-1.12-.2-1.68z" fill="currentColor"/>
  </svg>
);

const BingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Bing</title>
    <path d="M10.254 24v-9.695l-4.57 6.423-3.48-2.523L6.8 12 2.204 5.795 5.684 3.27l4.57 6.423V0l11.542 4.61v14.78z" fill="currentColor"/>
  </svg>
);

const YandexIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Yandex</title>
    <path d="M10.323 0H5.795L0 11.998l5.795 12.002h4.528l-5.77-12.002L10.323 0zm7.882 11.237v12.76H24V11.237h-5.795zM18.205 0v8.61h5.795V0h-5.795z" fill="currentColor"/>
  </svg>
);

const BaiduIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Baidu</title>
        <path d="M12.164 6.542c-1.12.01-2.174.228-3.14.645-2.91 1.245-4.765 4.125-4.765 7.365 0 4.47 3.63 8.1 8.1 8.1 4.47 0 8.1-3.63 8.1-8.1 0-4.215-3.217-7.68-7.32-8.055zM6.71 13.947c0-2.302 1.474-4.305 3.585-5.145.27-.105.548-.165.825-.165.548 0 1.046.21 1.425.578.548.547.698 1.335.405 2.04-.142.345-.345.675-.577.975-.375.48-.837.878-1.343 1.193-.405.255-.848.45-1.305.585-.825.263-1.695.3-2.512.188-.503-.06-.983-.225-1.418-.472a.945.945 0 0 1-.502-1.088c.06-.518.472-.915.975-1.012a2.34 2.34 0 0 1 .3-.038zM12.017 2.4c-4.417 0-7.85 3.583-7.85 7.95 0 3.255 1.95 6.075 4.8 7.275.645.57 1.5.818 2.37.66 1.028-.195 1.8-1.028 1.875-2.085.045-.615-.158-1.215-.548-1.672-.292-.353-.668-.63-1.065-.84-2.28-1.177-3.51-3.585-3.51-6.195 0-3.93 3.195-7.125 7.125-7.125s7.125 3.195 7.125 7.125c0 2.205-1.005 4.185-2.61 5.505-.292.24-.547.54-.727.878-.225.435-.33.938-.277 1.425.12 1.117.975 2.01 2.115 2.145.495.053.998-.06 1.425-.33.375-.225.675-.532.908-.9 3.5-5.355.98-12.375-4.4-15.87z" fill="currentColor"/>
    </svg>
);

const TinEyeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>TinEye</title>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.588c4.095 0 7.412 3.317 7.412 7.412S16.095 19.412 12 19.412 4.588 16.095 4.588 12 7.905 4.588 12 4.588z" fill="currentColor"/>
        <path d="M12 6.706a5.294 5.294 0 1 0 0 10.588 5.294 5.294 0 0 0 0-10.588zm0 2.118a3.176 3.176 0 1 1 0 6.353 3.176 3.176 0 0 1 0-6.353z" fill="currentColor"/>
    </svg>
);

const SogouIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Sogou</title>
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.48 17.48a1.2 1.2 0 0 1-1.7 1.7l-3.2-3.2a6 6 0 1 1 .7-.7l3.2 3.2z" fill="currentColor" />
        <path d="M13.2 13.2a4.2 4.2 0 1 1-6-6 4.2 4.2 0 0 1 6 6z" fill="currentColor" />
    </svg>
);


export const Icons = {
  google: GoogleIcon,
  bing: BingIcon,
  yandex: YandexIcon,
  baidu: BaiduIcon,
  tineye: TinEyeIcon,
  sogou: SogouIcon,
};
