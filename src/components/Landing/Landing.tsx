import React from 'react';
import HeroSection from './HeroSection';
import CardsSection from './CardsSection';
import ImageSwitcher from './ImageSwitcher';


const Landing = () => {
    return (
        <div>
            <HeroSection />
            <CardsSection />
            <ImageSwitcher />
        </div>
    );
};

export default Landing;