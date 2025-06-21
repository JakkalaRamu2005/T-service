
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode,
  Zap,
  Droplets,
  Home,
  CreditCard,
  Plane,
  Hotel,
  Scan,
  UserCheck,
  ArrowLeft,
  Receipt
} from 'lucide-react';
import { TransactionHistory } from '@/components/TransactionHistory';
import { useNavigate } from 'react-router-dom';

const mainServices = [
  {
    id: 'scan-pay',
    title: 'Scan and Pay',
    description: 'Quick QR code payments',
    icon: QrCode,
    color: 'bg-blue-500',
    popular: true
  },
  {
    id: 'dth',
    title: 'DTH Recharge',
    description: 'Recharge your DTH connection',
    icon: Zap,
    color: 'bg-orange-500',
    popular: true
  },
  {
    id: 'electricity',
    title: 'Electricity Bill Payment',
    description: 'Pay your electricity bills',
    icon: Zap,
    color: 'bg-yellow-500',
    popular: true
  },
  {
    id: 'water',
    title: 'Water Bill Payment',
    description: 'Pay your water bills',
    icon: Droplets,
    color: 'bg-blue-400',
    popular: false
  },
  {
    id: 'property-tax',
    title: 'Property Tax Payment',
    description: 'Pay property taxes online',
    icon: Home,
    color: 'bg-green-500',
    popular: false
  },
  {
    id: 'credit-card',
    title: 'Credit Card Payment',
    description: 'Pay credit card bills',
    icon: CreditCard,
    color: 'bg-purple-500',
    popular: true
  }
];

const additionalServices = [
  {
    id: 'travel',
    title: 'Travel Ticket Booking',
    description: 'Bus and Flight Tickets',
    icon: Plane,
    color: 'bg-indigo-500'
  },
  {
    id: 'hotel',
    title: 'Hotel Booking',
    description: 'Book hotels and accommodations',
    icon: Hotel,
    color: 'bg-pink-500'
  },
  {
    id: 'merchant-pay',
    title: 'Merchant Payments',
    description: 'Pay at private merchants via QR',
    icon: Scan,
    color: 'bg-teal-500'
  },
  {
    id: 'account-mgmt',
    title: 'Account Management',
    description: 'Aadhaar & Mee Seva support',
    icon: UserCheck,
    color: 'bg-red-500'
  }
];

const TWalletServices = () => {
  const navigate = useNavigate();
  const [showAdditional, setShowAdditional] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    console.log(`Service clicked: ${serviceId}`);
    // Handle service navigation here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            onClick={() => setShowTransactionHistory(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
          >
            <Receipt className="w-4 h-4 mr-2" />
            Mini Statement
          </Button>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            T-Wallet Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete digital payment solutions for all your needs. 
            Fast, secure, and convenient transactions at your fingertips.
          </p>
        </div>

        {/* Main Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Core Services</h2>
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
                    <div className="flex items-center justify-between">
                      <div className={`p-4 rounded-full ${service.color} text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      {service.popular && (
                        <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Additional Services</h2>
            <Button 
              variant="outline"
              onClick={() => setShowAdditional(!showAdditional)}
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              {showAdditional ? 'View Less' : 'View More'}
            </Button>
          </div>

          {showAdditional && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {additionalServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform mb-3`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-purple-700 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose T-Wallet?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold mb-2">50L+</p>
              <p className="text-purple-100">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">₹500Cr+</p>
              <p className="text-purple-100">Transactions Processed</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">99.9%</p>
              <p className="text-purple-100">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Transaction History Modal */}
      <TransactionHistory 
        isOpen={showTransactionHistory} 
        onClose={() => setShowTransactionHistory(false)} 
      />
    </div>
  );
};

export default TWalletServices;
