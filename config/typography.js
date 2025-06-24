import Typography from "typography";

import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/questrial";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.6,
  scaleRatio: 1.7,
  headerFontFamily: ["Questrial", "sans-serif"],
  headerWeight: "normal",
  bodyFontFamily: ["Open Sans", "sans-serif"],
  bodyColor: "var(--color-default)",
  headerColor: "var(--color-title)",
  googleFonts: [
    {
      name: "Open Sans",
      styles: ["400", "600"],
    },
    {
      name: "Questrial",
      styles: ["400"],
    },
  ],
  overrideStyles: () => {
    return {
      p: {
        textAlign: "justify",
      },
      a: {
        color: "var(--color-accent)",
        textDecoration: "none",
      },
      "a:hover": {
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      },
    };
  },
});

export const { scale, rhythm, options } = typography;
export default typography;
