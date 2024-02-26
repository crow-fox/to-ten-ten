import { calculateCanvasSize } from "~/utils/canvas/calculateCanvasSize";

const maxCanvasSize = 1024;

export function canvasDrawImage(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
) {
  const [canvasWidth, canvasHeight] = calculateCanvasSize(
    img.width,
    img.height,
    maxCanvasSize,
  );
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("2dコンテキストが取得できません");
  }
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  return { imageData, ctx };
}
