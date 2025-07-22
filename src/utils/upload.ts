/**
 * Calculate the SHA-256 hash of the file and return the first 10 characters.
 */
async function getFileHash(file: File): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	return hashHex.slice(0, 10);
}

/**
 * Upload the image file to the server and return its public URL.
 * The file name is named using the first 10 characters of the file hash.
 */
export async function uploadImage(file: File, apiPath: string = "/api/upload"): Promise<string> {
	const hash = await getFileHash(file);
	const ext = (() => {
		const parts = file.name.split(".");
		return parts.length > 1 ? parts.pop() : "";
	})();
	const filename = ext ? `${hash}.${ext}` : hash;

	const response = await fetch(`${apiPath}?filename=${encodeURIComponent(filename)}`, {
		method: "POST",
		body: file,
	});

	let result: any;
	try {
		result = await response.json();
	} catch {
		throw new Error("Server response format error.");
	}

	if (!response.ok) {
		throw new Error(result?.message || `HTTP error! status: ${response.status}`);
	}

	if (!result.url) {
		throw new Error("Server response missing image URL.");
	}

	return result.url;
}
