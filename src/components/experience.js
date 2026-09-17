import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Icon from "./icon";
import Link from "./link";
import ResourceCards from "./resourceCards";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--element-spacing) * 1.5);
`;

const Item = styled.div`
  display: flex;
  gap: var(--element-spacing);
`;

const Logo = styled.img`
  flex-shrink: 0;

  width: 46px;
  height: 46px;

  object-fit: contain;
  border-radius: 4px;
`;

const Content = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 4px var(--element-spacing);
`;

const Title = styled.div`
  color: var(--color-title);
`;

const Meta = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 14px;

  font-size: var(--size-small);
  color: var(--color-muted-2);
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Details = styled.div`
  margin-top: 6px;

  font-size: var(--size-small);
  color: var(--color-muted-1);

  p {
    margin: 0;
  }
`;

const Experience = ({ data }) => {
  const experiences = data.nodes;

  return (
    <Section title="Experience" icon="experience">
      <List>
        {experiences.map((item) => {
          const { title, company, companyUrl, location, date, image, internship, resources } =
            item.frontmatter;

          return (
            <Item key={item.id}>
              {image && <Logo src={image} alt={`${company} logo`} />}

              <Content>
                <Header>
                  <Title>
                    <b>{title}</b>
                    {internship && " (Internship)"} at{" "}
                    <b>
                      <Link to={companyUrl} external>
                        {company}
                      </Link>
                    </b>
                  </Title>
                  <Meta>
                    <MetaItem>
                      <Icon name="location" width={12} height={12} />
                      {location}
                    </MetaItem>
                    <MetaItem>
                      <Icon name="calendar" width={12} height={12} />
                      {date}
                    </MetaItem>
                  </Meta>
                </Header>

                <Details dangerouslySetInnerHTML={{ __html: item.html }} />

                <ResourceCards resources={resources} />
              </Content>
            </Item>
          );
        })}
      </List>
    </Section>
  );
};

export default Experience;
