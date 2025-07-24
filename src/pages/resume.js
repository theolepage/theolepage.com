import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

import Page from "../components/page";

// Global styles
const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  .resume img {
    margin-bottom: 0;
  }
`;

// General Components
const ResumeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10mm;
  gap: 10mm;
  font-family: "Open Sans", sans-serif;

  @media (max-width: 220mm) {
    justify-content: flex-start;
    padding: 0;
  }

  @media print {
    display: block;
    padding: 0;
  }
`;

const ResumePage = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 210mm;
  height: 296mm;
  padding: 14mm 12mm;
  font-size: 12px;
  line-height: 1.45;
  background: #fff;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.07);

  @media print {
    box-shadow: none;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-family: "Questrial";
  font-size: 18px;
`;

const Item = styled.div`
  margin-top: 16px;
`;

const Subtitle = styled.div`
  font-size: 13px;
`;

const SubSubtitle = styled.div`
  font-size: 10px;
  font-weight: 600;
`;

const Text = styled.div`
  margin-top: 2px;
  text-align: justify;
  font-family: "Open Sans", sans-serif;
  font-size: 11px;

  ul {
    margin-top: 4px;
    margin-left: 12px;
    margin-bottom: 0;
  }

  li {
    margin: 1px 0;
  }
`;

const Emphasize = styled.span`
  font-weight: 600;
`;

const Icon = styled.img`
  display: inline-block;
  vertical-align: baseline;
  width: 10px;
  margin-right: 4px;
`;

const Label = styled.div`
  display: inline-block;
  margin: 0 4px 0 0;
  padding: 3px 4px 4px 4px;
  font-size: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const FloatingItem = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;

  ${SubSubtitle} {
    margin-right: 8px;
  }

  /* Add margin to the first FloatingItem to create space after the title */
  &:first-of-type {
    margin-top: 16px;
  }
`;

const Cols = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  width: 310px;
`;

const Footer = styled.div`
  display: none;

  @media print {
    display: block;
  }

  position: absolute;
  bottom: 5mm;
  width: 100%;
  text-align: center;
  color: rgb(100, 100, 100);
  font-size: 9px;
  opacity: 0.8;
`;

// Header Components
const HeaderSection = styled(Section)``;

const Name = styled.div`
  font-family: "Questrial";
  font-size: 30px;
`;

const Description = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4em;
  font-family: "Questrial";
  color: rgba(0, 0, 0, 0.5);
`;

const DescriptionEmphasize = styled.span`
  color: rgba(0, 0, 0, 0.8);
`;

const Contact = styled.div`
  display: flex;
  margin-top: 6px;
`;

const ContactItem = styled.a`
  margin-top: 6px;
  margin-right: 20px;
  font-size: 11px;
  color: #377dff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${Icon} {
    position: relative;
    top: 1px;
  }
