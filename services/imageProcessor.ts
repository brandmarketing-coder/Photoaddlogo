import { EditorSettings } from '../types';

/**
 * Loads an image from a source string (URL or Base64)
 */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
};

/**
 * Merges the main image with the footer strip and logo.
 */
export const processImage = async (
  mainImageSrc: string,
  logoImageSrc: string | null,
  settings: EditorSettings
): Promise<string> => {
  try {
    const mainImg = await loadImage(mainImageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');

    // Enable high quality image smoothing for better logo downscaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Setup Canvas dimensions matching the main image
    canvas.width = mainImg.width;
    canvas.height = mainImg.height;

    // 2. Draw Main Image
    ctx.drawImage(mainImg, 0, 0);

    // 3. Draw Footer Bar
    const footerHeight = mainImg.height * settings.footerHeightRatio;
    const footerY = mainImg.height - footerHeight;

    ctx.save();
    ctx.globalAlpha = settings.footerOpacity;
    ctx.fillStyle = settings.footerColor;
    ctx.fillRect(0, footerY, mainImg.width, footerHeight);
    ctx.restore();

    // 4. Draw Logo (if provided)
    if (logoImageSrc) {
      const logoImg = await loadImage(logoImageSrc);

      // Calculate logo dimensions to fit within the footer with padding
      const maxLogoHeight = footerHeight * (1 - settings.logoPadding * 2);
      const scaleFactor = maxLogoHeight / logoImg.height;
      
      const logoWidth = logoImg.width * scaleFactor;
      const logoHeight = logoImg.height * scaleFactor;

      // Center horizontally
      const logoX = (mainImg.width - logoWidth) / 2;
      // Center vertically within the footer
      const logoY = footerY + (footerHeight - logoHeight) / 2;

      ctx.save();
      
      if (settings.forceLogoWhite) {
        // Brightness filter to make logo all white (useful for dark backgrounds)
        ctx.filter = 'brightness(0) invert(1)';
      }

      ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
      ctx.restore();
    }

    // Output with high quality
    return canvas.toDataURL('image/jpeg', 0.95);
  } catch (error) {
    console.error('Image processing failed:', error);
    throw error;
  }
};