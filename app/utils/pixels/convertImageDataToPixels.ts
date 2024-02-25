import { Pixel2D } from "~/utils/pixels/type";

export function convertImageDataToPixels(imageData: ImageData): Pixel2D {
  const pixels: Pixel2D = [];

  for (let y = 0; y < imageData.height; y++) {
    // 1行分のピクセルデータを取得
    const row: Pixel2D[number] = [];
    for (let x = 0; x < imageData.width; x++) {
      // 1ピクセル分のデータを取得
      const index = (y * imageData.width + x) * 4;
      row.push({
        r: imageData.data[index],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2],
        a: imageData.data[index + 3],
      });
    }
    pixels.push(row);
  }

  return pixels;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;
  describe("convertImageDataToPixels", () => {
    test("ImageDataを2次元配列に変換する", () => {
      const imageData = new ImageData(
        new Uint8ClampedArray([
          0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255,
        ]),
        2,
        2,
      );
      const result = convertImageDataToPixels(imageData);
      expect(result).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ]);
    });
  });
}
