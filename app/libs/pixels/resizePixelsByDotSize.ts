import { Pixel2D } from "~/libs/pixels/type";

export function resizePixelsByDotSize(
  pixels: Pixel2D,
  dotSize: number,
): Pixel2D {
  const height = pixels.length;
  const width = pixels[0].length;

  if (height % dotSize === 0 && width % dotSize === 0) {
    return pixels;
  }

  const addHeight = dotSize - (height % dotSize);
  const addTopHeight =
    addHeight % 2 === 0 ? addHeight / 2 : Math.ceil(addHeight / 2);
  const addBottomHeight =
    addHeight % 2 === 0 ? addHeight / 2 : Math.floor(addHeight / 2);

  const addWidth = dotSize - (width % dotSize);
  const addLeftWidth =
    addWidth % 2 === 0 ? addWidth / 2 : Math.ceil(addWidth / 2);
  const addRightWidth =
    addWidth % 2 === 0 ? addWidth / 2 : Math.floor(addWidth / 2);

  if (height % dotSize !== 0 && width % dotSize === 0) {
    return [
      ...new Array(addTopHeight).fill(
        new Array(width).fill({ r: 0, g: 0, b: 0, a: 0 }),
      ),
      ...pixels,
      ...new Array(addBottomHeight).fill(
        new Array(width).fill({ r: 0, g: 0, b: 0, a: 0 }),
      ),
    ];
  }

  if (height % dotSize === 0 && width % dotSize !== 0) {
    return pixels.map((row) => [
      ...new Array(addLeftWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
      ...row,
      ...new Array(addRightWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
    ]);
  }

  return [
    ...new Array(addTopHeight).fill(
      new Array(width + addWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
    ),
    ...pixels.map((row) => [
      ...new Array(addLeftWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
      ...row,
      ...new Array(addRightWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
    ]),
    ...new Array(addBottomHeight).fill(
      new Array(width + addWidth).fill({ r: 0, g: 0, b: 0, a: 0 }),
    ),
  ];
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("resizePixelsByDotSize", () => {
    test("両辺がdotSizeで割り切れる場合はそのままの値を返す", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 2)).toEqual(pixels);
    });

    test("高さのみがdotSizeで割り切れない場合は上下に余白を追加する", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 3)).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
      ]);
    });

    test("高さのみがdotSizeで割り切れない場合は上下に余白を追加する（追加するべき余白が奇数の場合は上方向に+1）", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 3)).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ]);
    });

    test("幅のみがdotSizeで割り切れない場合は左右に余白を追加する", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 4)).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
      ]);
    });

    test("幅のみがdotSizeで割り切れない場合は左右に余白を追加する（追加するべき余白が奇数の場合は左方向に+1）", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 3)).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ]);
    });

    test("高さと幅がdotSizeで割り切れない場合は上下左右に余白を追加する", () => {
      const pixels = [
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
      ];

      expect(resizePixelsByDotSize(pixels, 3)).toEqual([
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 255 },
          { r: 0, g: 0, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 0, g: 0, b: 0, a: 0 },
        ],
      ]);
    });
  });
}
