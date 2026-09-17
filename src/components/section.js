import React from "react";
import styled from "@emotion/styled";

import Icon from "./icon";

const SectionElement = styled.div`
  margin-bottom: var(--section-spacing);
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Section = ({ title, icon, children }) => {
  return (
    <SectionElement>
      {title && (
        <SectionTitle>
          {icon && <Icon name={icon} width={22} height={22} />}
          {title}
        </SectionTitle>
      )}
      {children}
    </SectionElement>
  );
};

export default Section;
