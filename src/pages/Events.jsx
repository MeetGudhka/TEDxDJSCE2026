import EventsHero from '../components/EventsHero';
import MicTimeline from '../components/MicTimeline';
import EventGallery from '../components/EventGallery';
import { StarsBackground } from '../components/ui/stars-background';
import { ShootingStars } from '../components/ui/shooting-stars';

const Events = () => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-black">
            {/* Cosmic Background Layer */}
            <div className="fixed inset-0 z-0">
                <StarsBackground
                    starDensity={0.0022}
                    twinkleProbability={0.9}
                    minTwinkleSpeed={0.3}
                    maxTwinkleSpeed={0.8}
                />
                <ShootingStars
                    starColor="#dc2626"
                    trailColor="#ef4444"
                    minSpeed={25}
                    maxSpeed={45}
                    minDelay={1000}
                    maxDelay={3000}
                    starWidth={15}
                    starHeight={3}
                />
            </div>

            {/* Main Content Layer */}
            <div className="relative z-10">
                {/* Hero Section with Video Intro */}
                <EventsHero />

                {/* Timeline Section */}
                <MicTimeline />

                {/* Gallery Section */}
                <EventGallery />
            </div>
        </div>
    );
};

export default Events;
