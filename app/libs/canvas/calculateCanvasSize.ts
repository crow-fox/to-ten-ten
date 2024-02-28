export function calculateCanvasSize(
  imgWidth: number,
  imgHeight: number,
  canvasMaxSize: number,
): Readonly<[width: number, height: number]> {
  if (imgWidth <= canvasMaxSize && imgHeight <= canvasMaxSize) {
    return [imgWidth, imgHeight];
  }

  if (imgWidth > imgHeight) {
    return [canvasMaxSize, Math.round((canvasMaxSize * imgHeight) / imgWidth)];
  }

  if (imgWidth < imgHeight) {
    return [Math.round((canvasMaxSize * imgWidth) / imgHeight), canvasMaxSize];
  }

  return [canvasMaxSize, canvasMaxSize];
}

if (import.meta.vitest) {
  const { test, expect, describe } = import.meta.vitest;

  describe("calculateCanvasSize", () => {
    const canvasMaxSize = 1024;
    test("両方の辺がcanvasMaxSize以下の場合はそのままのサイズを返す", () => {
      const result = calculateCanvasSize(100, 200, canvasMaxSize);
      expect(result).toEqual([100, 200]);
    });
    test("横幅がcanvasMaxSizeを超える場合は横幅をcanvasMaxSizeに合わせて、縦横比を維持しながら縦幅を変更する", () => {
      const result = calculateCanvasSize(2000, 1000, canvasMaxSize);
      expect(result).toEqual([1024, 512]);
    });
    test("縦幅がcanvasMaxSizeを超える場合は縦幅をcanvasMaxSizeに合わせて、縦横比を維持しながら横幅を変更する", () => {
      const result = calculateCanvasSize(1000, 2000, canvasMaxSize);
      expect(result).toEqual([512, 1024]);
    });
    test("縦横比が1:1かつ両方の辺がcanvasMaxSizeより大きい場合は、両方の辺をcanvasMaxSizeに変更する", () => {
      const result = calculateCanvasSize(2000, 2000, canvasMaxSize);
      expect(result).toEqual([1024, 1024]);
    });
    test("リサイズ後のサイズが小数点になる場合は小数点以下を四捨五入する", () => {
      const result = calculateCanvasSize(2000, 1001, canvasMaxSize);
      expect(result).toEqual([1024, Math.round((1024 * 1001) / 2000)]);

      const result2 = calculateCanvasSize(1001, 2000, canvasMaxSize);
      expect(result2).toEqual([Math.round((1001 * 1024) / 2000), 1024]);
    });
  });
}
