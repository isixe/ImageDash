import type { SVGProps } from "react";
import { Icons } from "@/components/icons";

export interface SearchEngine {
	name: string;
	icon: keyof typeof Icons;
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
	{
		name: "Baidu",
		icon: "baidu",
		url: "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&image=",
		textSearchUrl: "https://image.baidu.com/search/index?word=",
	},
	{
		name: "Sogou",
		icon: "sogou",
		url: "https://ris.sogou.com/ris?flag=1&from=pic_result_list&query=",
		textSearchUrl: "https://pic.sogou.com/pics?query=",
	},
];
