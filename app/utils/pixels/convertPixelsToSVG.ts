import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { Pixel2D } from "~/utils/pixels/type";

export function convertPixelsToSVG(pixels: Pixel2D) {
  const { width, height } = getPixelsSize(pixels);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" >\n`;
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (pixel.a === 255) {
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(${pixel.r} ${pixel.g} ${pixel.b})" />`;
        return;
      }
      svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(${pixel.r} ${pixel.g} ${pixel.b} / ${(pixel.a / 255).toFixed(2)})" />`;
    });
  });
  const result = svg + "\n</svg>";

  return result;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("convertPixelsToSVG", () => {
    test("svgの文字列に変換", () => {
      const pixels = [
        [
          { r: 255, g: 255, b: 255, a: 255 },
          { r: 0, g: 0, b: 0, a: 100 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 255, g: 255, b: 255, a: 100 },
        ],
      ];
      const svg = convertPixelsToSVG(pixels);
      expect(svg).toBe(
        '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" >\n<rect x="0" y="0" width="1" height="1" fill="rgb(255 255 255)" /><rect x="1" y="0" width="1" height="1" fill="rgb(0 0 0 / 0.39)" /><rect x="0" y="1" width="1" height="1" fill="rgb(0 0 0)" /><rect x="1" y="1" width="1" height="1" fill="rgb(255 255 255 / 0.39)" />\n</svg>',
      );
    });
  });
}
