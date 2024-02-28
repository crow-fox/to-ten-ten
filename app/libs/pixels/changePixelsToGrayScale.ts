import { Pixel2D } from "~/libs/pixels/type";

export function changePixelsToGrayScale(pixels: Pixel2D) {
  return pixels.map((row) => {
    return row.map((pixel) => {
      // Todo: Y=0.2126R+0.7152G+0.0722B で書き換える
      const average = Math.round((pixel.r + pixel.g + pixel.b) / 3);
      return {
        r: average,
        g: average,
        b: average,
        a: pixel.a,
      };
    });
  });
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("changePixelsToGrayScale", () => {
    test("rgbの平均した色がそれぞれrgbに入ったpixelsを返す", () => {
      const pixels = [
        [
          { r: 100, g: 200, b: 0, a: 255 },
          { r: 10, g: 20, b: 30, a: 255 },
        ],
        [
          { r: 1, g: 2, b: 3, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];
      expect(changePixelsToGrayScale(pixels)).toEqual([
        [
          { r: 100, g: 100, b: 100, a: 255 },
          { r: 20, g: 20, b: 20, a: 255 },
        ],
        [
          { r: 2, g: 2, b: 2, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ]);
    });

    test("小数点以下は四捨五入される", () => {
      const pixels = [
        [
          { r: 4, g: 0, b: 0, a: 255 },
          { r: 5, g: 0, b: 0, a: 255 },
        ],
      ];
      expect(changePixelsToGrayScale(pixels)).toEqual([
        [
          { r: 1, g: 1, b: 1, a: 255 },
          { r: 2, g: 2, b: 2, a: 255 },
        ],
      ]);
    });
  });
}
