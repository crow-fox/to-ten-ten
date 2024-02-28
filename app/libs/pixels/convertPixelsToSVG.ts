import { getPixelsSize } from "~/libs/pixels/getPixelsSize";
import { Pixel2D } from "~/libs/pixels/type";

export function convertPixelsToSVG(pixels: Pixel2D) {
  const { width, height } = getPixelsSize(pixels);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" >`;
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (pixel.a === 255) {
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(${pixel.r} ${pixel.g} ${pixel.b})" />`;
        return;
      }
      if (pixel.a === 0) {
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(0 0 0 / 0)" />`;
        return;
      }
      svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(${pixel.r} ${pixel.g} ${pixel.b} / ${(pixel.a / 255).toFixed(2)})" />`;
    });
  });
  const result = svg + "</svg>";

  return result;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("convertPixelsToSVG", () => {
    test("svgの文字列に変換", () => {
      const pixels = [
        [
          // 透明度255(通常色)の場合はrgb(100 100 100)
          { r: 100, g: 100, b: 100, a: 255 },
          // 透明度が0のときはrgb(0 0 0 / 0)
          { r: 100, g: 100, b: 100, a: 0 },
        ],
        [
          // 透明度が0, 255以外の場合はrgb(r g b / (a / 255))
          // 透明度は小数点第2位までで四捨五入
          { r: 255, g: 255, b: 255, a: 250 },
          { r: 255, g: 255, b: 255, a: 5 },
        ],
      ];
      const svg = convertPixelsToSVG(pixels);
      expect(svg).toBe(
        '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" ><rect x="0" y="0" width="1" height="1" fill="rgb(100 100 100)" /><rect x="1" y="0" width="1" height="1" fill="rgb(0 0 0 / 0)" /><rect x="0" y="1" width="1" height="1" fill="rgb(255 255 255 / 0.98)" /><rect x="1" y="1" width="1" height="1" fill="rgb(255 255 255 / 0.02)" /></svg>',
      );
    });
  });
}
