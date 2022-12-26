import React from "react"
import { css } from "@emotion/react"

import Link from "../components/link"

const button = css`
    display: inline-block;

    padding: 12px 16px;

    color: rgb(60, 60, 60);

    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.03), 0px 1px 2px rgba(47, 55, 71, 0.1);

    border: 1px solid rgb(245, 245, 245);

    transition: 0.3s color, 0.2s background, 0.2s box-shadow, 0.4s transform;

    &:hover {
        color: rgb(0, 0, 0);
        
        background: rgb(245, 245, 245);
        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.06), 0px 1px 2px rgba(47, 55, 71, 0.1);
    }

    &:active {
        transform: scaleX(0.97) scaleY(0.94);
    }
`

const Button = ({children, ...props}) => {
    return <Link invisible css={button} {...props}>{children}</Link>
}

export default Button