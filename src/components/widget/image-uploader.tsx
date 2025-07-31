import * as React from "react";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function ImageUploader({
	onFileSelect,
	disabled,
}: {
	onFileSelect: (file: File) => void;
	disabled: boolean;
}) {
	const { supportedFormats, supportedTypes } = useImageUpload();
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
			<p className="mt-2 text-sm text-muted-foreground">{supportedFormats}. Max 30MB.</p>
			<Input
				ref={fileInputRef}
				type="file"
				className="hidden"
				onChange={onFileChange}
				accept={supportedTypes.join(", ")}
				disabled={disabled}
			/>
		</div>
	);
}
