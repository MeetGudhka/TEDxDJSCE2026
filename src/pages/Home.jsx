import React from 'react';
import videoBgLaptop from '../assets/Final-laptop-video.mp4';
import videoBgMobile from '../assets/Final-mobile-video.mp4';
import ComingSoon from '../components/ComingSoon';
import CountdownTimer from '../components/CountdownTimer';
import './Home.css';

const Home = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            {/* Hero Section */}
            <div className="VideoBG relative h-screen w-full overflow-hidden mb-15">
                {/* Desktop Video - Displayed on larger screens */}
                <video
                    autoPlay
                    muted
                    playsInline
                    className="video-laptop absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
                >
                    <source src={videoBgLaptop} type="video/mp4" />
                </video>

                {/* Mobile Video - Displayed on smaller screens */}
                <video
                    autoPlay
                    muted
                    playsInline
                    className="video-mobile absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
                >
                    <source src={videoBgMobile} type="video/mp4" />
                </video>

                {/* Overlay (Optional - for contrast) */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Hero Content - Can be minimal as requested, or just the video */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    {/* Content here if needed. For now, video is the focus as per "video displayed at beginning" */}
                </div>
            </div>

            {/* Main Content Section */}
            <div className="relative z-30 -mt-20 pb-20 px-4 md:px-8 space-y-20">
                <ComingSoon />
                <CountdownTimer targetDate="2026-04-21T09:00:00" />
            </div>
        </div>
    );
};

export default Home;
