import { Pixel2D } from "~/libs/pixels/type";

export function getPixelsSize(pixels: Pixel2D) {
  return { width: pixels[0].length, height: pixels.length };
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("getPixelSize", () => {
    test("2次元配列のサイズを取得する", () => {
      const pixels: Pixel2D = [
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
      ];
      const { width, height } = getPixelsSize(pixels);
      expect(width).toBe(2);
      expect(height).toBe(2);
    });
  });
}
