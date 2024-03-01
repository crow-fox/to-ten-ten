import { Pixel, Pixel2D } from "~/libs/pixels/type";

export function convertDotPixels(pixels: Pixel2D, dotSize: number) {
  const dotPixels: Pixel2D = [];

  for (let y = 0; y < pixels.length; y += dotSize) {
    const row = [];
    for (let x = 0; x < pixels[y].length; x += dotSize) {
      let total: Pixel = { r: 0, g: 0, b: 0, a: 0 };
      let count = 0;

      for (let blockY = y; blockY < y + dotSize; blockY++) {
        for (let blockX = x; blockX < x + dotSize; blockX++) {
          const pixel = pixels[blockY][blockX];
          total.r += pixel.r;
          total.g += pixel.g;
          total.b += pixel.b;
          total.a += pixel.a;
          count++;
        }
      }

      const averageR = Math.round(total.r / count);
      const averageG = Math.round(total.g / count);
      const averageB = Math.round(total.b / count);
      const averageA = Math.round(total.a / count);

      row.push({
        r: averageR,
        g: averageG,
        b: averageB,
        a: averageA,
      });
    }
    dotPixels.push(row);
  }

  return dotPixels;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("convertDotPixels", () => {
    test("ドットのサイズを一ブロックとして考え、そのブロックの平均色を持つ1pxのドットを作成し合成した新しいpixelsを生成", () => {
      const pixels = [
        [
          { r: 10, g: 20, b: 30, a: 40 },
          { r: 20, g: 30, b: 40, a: 10 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 255, g: 255, b: 255, a: 255 },
        ],
        [
          { r: 30, g: 40, b: 10, a: 20 },
          { r: 40, g: 10, b: 20, a: 30 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 255, g: 255, b: 255, a: 255 },
        ],
        [
          { r: 10, g: 20, b: 30, a: 40 },
          { r: 20, g: 30, b: 40, a: 10 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 255, g: 255, b: 255, a: 255 },
        ],
        [
          { r: 30, g: 40, b: 10, a: 20 },
          { r: 40, g: 10, b: 20, a: 30 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 255, g: 255, b: 255, a: 255 },
        ],
      ];
      const dotSize = 2;

      expect(convertDotPixels(pixels, dotSize)).toEqual([
        [
          { r: 25, g: 25, b: 25, a: 25 },
          { r: 128, g: 128, b: 128, a: 128 },
        ],
        [
          { r: 25, g: 25, b: 25, a: 25 },
          { r: 128, g: 128, b: 128, a: 128 },
        ],
      ]);
    });
    test("サイズはdotSize分小さくなる", () => {
      const pixel = { r: 0, g: 0, b: 0, a: 255 };
      const pixels = [
        [pixel, pixel, pixel, pixel],
        [pixel, pixel, pixel, pixel],
        [pixel, pixel, pixel, pixel],
        [pixel, pixel, pixel, pixel],
      ];
      const dotSize = 2;
      const dotPixels = convertDotPixels(pixels, dotSize);
      expect(dotPixels.length).toBe(2);
      expect(dotPixels[0].length).toBe(2);
    });
    test("平均の色が小数点以下は四捨五入される", () => {
      const pixels = [
        [
          { r: 1, g: 1, b: 1, a: 1 },
          { r: 2, g: 2, b: 2, a: 2 },
        ],
        [
          { r: 2, g: 2, b: 2, a: 2 },
          { r: 2, g: 2, b: 2, a: 2 },
        ],
      ];
      const dotSize = 2;
      const dotPixels = convertDotPixels(pixels, dotSize);
      expect(dotPixels).toEqual([[{ r: 2, g: 2, b: 2, a: 2 }]]);
    });
  });
}
