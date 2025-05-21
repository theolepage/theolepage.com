const lepage2025SSPS = `
@Article{lepage2025SSPS,
    title     = {SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification},
    author    = {Lepage, Theo and Dehak, Reda},
    year      = {2025},
    journal   = {Interspeech 2025},
    url       = {https://arxiv.org/abs/2505.14561},
}
`

const lepage2025SSLSVBootstrappedPositiveSampling = `
@Article{lepage2025SSLSVBootstrappedPositiveSampling,
    title     = {Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling},
    author    = {Lepage, Theo and Dehak, Reda},
    year      = {2025},
    journal   = {arXiv preprint library},
    url       = {https://arxiv.org/abs/2501.17772},
}
`

const stourbe2024ExploringWavLMBackendsSpoofing = `
@InProceedings{stourbe2024ExploringWavLMBackendsSpoofing,
    title     = {Exploring WavLM back-ends for speech spoofing and deepfake detection},
    author    = {Stourbe, Theophile and Miara, Victor and Lepage, Theo and Dehak, Reda},
    year      = {2024},
    booktitle = {The Automatic Speaker Verification Spoofing Countermeasures Workshop (ASVspoof 2024)},
    pages     = {72--78},
    doi       = {10.21437/ASVspoof.2024-11},
    url       = {https://www.isca-archive.org/asvspoof_2024/stourbe24_asvspoof.html},
}
`

const miara2024TowardsSupervisedPerformanceSSLSV = `
@InProceedings{miara2024TowardsSupervisedPerformanceWavLMSSLSV,
    title     = {Towards Supervised Performance on Speaker Verification with Self-Supervised Learning by Leveraging Large-Scale ASR Models},
    author    = {Miara, Victor and Lepage, Theo and Dehak, Reda},
    year      = {2024},
    booktitle = {Interspeech 2024},
    pages     = {2660--2664},
    doi       = {10.21437/Interspeech.2024-486},
    url       = {https://www.isca-archive.org/interspeech_2024/miara24_interspeech.html},
}
`

const lepage2024AdditiveMarginSSLSV = `
@InProceedings{lepage2024AdditiveMarginSSLSV,
    title     = {Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations},
    author    = {Lepage, Theo and Dehak, Reda},
    year      = {2024},
    booktitle = {The Speaker and Language Recognition Workshop (Odyssey 2024)},
    pages     = {38--42},
    doi       = {10.21437/odyssey.2024-6},
    url       = {https://www.isca-archive.org/odyssey_2024/lepage24_odyssey.html},
}
`

const lepage2023ExperimentingAdditiveMarginsSSLSV = `
@InProceedings{lepage2023ExperimentingAdditiveMarginsSSLSV,
    title     = {Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification},
    author    = {Lepage, Theo and Dehak, Reda},
    year      = {2023},
    booktitle = {Interspeech 2023},
    pages     = {4708--4712},
    doi       = {10.21437/Interspeech.2023-1479},
    url       = {https://www.isca-speech.org/archive/interspeech_2023/lepage23_interspeech.html},
}
`

const lepage2022LabelEfficientSelfSupervisedSV = `
@InProceedings{lepage2022LabelEfficientSelfSupervisedSV,
    title     = {Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning},
    author    = {Lepage, Theo and Dehak, Reda},
    year      = {2022},
    booktitle = {Interspeech 2022},
    pages     = {4018--4022},
    doi       = {10.21437/Interspeech.2022-802},
    url       = {https://www.isca-speech.org/archive/interspeech_2022/lepage22_interspeech.html},
}
`

export const PUBLICATIONS = [
    {
        name: 'SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'Preprint (accepted to Interspeech 2025)',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2505.14561' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ],
        bib: lepage2025SSPS
    },
    {
        name: 'Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'Preprint (submitted to IEEE TASLP)',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2501.17772' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ],
        bib: lepage2025SSLSVBootstrappedPositiveSampling
    },
    {
        name: 'Exploring WavLM Back-ends for Speech Spoofing and Deepfake Detection',
        authors: 'Theophile Stourbe, Victor Miara, Theo Lepage, and Reda Dehak',
        journal: 'ASVspoof 2024',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2409.05032' },
            { name: 'Slides', url: '/uploads/stourbe_asvspoof_2024_slides.pdf' },
            { name: 'Video', url: 'https://youtu.be/R_U41bzRKSg' }
        ],
        bib: stourbe2024ExploringWavLMBackendsSpoofing
    },
    {
        name: 'Towards Supervised Performance on Speaker Verification with Self-Supervised Learning by Leveraging Large-Scale ASR Models',
        authors: 'Victor Miara, Theo Lepage, and Reda Dehak',
        journal: 'Interspeech 2024',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2406.02285' },
            { name: 'Slides', url: '/uploads/miara_interspeech_2024_slides.pdf' },
            { name: 'Code', url: 'https://github.com/theolepage/wavlm_ssl_sv' }
        ],
        bib: miara2024TowardsSupervisedPerformanceSSLSV
    },
    {
        name: 'Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'Odyssey 2024',
        // journal: 'Odyssey 2024: The Speaker and Language Recognition Workshop',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2404.14913' },
            { name: 'Slides', url: '/uploads/lepage_odyssey_2024_slides.pdf' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ],
        bib: lepage2024AdditiveMarginSSLSV
    },
    {
        name: 'Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'Interspeech 2023',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2306.03664' },
            { name: 'Slides', url: '/uploads/lepage_interspeech_2023_slides.pdf' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ],
        bib: lepage2023ExperimentingAdditiveMarginsSSLSV
    },
    {
        name: 'Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'Interspeech 2022',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2207.05506' },
            { name: 'Slides', url: '/uploads/lepage_interspeech_2022_slides.pdf' },
            { name: 'Video', url: 'https://youtu.be/Ndhzm6Krj7Q' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ],
        bib: lepage2022LabelEfficientSelfSupervisedSV
    },
    {
        name: 'Self-supervised learning applied to speaker and language recognition',
        authors: 'Theo Lepage',
        journal: 'LRDE Students Seminar 2021',
        actions: [
            { name: 'Report', url: '/uploads/lepage_lrde_2021_report.pdf' },
            { name: 'Slides', url: '/uploads/lepage_lrde_2021_slides.pdf' },
            { name: 'Video', url: 'https://youtu.be/7txwJlIrKO0' }
        ]
    }
]