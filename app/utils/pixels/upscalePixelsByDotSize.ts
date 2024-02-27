import { Pixel2D } from "~/utils/pixels/type";

export function upscalePixelsByDotSize(
  pixels: Pixel2D,
  dotSize: number,
): Pixel2D {
  return pixels.flatMap((row) => {
    return Array(dotSize).fill(
      row.flatMap((pixel) => {
        return Array(dotSize).fill(pixel);
      }),
    );
  });
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("upscalePixelsByDotSize", () => {
    test("各pixelをdotSizeの分だけ大きくする", () => {
      const colorA = { r: 0, g: 0, b: 0, a: 255 };
      const colorB = { r: 255, g: 255, b: 255, a: 255 };
      const pixels = [
        [colorA, colorB],
        [colorB, colorA],
      ];
      const dotSize = 2;

      expect(upscalePixelsByDotSize(pixels, dotSize)).toEqual([
        [colorA, colorA, colorB, colorB],
        [colorA, colorA, colorB, colorB],
        [colorB, colorB, colorA, colorA],
        [colorB, colorB, colorA, colorA],
      ]);
    });
  });
}
