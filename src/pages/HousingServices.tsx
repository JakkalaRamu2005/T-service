
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HousingSchemesList } from '@/components/housing/HousingSchemesList';
import { PageTransition } from '@/components/PageTransition';
import { Building, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HousingServices = () => {
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
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Housing & Shelter Services
                </h1>
                <p className="text-lg text-gray-600">
                  Access government housing schemes and shelter programs for affordable housing solutions
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Home className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                    <p className="text-sm text-gray-600">Housing Schemes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Building className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">Free</p>
                    <p className="text-sm text-gray-600">House Construction</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Home className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">2BHK</p>
                    <p className="text-sm text-gray-600">Ready Flats</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <Building className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">₹2.5L</p>
                    <p className="text-sm text-gray-600">Max Subsidy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Housing Schemes List */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Housing Schemes</h2>
              <p className="text-gray-600">
                Explore various housing and shelter programs designed to provide affordable housing solutions for different income groups and communities.
              </p>
            </div>
            
            <HousingSchemesList />
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default HousingServices;
