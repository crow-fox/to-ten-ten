export const dotSizes = [4, 8, 16, 32, 64, 128] as const;

export type DotSize = (typeof dotSizes)[number];

export function isDotSize(size: number): size is DotSize {
  return dotSizes.includes(size as unknown as DotSize);
}
