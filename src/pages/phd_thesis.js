import React from "react";

import styled from "@emotion/styled";

import Page from "../components/page";
import Section from "../components/section";
import Button from "../components/button";
import Icon from "../components/icon";
import Link from "../components/link";


const THESIS_URL = "https://theses.hal.science/tel-05558165v1/file/159344_LEPAGE_2026_archivage.pdf";
const SLIDES_URL = "/uploads/phd_defense_presentation_theo_lepage_2026.pdf";
const CODE_URL = "https://github.com/theolepage/sslsv";
const REF_URL = "/ref/thesis/";


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
    marginRight: 8,
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


const PhdThesisPage = () => {
  return (
    <Page title="Self-Supervised Learning for Speaker Recognition (Ph.D. Thesis)">
      <Section>
        <Title>Self-Supervised Learning for Speaker Recognition (Ph.D. Thesis)</Title>

        <Description>
          Ph.D. thesis defense held on February 13, 2026, at EPITA Paris, for the doctoral degree from Sorbonne University
        </Description>
        
        <Description>
          Committee: Jean-François Bonastre <i>(AMIAD)</i>, Benjamin Lecouteux <i>(LIG)</i>, Driss Matrouf <i>(LIA)</i>, Irina Illina <i>(LORIA/Inria)</i>, Anthony Larcher <i>(LIUM)</i>, and Douglas Reynolds <i>(MIT LL)</i> • Advisors: Réda DEHAK <i>(LRE)</i> and Thierry Géraud <i>(LRE)</i>
        </Description>
        
        <Subtitle>Abstract</Subtitle>
        <p>
          Advances in Artificial Intelligence, driven by developments in Deep Learning, have led to tremendous progress in Speech Processing. In the context of Speaker Recognition (SR), the training objective is to associate an audio sample with the corresponding speaker identity. However, the performance of such supervised systems is highly dependent on the amount of labeled data available.

          This inherent reliance on human supervision is a major limitation since annotations are expensive and time-consuming to obtain, prone to bias, and often limited in scope, all of which can hinder scalability and generalization. This poses a particular challenge in speech domains, where collecting labeled audio across all languages (with over 7,000 dialects spoken worldwide), speaker profiles (e.g., age, gender), and conditions (e.g., recording device, environmental noise) is not feasible.

          Self-Supervised Learning (SSL) has recently emerged as a promising approach for learning relevant representations without human annotations, drawing inspiration from how humans learn through patterns and context rather than explicit labels. While SSL has proven effective across many downstream tasks, several applications remain underexplored. This thesis contributes to this fast-evolving paradigm for SR, toward greater generalization and reduced reliance on labeled data.
        </p>

        <Subtitle>Resources</Subtitle>
        <Actions>
          <Button to={THESIS_URL} external>
            <Icon name="book" />
            Thesis Document
          </Button>
          <ActionSeparator />
          <Button to={SLIDES_URL} external>
            <Icon name="talks" />
            Defense Slides
          </Button>
          <ActionSeparator />
          <Button to={CODE_URL} external>
            <Icon name="projects" />
            Toolkit (sslsv)
          </Button>
          <ActionSeparator />
          <Button to={REF_URL} external>
            <Icon name="share" />
            Ref (BibTeX)
          </Button>
        </Actions>

        <Subtitle>Video</Subtitle>
        <VideoContainer>
          <iframe
            src="https://www.youtube.com/embed/PIApBAIWPrg?si=V_aOgARePdCaHMQb"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </VideoContainer>

        <Subtitle>Contributions</Subtitle>
        <Contribution>
          <h3><Tag variant="green">SSLSV</Tag> Application and Study of SSL for SV</h3>
          <p>
            Benchmark and study SSL frameworks (e.g., SimCLR, MoCo, DINO) on SV under controlled conditions<br />
            → Identify the role and limitations of positive sampling in modeling intra-speaker variability
          </p>
          <p><IconInline name="publication" /> Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning <Link to="https://www.isca-archive.org/interspeech_2022/lepage22_interspeech.pdf" external>(PDF)</Link></p>
          <p><IconInline name="publication" /> Self-Supervised Learning for Speaker Recognition: A study and review <Link to="https://arxiv.org/pdf/2602.10829" external>(PDF)</Link></p>
        </Contribution>

        <Contribution>
          <h3><Tag variant="red">Margins</Tag> Margins in Self-Supervised Contrastive Frameworks</h3>
          <p>
            Integrate CosFace, ArcFace, AdaFace, and other margin-based constraints into SimCLR and MoCo<br />
            → Improve speaker separability in fully self-supervised settings
          </p>
          <p><IconInline name="publication" /> Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification <Link to="https://www.isca-archive.org/interspeech_2023/lepage23_interspeech.pdf" external>(PDF)</Link></p>
          <p><IconInline name="publication" /> Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations <Link to="https://www.isca-archive.org/odyssey_2024/lepage24_odyssey.pdf" external>(PDF)</Link></p>
        </Contribution>

        <Contribution>
          <h3><Tag variant="blue">SSPS</Tag> Self-Supervised Positive Sampling (SSPS) from Latent Space</h3>
          <p>
            Exploit latent-space proximity to sample cross-recording pseudo-positives<br />
            → Reduce intra-speaker variability and improve SV performance across frameworks (-58% EER for SimCLR)
          </p>
          <p><IconInline name="publication" /> Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling <Link to="https://arxiv.org/pdf/2501.17772" external>(PDF)</Link></p>
          <p><IconInline name="publication" /> SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification <Link to="https://www.isca-archive.org/interspeech_2025/lepage25_interspeech.pdf" external>(PDF)</Link></p>
        </Contribution>
        
        <Contribution>
          <h3><Tag variant="yellow">Foundation</Tag> Speech Foundation Models for SV without Labels</h3>
          <p>
            Develop an iterative pseudo-labeling approach to enable WavLM fine-tuning from a DINO-based model<br />
            → 1.06% EER on VoxCeleb1-O, setting a new SOTA and approaching supervised performance
          </p>
          <p><IconInline name="publication" /> Towards Supervised Performance on Speaker Verification with SSL by Leveraging Large-Scale ASR Models <Link to="https://www.isca-archive.org/interspeech_2024/miara24_interspeech.pdf" external>(PDF)</Link></p>
        </Contribution>

        <Contribution>
          <h3>sslsv: Open-Source PyTorch Toolkit for Self-Supervised SV</h3>
          <p>
            Release a PyTorch toolkit to support reproducibility and future research in the field<br />
            → <Link to="https://github.com/theolepage/sslsv">https://github.com/theolepage/sslsv</Link>
          </p>
        </Contribution>
      </Section>
    </Page>
  );
};

export default PhdThesisPage;