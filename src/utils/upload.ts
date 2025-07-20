/**
 * Uploads an image file to the server and returns its public URL.
 * @param file The image file to upload.
 * @param apiPath The optional API endpoint to upload the image to.
 * @returns A promise that resolves to the full public URL of the uploaded image.
 * @throws An error if the upload fails.
 */
export async function uploadImage(file: File, apiPath: string = "/api/upload"): Promise<string> {
	const response = await fetch(`${apiPath}?filename=${encodeURIComponent(file.name)}`, {
		method: "POST",
		body: file,
	});

	if (!response.ok) {
		let errorMessage = `HTTP error! status: ${response.status}`;
		try {
			const errorResult = await response.json();
			errorMessage = errorResult.message || errorMessage;
		} catch (e) {}
		throw new Error(errorMessage);
	}

	const result = await response.json();
	if (!result.url) {
		throw new Error("Invalid response from server.");
	}

	return result.url;
}
