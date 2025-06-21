
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HealthSchemesList } from '@/components/health/HealthSchemesList';
import { PageTransition } from '@/components/PageTransition';
import { Heart, ArrowLeft, Shield, Stethoscope, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HealthServices = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center mb-6">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Health & Wellness Services
                </h1>
                <p className="text-lg text-gray-600">
                  Access comprehensive healthcare schemes and services for you and your family
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">₹5L</p>
                    <p className="text-sm text-gray-600">Insurance Coverage</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">10+</p>
                    <p className="text-sm text-gray-600">Health Schemes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">Free</p>
                    <p className="text-sm text-gray-600">Consultations</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Phone className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">24/7</p>
                    <p className="text-sm text-gray-600">Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Schemes List */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Health Services</h2>
              <p className="text-gray-600">
                Explore various health schemes and services designed to provide comprehensive healthcare support for all citizens of Telangana.
              </p>
            </div>
            
            <HealthSchemesList />
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default HealthServices;
