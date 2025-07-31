"use client";
import * as React from "react";
import type { SearchEngine } from "@/data/searchEngines";
import { uploadImage } from "@/utils/upload";
import { useToast } from "./useToast";

// Enhanced URL regex to support more image formats
const URL_REGEX = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif|tiff|tif|bmp|svg|ico|avif|heic|heif))(?:\?.*)?$/i;

// Supported MIME types for file validation
const SUPPORTED_IMAGE_TYPES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
	"image/gif",
	"image/tiff",
	"image/tif",
	"image/bmp",
	"image/svg+xml",
	"image/x-icon",
	"image/vnd.microsoft.icon",
	"image/avif",
	"image/heic",
	"image/heif",
];

// Human-readable format names for error messages
const SUPPORTED_FORMATS = "PNG, JPG, JPEG, WEBP, GIF, TIFF, BMP, SVG, ICO, AVIF, HEIC, HEIF";

type UseImageSearchProps = {
	onReset?: () => void;
};

export function useImageUpload({ onReset }: UseImageSearchProps = {}) {
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

	const isValidImageType = (fileType: string): boolean => {
		return SUPPORTED_IMAGE_TYPES.includes(fileType.toLowerCase());
	};

	const handleFileSelect = async (file: File) => {
		if (!isValidImageType(file.type)) {
			toast({
				title: "Invalid File Type",
				description: `Please upload a valid image file (${SUPPORTED_FORMATS}).`,
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
		supportedFormats: SUPPORTED_FORMATS,
		supportedTypes: SUPPORTED_IMAGE_TYPES,
	};
}
