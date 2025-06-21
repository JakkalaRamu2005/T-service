import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ViewLandRecords } from '@/components/dharani/ViewLandRecords';
import { MutationServices } from '@/components/dharani/MutationServices';
import { PassbookStatus } from '@/components/dharani/PassbookStatus';
import { FarmerLoanDetails } from '@/components/dharani/FarmerLoanDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, FileText, BookOpen, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dharani = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'view-records',
      title: 'View Land Records',
      description: 'Access your land records and property details',
      icon: MapPin,
      color: 'bg-green-500',
      component: ViewLandRecords
    },
    {
      id: 'mutation',
      title: 'Mutation Services',
      description: 'Apply for land mutation and transfer services',
      icon: FileText,
      color: 'bg-blue-500',
      component: MutationServices
    },
    {
      id: 'passbook',
      title: 'Passbook Status',
      description: 'Check your land passbook status and updates',
      icon: BookOpen,
      color: 'bg-purple-500',
      component: PassbookStatus
    },
    {
      id: 'loans',
      title: 'Farmer Loan Details',
      description: 'View and manage your agricultural loan information',
      icon: CreditCard,
      color: 'bg-orange-500',
      component: FarmerLoanDetails
    }
  ];

  const ActiveComponent = activeService 
    ? services.find(s => s.id === activeService)?.component 
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
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

          {!activeService ? (
            <>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-green-100 rounded-full mr-4">
                    <MapPin className="w-12 h-12 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800">Dharani Portal</h1>
                    <p className="text-xl text-gray-600 mt-2">Land Records & Revenue Services</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                      onClick={() => setActiveService(service.id)}
                    >
                      <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Access Service
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <Button
                variant="ghost"
                onClick={() => setActiveService(null)}
                className="mb-6 text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
              {ActiveComponent && <ActiveComponent />}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dharani;
