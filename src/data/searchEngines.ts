import type { SVGProps } from "react";
import { IconName, Icons } from "@/components/icon/icons";

export interface SearchEngine {
	name: string;
	icon: IconName;
	url?: string;
	textSearchUrl?: string;
}

export const searchEngines: SearchEngine[] = [
	{
		name: "Google",
		icon: "google",
		url: "https://lens.google.com/uploadbyurl?url=",
		textSearchUrl: "https://www.google.com/search?tbm=isch&q=",
	},
	{
		name: "Yandex",
		icon: "yandex",
		url: "https://yandex.com/images/search?source=collections&rpt=imageview&url=",
		textSearchUrl: "https://yandex.com/images/search?text=",
	},
	{
		name: "Bing",
		icon: "bing",
		url: "https://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=",
		textSearchUrl: "https://www.bing.com/images/search?q=",
	},
	{
		name: "TinEye",
		icon: "tineye",
		url: "https://tineye.com/search/?rpt=imageview&url=",
		textSearchUrl: "https://tineye.com/search?q=",
	},
];
