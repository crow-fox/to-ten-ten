import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { Pixel2D } from "~/utils/pixels/type";

export function downscalePixelsByDotSize(pixels: Pixel2D, dotSize: number) {
  const { width, height } = getPixelsSize(pixels);
  const newWidth = width / dotSize;
  const newHeight = height / dotSize;

  if (newWidth % 1 !== 0 || newHeight % 1 !== 0)
    throw new Error("pixelsのサイズがdotSizeで割り切れません");

  const newPixels: Pixel2D = [];

  for (let y = 0; y < newHeight; y++) {
    const row: Pixel2D[number] = [];
    // ドットのサイズ分同じ色が連続している前提で右下の色を取得
    // Todo: ドットのサイズ分の色が違う場合はエラーをthrowする
    for (let x = 0; x < newWidth; x++) {
      const r = pixels[y * dotSize][x * dotSize].r;
      const g = pixels[y * dotSize][x * dotSize].g;
      const b = pixels[y * dotSize][x * dotSize].b;
      const a = pixels[y * dotSize][x * dotSize].a;
      row.push({ r, g, b, a });
    }
    newPixels.push(row);
  }

  return newPixels;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("downscalePixelsByDotSize", () => {
    test("dotSizeで縮小", () => {
      const colorA = { r: 0, g: 0, b: 0, a: 255 };
      const colorB = { r: 255, g: 255, b: 255, a: 255 };
      const pixels = [
        [colorA, colorA, colorB, colorB],
        [colorA, colorA, colorB, colorB],
        [colorB, colorB, colorA, colorA],
        [colorB, colorB, colorA, colorA],
      ];
      const dotSize = 2;
      expect(downscalePixelsByDotSize(pixels, dotSize)).toEqual([
        [colorA, colorB],
        [colorB, colorA],
      ]);
    });
    test("dotSizeで割り切れない場合はエラー", () => {
      const pixels = [[{ r: 0, g: 0, b: 0, a: 255 }]];
      const dotSize = 2;
      expect(() => downscalePixelsByDotSize(pixels, dotSize)).toThrowError();
    });
  });
}
