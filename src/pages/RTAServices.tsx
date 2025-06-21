import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { DrivingLicense } from '@/components/rta/DrivingLicense';
import { LearnerLicenseBooking } from '@/components/rta/LearnerLicenseBooking';
import { RoadTaxPayment } from '@/components/rta/RoadTaxPayment';
import { ChallanPayment } from '@/components/rta/ChallanPayment';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, CreditCard, FileCheck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RTAServices = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'driving-license',
      title: 'Driving License Services',
      description: 'Apply for new license, renewal, and other DL services',
      icon: Car,
      color: 'bg-blue-500',
      component: DrivingLicense
    },
    {
      id: 'learner-license',
      title: 'Learner License Booking',
      description: 'Book slot for learner license test',
      icon: FileCheck,
      color: 'bg-green-500',
      component: LearnerLicenseBooking
    },
    {
      id: 'road-tax',
      title: 'Road Tax Payment',
      description: 'Pay vehicle road tax online',
      icon: CreditCard,
      color: 'bg-purple-500',
      component: RoadTaxPayment
    },
    {
      id: 'challan-payment',
      title: 'Traffic Challan Payment',
      description: 'Pay traffic violations and challans',
      icon: AlertTriangle,
      color: 'bg-red-500',
      component: ChallanPayment
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
                  <div className="p-4 bg-blue-100 rounded-full mr-4">
                    <Car className="w-12 h-12 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800">RTA Services</h1>
                    <p className="text-xl text-gray-600 mt-2">Road Transport Authority Services</p>
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
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                className="mb-6 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
              {ActiveComponent && <ActiveComponent onBack={() => setActiveService(null)} />}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default RTAServices;
