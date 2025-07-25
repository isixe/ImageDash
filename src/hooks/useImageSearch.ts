"use client";

import * as React from "react";
import type { SearchEngine } from "@/data/searchEngines";
import { uploadImage } from "@/utils/upload";
import { useToast } from "./useToast";

const URL_REGEX = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))(?:\?.*)?$/i;

type UseImageSearchProps = {
	onReset?: () => void;
};

export function useImageSearch({ onReset }: UseImageSearchProps = {}) {
	const [imagePreview, setImagePreview] = React.useState<string | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [isQueryImageUrl, setIsQueryImageUrl] = React.useState(false);
	const { toast } = useToast();

	React.useEffect(() => {
		const isUrl = URL_REGEX.test(searchQuery);
		setIsQueryImageUrl(isUrl);

		if (isUrl) {
			setImagePreview(searchQuery);
			setImageUrl(searchQuery);
		}

		if (isQueryImageUrl) {
			// It was a URL before, but now it's not. Reset image states.
			setImagePreview(null);
			setImageUrl(null);
		}
	}, [searchQuery, isQueryImageUrl]);

	const handleFileSelect = async (file: File) => {
		if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
			toast({
				title: "Invalid File Type",
				description: "Please upload a valid image file (PNG, JPG, WEBP).",
				variant: "destructive",
			});
			return;
		}

		// Reset previous state and start loading
		setImagePreview(null);
		setImageUrl(null);
		setSearchQuery("");
		setIsLoading(true);

		try {
			const filename = await uploadImage(file);
			const imageUrl = `/api/upload?filename=${filename}`;
			setImagePreview(imageUrl);
			setImageUrl(imageUrl);
		} catch (error: any) {
			toast({
				title: "Upload Error",
				description: error.message || "An unknown error occurred.",
				variant: "destructive",
			});
			resetState();
		} finally {
			setIsLoading(false);
		}
	};

	const resetState = () => {
		setImagePreview(null);
		setImageUrl(null);
		setIsLoading(false);
		setSearchQuery("");
		onReset?.();
	};

	const handleSearch = (engine: SearchEngine) => {
		let url = "";

		const baseUrl = window.location.origin;

		if (imageUrl && engine.url) {
			url = `${engine.url}${baseUrl}${imageUrl}`;
		}

		if (searchQuery && engine.textSearchUrl) {
			url = `${engine.textSearchUrl}${baseUrl}${searchQuery}`;
		}

		console.log(url);

		if (url) {
			window.open(url, "_blank");
		}
	};

	return {
		imagePreview,
		imageUrl,
		isLoading,
		searchQuery,
		isQueryImageUrl,
		handleFileSelect,
		resetState,
		setSearchQuery,
		handleSearch,
	};
}
