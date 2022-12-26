import React from "react"

import "../styles/resume.css"

import SEO from "../components/seo"

const ResumePage = () => {
    return (
        <div class="resume">
            <SEO title="Resume" />

            <div class="resume-page">

                <div class="resume-section resume-header">
                    <div class="resume-name">Theo Lepage</div>
                    <div class="resume-description">
                        Ph.D. student in <span class="resume-description-emphasize">Machine Learning</span> → learning <span class="resume-description-emphasize">robust representations</span> for <span class="resume-description-emphasize">speaker & language recognition</span></div>
                    <div class="resume-contact">
                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="https://www.google.com/maps/place/Paris/@48.864872,2.2183041,11z/data=!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219">
                            <img class="resume-icon" src="/images/resume/icon-map_blue.svg" alt="icon-map" />
                            Paris, France
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="/">
                            <img class="resume-icon" src="/images/resume/icon-website.svg" alt="icon-website" />
                            theolepage.com
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="mailto:theo@theolepage.com">
                            <img class="resume-icon" src="/images/resume/icon-email.svg" alt="icon-email" />
                            theo@theolepage.com
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="https://www.linkedin.com/in/theolepage/">
                            <img class="resume-icon" src="/images/resume/icon-linkedin.svg" alt="icon-linkedin" />
                            Theo Lepage
                        </a>
                    </div>
                </div>

                <div class="resume-section resume-education">
                    <div class="resume-title">Education</div>

                    <div class="resume-item">
                        <div class="resume-subtitle">
                            <span class="resume-emphasize"><a target="_blank" rel="nofollow noopener noreferrer" href="https://www.sorbonne-universite.fr/en">Sorbonne Université</a></span>
                            &nbsp;(Ph.D. in Artificial Intelligence)
                        </div>
                        <div class="resume-education-icons">
                            <div class="resume-location">
                                <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                Paris, France
                            </div>
                            <div class="resume-date">
                                <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                Nov. 2022 - Nov. 2025
                            </div>
                        </div>
                        <div class="resume-text">
                            <ul>
                                <li>Conducting research related to "Learning speech and speaker representations for robust speaker and language recognition"</li>
                                <li>Supported by French ANR 'APATE' project (Forensic Deepfakes Detection Toolbox)</li>
                                <li>Supervised by Dr. Réda Dehak and Pr. Thierry Géraud (LRE-EPITA)</li>
                            </ul>
                        </div>
                    </div>

                    <div class="resume-item">
                        <div class="resume-subtitle">
                            <span class="resume-emphasize"><a target="_blank" rel="nofollow noopener noreferrer" href="https://www.epita.fr/en/">École Pour l'Informatique et les Techniques Avancées - EPITA</a></span>
                            &nbsp;(M.Eng. in Computer Science)
                        </div>
                        <div class="resume-education-icons">
                            <div class="resume-location">
                                <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                Paris, France
                            </div>
                            <div class="resume-date">
                                <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                Sep. 2017 - Sep. 2022
                            </div>
                        </div>
                        <div class="resume-text">
                            <ul>
                                {/* <li>International section</li> */}
                                <li>Signal processing and machine learning (IMAGE major) + scientific research specialization (RDI major)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="resume-section resume-section_experience">
                    <div class="resume-title">Experience</div>

                    <div class="resume-experience">
                        <div class="resume-experience-content">
                            <div class="resume-experience-header">
                                <div class="resume-subtitle">
                                    <span class="resume-emphasize">Research Scientist Intern</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.siemens-healthineers.com/">Siemens Healthineers</a>
                                </div>
                                <div class="resume-experience-icons">
                                    <div class="resume-location">
                                        <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                        Princeton, USA
                                    </div>
                                    <div class="resume-date">
                                        <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                        Feb. 2022 - Sep. 2022
                                    </div>
                                </div>
                            </div>
                            <div class="resume-text">
                                <ul>
                                    <li>Focused on state-of-the-art deep learning models for MR images enhancement (denoising and super-resolution)</li>
                                    <li>Designed a CNN architecture that leverages the attention mechanism of Vision Transformers and recovers more details compared to the solution being used in the product</li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-experience-image">
                            <img src="/images/resume/shs.png" alt="icon-shs" />
                        </div>
                    </div>

                    <div class="resume-experience">
                        <div class="resume-experience-content">
                            <div class="resume-experience-header">
                                <div class="resume-subtitle">
                                    <span class="resume-emphasize">Research Student</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.lre.epita.fr/">LRE</a>
                                </div>
                                <div class="resume-experience-icons">
                                    <div class="resume-location">
                                        <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                        Paris, France
                                    </div>
                                    <div class="resume-date">
                                        <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                        Jan. 2020 - Jan. 2022
                                    </div>
                                </div>
                            </div>
                            <div class="resume-text">
                                <ul>
                                    <li>Worked on self-supervised methods applied to speaker and language recognition while doing monthly "lightning" talks about my progress (supervised by Dr. Réda Dehak)</li>
                                    <li>Developed a label-efficient non-contrastive speaker verification model that outperforms its supervised counterpart when fine-tuned with only 2% of labeled data</li>
                                    <li>Our work led to a publication and an oral presentation at INTERSPEECH 2022 (one of the top conferences in the field)</li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-experience-image">
                            <img src="/images/resume/lre.png" alt="icon-lre" />
                        </div>
                    </div>

                    <div class="resume-experience">
                        <div class="resume-experience-content">
                            <div class="resume-experience-header">
                                <div class="resume-subtitle">
                                    <span class="resume-emphasize">Software Developer Intern</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.cnrs.fr/en">CNRS</a>
                                </div>
                                <div class="resume-experience-icons">
                                    <div class="resume-location">
                                        <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                        Paris, France
                                    </div>
                                    <div class="resume-date">
                                        <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                        Sep. 2020 - Jan. 2021
                                    </div>
                                </div>
                            </div>
                            <div class="resume-text">
                                <ul>
                                    <li>Contributed to a real-time digital holography software (C++ / CUDA) used for retinal blood flow analysis in a medical setting</li>
                                    <li>Our work resulted in a 20x (500 to 10,000 FPS) speedup which improved substantially output images contrast and quality</li>
                                    <li>Our refactoring and the addition of unit tests improved the stability and allowed the project to become open source</li>
                                    <li>Founding member of the association 'Digital Holography' created to sustain the development of the software</li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-experience-image">
                            <img style={{width: '75%'}} src="/images/resume/cnrs.png" alt="logo-cnrs" />
                        </div>
                    </div>

                    <div class="resume-experience">
                        <div class="resume-experience-content">
                            <div class="resume-experience-header">
                                <div class="resume-subtitle">
                                    <span class="resume-emphasize">Teaching Assistant</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.epita.fr/en">EPITA</a>
                                </div>
                                <div class="resume-experience-icons">
                                    <div class="resume-location">
                                        <img class="resume-icon" src="/images/resume/icon-map.svg" alt="icon-map" />
                                        Paris, France
                                    </div>
                                    <div class="resume-date">
                                        <img class="resume-icon" src="/images/resume/icon-calendar.svg" alt="icon-calendar" />
                                        Sep. 2019 - Sep. 2020
                                    </div>
                                </div>
                            </div>
                            <div class="resume-text">
                                <ul>
                                    <li>Taught Unix concepts as well as C and Rust programming languages to undergraduates through weekly graded practicals</li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-experience-image">
                            <img src="/images/resume/epita.png" alt="icon-epita" />
                        </div>
                    </div>
                </div>

                <div class="resume-section resume-publications">
                    <div class="resume-title">Publications</div>

                    <div class="resume-item">
                        <div class="resume-subtitle resume-emphasize">
                            <img class="resume-icon" src="/images/resume/icon-publication.svg" alt="icon-publication" />
                            <a target="_blank" rel="nofollow noopener noreferrer" href="https://arxiv.org/abs/2207.05506">Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning</a>
                        </div>
                        <div class="resume-publication-journal resume-text_shift">
                            INTERSPEECH 2022
                        </div>
                        <div class="resume-publication-authors resume-text_shift">
                            <u>Theo Lepage</u>, and Reda Dehak
                        </div>
                    </div>

                    <div class="resume-item">
                        <div class="resume-subtitle resume-emphasize">
                            <img class="resume-icon" src="/images/resume/icon-publication.svg" alt="icon-publication" />
                            <a target="_blank" rel="nofollow noopener noreferrer" href="/uploads/lepage_lrde_2021_report.pdf">Self-supervised learning applied to speaker and language recognition</a>
                        </div>
                        <div class="resume-publication-journal resume-text_shift">
                            LRDE Students Seminar 2021
                        </div>
                        <div class="resume-publication-authors resume-text_shift">
                            <u>Theo Lepage</u>
                        </div>
                    </div>
                </div>

            </div>

            <div class="resume-page">

                <div class="resume-section resume-projects">
                    <div class="resume-title">Projects</div>

                    <div class="resume-cols">
                        <div class="resume-col">
                            <div class="resume-item">
                                <div class="resume-subtitle resume-emphasize">
                                    <img class="resume-icon" src="/images/resume/icon-project.svg" alt="icon-project" />
                                    <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/theolepage/sslsv">SSLSV</a>
                                </div>
                                <div class="resume-text resume-text_shift">
                                    Framework for training and evaluating self-supervised learning methods for speaker verification.
                                </div>
                            </div>

                            <div class="resume-item">
                                <div class="resume-subtitle resume-emphasize">
                                    <img class="resume-icon" src="/images/resume/icon-project.svg" alt="icon-project" />
                                    <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/theolepage/prophecy">Prophecy</a>
                                </div>
                                <div class="resume-text resume-text_shift">
                                    A tiny deep neural network framework developed from scratch in C++ and CUDA.
                                </div>
                            </div>
                        </div>

                        <div class="resume-col">
                            <div class="resume-item">
                                <div class="resume-subtitle resume-emphasize">
                                    <img class="resume-icon" src="/images/resume/icon-project.svg" alt="icon-project" />
                                    <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/theolepage/tensorflood">TensorFlood</a>
                                </div>
                                <div class="resume-text resume-text_shift">
                                    Tiny automatic differentiation (autodiff) engine for NumPy tensors implemented in Python. 
                                </div>
                            </div>

                            <div class="resume-item">
                                <div class="resume-subtitle resume-emphasize">
                                    <img class="resume-icon" src="/images/resume/icon-project.svg" alt="icon-project" />
                                    <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/NoneOfAllOfTheAbove/ocr">OCR</a>
                                </div>
                                <div class="resume-text resume-text_shift">
                                    An Optical Character Recognition software based on a simple neural network created from scratch in C.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="resume-section resume-interests-skills">
                    <div class="resume-title">Skills and interests</div>

                    <div class="resume-cols">
                        <div class="resume-col">
                            <div class="resume-item resume-floating">
                                <div class="resume-subsubtitle">Programming</div>
                                <div class="resume-label">C</div>
                                <div class="resume-label">C++</div>
                                <div class="resume-label">C#</div>
                                <div class="resume-label">Java</div>
                                <div class="resume-label">Python</div>
                                <div class="resume-label">PHP</div>
                                <div class="resume-label">JS</div>
                                <div class="resume-label">Bash</div>
                            </div>

                            <div class="resume-item resume-floating">
                                <div class="resume-subsubtitle">Certificates</div>
                                <div class="resume-label">Driving license</div>
                                <div class="resume-label">Sailing instructor diploma</div>
                            </div>

                            <div class="resume-item resume-floating">
                                <div class="resume-subsubtitle">Languages</div>
                                <div class="resume-label">English (TOEIC 905)</div>
                                <div class="resume-label">French (native)</div>
                            </div>
                        </div>

                        <div class="resume-col">
                            <div class="resume-item resume-floating">
                                <div class="resume-subsubtitle">Data Science</div>
                                <div class="resume-label">PyTorch</div>
                                <div class="resume-label">TensorFlow</div>
                                <div class="resume-label">Scikit-learn</div>
                                <div class="resume-label">NumPy</div>
                                <div class="resume-label">Pandas</div>
                            </div>
                            
                            <div class="resume-item">
                                <div class="resume-subsubtitle">Passions and interests</div>
                                <div class="resume-passion">
                                    <img class="resume-icon resume-passion-icon" src="/images/resume/icon-science.svg" alt="icon-science" />
                                    Science and AI
                                </div>
                                <div class="resume-passion">
                                    <img class="resume-icon resume-passion-icon" src="/images/resume/icon-robotics.svg" alt="icon-robotics" />
                                    Robotics
                                </div>
                                <div class="resume-passion">
                                    <img class="resume-icon resume-passion-icon" src="/images/resume/icon-wave.svg" alt="icon-wave" />
                                    Sailing & windsurfing
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="resume-footer">
                    An up-to-date version of this document is available at <a target="_blank" rel="nofollow noopener noreferrer" href="https://theolepage.com/resume">theolepage.com/resume</a>.
                </div>

            </div>
        </div>
    )
}

export default ResumePage