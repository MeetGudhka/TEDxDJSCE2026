import HeroSection from "../components/about/HeroSection";
import WhatIsTedx from "../components/about/WhatIsTedx";
import WhatIsTedxDjsce from "../components/about/WhatIsTedxDjsce";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhatIsTedx />
      <WhatIsTedxDjsce />
    </main>
  );
};

export default About;
