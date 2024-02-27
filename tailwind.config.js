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
    fontSize: {
      "3xs": ["calc(1rem * 8 / 12)", "0.75rem"],
      "2xs": ["calc(1rem * 8 / 11)", "0.75rem"],
      xs: ["calc(1rem * 8 / 10)", "1rem"],
      sm: ["calc(1rem * 8 / 9)", "1.25rem"],
      md: ["1rem", "1.5rem"],
      lg: ["calc(1rem * 8 / 7)", "1.5rem"],
      xl: ["calc(1rem * 8 / 6)", "1.75rem"],
      "2xl": ["calc(1rem * 8 / 5)", "2rem"],
      "3xl": ["calc(1rem * 8 / 4)", "2.5rem"],
      "4xl": ["calc(1rem * 8 / 3)", "3.25rem"],
    },
    colors: {
      primary: {
        accent: "#993CD2",
        background: "#FDFDFD",
        text: "#373439",
        border: "#8E8994",
      },
      secondary: {
        accent: "#C33CD2",
        background: "#F2F2F2",
        text: "#67616B",
        border: "#CCC9CF",
      },
      tertiary: {
        background: "#F2EFF6",
      },
      invert: {
        text: "#FDFDFD",
        background: "#373439",
      },
    },
  },
  plugins: [],
};
