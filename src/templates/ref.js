import React, { useState } from "react";
import { graphql } from "gatsby";
import { navigate } from "gatsby";
import styled from "@emotion/styled";

import Page from "../components/page";
import Button from "../components/button";
import Icon from "../components/icon";
import { generateBibTeX } from "../utils/bibtex";

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: var(--background-secondary);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 1000px;

  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const BibTeXPre = styled.pre`
  display: block;
  max-width: 1000px;

  padding: var(--element-spacing);

  white-space: pre;
  overflow-x: auto;

  color: black;
  font-family: monospace;

  background-color: white;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const RefPage = ({ data, pageContext }) => {
  const { filename } = pageContext;
  const [copied, setCopied] = useState(false);

  const publication = data.allMarkdownRemark.nodes.find(
          (node) =>
            node.fileAbsolutePath.split("/").pop().replace(".md", "") === filename
        );

  if (!publication) {
    navigate("/404");
    return null;
  }

  const { frontmatter } = publication;

  const siteUrl = data.site.siteMetadata.siteUrl;

  const bibText = generateBibTeX({ frontmatter, filename, siteUrl });

  const handleCopyClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(bibText);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Page title={`${frontmatter.title} (BibTeX)`} layout={false}>
      <Background />
      <Content>
        <BibTeXPre>{bibText}</BibTeXPre>
        <Button onClick={handleCopyClick}>
          {copied ? (
            <>
              Copied{" "}
              <Icon
                name="check"
                color="#39bd3f"
                width={18}
                height={18}
                strokeWidth={2.75}
              />
            </>
          ) : (
            <>
              Copy to clipboard <Icon name="copy" />
            </>
          )}
        </Button>
      </Content>
    </Page>
  );
};

export default RefPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
    ) {
      nodes {
        frontmatter {
          key
          title
          authors
          source
          year
          month
          type
          bib_entries
          resources {
            name
            url
          }
        }
        fileAbsolutePath
      }
    }
  }
`;
