
/**
 * Uploads an image file to the server and returns its public URL.
 * @param file The image file to upload.
 * @param apiPath The optional API endpoint to upload the image to.
 * @returns A promise that resolves to the full public URL of the uploaded image.
 * @throws An error if the upload fails.
 */
export async function uploadImage(file: File, apiPath: string = '/api/upload'): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const imageDataUri = reader.result as string;

      try {
        const response = await fetch(apiPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageDataUri }),
        });

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorResult = await response.json();
            errorMessage = errorResult.message || errorMessage;
          } catch (e) {
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        if (!result.url) {
            throw new Error('Invalid response from server.');
        }

        // The API now returns the full absolute URL.
        resolve(result.url);

      } catch (error) {
        console.error("Upload failed:", error);
        if (error instanceof Error) {
            reject(error);
        } else {
            reject(new Error('An unknown error occurred during upload.'));
        }
      }
    };
    
    reader.onerror = (error) => {
        reject(new Error('Failed to read file.'));
    }
  });
}
