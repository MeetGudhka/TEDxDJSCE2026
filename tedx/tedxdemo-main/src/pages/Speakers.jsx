import React, { useState } from 'react';
import './Speakers.css';
import hitenLulla from '../assets/Speakers/Hiten Lulla.png';
import naveliDeshmukh from '../assets/Speakers/Naveli Deshmukh.png';
import ratneshVerma from '../assets/Speakers/Ratnesh Verma.png';
import rajThakkar from '../assets/Speakers/Raj Thakkar.png';
import aryanGandhi from '../assets/Speakers/Aryan Gandhi.png';
import drAjayPrabhakar from '../assets/Speakers/Dr. Ajay Prabhakar.png';
import anupSoni from '../assets/Speakers/Anup Soni.png';
import drHariVasudevan from '../assets/Speakers/Dr. Hari Vasudevan.png';
import jagjyotSingh from '../assets/Speakers/Jagjyot Singh.png';

const speakersData = {
    '25-26': [
        {
            id: 1,
            name: 'Anup Soni',
            role: 'Social Awareness Through Media',
            image: anupSoni,
            imageFallback: anupSoni,
            bio: "Anup Soni is a renowned actor and television host, best known for his impactful role as the host of Crime Patrol. Through his work, he has raised awareness about real-life social issues and brought important conversations to mainstream audiences.",
            social: {}
        },
        {
            id: 2,
            name: 'Jagjyot Singh',
            role: 'Mindset, Growth & Modern Challenges',
            image: jagjyotSingh,
            imageFallback: jagjyotSingh,
            bio: "Jagjyot Singh is an internet personality known for his engaging content around mindset, personal growth, and modern-day challenges. Through his digital presence, he connects with a wide audience and inspires individuals to think differently and take action in their lives.",
            social: {}
        },
        {
            id: 3,
            name: 'Hiten Lulla',
            role: 'Digital Transformation & Storytelling',
            image: hitenLulla,
            imageFallback: hitenLulla,
            bio: "Hiten Lulla is a dynamic entrepreneur and business leader known for his innovative approach in the media and entertainment industry. With a strong background in digital transformation and storytelling, he has played a key role in shaping modern content experiences and engaging audiences at scale.",
            social: {}
        },
        {
            id: 4,
            name: 'Raj Thakkar',
            role: 'Beverage Brand Building & Consumer Trends',
            image: rajThakkar,
            imageFallback: rajThakkar,
            bio: "Raj Thakkar is a founder of DRNK, a fast-growing beverage brand redefining the way people experience drinks. His entrepreneurial journey reflects creativity, brand-building excellence, and a deep understanding of consumer trends.",
            social: {}
        },
        {
            id: 5,
            name: 'Aryan Thakkar',
            role: 'Entrepreneurship & Innovation',
            image: aryanGandhi,
            imageFallback: aryanGandhi,
            bio: "Aryan Thakkar is a founder of DRNK, a fast-growing beverage brand redefining the way people experience drinks. His entrepreneurial journey reflects creativity, brand-building excellence, and a deep understanding of consumer trends.",
            social: {}
        },
        {
            id: 6,
            name: 'Naveli Deshmukh',
            role: 'Youth Empowerment & Social Impact',
            image: naveliDeshmukh,
            imageFallback: naveliDeshmukh,
            bio: "Naveli Deshmukh is an emerging voice in the space of youth empowerment and social impact. Through her work, she focuses on inspiring young individuals to pursue purpose-driven careers and contribute meaningfully to society.",
            social: {}
        },
        {
            id: 7,
            name: 'Dr. Hari Vasudevan',
            role: 'Education Leadership & Innovation',
            image: drHariVasudevan,
            imageFallback: drHariVasudevan,
            bio: "Dr. Hari Vasudevan is the Principal of Dwarkadas J. Sanghvi College of Engineering and a respected academician. Known for his leadership and vision in education, he has been instrumental in fostering innovation, research, and holistic development among students.",
            social: {}
        },
        {
            id: 8,
            name: 'Dr. Ajay Prabhakar',
            role: 'Healthcare Innovation & Patient Care',
            image: drAjayPrabhakar,
            imageFallback: drAjayPrabhakar,
            bio: "Dr. Ajay Prabhakar is a distinguished professional known for his contributions in the field of medicine and healthcare innovation. With years of experience and research, he has been actively involved in improving patient care and advancing medical practices.",
            social: {}
        },
        {
            id: 9,
            name: 'Ratnesh Verma',
            role: 'Last-Mile Logistics Innovation',
            image: ratneshVerma,
            imageFallback: ratneshVerma,
            bio: "Ratnesh Verma is the CEO of Pidge, a logistics and delivery solutions company revolutionizing last-mile delivery. With expertise in operations and scalable business models, he is driving innovation in urban logistics and building efficient delivery ecosystems.",
            social: {}
        }
    ],
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
    const [currentYear, setCurrentYear] = useState('25-26');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animatingIndex, setAnimatingIndex] = useState(null);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const currentList = speakersData[currentYear] || [];

    const changeYear = (year) => {
        setCurrentYear(year);
        setCurrentIndex(0); // Reset book to start
        setAnimatingIndex(null);
        setIsYearDropdownOpen(false);
    };

    const nextSpeaker = () => {
        if (currentIndex <= currentList.length) {
            setAnimatingIndex(currentIndex);
            setCurrentIndex(prev => prev + 1);
            setTimeout(() => setAnimatingIndex(null), 900);
        }
    };

    const prevSpeaker = () => {
        if (currentIndex > 0) {
            setAnimatingIndex(currentIndex - 1);
            setCurrentIndex(prev => prev - 1);
            setTimeout(() => setAnimatingIndex(null), 900);
        }
    };

    return (
        <div className="speakers-page">
            <div className="speakers-header">
                <div className="header-title">
                    <div className="rectangle"></div>
                    <h1>Meet Our Speakers</h1>
                </div>

                <div className="year-selector">
                    <div className={`dropdown ${isYearDropdownOpen ? 'active' : ''}`} onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}>
                        <div className="dropdown-selected">
                            {currentYear === '25-26' ? '25 - 26' : currentYear === '24-25' ? '24 - 25' : '23 - 24'}
                        </div>
                        <div className="dropdown-list">
                            <div className="dropdown-option" onClick={(e) => { e.stopPropagation(); changeYear('25-26'); }}>25 - 26</div>
                            <div className="dropdown-option" onClick={(e) => { e.stopPropagation(); changeYear('24-25'); }}>24 - 25</div>
                            <div className="dropdown-option" onClick={(e) => { e.stopPropagation(); changeYear('23-24'); }}>23 - 24</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop 3D Book Layout */}
            <div className="book-container">
                <div className="book">
                    {/* Entire Book as a series of Flips (N+1 pages) */}
                    {Array.from({ length: currentList.length + 1 }).map((_, i) => {
                        const isPast = i < currentIndex;
                        let zIndex = isPast ? i : (currentList.length + 1) - i;
                        
                        // Fix animation clipping: Force the currently flipping page to the very top
                        // But keep it below the navbar (z-index 50)
                        if (animatingIndex === i) {
                            zIndex = 45;
                        }

                        const isFrontCover = i === 0;
                        const isBackCover = i === currentList.length;

                        return (
                            <div 
                                key={`flip-div-${i}`} 
                                className={`book-page ${isPast ? 'flipped' : ''}`}
                                style={{ zIndex }}
                            >
                                {/* Front Face: Right Side stack */}
                                <div className="page-front" onClick={nextSpeaker}>
                                    {isFrontCover ? (
                                        <div className="page-content right-page cover-page">
                                            <img src="/front-back.png" alt="Front Cover" className="cover-image" />
                                            <div className="page-nav hint-next">Open Book ➔</div>
                                        </div>
                                    ) : (
                                        <div className="page-content right-page text-page">
                                            <div className="speaker-details">
                                                <p className="speaker-role">{currentList[i-1].role}</p>
                                                <h2 className="speaker-name">{currentList[i-1].name}</h2>
                                                <div className="divider"></div>
                                                <div className="speaker-bio">
                                                    {currentList[i-1].bio.split('\n\n').map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                                                </div>
                                                {currentList[i-1].social && Object.keys(currentList[i-1].social).length > 0 && (
                                                    <div className="social-links">
                                                        {currentList[i-1].social.linkedin && <a href={currentList[i-1].social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                                                        {currentList[i-1].social.instagram && <a href={currentList[i-1].social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="page-nav hint-next">Click to Flip ➔</div>
                                        </div>
                                    )}
                                </div>

                                {/* Back Face: Left Side stack */}
                                <div className="page-back" onClick={prevSpeaker}>
                                    {isBackCover ? (
                                        <div className="page-content left-page cover-page">
                                            <img src="/front-back.png" alt="Back Cover" className="cover-image" />
                                            <div className="page-nav hint-prev">⬅ Close Book</div>
                                        </div>
                                    ) : (
                                        <div className="page-content left-page">
                                            <div className="speaker-image-wrapper">
                                                <img 
                                                    src={currentList[i].image} 
                                                    alt={currentList[i].name} 
                                                    onError={(e) => { e.target.src = currentList[i].imageFallback; }}
                                                />
                                            </div>
                                            <div className="page-nav hint-prev">⬅ Click to Flip</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Fallback View (Vertical List) */}
            <div className="mobile-speakers-list">
                <div className="mobile-speaker-card">
                    <img src="/front-back.png" alt="Front Cover" />
                </div>
                {currentList.map(speaker => (
                    <div key={speaker.id} className="mobile-speaker-card">
                        <img 
                            src={speaker.image} 
                            alt={speaker.name} 
                            onError={(e) => { e.target.src = speaker.imageFallback; }} 
                        />
                        <div className="mobile-speaker-details">
                            <p className="mobile-role">{speaker.role}</p>
                            <h2>{speaker.name}</h2>
                            <div className="divider"></div>
                            <div className="speaker-bio">
                                {speaker.bio.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                            {speaker.social && Object.keys(speaker.social).length > 0 && (
                                <div className="social-links">
                                    {speaker.social.linkedin && <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                                    {speaker.social.instagram && <a href={speaker.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
