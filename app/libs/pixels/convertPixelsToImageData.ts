import { getPixelsSize } from "~/libs/pixels/getPixelsSize";
import { Pixel2D } from "~/libs/pixels/type";

export function convertPixelsToImageData(pixels: Pixel2D): ImageData {
  const { width, height } = getPixelsSize(pixels);
  return new ImageData(
    new Uint8ClampedArray(
      pixels.flat().flatMap((pixel) => [pixel.r, pixel.g, pixel.b, pixel.a]),
    ),
    width,
    height,
  );
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("convertPixelsToImageData", () => {
    test("2次元配列をImageDataに変換する", () => {
      const pixels: Pixel2D = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];
      const result = convertPixelsToImageData(pixels);
      expect(result).toEqual(
        new ImageData(
          new Uint8ClampedArray([
            0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255,
          ]),
          2,
          2,
        ),
      );
    });
  });
}
