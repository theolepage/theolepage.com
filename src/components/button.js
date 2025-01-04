import React from "react"
import { css } from "@emotion/react"

import Link from "../components/link"

const button = css`
    display: inline-block;

    padding: 12px 16px;

    color: rgb(60, 60, 60);

    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.01), 0px 1px 3px rgba(47, 55, 71, 0.05);

    border: 1px solid rgb(235, 235, 235);

    transition: 0.3s color, 0.2s background, 0.2s box-shadow, 0.3s transform;

    &:hover {
        color: rgb(0, 0, 0);
        
        background: rgb(248, 248, 248);
        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.02), 0px 1px 3px rgba(47, 55, 71, 0.1);
        // transform: translateY(-2px);
    }

    &:active {
        transform: scaleX(0.97) scaleY(0.95);
    }
`

const Button = ({children, ...props}) => {
    return <Link invisible css={button} {...props}>{children}</Link>
}

export default Button