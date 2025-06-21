
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { PageTransition } from '@/components/PageTransition';
import { ScholarshipServices } from '@/components/education/ScholarshipServices';
import { AdmissionServices } from '@/components/education/AdmissionServices';
import { TransferCertificates } from '@/components/education/TransferCertificates';
import { DigitalMarkSheets } from '@/components/education/DigitalMarkSheets';
import { ApplicationStatusTracker } from '@/components/education/ApplicationStatusTracker';
import { EducationSchemesList } from '@/components/education/EducationSchemesList';
import { EducationSchemeModal } from '@/components/education/EducationSchemeModal';
import { EducationApplicationForm } from '@/components/education/EducationApplicationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  School, 
  FileText, 
  Award, 
  CheckCircle,
  BookOpen,
  Users,
  Globe
} from 'lucide-react';

export interface EducationScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  highlight?: string;
  eligibility: string[];
  required_documents: string[];
  benefits: string[];
  funding_amount?: string;
  is_application_enabled: boolean;
  is_info_only: boolean;
  target_community?: string;
  external_link?: string;
  form_fields?: any;
  status_stages?: string[];
}

const EducationServices = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<EducationScheme | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showStatusTracker, setShowStatusTracker] = useState(false);
  const { t } = useLanguage();

  const services = [
    {
      id: 'schemes',
      title: 'Education Schemes & Scholarships',
      description: 'Browse and apply for various educational schemes and scholarships',
      icon: Award,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'scholarships',
      title: 'Scholarship Services',
      description: 'Apply for scholarships and track application status',
      icon: GraduationCap,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'admissions',
      title: 'School/College Admissions',
      description: 'Find and apply for admissions in educational institutions',
      icon: School,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600 bg-green-100'
    },
    {
      id: 'certificates',
      title: 'Transfer Certificates',
      description: 'Apply for and download transfer certificates',
      icon: FileText,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600 bg-orange-100'
    },
    {
      id: 'marksheets',
      title: 'Digital Mark Sheets',
      description: 'Access and download digital mark sheets',
      icon: BookOpen,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600 bg-indigo-100'
    },
    {
      id: 'status',
      title: 'Application Status Tracker',
      description: 'Track the status of your education-related applications',
      icon: CheckCircle,
      color: 'bg-teal-50 border-teal-200',
      iconColor: 'text-teal-600 bg-teal-100'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
  };

  const handleSchemeSelect = (scheme: EducationScheme) => {
    setSelectedScheme(scheme);
  };

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleFormSubmit = (applicationId: string) => {
    setShowApplicationForm(false);
    setShowStatusTracker(true);
  };

  const handleCloseModal = () => {
    setSelectedScheme(null);
    setShowApplicationForm(false);
    setActiveService(null);
    setShowStatusTracker(false);
  };

  const renderServiceContent = () => {
    switch (activeService) {
      case 'schemes':
        return <EducationSchemesList onSchemeSelect={handleSchemeSelect} />;
      case 'scholarships':
        return <ScholarshipServices onClose={handleCloseModal} />;
      case 'admissions':
        return <AdmissionServices onClose={handleCloseModal} />;
      case 'certificates':
        return <TransferCertificates onClose={handleCloseModal} />;
      case 'marksheets':
        return <DigitalMarkSheets onClose={handleCloseModal} />;
      case 'status':
        return <ApplicationStatusTracker onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <GraduationCap className="w-12 h-12 text-purple-600" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Education & Learning Services
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Access comprehensive educational services including scholarships, admissions, 
                certificates, and skill development programs in Telangana
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">21+</h3>
                  <p className="text-gray-600">Education Schemes</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">50,000+</h3>
                  <p className="text-gray-600">Students Benefited</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">₹500Cr+</h3>
                  <p className="text-gray-600">Scholarships Disbursed</p>
                </CardContent>
              </Card>
            </div>

            {/* Services Grid */}
            {!activeService && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card 
                      key={service.id}
                      className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${service.color}`}
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start space-x-3">
                          <div className={`p-3 rounded-lg ${service.iconColor}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                              {service.title}
                            </CardTitle>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Service Content */}
            {activeService && !selectedScheme && !showApplicationForm && !showStatusTracker && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {services.find(s => s.id === activeService)?.title}
                  </h2>
                  <Button variant="outline" onClick={handleCloseModal}>
                    Back to Services
                  </Button>
                </div>
                {renderServiceContent()}
              </div>
            )}
          </div>
        </main>

        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        
        {selectedScheme && !showApplicationForm && !showStatusTracker && (
          <EducationSchemeModal 
            scheme={selectedScheme} 
            onClose={handleCloseModal}
            onApplyNow={handleApplyNow}
          />
        )}
        
        {showApplicationForm && selectedScheme && (
          <EducationApplicationForm 
            scheme={selectedScheme}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        )}
        
        {showStatusTracker && (
          <ApplicationStatusTracker 
            onClose={handleCloseModal}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default EducationServices;