`;

// Education Components
const EducationIcons = styled.div`
  display: flex;
  margin-top: 2px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);

  ${Icon} {
    width: 8px;
    margin-right: 4px;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

// Experience Components
const Experience = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const ExperienceContent = styled.div`
  width: 100%;
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExperienceIcons = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);

  ${Icon} {
    width: 8px;
    margin-right: 4px;
  }
`;

const ExperienceImage = styled.div`
  width: 46px;
  margin-left: 20px;
  text-align: center;

  img {
    width: 100%;
  }

  /* Special case for CNRS logo */
  img[alt="CNRS logo"] {
    width: 75%;
  }
`;

// Publication Components
const PublicationSource = styled.div`
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.8);
`;

const PublicationAuthors = styled.div`
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.5);
`;

// Skills Components
const Passion = styled.div`
  display: inline-block;
  margin: 6px 16px 0 0;
  text-align: center;
  font-size: 10px;
`;

const PassionIcon = styled(Icon)`
  position: relative;
  top: 2px;
  width: 13px;
  margin-right: 6px;
`;

const ResumeHeader = () => (
  <HeaderSection>
    <Name>Theo Lepage</Name>
    <Description>
      <DescriptionEmphasize>Ph.D. student</DescriptionEmphasize> in{" "}
      <DescriptionEmphasize>A.I.</DescriptionEmphasize> →{" "}
      <DescriptionEmphasize>Self-Supervised Learning</DescriptionEmphasize> for{" "}
      <DescriptionEmphasize>Speaker Recognition</DescriptionEmphasize>
    </Description>
    <Contact>
      <ContactItem
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://www.google.com/maps/place/Paris/@48.864872,2.2183041,11z/data=!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219"
      >
        <Icon src="/images/resume/icons/icon-map_blue.svg" alt="icon-map" />
        Paris, France
      </ContactItem>
      <ContactItem target="_blank" rel="nofollow noopener noreferrer" href="/">
        <Icon src="/images/resume/icons/icon-website.svg" alt="icon-website" />
        theolepage.com
      </ContactItem>
      <ContactItem
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="mailto:theo@theolepage.com"
      >
        <Icon src="/images/resume/icons/icon-email.svg" alt="icon-email" />
        theo@theolepage.com
      </ContactItem>
      <ContactItem
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://www.linkedin.com/in/theolepage/"
      >
        <Icon
          src="/images/resume/icons/icon-linkedin.svg"
          alt="icon-linkedin"
        />
        Theo Lepage
      </ContactItem>
    </Contact>
  </HeaderSection>
);

const EducationItem = ({ institution, degree, location, date, children }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={institution.url}
        >
          {institution.name}
        </a>
      </Emphasize>
      &nbsp;({degree})
    </Subtitle>
    <EducationIcons>
      <Location>
        <Icon src="/images/resume/icons/icon-map.svg" alt="icon-map" />
        {location}
      </Location>
      <Date>
        <Icon
          src="/images/resume/icons/icon-calendar.svg"
          alt="icon-calendar"
        />
        {date}
      </Date>
    </EducationIcons>
    <Text>
      <ul>{children}</ul>
    </Text>
  </Item>
);

const ExperienceItem = ({
  title,
  company,
  companyUrl,
  location,
  date,
  image,
  children,
}) => (
  <Experience>
    <ExperienceContent>
      <ExperienceHeader>
        <Subtitle>
          <Emphasize>{title}</Emphasize> at{" "}
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={companyUrl}
          >
            {company}
          </a>
        </Subtitle>
        <ExperienceIcons>
          <Location>
            <Icon src="/images/resume/icons/icon-map.svg" alt="icon-map" />
            {location}
          </Location>
          <Date>
            <Icon
              src="/images/resume/icons/icon-calendar.svg"
              alt="icon-calendar"
            />
            {date}
          </Date>
        </ExperienceIcons>
      </ExperienceHeader>
      <Text>
        <ul>{children}</ul>
      </Text>
    </ExperienceContent>
    <ExperienceImage>
      <img src={image} alt={`${company} logo`} />
    </ExperienceImage>
  </Experience>
);

const PublicationItem = ({ title, url, source, authors }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <Icon
          src="/images/resume/icons/icon-publication.svg"
          alt="icon-publication"
        />
        <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
          {title}
        </a>
      </Emphasize>
    </Subtitle>
    <PublicationSource>{source}</PublicationSource>
    <PublicationAuthors dangerouslySetInnerHTML={{ __html: authors }} />
  </Item>
);

const ProjectItem = ({ name, url, description }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <Icon src="/images/resume/icons/icon-project.svg" alt="icon-project" />
        <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
          {name}
        </a>
      </Emphasize>
    </Subtitle>
    <Text>{description}</Text>
  </Item>
);

const SkillsSection = ({ title, items }) => (
  <FloatingItem>
    <SubSubtitle>{title}</SubSubtitle>
    {items.map((item, index) => (
      <Label key={index}>{item}</Label>
    ))}
  </FloatingItem>
);

const PassionItem = ({ icon, text }) => (
  <Passion>
    <PassionIcon src={icon} alt={`icon-${text.toLowerCase()}`} />
    {text}
  </Passion>
);

const ResumePageComponent = () => {
  return (
    <Page title="Resume" layout={false}>
      <Global styles={globalStyles} />
      <ResumeContainer className="resume">
        <ResumePage>
          <ResumeHeader />

          <Section>
            <Title>Education</Title>

            <EducationItem
              institution={{
                name: "Sorbonne Université",
                url: "https://www.sorbonne-universite.fr/en",
              }}
              degree="Ph.D. in Artificial Intelligence"
              location="Paris, France"
              date="Nov. 2022 - Nov. 2025"
            >
              <li>
                Conducting research related to "Learning speech and speaker
                representations for robust speaker and language recognition"
              </li>
              <li>
                Supported by French ANR 'APATE' project (Forensic Deepfakes
                Detection Toolbox)
              </li>
              <li>
                Supervised by Dr. Réda Dehak and Pr. Thierry Géraud (LRE-EPITA)
              </li>
            </EducationItem>

            <EducationItem
              institution={{
                name: "École Pour l'Informatique et les Techniques Avancées - EPITA",
                url: "https://www.epita.fr/en/",
              }}
              degree="M.Eng. in Computer Science"
              location="Paris, France"
              date="Sep. 2017 - Sep. 2022"
            >
              <li>
                Signal processing and machine learning (IMAGE major) +
                scientific research specialization (RDI major)
              </li>
            </EducationItem>
          </Section>

          <Section>
            <Title>Experience</Title>

            <ExperienceItem
              title="Research Scientist Intern"
              company="Siemens Healthineers"
              companyUrl="https://www.siemens-healthineers.com/"
              location="Princeton, USA"
              date="Feb. 2022 - Sep. 2022"
              image="/images/resume/shs.png"
            >
              <li>
                Focused on state-of-the-art deep learning models for MR images
                enhancement (denoising and super-resolution)
              </li>
              <li>
                Designed a CNN architecture that leverages the attention
                mechanism of Vision Transformers and recovers more details
                compared to the solution being used in the product
              </li>
            </ExperienceItem>

            <ExperienceItem
              title="Research Student"
              company="LRE"
              companyUrl="https://www.lre.epita.fr/"
              location="Paris, France"
              date="Jan. 2020 - Jan. 2022"
              image="/images/resume/lre.png"
            >
              <li>
                Worked on self-supervised methods applied to speaker and
                language recognition while doing monthly "lightning" talks about
                my progress (supervised by Dr. Réda Dehak)
              </li>
              <li>
                Developed a label-efficient non-contrastive speaker verification
                model that outperforms its supervised counterpart when
                fine-tuned with only 2% of labeled data
              </li>
              <li>
                Our work led to a publication and an oral presentation at
                Interspeech 2022 (one of the top conferences in the field)
              </li>
            </ExperienceItem>

            <ExperienceItem
              title="Software Developer Intern"
              company="CNRS"
              companyUrl="https://www.cnrs.fr/en"
              location="Paris, France"
              date="Sep. 2020 - Jan. 2021"
              image="/images/resume/cnrs.png"
            >
              <li>
                Contributed to a real-time digital holography software (C++ /
                CUDA) used for retinal blood flow analysis in a medical setting
              </li>
              <li>
                Our work resulted in a 20x (500 to 10,000 FPS) speedup which
                improved substantially output images contrast and quality
              </li>
              <li>
                Our refactoring and the addition of unit tests improved the
                stability and allowed the project to become open source
              </li>
              <li>
                Founding member of the association 'Digital Holography' created
                to sustain the development of the software
              </li>
            </ExperienceItem>
          </Section>

          <Section>
            <Title>Publications</Title>

            <PublicationItem
              title="Self-Supervised Learning for Speaker Recognition: A Study and Review"
              url="https://hal.science/hal-05149384v1/file/lepage_2025_specom.pdf"
              source="Preprint (submitted to Speech Communication)"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification"
              url="https://arxiv.org/pdf/2505.14561"
              source="Interspeech 2025"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling"
              url="https://arxiv.org/pdf/2501.17772"
              source="IEEE Transactions on Audio, Speech and Language Processing, vol. 33, pp. 2932--2945, 2025"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />
          </Section>
        </ResumePage>

        <ResumePage>
          <Section>
            <PublicationItem
              title="Exploring WavLM Back-ends for Speech Spoofing and Deepfake Detection"
              url="https://www.isca-archive.org/asvspoof_2024/stourbe24_asvspoof.pdf"
              source="Proc. The Automatic Speaker Verification Spoofing Countermeasures Workshop (ASVspoof 2024), Aug. 2024, pp. 72--78"
              authors="Theophile Stourbe, Victor Miara, <b>Theo Lepage</b>, and Reda Dehak"
            />
          
            <PublicationItem
              title="Towards Supervised Performance on Speaker Verification with Self-Supervised Learning by Leveraging Large-Scale ASR Models"
              url="https://www.isca-archive.org/interspeech_2024/miara24_interspeech.pdf"
              source="Proc. Interspeech 2024, Sept. 2024, pp. 2660--2664"
              authors="Victor Miara, <b>Theo Lepage</b>, and Reda Dehak"
            />

            <PublicationItem
              title="Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations"
              url="https://www.isca-archive.org/odyssey_2024/lepage24_odyssey.pdf"
              source="Proc. The Speaker and Language Recognition Workshop (Odyssey 2024), Jun. 2024, pp. 38--42"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification"
              url="https://www.isca-archive.org/interspeech_2023/lepage23_interspeech.pdf"
              source="Proc. Interspeech 2023, Aug. 2023, pp. 4708--4712"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning"
              url="https://www.isca-archive.org/interspeech_2022/lepage22_interspeech.pdf"
              source="Proc. Interspeech 2022, Sept. 2022, pp. 4018--4022"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />
          </Section>

          <Section>
            <Title>Projects</Title>

            <Cols>
              <Col>
                <ProjectItem
                  name="sslsv"
                  url="https://github.com/theolepage/sslsv"
                  description="Framework for training and evaluating self-supervised learning methods for speaker verification."
                />
              </Col>
              <Col>
                <ProjectItem
                  name="wavlm_ssl_sv"
                  url="https://github.com/theolepage/wavlm_ssl_sv"
                  description="SOTA method for self-supervised speaker verification leveraging a large-scale pretrained ASR model."
                />
              </Col>
            </Cols>
          </Section>

          <Section>
            <Title>Skills and interests</Title>

            <Cols>
              <Col>
                <SkillsSection
                  title="Programming"
                  items={[
                    "C",
                    "C++",
                    "C#",
                    "Java",
                    "Python",
                    "PHP",
                    "JS",
                    "Bash",
                  ]}
                />

                <SkillsSection
                  title="Certificates"
                  items={["Driving license", "Sailing instructor diploma"]}
                />

                <SkillsSection
                  title="Languages"
                  items={["English (TOEIC 905)", "French (native)"]}
                />
              </Col>
              <Col>
                <SkillsSection
                  title="Data Science"
                  items={[
                    "PyTorch",
                    "TensorFlow",
                    "Scikit-learn",
                    "NumPy",
                    "Pandas",
                  ]}
                />

                <Item>
                  <SubSubtitle>Passions and interests</SubSubtitle>
                  <PassionItem
                    icon="/images/resume/icons/icon-science.svg"
                    text="Science and AI"
                  />
                  <PassionItem
                    icon="/images/resume/icons/icon-robotics.svg"
                    text="Robotics"
                  />
                  <PassionItem
                    icon="/images/resume/icons/icon-wave.svg"
                    text="Sailing & windsurfing"
                  />
                </Item>
              </Col>
            </Cols>
          </Section>

          <Footer>
            An up-to-date version of this document is available at{" "}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://theolepage.com/resume"
            >
              theolepage.com/resume
            </a>
            .
          </Footer>
        </ResumePage>
      </ResumeContainer>
    </Page>
  );
};

export default ResumePageComponent;
