import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import Link from "./link"

const BlockElement = styled.div`
    position: relative;

    margin-bottom: 15px;
    padding: 18px 22px;

    background: #fff;
    border-radius: 6px;
    border: 1px solid rgb(235, 235, 235);

    overflow: hidden;
`

const BlockElement_hover = css`
    transition: 0.2s box-shadow, 0.3s transform;

    &:hover {
        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.02), 0px 1px 3px rgba(47, 55, 71, 0.1);
        transform: translateY(-2px);
    }
`

const Corner = styled.div`
    position: absolute;
    top: -28px;
    left: -28px;

    width: 48px;
    height: 48px;

    border-radius: 100%;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    @media (max-width: 800px) {
        flex-direction: column-reverse;
    }
`

const Title = styled.div`
    color: rgb(0, 0, 0);
`

const Info = styled.div`
    min-width: 220px;

    margin-left: 20px;

    text-align: right;
    font-size: 12px;
    color: rgb(100, 100, 100);

    ${(props) =>
        props.wide && css`
            min-width: 320px;
    `}

    @media (max-width: 800px) {
        margin-left: 0;
        margin-bottom: 6px;

        text-align: left;
    }
`

const Description = styled.div`
    max-width: 600px;

    margin-top: 6px;
    margin-bottom: 2px;

    color: rgb(80, 80, 80);
    font-size: 14px;
`

const Actions = styled.div`
    margin-top: 10px;
    
    font-size: 14px;
`

const Action = styled.div`
    display: inline-block;
`

const ActionLink = styled(Link)`
    
`

const ActionSeparator = styled.div`
    display: inline-block;

    margin-left: 5px;
    margin-right: 5px;

    color: rgba(55, 125, 255, 0.6);
`

const Block = ({ title, info, wide_info, description, url, actions, corner, children }) => {
    const body = (
        <BlockElement css={url && BlockElement_hover}>
            {corner && <Corner style={{ background: corner }} />}

            <Header>
                <Title>{title}</Title>
                {info && <Info wide={wide_info}>{info}</Info>}
            </Header>

            {description && <Description dangerouslySetInnerHTML={{ __html: description }} />}

            {actions &&
                <Actions>
                    {actions.map((action, i) =>
                        <Action>
                            <ActionLink
                                key={action.name}
                                to={action.url}>
                                {action.name}
                            </ActionLink>
                            {i !== actions.length - 1 && <ActionSeparator>/</ActionSeparator>}
                        </Action>
                    )}
                </Actions>
            }

            {children}
        </BlockElement>
    )

    if (url)
        return <Link invisible to={url}>{body}</Link>
    return body
}

export default Block