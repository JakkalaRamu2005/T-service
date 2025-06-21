
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { 
  Briefcase, 
  User, 
  FileText,
  Bell,
  PenTool,
  UserCheck,
  GraduationCap,
  MessageCircle,
  Calendar,
  ChevronRight,
  ChevronDown,
  Building
} from 'lucide-react';

// Import service components
import { JobSeekerRegistration } from '@/components/employment/JobSeekerRegistration';
import { UnemploymentAllowanceApplications } from '@/components/employment/UnemploymentAllowanceApplications';
import { EmploymentExchangeCard } from '@/components/employment/EmploymentExchangeCard';
import { GovernmentJobNotifications } from '@/components/employment/GovernmentJobNotifications';
import { ResumeBuilderTools } from '@/components/employment/ResumeBuilderTools';

const mainServices = [
  {
    id: 'job-seeker-registration',
    title: 'Job Seeker Registration',
    description: 'Register as a job seeker with your profile details',
    icon: User,
    color: 'bg-blue-500',
    popular: true
  },
  {
    id: 'unemployment-allowance',
    title: 'Unemployment Allowance Applications',
    description: 'Apply for unemployment benefits and allowances',
    icon: FileText,
    color: 'bg-green-500',
    popular: true
  },
  {
    id: 'employment-exchange-card',
    title: 'Employment Exchange Card',
    description: 'Apply for and track employment exchange card',
    icon: UserCheck,
    color: 'bg-purple-500',
    popular: true
  },
  {
    id: 'government-job-notifications',
    title: 'Government Job Notifications',
    description: 'View latest government job openings',
    icon: Bell,
    color: 'bg-orange-500',
    popular: true
  },
  {
    id: 'resume-builder-tools',
    title: 'Resume Builder Tools',
    description: 'Create professional resumes with our tools',
    icon: PenTool,
    color: 'bg-indigo-500',
    popular: false
  }
];

const additionalServices = [
  {
    id: 'skill-training-enrollment',
    title: 'Skill Training Enrollment',
    description: 'Enroll in government skill development programs',
    icon: GraduationCap,
    color: 'bg-teal-500'
  },
  {
    id: 'career-counselling',
    title: 'Career Counselling Sessions',
    description: 'Book sessions with career counselors',
    icon: MessageCircle,
    color: 'bg-pink-500'
  },
  {
    id: 'employment-certificate',
    title: 'Employment Certificate',
    description: 'Get employment verification certificates',
    icon: FileText,
    color: 'bg-cyan-500'
  },
  {
    id: 'job-fairs',
    title: 'Job Fairs/Drive Listings',
    description: 'Find upcoming job fairs and recruitment drives',
    icon: Calendar,
    color: 'bg-amber-500'
  }
];

const EmploymentServices = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();

  const handleServiceClick = (serviceId: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to access this service');
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedService(serviceId);
  };

  const renderServiceComponent = () => {
    if (!selectedService) return null;

    switch (selectedService) {
      case 'job-seeker-registration':
        return <JobSeekerRegistration onClose={() => setSelectedService(null)} />;
      case 'unemployment-allowance':
        return <UnemploymentAllowanceApplications onClose={() => setSelectedService(null)} />;
      case 'employment-exchange-card':
        return <EmploymentExchangeCard onClose={() => setSelectedService(null)} />;
      case 'government-job-notifications':
        return <GovernmentJobNotifications onClose={() => setSelectedService(null)} />;
      case 'resume-builder-tools':
        return <ResumeBuilderTools onClose={() => setSelectedService(null)} />;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                Employment Services
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive employment services and opportunities provided by the Government of Telangana
            </p>
          </div>

          {/* Main Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Building className="w-6 h-6 mr-2 text-blue-600" />
              Main Services
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {service.popular && (
                          <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-700 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="text-sm font-medium">Access Service</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Additional Services */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                Additional Services
              </h2>
              <Button
                onClick={() => setShowAdditionalServices(!showAdditionalServices)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                {showAdditionalServices ? (
                  <>
                    Show Less <ChevronDown className="w-4 h-4 ml-2 rotate-180" />
                  </>
                ) : (
                  <>
                    View More <ChevronDown className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {showAdditionalServices && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card 
                      key={service.id}
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform w-fit mb-2`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-base font-semibold group-hover:text-blue-700 transition-colors">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="text-sm font-medium">Access</span>
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Service Information */}
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Required Documents</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Aadhaar Card</li>
                  <li>• Educational Certificates</li>
                  <li>• Experience Certificates</li>
                  <li>• Recent Photographs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Contact Support</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Helpline: +91-40-2345-6790</p>
                  <p>Email: employment@telangana.gov.in</p>
                  <p>Hours: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        {renderServiceComponent()}
      </div>
    </PageTransition>
  );
};

export default EmploymentServices;
