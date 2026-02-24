import React, { useState} from 'react';
import './Speakers.css';

const speakersData = {
    '24-25': [
        {
            id: 1,
            name: 'Dr. Radhakrishnan Pillai',
            role: 'Director, Chanakya Aanvikshiki Pvt. Ltd.',
            image: '/res/Admin/8.svg',
            imageFallback: '/res/Admin/8.svg',
            bio: "Dr. Radhakrishnan Pillai is a renowned Indian management thinker and author of the best-selling Chanakya series, celebrated for his extensive research on Kautilya's Arthashastra, a seminal treatise on governance and economics from the 3rd century BC.\n\nHe is the Founder and Chief Mentor of Chanakya Aanvikshiki, and serves as the Director of the Chanakya International Institute of Leadership Studies at the University of Mumbai. With over 25 years of experience in both industry and academia, Dr. Pillai has been instrumental in integrating ancient wisdom into modern management practices.",
            social: { linkedin: 'https://www.linkedin.com/in/rchanakyapillai/' }
        },
        {
            id: 2,
            name: 'Mr. Vivek Krishnani',
            role: 'CEO MovieVerse Studios',
            image: '/res/Admin/12.svg',
            imageFallback: '/res/Admin/12.svg',
            bio: "Mr. Vivek Krishnani is the President and CEO of the Films Business at IN10 Media Network. Prior to this role, he served as the Managing Director of Sony Pictures Films India.\n\nWith a distinguished career in the film industry, Mr. Krishnani has been instrumental in shaping the cinematic landscape in India. His strategic vision and creative leadership have led to the successful production and distribution of numerous acclaimed films.",
            social: { linkedin: 'https://www.linkedin.com/in/vivek-krishnani-6999721/' }
        },
        {
            id: 3,
            name: 'Mr. Shyam Pathak',
            role: 'Actor & Comedian',
            image: '/res/Admin/11.svg',
            imageFallback: '/res/Admin/11.svg',
            bio: "Mr. Shyam Pathak is best known for portraying Patrakaar Popatlal in the long-running television sitcom \"Taarak Mehta Ka Ooltah Chashmah.\"\n\nHis comedic timing and memorable performances have endeared him to audiences across India, making him one of the most recognizable faces in Indian television comedy.",
            social: { instagram: 'https://www.instagram.com/shyampathak01/' }
        },
        {
            id: 4,
            name: 'Mrs. Nidhi Choudhari',
            role: 'IAS Officer',
            image: '/res/Admin/13.svg',
            imageFallback: '/res/Admin/13.svg',
            bio: "Ms. Nidhi Choudhari is an Indian Administrative Service (IAS) officer currently serving as the Director of the National Gallery of Modern Art (NGMA) in Mumbai, under the Ministry of Culture, Government of India.\n\nHer diverse career includes roles such as District Collector for Raigad and Mumbai Suburban districts, as well as positions within the Goods and Services Tax (GST) department and the Brihanmumbai Municipal Corporation (BMC). Ms. Choudhari also has experience as an officer with the Reserve Bank of India (RBI). Beyond her administrative duties, she is a painter and a writer.",
            social: { linkedin: 'https://www.linkedin.com/in/nidhi-choudhari-84b1aa140/' }
        },
        {
            id: 5,
            name: 'Mr. Salman Yusuff Khan',
            role: 'Dancer & Choreographer',
            image: '/res/Admin/9.svg',
            imageFallback: '/res/Admin/9.svg',
            bio: "Mr. Salman Yusuff Khan is an acclaimed Indian dancer, actor, choreographer, and television judge. He gained national recognition by winning the inaugural season of the dance reality show \"Dance India Dance.\"\n\nMr. Khan has showcased his versatility by participating in various reality shows, including \"Fear Factor: Khatron Ke Khiladi 5\" and \"Jhalak Dikhhla Jaa 9.\" He made his acting debut in the 3D dance-based film \"ABCD: Anybody Can Dance\" in 2013 and has since been a prominent figure in the entertainment industry.",
            social: { instagram: 'https://www.instagram.com/salmanyusuffkhan/' }
        },
        {
            id: 6,
            name: 'Mr. Harsh Vira',
            role: 'Founder & CEO of FinPro Wealth',
            image: '/res/Admin/10.svg',
            imageFallback: '/res/Admin/10.svg',
            bio: "Mr. Harsh Vira is the Founder & CEO of FinPro Wealth, bringing over a decade of experience in the financial sector.\n\nHis expertise spans investment strategies, risk management, financial planning, and market analysis. Under his leadership, FinPro Wealth has become a trusted name in financial advisory, assisting clients in navigating the complexities of the financial markets.",
            social: { linkedin: 'https://www.linkedin.com/in/harshvira19/' }
        },
        {
            id: 7,
            name: 'Mr. Amey Desai',
            role: 'Founder, Lifespark Technologies',
            image: '/res/Admin/20.svg',
            imageFallback: '/res/Admin/20.svg',
            bio: "Amey is a tech professional building solutions for health and education. He is currently working on solutions for chronic neurological conditions such as Parkinson's disease, stroke, and other mobility challenges.\n\nLifespark Technologies produces AI-driven wearable IoT medical devices designed to address mobility challenges, making cutting-edge healthcare technology accessible and affordable.",
            social: { linkedin: 'https://www.linkedin.com/in/amey-desai/' }
        },
        {
            id: 8,
            name: 'Mr. Karan Sawhney',
            role: 'Self Improvement Coach, Co-Founder @thetribeindia',
            image: '/res/Admin/21.svg',
            imageFallback: '/res/Admin/21.svg',
            bio: "Meet Karan Sawhney, a self improvement coach & co-founder of fitness studio, The Tribe. An ex-professional football player at the Indian Super League.\n\nA sports commentator covering football at Star Sports, Karan combines his athletic experience with coaching expertise to help individuals unlock their full potential both physically and mentally.",
            social: { instagram: 'https://www.instagram.com/karansawhney11/' }
        },
        {
            id: 9,
            name: 'Ms. Miti Shah',
            role: 'Social Media Specialist, Content Creator',
            image: '/res/Admin/14.svg',
            imageFallback: '/res/Admin/14.svg',
            bio: "Ms. Miti Shah is a social media strategist, content creator, and educator, boasting a community of over 200,000 followers across various platforms.\n\nHer content focuses on empowering and mentoring individuals in areas such as careers, personal development, and social media marketing. Ms. Shah has collaborated with leading companies, including Google India and LinkedIn India, and has guided numerous individuals through workshops and personalized sessions on topics like interview preparation and resume building.",
            social: { linkedin: 'https://www.linkedin.com/in/miti-shah-content-creator/' }
        },
        {
            id: 10,
            name: 'Ms. Alfiya Karim Khan',
            role: 'Fashion & Beauty Influencer',
            image: '/res/Admin/7.svg',
            imageFallback: '/res/Admin/7.svg',
            bio: "Ms. Alfiya Karim Khan is a fashion and beauty influencer, recognized for her practical and accessible lifestyle recommendations.\n\nShe began her journey in influencer marketing in 2016 with her blog \"Trend Elite\" and has since collaborated with various brands, including a partnership with a Bollywood actor for the Korean skincare brand TheFaceShop. Her authentic approach to beauty and lifestyle content has made her a trusted voice in the industry.",
            social: { instagram: 'https://www.instagram.com/alfiyakarimkhan_/' }
        }
    ],
    '23-24': [
        {
            id: 1,
            name: 'Shantanu Naidu',
            role: 'Entrepreneur & Author',
            image: '/res/Admin/39.svg',
            imageFallback: '/res/Admin/39.svg',
            bio: "An entrepreneur, author, and social innovator, Shantanu is the mind behind MotoPaws and Goodfellows, initiatives that blend compassion with business.\n\nAs the General Manager at the Office of Shri Ratan Tata and a Cornell MBA graduate, he exemplifies the power of youthful innovation in driving meaningful change.",
            social: {}
        },
        {
            id: 2,
            name: 'Vijay Vikram Singh',
            role: 'Voice-Over Artist & Actor',
            image: '/res/Admin/38.svg',
            imageFallback: '/res/Admin/38.svg',
            bio: "A celebrated voice-over artist and actor, Vijay is best known as the narrator of Bigg Boss and for his roles in hit series like The Family Man, Mirzapur 2, and Breathe 2.\n\nHis journey highlights the art of storytelling and the impact of voice in entertainment.",
            social: {}
        },
        {
            id: 3,
            name: 'Aneesha Madhok',
            role: 'Hollywood Actress & Writer',
            image: '/res/Admin/41.svg',
            imageFallback: '/res/Admin/41.svg',
            bio: "A Hollywood actress and writer, Aneesha has starred in Bully High and other productions.\n\nShe brings insights into creativity, resilience, and storytelling, sharing how art can inspire and transform perspectives.",
            social: {}
        },
        {
            id: 4,
            name: 'Rahul Sharma',
            role: 'CEO & Founder of Qurbat',
            image: '/res/Admin/46.svg',
            imageFallback: '/res/Admin/46.svg',
            bio: "CEO and Founder of Qurbat, a rapidly expanding textile brand, Rahul has built a successful business recognized as the best textile brand in Delhi-NCR.\n\nAn IIM Ahmedabad alumnus, he has also held leadership roles at IndiGo Airlines and Aakash Educational Services.",
            social: {}
        },
        {
            id: 5,
            name: 'Prashant Desai',
            role: 'Strategist & Author',
            image: '/res/Admin/45.svg',
            imageFallback: '/res/Admin/45.svg',
            bio: "An accomplished strategist and author, Prashant has served as Head of Strategy at Burger King and penned \"The Biography of a Failed Venture\", offering deep insights into the challenges and learnings of entrepreneurship.\n\nAs a close associate of the late Rakesh Jhunjhunwala, his expertise extends across business and investment.",
            social: {}
        },
        {
            id: 6,
            name: 'Angad Daryani',
            role: 'Founder & CEO, Praan Inc.',
            image: '/res/Admin/44.svg',
            imageFallback: '/res/Admin/44.svg',
            bio: "A visionary entrepreneur, Angad left school at 15 to join MIT Media Lab and is now the Founder & CEO of Praan Inc., a pioneering clean-tech company.\n\nWith backing from industry leaders like Microsoft and Social Impact Capital, he is redefining the future of air purification and sustainable innovation.",
            social: {}
        },
        {
            id: 7,
            name: 'Karan Desai',
            role: 'Award-Winning Architect & Designer',
            image: '/res/Admin/43.svg',
            imageFallback: '/res/Admin/43.svg',
            bio: "An award-winning Indian architect and designer known for his luxurious and innovative designs. In 2024, he made his international debut at Fuori Salone in Milan, showcasing his \"Chaise Lounge\", a collaborative creation with the renowned Italian brand Serafini.\n\nBeyond his architectural work, he engages audiences through his popular YouTube podcast, Shu Khabar, where he explores design, creativity, and industry insights.",
            social: {}
        },
        {
            id: 8,
            name: 'Sachin Parikh',
            role: 'Co-Founder, HyugaLife',
            image: '/res/Admin/47.svg',
            imageFallback: '/res/Admin/47.svg',
            bio: "A strategic business leader, Sachin has played a key role in India's startup ecosystem. Former CFO of Nykaa, he later co-founded HyugaLife, India's leading protein and supplement platform.\n\nHis expertise in direct-to-consumer ventures and financial strategy has made him a respected figure in the Indian business community.",
            social: {}
        },
        {
            id: 9,
            name: 'Jitendra Chouksey',
            role: 'Founder & CEO, Fittr',
            image: '/res/Admin/37.svg',
            imageFallback: '/res/Admin/37.svg',
            bio: "A leading name in India's fitness industry, Jitendra is the Founder & CEO of Fittr, a platform that has transformed over 300,000 lives.\n\nHis work in health and wellness has made him one of India's top fitness experts, inspiring many to lead healthier lives.",
            social: {}
        }
    ]
};

