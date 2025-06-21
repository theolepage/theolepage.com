import Typography from "typography"

import "@fontsource/open-sans"
import "@fontsource/open-sans/600.css"
import "@fontsource/questrial"

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.6,
    scaleRatio: 1.7,
    headerFontFamily: ['Questrial', 'sans-serif'],
    headerWeight: 'normal',
    bodyFontFamily: ['Open Sans', 'sans-serif'],
    bodyColor: 'rgb(60, 60, 60)',
    headerColor: 'rgb(0, 0, 0)',
    googleFonts: [
        {
            name: 'Open Sans',
            styles: ['400', '600'],
        },
        {
            name: 'Questrial',
            styles: ['400'],
        },
    ],
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
        return {
            'p': {
                textAlign: 'justify'
            },
            'a': {
                color: '#377dff',
                textDecoration: 'none',
            },
            'a:hover': {
                textDecoration: 'underline',
            }
        }
    },
})

export const { scale, rhythm, options } = typography
export default typography