
import { type NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// The public directory is where Next.js serves static assets from.
const PUBLIC_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const FIVE_MINUTES_MS = 5 * 60 * 1000;

const ensureUploadDir = async (dir: string) => {
  try {
    // fs.access checks if the directory exists and we have permissions.
    await fs.access(dir);
  } catch (error) {
    // If it doesn't exist, create it.
    await fs.mkdir(dir, { recursive: true });
  }
};

export async function POST(request: NextRequest) {
  try {
    // Ensure the public upload directory exists.
    await ensureUploadDir(PUBLIC_UPLOAD_DIR);

    const { imageDataUri } = await request.json();

    if (!imageDataUri || typeof imageDataUri !== 'string') {
      return NextResponse.json(
        { message: 'imageDataUri is required and must be a string' },
        { status: 400 }
      );
    }

    const matches = imageDataUri.match(/^data:(image\/([a-zA-Z+]+));base64,(.+)$/);
    if (!matches || matches.length !== 4) {
      return NextResponse.json(
        {
          message: 'Invalid imageDataUri format. Expected data:image/<type>;base64,<data>',
        },
        { status: 400 }
      );
    }

    const imageType = matches[2];
    const base64Data = matches[3];

    if (!imageType || !base64Data) {
      return NextResponse.json(
        { message: 'Could not parse image type or data from imageDataUri' },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Enforce a file size limit (e.g., 30MB)
    if (imageBuffer.length > 30 * 1024 * 1024) { 
      return NextResponse.json({ message: 'File is too large. Maximum size is 30MB.' }, { status: 413 });
    }

    // Sanitize image type to create a safe file extension
    const safeImageType = imageType.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const validExtensions = ['jpeg', 'jpg', 'png', 'webp'];
    const extension = validExtensions.includes(safeImageType) ? safeImageType : 'png';
    
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const filename = `${Date.now()}${randomNumber}.${extension}`;
    const filePath = path.join(PUBLIC_UPLOAD_DIR, filename);

    await fs.writeFile(filePath, imageBuffer);

    // The relative URL path from the public directory.
    // The browser will resolve this against the current origin.
    const relativeUrl = `/uploads/${filename}`;
    
    // Schedule the file for deletion after 5 minutes
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          // It's okay if the file is already gone, so we only log other errors.
          console.error(`Failed to delete temporary file ${filePath}:`, err);
        } else {
          console.log(`Successfully deleted temporary file ${filePath}`);
        }
      });
    }, FIVE_MINUTES_MS);

    // Return the relative URL. The client will handle the full path.
    return NextResponse.json({ url: relativeUrl }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/upload:', error);
    let message = 'Internal server error during image processing.';
    if (error instanceof Error) {
      message = error.message;
    }
    // Provide a more specific error message for permission issues
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'EACCES' || error.code === 'EROFS') {
        message = 'File system permission error. The server might not have write access to the public/uploads directory.';
      }
    }
    return NextResponse.json({ message: message }, { status: 500 });
  }
}

    