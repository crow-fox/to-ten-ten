import { DotSize } from "~/components/DotSizeSelect/utils";
import { getPixelsSize } from "~/libs/pixels/getPixelsSize";
import { Pixel2D } from "~/libs/pixels/type";

export function convertPixelsToCSSBoxShadow(pixels: Pixel2D, dotSize: DotSize) {
  const size = getPixelsSize(pixels);
  const width = size.width * dotSize;
  const height = size.height * dotSize;

  let css = `width: ${dotSize}px; height: ${dotSize}px; background-color: transparent; margin-top: -${dotSize}px; margin-left: -${dotSize}px; margin-bottom: ${height}px; margin-right: ${width}px; box-shadow: `;

  pixels.forEach((row, rowIndex) => {
    row.forEach((pixel, columnIndex) => {
      const width = dotSize * (columnIndex + 1);
      const height = dotSize * (rowIndex + 1);

      if (pixel.a === 255) {
        css += `${width}px ${height}px rgb(${pixel.r} ${pixel.g} ${pixel.b})`;
      } else if (pixel.a === 0) {
        css += `${width}px ${height}px rgb(0 0 0 / 0)`;
      } else {
        css += `${width}px ${height}px rgb(${pixel.r} ${pixel.g} ${pixel.b} / ${(pixel.a / 255).toFixed(2)})`;
      }

      if (rowIndex === pixels.length - 1 && columnIndex === row.length - 1) {
        css += ";";
      } else {
        css += ", ";
      }
    });
  });

  const cssBoxShadow = css;

  return cssBoxShadow;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("convertPixelsToCSSBoxShadow", () => {
    test("CSSのbox-shadowの文字列に変換", () => {
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
      const dotSize = 4;
      const cssBoxShadow = convertPixelsToCSSBoxShadow(pixels, dotSize);
      expect(cssBoxShadow).toBe(
        "width: 4px; height: 4px; background-color: transparent; margin-top: -4px; margin-left: -4px; margin-bottom: 8px; margin-right: 8px; box-shadow: 4px 4px rgb(100 100 100), 8px 4px rgb(0 0 0 / 0), 4px 8px rgb(255 255 255 / 0.98), 8px 8px rgb(255 255 255 / 0.02);",
      );
    });
  });
}
