import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Icon from "./icon";
import Link from "./link";

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

  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

const Education = ({ data }) => {
  const education = data.nodes;

  return (
    <Section title="Education">
      <List>
        {education.map((item) => {
          const { institution, institutionUrl, image, degree, location, date, grade } =
            item.frontmatter;

          return (
            <Item key={item.id}>
              {image && <Logo src={image} alt={`${institution} logo`} />}

              <Content>
                <Header>
                  <Title>
                    <Link to={institutionUrl} external>
                      <b>{institution}</b>
                    </Link>{" "}
                    ({degree})
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
                    {grade && (
                      <MetaItem>
                        <Icon name="award" width={12} height={12} />
                        {grade}
                      </MetaItem>
                    )}
                  </Meta>
                </Header>

                <Details dangerouslySetInnerHTML={{ __html: item.html }} />
              </Content>
            </Item>
          );
        })}
      </List>
    </Section>
  );
};

export default Education;
