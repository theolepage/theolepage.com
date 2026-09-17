---
enabled: true
title: "Self-Supervised Learning for Speaker Recognition (Ph.D. Thesis)"
defenseInfo: "Ph.D. thesis defense held on February 13, 2026, at EPITA Paris, for the doctoral degree from Sorbonne University"
committee:
  - name: "Jean-François Bonastre"
    affiliation: "AMIAD"
  - name: "Benjamin Lecouteux"
    affiliation: "LIG"
  - name: "Driss Matrouf"
    affiliation: "LIA"
  - name: "Irina Illina"
    affiliation: "LORIA/Inria"
  - name: "Anthony Larcher"
    affiliation: "LIUM"
  - name: "Douglas Reynolds"
    affiliation: "MIT LL"
advisors:
  - name: "Réda Dehak"
    affiliation: "LRE"
  - name: "Thierry Géraud"
    affiliation: "LRE"
thesisUrl: "https://theses.hal.science/tel-05558165v1/file/159344_LEPAGE_2026_archivage.pdf"
slidesUrl: "/uploads/phd_defense_presentation_theo_lepage_2026.pdf"
codeUrl: "https://github.com/theolepage/sslsv"
videoUrl: "https://www.youtube.com/embed/PIApBAIWPrg?si=V_aOgARePdCaHMQb"
contributions:
  - tag: "SSLSV"
    tagVariant: "green"
    title: "Application and Study of SSL for SV"
    description: "Benchmark and study SSL frameworks (e.g., SimCLR, MoCo, DINO) on SV under controlled conditions"
    result: "Identify the role and limitations of positive sampling in modeling intra-speaker variability"
    publications:
      - title: "Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning"
        url: "https://www.isca-archive.org/interspeech_2022/lepage22_interspeech.pdf"
      - title: "Self-Supervised Learning for Speaker Recognition: A study and review"
        url: "https://arxiv.org/pdf/2602.10829"
  - tag: "Margins"
    tagVariant: "red"
    title: "Margins in Self-Supervised Contrastive Frameworks"
    description: "Integrate CosFace, ArcFace, AdaFace, and other margin-based constraints into SimCLR and MoCo"
    result: "Improve speaker separability in fully self-supervised settings"
    publications:
      - title: "Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification"
        url: "https://www.isca-archive.org/interspeech_2023/lepage23_interspeech.pdf"
      - title: "Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations"
        url: "https://www.isca-archive.org/odyssey_2024/lepage24_odyssey.pdf"
  - tag: "SSPS"
    tagVariant: "blue"
    title: "Self-Supervised Positive Sampling (SSPS) from Latent Space"
    description: "Exploit latent-space proximity to sample cross-recording pseudo-positives"
    result: "Reduce intra-speaker variability and improve SV performance across frameworks (-58% EER for SimCLR)"
    publications:
      - title: "Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling"
        url: "https://arxiv.org/pdf/2501.17772"
      - title: "SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification"
        url: "https://www.isca-archive.org/interspeech_2025/lepage25_interspeech.pdf"
  - tag: "Foundation"
    tagVariant: "yellow"
    title: "Speech Foundation Models for SV without Labels"
    description: "Develop an iterative pseudo-labeling approach to enable WavLM fine-tuning from a DINO-based model"
    result: "1.06% EER on VoxCeleb1-O, setting a new SOTA and approaching supervised performance"
    publications:
      - title: "Towards Supervised Performance on Speaker Verification with SSL by Leveraging Large-Scale ASR Models"
        url: "https://www.isca-archive.org/interspeech_2024/miara24_interspeech.pdf"
  - title: "sslsv: Open-Source PyTorch Toolkit for Self-Supervised SV"
    description: "Release a PyTorch toolkit to support reproducibility and future research in the field"
    resultUrl: "https://github.com/theolepage/sslsv"
---

Advances in Artificial Intelligence, driven by developments in Deep Learning, have led to tremendous progress in Speech Processing. In the context of Speaker Recognition (SR), the training objective is to associate an audio sample with the corresponding speaker identity. However, the performance of such supervised systems is highly dependent on the amount of labeled data available.

This inherent reliance on human supervision is a major limitation since annotations are expensive and time-consuming to obtain, prone to bias, and often limited in scope, all of which can hinder scalability and generalization. This poses a particular challenge in speech domains, where collecting labeled audio across all languages (with over 7,000 dialects spoken worldwide), speaker profiles (e.g., age, gender), and conditions (e.g., recording device, environmental noise) is not feasible.

Self-Supervised Learning (SSL) has recently emerged as a promising approach for learning relevant representations without human annotations, drawing inspiration from how humans learn through patterns and context rather than explicit labels. While SSL has proven effective across many downstream tasks, several applications remain underexplored. This thesis contributes to this fast-evolving paradigm for SR, toward greater generalization and reduced reliance on labeled data.
