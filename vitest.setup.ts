import { beforeEach, vi } from "vitest";

beforeEach(() => {
  global.ImageData = vi
    .fn()
    .mockImplementation(
      (data: Uint8ClampedArray, width: number, height: number) => {
        return { data, width, height };
      },
    );
});
