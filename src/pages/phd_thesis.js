import React, { useState } from "react";

import styled from "@emotion/styled";
import { useStaticQuery, graphql, navigate } from "gatsby";

import Page from "../components/page";
import Section from "../components/section";
import Button from "../components/button";
import Icon from "../components/icon";
import Link from "../components/link";
import BibtexModal from "../components/bibtexModal";
import { generateBibTeX } from "../utils/bibtex";


const Title = styled.h1`
`;

const Description = styled.p`
  margin-bottom: 1.0rem;

  color: var(--color-muted-1);
`;

const Subtitle = styled.h2`
  margin-top: 3.6rem;
  margin-bottom: 1.0rem;
`;

const IconInline = styled(Icon)`
  vertical-align: -2px;
  margin-right: 2px;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--element-spacing) * 1.5);

  margin-top: 24px;

  padding: 32px;

  text-align: center;

  border: 1px solid var(--border-color);
  background: var(--background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: calc(var(--element-spacing) * 1.5);
  }
`;

const ActionSeparator = styled.div`
  width: 2px;
  height: 24px;
  background-color: var(--border-color);
  transform: rotate(20deg);

  @media (max-width: 1000px) {
    display: none;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  margin-top: 24px;

  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    transform: scale(1.005);
  }
`

const Contribution = styled.div`
  margin-top: 32px;

  &:not(:last-child) {
    margin-bottom: 48px;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 8px;
    text-align: left;
  }
`

const TAG_VARIANTS = {
  green:  { fg: "#6aa84f", bg: "#6aa84f26" },
  red:    { fg: "#e55d5d", bg: "#e55d5d26" },
  blue:   { fg: "#4285f4", bg: "#4285f426" },
  yellow: { fg: "#e6bd4c", bg: "#e6bd4c26" },
};

const Tag = styled.div(({ variant = "green" }) => {
  const v = TAG_VARIANTS[variant] ?? TAG_VARIANTS.green;

  return {
    display: "inline-block",
    // marginLeft: 8,
    marginRight: 12,
    verticalAlign: 1,
    padding: "5px 8px",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    border: `3px solid ${v.fg}`,
    borderRadius: 6,
    color: v.fg,
    background: v.bg,
    lineHeight: 1,


    "@media (max-width: 1000px)": {
      display: "block",
      width: "fit-content",
      marginRight: 0,
      marginBottom: 10,
    },
  };
});

// Same comma/"and" list formatting as PublicationAuthors in publication.js,
// with an italicized affiliation appended to each name instead of bolding.
const formatPeopleList = (people) => {
  const formatted = people.map((p) => `${p.name} <i>(${p.affiliation})</i>`);

  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return formatted.join(" and ");

  const allButLast = formatted.slice(0, -1);
  const last = formatted[formatted.length - 1];
  return allButLast.join(", ") + ", and " + last;
};

const PhdThesisPage = () => {
  const [showBibtex, setShowBibtex] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      thesisContent: markdownRemark(fileAbsolutePath: { regex: "/content/phd_thesis.md/" }) {
        html
        frontmatter {
          enabled
          title
          defenseInfo
          committee {
            name
            affiliation
          }
          advisors {
            name
            affiliation
          }
          thesisUrl
          slidesUrl
          codeUrl
          videoUrl
          contributions {
            tag
            tagVariant
            title
            description
            result
            resultUrl
            publications {
              title
              url
            }
          }
        }
      }
      thesisPublication: markdownRemark(fileAbsolutePath: { regex: "/content/publications/thesis.md/" }) {
        fileAbsolutePath
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
      }
    }
  `);

  const thesis = data.thesisContent.frontmatter;

  if (!thesis.enabled) {
    navigate("/404");
    return null;
  }

  const publication = data.thesisPublication;
  const filename = publication.fileAbsolutePath.split("/").pop().replace(".md", "");
  const bibText = generateBibTeX({
    frontmatter: publication.frontmatter,
    filename,
    siteUrl: data.site.siteMetadata.siteUrl,
  });

  return (
    <Page title={thesis.title}>
      <Section>
        <Title>{thesis.title}</Title>

        <Description>
          {thesis.defenseInfo}
        </Description>

        <Description
          dangerouslySetInnerHTML={{
            __html: `Committee: ${formatPeopleList(thesis.committee)} • Advisors: ${formatPeopleList(thesis.advisors)}`,
          }}
        />

        <Subtitle>Abstract</Subtitle>
        <div dangerouslySetInnerHTML={{ __html: data.thesisContent.html }} />

        <Subtitle>Resources</Subtitle>
        <Actions>
          <Button to={thesis.thesisUrl} external>
            <Icon name="book" />
            Thesis Document
          </Button>
          <ActionSeparator />
          <Button to={thesis.slidesUrl} external>
            <Icon name="talks" />
            Defense Slides
          </Button>
          <ActionSeparator />
          <Button to={thesis.codeUrl} external>
            <Icon name="projects" />
            Toolkit (sslsv)
          </Button>
          <ActionSeparator />
          <Button onClick={() => setShowBibtex(true)}>
            <Icon name="share" />
            Ref (BibTeX)
          </Button>
        </Actions>

        <Subtitle>Video</Subtitle>
        <VideoContainer>
          <iframe
            src={thesis.videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </VideoContainer>

        <Subtitle>Contributions</Subtitle>
        {thesis.contributions.map((contribution) => (
          <Contribution key={contribution.title}>
            <h3>
              {contribution.tag && (
                <Tag variant={contribution.tagVariant}>{contribution.tag}</Tag>
              )}
              {contribution.title}
            </h3>
            <p>
              {contribution.description}<br />
              {contribution.result && `→ ${contribution.result}`}
              {contribution.resultUrl && (
                <>→ <Link to={contribution.resultUrl}>{contribution.resultUrl}</Link></>
              )}
            </p>
            {contribution.publications?.map((pub) => (
              <p key={pub.url}>
                <IconInline name="publication" /> {pub.title}{" "}
                <Link to={pub.url} external>(PDF)</Link>
              </p>
            ))}
          </Contribution>
        ))}
      </Section>

      {showBibtex && (
        <BibtexModal bibText={bibText} onClose={() => setShowBibtex(false)} />
      )}
    </Page>
  );
};

export default PhdThesisPage;
