/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx,html}"],
  theme: {
    extend: {},
    spacing: {
      // 8の倍数のフィボナッチ数列と、0, 4 ,12を登録
      0: "0",
      4: ".25rem",
      8: ".5rem",
      12: ".75rem",
      20: "1.25rem",
      32: "2rem",
      52: "3.25rem",
      84: "5.25rem",
      136: "8.5rem",
      220: "13.75rem",
      356: "22.25rem",
      576: "36rem",
      932: "58.25rem",
      // 特別に追加
      // 長文の一行の最大幅を指定するため
      640: "40rem",
    },
  },
  plugins: [],
};
