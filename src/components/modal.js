import React, { useEffect } from "react";
import styled from "@emotion/styled";

import Icon from "./icon";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--element-spacing);

  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;

  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;

  padding: calc(var(--element-spacing) * 1.5);

  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-hover);
`;

const CloseButton = styled.button`
  position: absolute;
  top: calc(var(--element-spacing) + 4px);
  right: var(--element-spacing);

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  background: none;
  padding: 4px;
  cursor: pointer;

  color: var(--color-muted-2);

  transition: color var(--transition-duration);

  &:hover {
    color: var(--color-title);
  }
`;

const Title = styled.h2`
  margin: 0 0 var(--element-spacing) 0;

  padding-right: 24px;
`;

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">
          <Icon name="close" width={18} height={18} />
        </CloseButton>
        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </Overlay>
  );
};

export default Modal;
