import React, { useState } from "react";
import styled from "@emotion/styled";

import Modal from "./modal";
import Link from "./link";
import Icon from "./icon";

const BibTeXPre = styled.pre`
  display: block;
  margin: 0 0 var(--element-spacing) 0;

  padding: var(--element-spacing);

  white-space: pre;
  overflow-x: auto;

  color: black;
  font-family: monospace;

  background-color: white;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const BibtexModal = ({ bibText, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(bibText);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Modal title="BibTeX" onClose={onClose}>
      <BibTeXPre>{bibText}</BibTeXPre>
      <Link onClick={handleCopyClick} variant="secondary">
        {copied ? (
          <>
            Copied
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
      </Link>
    </Modal>
  );
};

export default BibtexModal;
