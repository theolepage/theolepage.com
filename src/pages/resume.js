import React from "react"

import "../styles/resume.css"

import SEO from "../components/seo"

export default () => {
    return (
        <div class="resume">
            <SEO title="Resume" />

            <div class="resume-header">

                <div class="resume-header-content">
                    <div class="resume-name">Theo Lepage</div>
                    <div class="resume-description">Looking for an internship in Computer Vision or Machine Learning starting in January 2022.</div>
                    <div class="resume-contact">
                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="https://www.google.com/maps/place/Paris/@48.864872,2.2183041,11z/data=!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219">
                            <img class="resume-icon" src="/images/icons/icon-map_blue.svg" alt="icon-map" />
                            Paris, France
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="/">
                            <img class="resume-icon" src="/images/icons/icon-website.svg" alt="icon-website" />
                            theolepage.com
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="mailto:theo@theolepage.com">
                            <img class="resume-icon" src="/images/icons/icon-email.svg" alt="icon-email" />
                            theo@theolepage.com
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="tel:+33670097066">
                            <img class="resume-icon" src="/images/icons/icon-phone.svg" alt="icon-phone" />
                            +33 6 70 09 70 66
                        </a>

                        <a class="resume-contact-item" target="_blank" rel="nofollow noopener noreferrer" href="https://www.linkedin.com/in/theolepage/">
                            <img class="resume-icon" src="/images/icons/icon-linkedin.svg" alt="icon-linkedin" />
                            Theo Lepage
                        </a>
                    </div>
                </div>
            </div>

            <div class="resume-section resume-section_experience">
                <div class="resume-title">Professional experience</div>

                <div class="resume-experience">
                    <div class="resume-experience-content">
                        <div class="resume-experience-header">
                            <div class="resume-subtitle">
                                <span class="resume-emphasize">Research Student (Machine Learning)</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.lse.epita.fr/">LSE</a>
                            </div>
                            <div class="resume-experience-icons">
                                <div class="resume-location">
                                    <img class="resume-icon" src="/images/icons/icon-map.svg" alt="icon-map" />
                                    Paris, France
                                    </div>
                                <div class="resume-date">
                                    <img class="resume-icon" src="/images/icons/icon-calendar.svg" alt="icon-calendar" />
                                    Started Jan. 2020
                                    </div>
                            </div>
                        </div>
                        <div class="resume-text">
                            Focusing my research on self learning methods and their applications to speaker recognition while doing monthly talks about my progress.
                            Previously worked on a prototype of a self-driving car to compete the French <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.roboracingleague.com/">DIY Robocars</a> organized by Renault.
                            Reading and implementing recent papers in the field of machine learning and computer vision.
                        </div>
                    </div>
                    <div class="resume-experience-image">
                        <img src="/images/lse.png" alt="icon-lse" />
                    </div>
                </div>

                <div class="resume-experience">
                    <div class="resume-experience-content">
                        <div class="resume-experience-header">
                            <div class="resume-subtitle">
                                <span class="resume-emphasize">Software Developer Intern (Computational Imaging)</span> at <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.cnrs.fr/en">CNRS</a>
                            </div>
                            <div class="resume-experience-icons">
                                <div class="resume-location">
                                    <img class="resume-icon" src="/images/icons/icon-map.svg" alt="icon-map" />
                                    Paris, France
                                </div>
                                <div class="resume-date">
                                    <img class="resume-icon" src="/images/icons/icon-calendar.svg" alt="icon-calendar" />
                                    Sep. 2020 (5 months)
                                </div>
                            </div>
                        </div>
                        <div class="resume-text">
                            Contributed to a fast real time renderer of holograms for medical purpose written in C++/CUDA.
                            Our work resulted in a 5x speedup which improved substantially output images contrast.
                            The addition of test suites and the refactoring of main components increased significantly the stability
                            and allowed the project to become open source.
                        </div>
                    </div>
                    <div class="resume-experience-image">
                        <img src="/images/cnrs.png" alt="logo-cnrs" />
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
                                    <img class="resume-icon" src="/images/icons/icon-map.svg" alt="icon-map" />
                                    Paris, France
                                </div>
                                <div class="resume-date">
                                    <img class="resume-icon" src="/images/icons/icon-calendar.svg" alt="icon-calendar" />
                                    Sep. 2019 (10 months)
                                </div>
                            </div>
                        </div>
                        <div class="resume-text">
                            Taught C and Rust programming languages, focusing on networking and multithreading low-level concepts, to second year students through weekly graded practicals.
                            Developed an intranet to let other assistants evaluate student projects.
                        </div>
                    </div>
                    <div class="resume-experience-image">
                        <img src="/images/epita.png" alt="icon-epita" />
                    </div>
                </div>
            </div >

            <div class="resume-section resume-education">
                <div class="resume-title">Education</div>

                <div class="resume-item">
                    <div class="resume-subtitle">
                        <span class="resume-emphasize"><a target="_blank" rel="nofollow noopener noreferrer" href="https://www.epita.fr/en">EPITA - École Pour l'Informatique et les Techniques Avancées</a></span>
                        &nbsp;(Engineering school)
                    </div>
                    <div class="resume-education-icons">
                        <div class="resume-location">
                            <img class="resume-icon" src="/images/icons/icon-map.svg" alt="icon-map" />
                            Paris, France
                        </div>
                        <div class="resume-date">
                            <img class="resume-icon" src="/images/icons/icon-calendar.svg" alt="icon-calendar" />
                            Sep. 2017 - Sep. 2022
                        </div>
                    </div>
                    <div class="resume-text">
                        Specialization in image processing and synthesis.
                        Developed a complete knowledge in computer science through theoretical courses taught in English
                        (Linear algebra, Formal language, Probabilities, Statistics, ...)
                        and various challenging group projects.
                    </div>
                </div>

                <div class="resume-item">
                    <div class="resume-subtitle">
                        <span class="resume-emphasize"><a target="_blank" rel="nofollow noopener noreferrer" href="https://csumb.edu/">CSUMB - California State University, Monterey Bay</a></span>
                        &nbsp;(Semester abroad)
                    </div>
                    <div class="resume-education-icons">
                        <div class="resume-location">
                            <img class="resume-icon" src="/images/icons/icon-map.svg" alt="icon-map" />
                            Northern California, USA
                        </div>
                        <div class="resume-date">
                            <img class="resume-icon" src="/images/icons/icon-calendar.svg" alt="icon-calendar" />
                            Jan. 2019 - Jun. 2019
                        </div>
                    </div>
                </div>
            </div>

            <div class="resume-section resume-projects">
                <div class="resume-title">Projects</div>

                <div class="resume-cols">
                    <div class="resume-col">
                        <div class="resume-item">
                            <div class="resume-subtitle resume-emphasize">
                                <img class="resume-icon" src="/images/icons/icon-project.svg" alt="icon-project" />
                                <a target="_blank" rel="nofollow noopener noreferrer" href="/projects/prophecy">Prophecy - a neural network framework</a>
                            </div>
                            <div class="resume-text">
                                Deep neural networks framework similar to Keras and made from scratch in C++ and CUDA. Offering state-of-the-art accuracy on MNIST dataset for AlexNet and VGG models.
                            </div>
                        </div>

                        <div class="resume-item">
                            <div class="resume-subtitle resume-emphasize">
                                <img class="resume-icon" src="/images/icons/icon-project.svg" alt="icon-project" />
                                <a target="_blank" rel="nofollow noopener noreferrer" href="/projects/cant-stop-driving">Can't Stop Driving</a>
                            </div>
                            <div class="resume-text">
                                Led a team, for a 4 months school project, to create a 3D multiplayer game built with Unity and C#. It was chosen by a jury to be presented to new students during open days.
                            </div>
                        </div>
                    </div>

                    <div class="resume-col">
                        <div class="resume-item">
                            <div class="resume-subtitle resume-emphasize">
                                <img class="resume-icon" src="/images/icons/icon-project.svg" alt="icon-project" />
                                <a target="_blank" rel="nofollow noopener noreferrer" href="/projects/ember-classification">Classification of EMBER dataset</a>
                            </div>
                            <div class="resume-text">
                                Machine learning methods (k-means, classifier, deep neural network and siamese network) to classify a dataset of malware programs.
                                Ranked second out of 15 participants.
                            </div>
                        </div>

                        <div class="resume-item">
                            <div class="resume-subtitle resume-emphasize">
                                <img class="resume-icon" src="/images/icons/icon-project.svg" alt="icon-project" />
                                <a target="_blank" rel="nofollow noopener noreferrer" href="/projects/42sh">42sh - a POSIX shell</a>
                            </div>
                            <div class="resume-text">
                                Worked on a shell in C complying with SCL standard and Bash grammar. The lexer, LL(1) parser and AST is fully documented and supported by a test suite.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="resume-section resume-interests-skills">
                <div class="resume-title">Interests and skills</div>

                <div class="resume-cols">
                    <div class="resume-col">
                        <div class="resume-item">
                            <div class="resume-subsubtitle">Programming languages / technologies</div>
                            <div class="resume-label">C</div>
                            <div class="resume-label">C++</div>
                            <div class="resume-label">C#</div>
                            <div class="resume-label">Java</div>
                            <div class="resume-label">Python</div>
                            <div class="resume-label">OCaml/Haskell</div>
                            <div class="resume-label">HTML/CSS</div>
                            <div class="resume-label">PHP</div>
                            <div class="resume-label">JavaScript</div>
                            <div class="resume-label">SQL</div>
                            <div class="resume-label">Git</div>
                            <div class="resume-label">Linux/Bash</div>
                        </div>

                        <div class="resume-item">
                            <div class="resume-subsubtitle">Miscellaneous</div>
                            <div class="resume-label">Algorithmics</div>
                            <div class="resume-label">Machine Learning</div>
                            <div class="resume-label">Software Engineering</div>
                            <div class="resume-label">Project Management</div>
                            <div class="resume-label">LaTex</div>
                        </div>
                    </div>

                    <div class="resume-col">
                        <div class="resume-item">
                            <div class="resume-subsubtitle">Certificates</div>
                            <div class="resume-label">Driving license</div>
                            <div class="resume-label">Sailing instructor diploma</div>
                        </div>

                        <div class="resume-item resume-floating">
                            <div class="resume-subsubtitle">Languages</div>
                            <div class="resume-label">English (TOEIC 905)</div>
                            <div class="resume-label">French</div>
                        </div>

                        <div class="resume-item">
                            <div class="resume-subsubtitle">Passions and interests</div>
                            <div class="resume-passion">
                                <img class="resume-icon resume-passion-icon" src="/images/icons/icon-science.svg" alt="icon-science" />
                                Science and AI
                            </div>
                            <div class="resume-passion">
                                <img class="resume-icon resume-passion-icon" src="/images/icons/icon-wave.svg" alt="icon-wave" />
                                Sailing and windsurf
                            </div>
                            <div class="resume-passion">
                                <img class="resume-icon resume-passion-icon" src="/images/icons/icon-ecology.svg" alt="icon-ecology" />
                                Sustainable development
                            </div>
                            <div class="resume-passion">
                                <img class="resume-icon resume-passion-icon" src="/images/icons/icon-travel.svg" alt="icon-travel" />
                                Traveling (+10 countries)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="resume-footer">
                An up-to-date version of this document is available at <a target="_blank" rel="nofollow noopener noreferrer" href="/resume">theolepage.com/resume</a>.
            </div>

        </div >
    )
}