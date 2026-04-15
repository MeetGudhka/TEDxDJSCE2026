import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import hitenLulla from '../assets/Speakers/Hiten Lulla.png';
import naveliDeshmukh from '../assets/Speakers/Naveli Deshmukh.png';
import ratneshVerma from '../assets/Speakers/Ratnesh Verma.png';
import rajThakkar from '../assets/Speakers/Raj Thakkar.png';
import aryanGandhi from '../assets/Speakers/Aryan Gandhi.png';
import drAjayPrabhakar from '../assets/Speakers/Dr. Ajay Prabhakar.png';
import anupSoni from '../assets/Speakers/Anup Soni.png';
import drHariVasudevan from '../assets/Speakers/Dr. Hari Vasudevan.png';
import jagjyotSingh from '../assets/Speakers/Jagjyot Singh.png';
import './SpeakerSlider.css';

gsap.registerPlugin(Draggable);

const SpeakerSlider = () => {
    const ringRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const modalOverlayRef = useRef(null);
    const closeBtnRef = useRef(null);
    
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const autoRotateRef = useRef(null);

    const speakers = [
        { 
            name: "Hiten Lulla", 
            topic: "Digital Transformation & Storytelling", 
            img: hitenLulla, 
            bio: "Hiten Lulla is a dynamic entrepreneur and business leader known for his innovative approach in the media and entertainment industry. With a strong background in digital transformation and storytelling, he has played a key role in shaping modern content experiences and engaging audiences at scale." 
        },
        { 
            name: "Naveli Deshmukh", 
            topic: "Youth Empowerment & Social Impact", 
            img: naveliDeshmukh, 
            bio: "Naveli Deshmukh is an emerging voice in the space of youth empowerment and social impact. Through her work, she focuses on inspiring young individuals to pursue purpose-driven careers and contribute meaningfully to society." 
        },
        { 
            name: "Ratnesh Verma", 
            topic: "Last-Mile Logistics Innovation", 
            img: ratneshVerma, 
            bio: "Ratnesh Verma is the CEO of Pidge, a logistics and delivery solutions company revolutionizing last-mile delivery. With expertise in operations and scalable business models, he is driving innovation in urban logistics and building efficient delivery ecosystems." 
        },
        { 
            name: "Raj Thakkar", 
            topic: "Beverage Brand Building & Consumer Trends", 
            img: rajThakkar, 
            bio: "Raj Thakkar is a founder of DRNK, a fast-growing beverage brand redefining the way people experience drinks. His entrepreneurial journey reflects creativity, brand-building excellence, and a deep understanding of consumer trends." 
        },
        { 
            name: "Aryan Gandhi", 
            topic: "Entrepreneurship & Innovation", 
            img: aryanGandhi, 
            bio: "Aryan Gandhi is a founder of DRNK, a fast-growing beverage brand redefining the way people experience drinks. His entrepreneurial journey reflects creativity, brand-building excellence, and a deep understanding of consumer trends." 
        },
        { 
            name: "Dr. Ajay Prabhakar", 
            topic: "Healthcare Innovation & Patient Care", 
            img: drAjayPrabhakar, 
            bio: "Dr. Ajay Prabhakar is a distinguished professional known for his contributions in the field of medicine and healthcare innovation. With years of experience and research, he has been actively involved in improving patient care and advancing medical practices." 
        },
        { 
            name: "Anup Soni", 
            topic: "Social Awareness Through Media", 
            img: anupSoni, 
            bio: "Anup Soni is a renowned actor and television host, best known for his impactful role as the host of Crime Patrol. Through his work, he has raised awareness about real-life social issues and brought important conversations to mainstream audiences." 
        },
        { 
            name: "Dr. Hari Vasudevan", 
            topic: "Education Leadership & Innovation", 
            img: drHariVasudevan, 
            bio: "Dr. Hari Vasudevan is the Principal of Dwarkadas J. Sanghvi College of Engineering and a respected academician. Known for his leadership and vision in education, he has been instrumental in fostering innovation, research, and holistic development among students." 
        },
        { 
            name: "Jagjyot Singh", 
            topic: "Mindset, Growth & Modern Challenges", 
            img: jagjyotSingh, 
            bio: "Jagjyot Singh is an internet personality known for his engaging content around mindset, personal growth, and modern-day challenges. Through his digital presence, he connects with a wide audience and inspires individuals to think differently and take action in their lives." 
        }
    ];

    const count = speakers.length;
    const radius = 500;
    const angleStep = 360 / count;

    useEffect(() => {
        // Create 3D cards in the ring
        if (ringRef.current && ringRef.current.children.length === 0) {
            speakers.forEach((speaker, i) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.zIndex = Math.round((Math.cos((i * angleStep) * Math.PI / 180)) * 1000) + 1000;
                
                gsap.set(card, {
                    rotationY: i * angleStep,
                    transformOrigin: `50% 50% ${-radius}px`,
                    z: radius
                });

                card.innerHTML = `
                    <img src="${speaker.img}" alt="${speaker.name}" />
                    <div class="card-info">
                        <h3>${speaker.name}</h3>
                        <p>${speaker.topic}</p>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    if (!isDragging) {
                        setSelectedSpeaker(speaker);
                        openModal(speaker);
                    }
                });

                ringRef.current.appendChild(card);
            });
        }

        // Setup dragging
        Draggable.create(sliderWrapperRef.current, {
            type: "x",
            onDragStart: () => { 
                setIsDragging(true);
            },
            onDrag: function() {
                const newRotation = rotation + this.deltaX * 0.25;
                setRotation(newRotation);
                gsap.set(ringRef.current, { rotationY: newRotation });
            },
            onDragEnd: () => {
                setTimeout(() => { 
                    setIsDragging(false); 
                }, 50);
            }
        });

        // Auto rotate animation
        autoRotateRef.current = gsap.to(ringRef.current, {
            rotationY: "+=360",
            duration: 80,
            repeat: -1,
            ease: "none"
        });

        // Wheel event for rotation
        const handleWheel = (e) => {
            if (modalOverlayRef.current && modalOverlayRef.current.style.display === 'flex') return;
            const newRotation = rotation - e.deltaY * 0.1;
            setRotation(newRotation);
            gsap.to(ringRef.current, { 
                rotationY: newRotation,
                duration: 1.2,
                ease: "power2.out"
            });
        };

        window.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isDragging, rotation]);

    const openModal = (speaker) => {
        if (autoRotateRef.current) {
            autoRotateRef.current.pause();
        }
        
        gsap.to(modalOverlayRef.current, { 
            opacity: 1, 
            duration: 0.4,
            onStart: () => {
                modalOverlayRef.current.style.display = 'flex';
            }
        });

        gsap.from(".detail-card", { 
            scale: 0.8, 
            y: 50, 
            opacity: 0, 
            duration: 0.6, 
            ease: "back.out(1.7)" 
        });
    };

    const closeModal = () => {
        gsap.to(modalOverlayRef.current, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                modalOverlayRef.current.style.display = 'none';
                if (autoRotateRef.current) {
                    autoRotateRef.current.resume();
                }
            }
        });
    };

    return (
        <div className="speaker-slider-container">
            <div className="bg-glow"></div>

            <div className="header">
                <div className="tedx-logo">TED<span>x</span>Speakers</div>
                <div className="tagline">Ideas Worth Spreading</div>
            </div>

            {/* Modal Structure */}
            <div className="modal-overlay" ref={modalOverlayRef} onClick={(e) => e.target === modalOverlayRef.current && closeModal()}>
                <div className="detail-card">
                    <button className="close-btn" ref={closeBtnRef} onClick={closeModal}>&times;</button>
                    {selectedSpeaker && (
                        <>
                            <div className="detail-img-side">
                                <img src={selectedSpeaker.img} alt={selectedSpeaker.name} />
                            </div>
                            <div className="detail-info-side">
                                <div className="speaker-label">Featured Speaker</div>
                                <h2>{selectedSpeaker.name}</h2>
                                <p className="topic">{selectedSpeaker.topic}</p>
                                <p className="bio">{selectedSpeaker.bio}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="slider-wrapper" ref={sliderWrapperRef}>
                <div className="ring" ref={ringRef}></div>
            </div>
        </div>
    );
};

export default SpeakerSlider;