const Speakers = () => {
    const [currentYear, setCurrentYear] = useState('24-25');
    const [hoveredSpeaker, setHoveredSpeaker] = useState(null);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const handleMouseEnter = (speaker) => {
        setHoveredSpeaker(speaker);
    };

    const handleMouseLeave = () => {
        setHoveredSpeaker(null);
    };

    const openPanel = (speaker) => {
        setSelectedSpeaker(speaker);
    };

    const closePanel = () => {
        setSelectedSpeaker(null);
    };

    return (
        <div className="speakers-interactive">
            <div className="speakers-interactive__header">
                <div className="rectangle"></div>
                <h1>Meet Our Speakers</h1>

                <div className="speakers-interactive__year-selector">
                    <div className={`dropdown ${isYearDropdownOpen ? 'active' : ''}`} onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}>
                        <div className="dropdown-selected">{currentYear === '24-25' ? '24 - 25' : '23 - 24'}</div>
                        <div className="dropdown-list">
                            <div className="dropdown-option" onClick={() => setCurrentYear('24-25')}>24 - 25</div>
                            <div className="dropdown-option" onClick={() => setCurrentYear('23-24')}>23 - 24</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="speakers-split">
                <div className="speakers-list-col">
                    {speakersData[currentYear].map((speaker, index) => (
                        <div
                            key={speaker.id}
                            className={`speaker-list-item ${hoveredSpeaker?.id === speaker.id ? 'active' : ''}`}
                            onMouseEnter={() => handleMouseEnter(speaker)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => openPanel(speaker)}
                        >
                            <span className="speaker-list-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="speaker-list-info">
                                <h3 className="speaker-list-name">{speaker.name}</h3>
                                <p className="speaker-list-role">{speaker.role}</p>
                            </div>
                            <span className="speaker-list-arrow">→</span>
                        </div>
                    ))}
                </div>

                <div className="speakers-preview-col" id="speakers-preview">
                    {!hoveredSpeaker && (
                        <div className="speakers-preview-default">
                            <img src="/res/logo.png" alt="TEDx DJSCE" onError={(e) => e.target.style.display = 'none'} />
                            <p>Hover over a speaker</p>
                        </div>
                    )}

                    {hoveredSpeaker && (
                        <div className="speaker-preview-image-container visible" onClick={() => openPanel(hoveredSpeaker)}>
                            <img
                                src={hoveredSpeaker.image}
                                alt={hoveredSpeaker.name}
                                onError={(e) => { e.target.src = hoveredSpeaker.imageFallback; }}
                            />
                            <div className="speaker-preview-overlay"></div>
                            <div className="speaker-preview-label">
                                <h3>{hoveredSpeaker.name}</h3>
                                <p>{hoveredSpeaker.role}</p>
                            </div>
                            <div className="speaker-preview-cta">
                                View Profile →
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`speaker-panel-backdrop ${selectedSpeaker ? 'open' : ''}`} onClick={closePanel}></div>

            <div className={`speaker-detail-panel ${selectedSpeaker ? 'open' : ''}`}>
                {selectedSpeaker && (
                    <>
                        <div className="panel-close-btn">
                            <button onClick={closePanel}>×</button>
                        </div>
                        <div className="panel-content">
                            <div className="panel-image-wrapper">
                                <img
                                    src={selectedSpeaker.image}
                                    alt={selectedSpeaker.name}
                                    onError={(e) => { e.target.src = selectedSpeaker.imageFallback; }}
                                />
                            </div>
                            <h2 className="panel-speaker-name">{selectedSpeaker.name}</h2>
                            <p className="panel-speaker-role">{selectedSpeaker.role}</p>
                            <div className="panel-divider"></div>
                            <div className="panel-speaker-bio">
                                {selectedSpeaker.bio.split('\n\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {selectedSpeaker.social && Object.keys(selectedSpeaker.social).length > 0 && (
                                <div className="panel-social-links">
                                    {selectedSpeaker.social.linkedin && (
                                        <a href={selectedSpeaker.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    )}
                                    {selectedSpeaker.social.instagram && (
                                        <a href={selectedSpeaker.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Speakers;
