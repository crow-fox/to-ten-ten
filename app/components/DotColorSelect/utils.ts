export const dotColors = {
  full: "フルカラー",
  monokuro: "モノクロ",
} as const;

export type DotColor = keyof typeof dotColors;

export function isDotColor(color: string): color is DotColor {
  return color in dotColors;
}
