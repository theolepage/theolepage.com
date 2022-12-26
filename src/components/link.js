import React from "react"

import { Link as GatsbyLink } from "gatsby"

import { css } from "@emotion/react"

const style = css`
    color: rgb(0, 0, 0);

    &:hover {
        text-decoration: none;
    }
`

const Link = ({to, className, invisible, children, ...props}) => {
    if (to.charAt(0) !== '/' || to.slice(-4).includes('.'))
        return <a css={invisible && style} className={className} href={to} target="_blank" rel="nofollow noopener noreferrer">{children}</a>
    return <GatsbyLink css={invisible && style} className={className} to={to} {...props}>{children}</GatsbyLink>
}

export default Link