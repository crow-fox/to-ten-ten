import { convertPixelsToImageData } from "~/utils/pixels/convertPixelsToImageData";
import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { Pixel2D } from "~/utils/pixels/type";

export function canvasDrawImageByPixels(
  canvas: HTMLCanvasElement,
  pixels: Pixel2D,
) {
  const pixelsSize = getPixelsSize(pixels);
  canvas.width = pixelsSize.width;
  canvas.height = pixelsSize.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("2dコンテキストが取得できません");
  }
  const imageData = convertPixelsToImageData(pixels);
  ctx.putImageData(imageData, 0, 0);
  return { imageData, ctx };
}
