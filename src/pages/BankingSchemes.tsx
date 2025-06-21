
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { PageTransition } from '@/components/PageTransition';
import { BankingSchemesList } from '@/components/banking/BankingSchemesList';
import { BankingSchemeModal } from '@/components/banking/BankingSchemeModal';
import { BankingApplicationForm } from '@/components/banking/BankingApplicationForm';
import { BankingApplicationStatus } from '@/components/banking/BankingApplicationStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export interface BankingScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string[];
  documents: string[];
  coverage?: string;
  benefits?: string[];
  type?: 'insurance' | 'course' | 'skilling' | 'banking' | 'general';
}

const BankingSchemes = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<BankingScheme | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showApplicationStatus, setShowApplicationStatus] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSchemeSelect = (scheme: BankingScheme) => {
    setSelectedScheme(scheme);
  };

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleFormSubmit = (applicationId: string) => {
    setApplicationId(applicationId);
    setShowApplicationForm(false);
    setShowApplicationStatus(true);
  };

  const handleCloseModal = () => {
    setSelectedScheme(null);
    setShowApplicationForm(false);
    setShowApplicationStatus(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Back to Home Button */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-4 text-purple-600 hover:text-purple-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
              Banking, Financial Services & Insurance Schemes
            </h1>
            
            <BankingSchemesList onSchemeSelect={handleSchemeSelect} />
          </div>
        </main>

        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        
        {selectedScheme && !showApplicationForm && !showApplicationStatus && (
          <BankingSchemeModal 
            scheme={selectedScheme} 
            onClose={handleCloseModal}
            onApplyNow={handleApplyNow}
          />
        )}
        
        {showApplicationForm && selectedScheme && (
          <BankingApplicationForm 
            scheme={selectedScheme}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        )}
        
        {showApplicationStatus && applicationId && (
          <BankingApplicationStatus 
            applicationId={applicationId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default BankingSchemes;
