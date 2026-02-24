import React, { useState, useEffect } from 'react';
import './Team.css';

const teamData = {
    '25-26': [
        {
            department: 'Leadership',
            members: [
                { name: 'Shubh Selugar', role: 'Chairperson', img: '/res/Admin/Shubh Selugar.png', desc: 'Meet the heart and vision of TEDxDJSCE—our Chairperson, Shubh Selugar, whose leadership and passion inspire the team to bring ideas worth spreading to life!' },
                { name: 'Eric Kurissery', role: 'Co-Chair Person', img: '/res/Admin/Eric Kuriserry.png', desc: 'Our Co-Chairperson, Eric Kurissery, guiding TEDxDJSCE with clarity and dedication, ensuring every initiative reaches its full potential.' },
                { name: 'Manav Doshi', role: 'Administrator', img: '/res/Admin/Manav Doshi.png', desc: 'The organizational mastermind behind the scenes—Manav Doshi keeps everything on track, turning challenges into seamless execution.' }
            ]
        },
        {
            department: 'Curators',
            members:[
                { name: 'Maanya Shah', role: 'Chief Curator', img: '/res/Admin/Maanya Shah.png', desc: 'The guiding mind behind our speaker selection, Maanya Shah ensures every talk is impactful, thought-provoking, and unforgettable.' },
                { name: 'Shubham Gala', role: 'Chief Curator', img: '/res/Admin/Shubham Gala.png', desc: 'Shubham Gala brings meticulous insight and creativity to curate TEDx talks that inspire, challenge, and engage our audience.' },
            ]
        },
        {
            department: 'Events',
            members: [
                { name: 'Vishv Shah', role: 'Executive Producer', img: '/res/Admin/Vishv Shah.png', desc: 'Meet the driving force orchestrating every TEDx event—Vishv Shah ensures every detail is executed flawlessly, creating unforgettable experiences.' },
                { name: 'Krish Sorathia', role: 'Event Manager', img: '/res/Admin/Krish Sorathia.png', desc: 'Our Event Manager, Krish Sorathia, transforms ideas into experiences, making sure every TEDx moment is memorable and impactful.' },
            ]
        },
        {
            department: 'Content',
            members: [
                { name: 'Vedang Kakade', role: 'Content Head', img: '/res/Admin/Vedang Kakade.png', desc: 'The wordsmith shaping TEDxDJSCE narratives—Vedang Kakade crafts content that informs, inspires, and resonates with every audience member.' },
                { name: 'Yash Kehalkar', role: 'Content Head', img: '/res/Admin/Yash Kehalkar.png', desc: 'Yash Kehalkar ensures our content speaks volumes, creating narratives that ignite curiosity and spark meaningful conversations.' },
            ]
        },
        {
            department: 'Creatives & Video Production',
            members: [
                { name: 'Rachit Chotalia', role: 'Creatives & Design Head', img: '/res/Admin/Rachit Chotalia.png', desc: 'The creative genius behind TEDxDJSCE visuals—Rachit Chotalia designs experiences that are as stunning as they are memorable.' },
                { name: 'Khushal Patel', role: 'Video Production Head', img: '/res/Admin/Khushal Patel.png', desc: 'Khushal Patel captures TEDx moments with precision and artistry, turning every frame into a story that lasts beyond the stage.' }
            ]
        },
        {
            department: 'Public Relations',
            members: [
                { name: 'Yesha Shah', role: 'Public Relations Head', img: '/res/Admin/Yesha Shah.png', desc: 'Our voice to the world—Yesha Shah amplifies TEDxDJSCE’s message, connecting ideas with communities far and wide.' },
                { name: 'Dhruvil Shah', role: 'Public Relations Head', img: '/res/Admin/Dhruvil Shah.png', desc: 'Dhruvil Shah strengthens our outreach, ensuring TEDxDJSCE ideas reach, inspire, and resonate with audiences everywhere.' },
            ]
        },
        {
            department: 'Marketing',
            members: [
                { name: 'Jui Jagtap', role: 'Marketing Head', img: '/res/Admin/Jui Jagtap.png', desc: 'The driving force behind TEDxDJSCE’s connections—Jui Jagtap builds strong relationships and campaigns that amplify our impact.' },
                { name: 'Kashissh Agrawal', role: 'Marketing Head', img: '/res/Admin/Kashissh Agrawal.png', desc: 'Kashissh Agrawal crafts marketing strategies that capture attention, build engagement, and drive the TEDx experience forward.' },
            ]
        },
        {
            department: 'Finance',
            members: [
                { name: 'Moksh Jain', role: 'Finance Head', img: '/res/Admin/Moksh Jain.png', desc: 'The strategic mind managing resources—Moksh Jain ensures every initiative is sustainable, efficient, and impactful.' },
                { name: 'Kartik Sunil', role: 'Finance Head', img: '/res/Admin/Kartik Sunil.png', desc: 'Kartik Sunil keeps TEDxDJSCE financially agile, making sure every idea is backed by solid planning and support.' },
            ]
        },
        {
            department: 'Technical',
            members: [
                { name: 'Meet Gudhka', role: 'Technical Head', img: '/res/Admin/Meet Gudhka.png', desc: 'The tech mastermind behind our digital presence—Meet Gudhka ensures our website and platforms run smoothly, creating a seamless experience.' },
                { name: 'Manav Parekh', role: 'Technical Head', img: '/res/Admin/Manav Parekh.png', desc: 'Manav Parekh brings innovation and precision to all things technical, powering TEDxDJSCE’s online and offline operations.' },
            ]
        }
    ],
    '24-25': [
        {
            department: 'Leadership',
            members: [
                { name: 'Harshil Khara', role: 'Chairperson', img: '/res/Admin/19.png', desc: 'Meet the heart and soul of our TEDx journey—our Chairperson, Harshil Khara, whose passion, vision, and drive inspire us all to reach new heights!' },
                { name: 'Vinil Shah', role: 'Administrator', img: '/res/Admin/20.png', desc: 'Say hello to the organizational genius behind the scenes—our Administrator, Vinil Shah, ensuring everything stays on track while keeping the chaos under control!' },
            ]
        },
        {
            department: 'Curators',
            members: [
                { name: 'Shami Shrivastava', role: 'Chief Curator', img: '/res/Admin/28.png', desc: 'Meet the brilliant minds behind our speaker selection, our Curator, Shami Shrivastava, ensuring each talk inspires, challenges, and leaves a lasting impact!' },
                { name: 'Saniyaa B. Shetty', role: 'Chief Curator', img: '/res/Admin/29.png', desc: 'Meet the brilliant minds behind our speaker selection, our Curator, Saniyaa Shetty, ensuring each talk inspires, challenges, and leaves a lasting impact!' }
            ]
        },
        {
            department: 'Events',
            members: [
                { name: 'Charvi Muthreja', role: 'Executive Producer', img: '/res/Admin/23.png', desc: 'Say hello to the dynamic producers who bring everything together—our Executive Producer, Charvi Muthreja, ensuring that every detail, from start to finish, is executed flawlessly!' },
                { name: 'Aditya Naik', role: 'Event Manager', img: '/res/Admin/35.png', desc: 'Meet the master planner orchestrating every detail—our Event Manager, Aditya Naik, the person who turns ideas into reality and creates unforgettable experiences for all!' },
                { name: 'Mahek Shah', role: 'Executive Producer', img: '/res/Admin/22.png', desc: 'Say hello to the dynamic producers who bring everything together—our Executive Producer, Mahek Shah, ensuring that every detail, from start to finish, is executed flawlessly!' }
            ]
        },
        {
            department: 'Content',
            members: [
                { name: 'Ananya Godse', role: 'Content Head', img: '/res/Admin/36.png', desc: 'Introducing the wordsmith behind every powerful message—our Content Head, Ananya Godse, shaping narratives that inspire, engage, and spark meaningful conversations!' },
            ]
        },
        {
            department: 'Creatives & Video Production',
            members: [
                { name: 'Param Chheda', role: 'Video Production Lead', img: '/res/Admin/30.png', desc: 'Meet the storytellers behind the camera—our Video Production Lead, Param Chheda, capturing each moment with precision and creativity!' },
                { name: 'Jinit Mehta', role: 'Creatives Head', img: '/res/Admin/21.png', desc: 'Say hello to the creative force behind our stunning visuals—our Creative & Design Head, Jinit Mehta, who crafts a visual identity that captivates and inspires!' },
                { name: 'Vedant Taware', role: 'Video Production Lead', img: '/res/Admin/31.png', desc: 'Meet the storytellers behind the camera—our Video Production Lead, Vedant Taware, capturing each moment with precision and creativity!' },
            ]
        },
        {
            department: 'Public Relations',
            members: [
                { name: 'Tanish Bagadia', role: 'Public Relations Head', img: '/res/Admin/26.png', desc: 'Meet the communication experts behind our buzz—our Public Relations Head, Tanish Bagadia, amplifying our voice and bringing TEDxDJSCE to the world\'s attention!' },
                { name: 'Prassidhi Agarwal', role: 'Public Relations Head', img: '/res/Admin/27.png', desc: 'Meet the communication experts behind our buzz—our Public Relations Head, Prassidhi Agarwal, amplifying our voice and bringing TEDxDJSCE to the world\'s attention!' },
            ]
        },
        {
            department: 'Marketing',
            members: [
                { name: 'Priyanshi Jain', role: 'Marketing Head', img: '/res/Admin/25.png', desc: 'Introducing the powerhouse behind our marketing rizz—our Marketing Head, Priyanshi Jain, building strong connections and securing support that drives TEDxDJSCE forward!' },
                { name: 'Vrund Shah', role: 'Marketing Head', img: '/res/Admin/24.png', desc: 'Introducing the powerhouse behind our marketing rizz—our Marketing Head, Vrund Shah, building strong connections and securing support that drives TEDxDJSCE forward!' },
            ]
        },
        {
            department: 'Finance',
            members: [
                { name: 'Astu Mehta', role: 'Finance Head', img: '/res/Admin/32.png', desc: 'Introducing the financial strategists keeping everything in check—our Finance Head, Astu Mehta, ensuring every resource is used wisely to bring TEDxDJSCE to life!' },
                { name: 'Manav Makwana', role: 'Finance Head', img: '/res/Admin/33.png', desc: 'Introducing the financial strategists keeping everything in check—our Finance Head, Manav Makwana, ensuring every resource is used wisely to bring TEDxDJSCE to life!' },
            ]
        },
        {
            department: 'Technical',
            members: [
                { name: 'Varun Vyas', role: 'Technical Head', img: '/res/Admin/34.png', desc: 'Meet the tech mastermind behind the website and ensuring everything runs smoothly—our Technical Head, Varun Vyas, always ready to tackle any challenge and make the event an amazing experience!' },
            ]
        }
    ],
    '23-24': [
        {
            department: 'Leadership',
            members: [
                { name: 'Raj Panchal', role: 'Chairperson', img: '/res/Admin/1.png', desc: 'Meet the heart and soul of our TEDx journey—our Chairperson, Raj Panchal, whose passion, vision, and drive inspire us all to reach new heights!' },
                { name: 'Kushi Shah', role: 'Administrator', img: '/res/Admin/2.png', desc: 'Say hello to the organizational genius behind the scenes—our Administrator, Kushi Shah, ensuring everything stays on track while keeping the chaos under control!' },
            ]
        },
        {
            department: 'Curators',
            members: [
                { name: 'Darsheel Sanghvi', role: 'Chief Curator', img: '/res/Admin/7.png', desc: 'Meet the brilliant minds behind our speaker selection—our Chief Curator, Darsheel Sanghvi, ensuring each talk inspires, challenges, and leaves a lasting impact!' },
                { name: 'Omar Shaikh', role: 'Chief Curator', img: '/res/Admin/8.png', desc: 'Meet the brilliant minds behind our speaker selection—our Chief Curator, Omar Shaikh, ensuring each talk inspires, challenges, and leaves a lasting impact!' }
            ]
        },
        {
            department: 'Events',
            members: [
                { name: 'Shrenik Khot', role: 'Event Manager', img: '/res/Admin/17.png', desc: 'Meet the master planner orchestrating every detail—our Event Manager, Shrenik Khot, turning ideas into reality and creating unforgettable experiences!' },
                { name: 'Parth Patva', role: 'Event Manager', img: '/res/Admin/18.png', desc: 'Meet the master planner orchestrating every detail—our Event Manager, Parth Patva, turning ideas into reality!' },
            ]
        },
        {
            department: 'Executive Producers',
            members: [
                { name: 'Tirth Nisar', role: 'Executive Producer', img: '/res/Admin/9.png', desc: 'Say hello to the dynamic producers who bring everything together—our Executive Producer, Tirth Nisar, ensuring every detail is executed flawlessly!' },
                { name: 'Divyam', role: 'Executive Producer', img: '/res/Admin/10.png', desc: 'Say hello to the dynamic producers who bring everything together—our Executive Producer, Divyam, ensuring every detail is executed flawlessly!' },
            ]
        },
        {
            department: 'Content',
            members: [
                { name: 'Keya', role: 'Content Head', img: '/res/Admin/5.png', desc: 'Introducing the wordsmith behind every powerful message—our Content Head, Keya, shaping narratives that inspire!' },
                { name: 'Jay', role: 'Content Head', img: '/res/Admin/6.png', desc: 'Introducing the wordsmith behind every powerful message—our Content Head, Jay, shaping narratives that inspire!' }
            ]
        },
        {
            department: 'Creatives & Video Production',
            members: [
                { name: 'Meet Patel', role: 'Creative Head', img: '/res/Admin/12.png', desc: 'Say hello to the creative force behind our stunning visuals—our Creative Head, Meet Patel, who crafts a visual identity that captivates!' },
                { name: 'Kanika', role: 'Production Head', img: '/res/Admin/13.png', desc: 'Meet the storytellers behind the camera—our Production Head, Kanika, capturing each moment with precision and creativity!' }
            ]
        },
        {
            department: 'Public Relations',
            members: [
                { name: 'Hussain', role: 'PR Head', img: '/res/Admin/15.png', desc: 'Meet the communication experts behind our buzz—our PR Head, Hussain, amplifying our voice and bringing TEDxDJSCE to the world!' },
                { name: 'Vaidehi Shah', role: 'PR Head', img: '/res/Admin/16.png', desc: 'Meet the communication experts behind our buzz—our PR Head, Vaidehi Shah, amplifying our voice and bringing TEDxDJSCE to the world!' },
            ]
        },
        {
            department: 'Marketing',
            members: [
                { name: 'Vedant', role: 'Marketing Head', img: '/res/Admin/14.png', desc: 'Introducing the powerhouse behind our marketing—our Marketing Head, Vedant, building strong connections and securing support!' },
            ]
        },
        {
            department: 'Finance',
            members: [
                { name: 'Daxay Sanghvi', role: 'Finance Head', img: '/res/Admin/3.png', desc: 'Introducing the financial strategist keeping everything in check—our Finance Head, Daxay Sanghvi, ensuring every resource is used wisely!' },
                { name: 'Yash', role: 'Finance Head', img: '/res/Admin/4.png', desc: 'Introducing the financial strategist keeping everything in check—our Finance Head, Yash, ensuring every resource is used wisely!' },
            ]
        },
        {
            department: 'Technical',
            members: [
                { name: 'Khushi Jobanputra', role: 'Website Manager', img: '/res/Admin/11.png', desc: 'Meet the tech mastermind behind the website—our Website Manager, Khushi Jobanputra, ensuring everything runs smoothly online!' },
            ]
        }
    ]
};

