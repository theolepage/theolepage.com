import Typography from "typography"

import "fontsource-questrial"

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Questrial', 'sans-serif'],
    headerWeight: 'normal',
    bodyFontFamily: ['Open Sans', 'sans-serif'],
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
        const linkColor = "#236cc4"
        return {
            a: {
                color: linkColor,
                textDecoration: "none",
                textShadow:
                    ".03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff", // eslint-disable-line
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
            },
            "a:hover,a:active": {
                textShadow: "none",
                backgroundImage: "none",
            },
            "h1,h2,h3,h4,h5,h6": {
                marginTop: rhythm(2),
                marginBottom: rhythm(0.5),
            },
            p: {
                textAlign: 'justify'
            }
        }
    },
})

export const { scale, rhythm, options } = typography
export default typography