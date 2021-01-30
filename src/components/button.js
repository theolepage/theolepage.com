import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const button = css`
    display: inline-block;

    margin: 16px 22px 0 0;
    padding: 12px 16px;

    font-size: 14px;
    color: rgb(60, 60, 60);

    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.03), 0px 1px 2px rgba(47, 55, 71, 0.1);

    border: 1px solid rgb(245, 245, 245);

    transition: 0.2s background, 0.2s box-shadow, 0.4s transform;

    &:hover {
        text-decoration: none;

        background: rgb(245, 245, 245);
        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.06), 0px 1px 2px rgba(47, 55, 71, 0.1);
    }

    &:active {
        transform: scaleX(0.97) scaleY(0.94);
    }
`

export default ({to, external, children}) => {
    if (external)
        return <Link css={button} to={to} target="_blank" rel="nofollow noopener noreferrer">{children}</Link>
    return <Link css={button} to={to}>{children}</Link>
}