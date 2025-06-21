
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CreditCard, Home, Building, Users, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceForm } from '@/components/ServiceForm';

const MeeSeva = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      description: 'Apply for birth certificate online',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      id: 'death-certificate',
      title: 'Death Certificate',
      description: 'Apply for death certificate online',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      id: 'income-certificate',
      title: 'Income Certificate',
      description: 'Apply for income certificate online',
      icon: CreditCard,
      color: 'bg-green-500'
    },
    {
      id: 'caste-certificate',
      title: 'Caste Certificate',
      description: 'Apply for caste certificate online',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

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

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full mr-4">
                <Building className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">MeeSeva Services</h1>
                <p className="text-xl text-gray-600 mt-2">Government Certificate Services</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                  onClick={() => setSelectedService(service)}
                >
                  <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Apply Now
                  </Button>
                </div>
              );
            })}
          </div>
        </main>

        <Footer />

        {selectedService && (
          <ServiceForm
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default MeeSeva;
