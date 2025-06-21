
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularServices } from '@/components/PopularServices';
import { Schemes } from '@/components/Schemes';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main>
          <HeroSection onGetStarted={scrollToServices} />
          <div id="services">
            <PopularServices />
          </div>
          <div id="schemes">
            <Schemes />
          </div>
        </main>

        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </PageTransition>
  );
};

export default Index;