const Team = () => {
    const [activeYear, setActiveYear] = useState('25-26');
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.05,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        const deptBlocks = document.querySelectorAll('.team-v2-department');
        const cards = document.querySelectorAll('.team-v2-card');

        deptBlocks.forEach((dept) => observer.observe(dept));
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [activeYear]);

    const openModal = (member, deptName) => {
        setSelectedMember({ ...member, department: deptName });
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    return (
        <div className="team-section-v2">
            <div className="team-v2-container">
                <div className="team-v2-header">
                    <h1 className="team-v2-title">The <span>Team</span></h1>
                    <p className="team-v2-subtitle">The minds behind the magic</p>
                </div>

                <div className="team-v2-year-tabs">
                    <button
                        className={`team-v2-year-tab ${activeYear === '25-26' ? 'active' : ''}`}
                        onClick={() => setActiveYear('25-26')}
                    >2025 - 26</button>
                    <button
                        className={`team-v2-year-tab ${activeYear === '24-25' ? 'active' : ''}`}
                        onClick={() => setActiveYear('24-25')}
                    >2024 – 25</button>
                    <button
                        className={`team-v2-year-tab ${activeYear === '23-24' ? 'active' : ''}`}
                        onClick={() => setActiveYear('23-24')}
                    >2023 – 24</button>
                </div>

                <div className="team-v2-year-content active">
                    {teamData[activeYear].map((dept, deptIdx) => (
                        <div key={deptIdx} className="team-v2-department">
                            <h2 className="team-v2-dept-title">{dept.department}</h2>
                            <div className="team-v2-grid">
                                {dept.members.map((member, memIdx) => (
                                    <div
                                        key={memIdx}
                                        className="team-v2-card"
                                        onClick={() => openModal(member, dept.department)}
                                    >
                                        <div className="team-v2-img-wrap">
                                            <img src={member.img} alt={member.name} className="team-v2-img" loading="lazy" />
                                        </div>
                                        <h3 className="team-v2-name">{member.name}</h3>
                                        <p className="team-v2-role">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedMember && (
                <div className={`team-v2-modal-overlay active`} onClick={closeModal}>
                    <div className="team-v2-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="team-v2-modal-close" onClick={closeModal}>&times;</button>
                        <div className="team-v2-modal-img-wrap">
                            <img className="team-v2-modal-img" src={selectedMember.img} alt={selectedMember.name} />
                        </div>
                        <h3 className="team-v2-modal-name">{selectedMember.name}</h3>
                        <p className="team-v2-modal-role">{selectedMember.role}</p>
                        <p className="team-v2-modal-dept">{selectedMember.department}</p>
                        <div className="team-v2-modal-divider"></div>
                        <p className="team-v2-modal-desc">{selectedMember.desc}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;
