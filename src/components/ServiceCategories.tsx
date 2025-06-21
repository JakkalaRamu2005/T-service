
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building, 
  Zap, 
  Droplets, 
  Truck,
  PiggyBank,
  Scale,
  Activity,
  TreePine
} from 'lucide-react';

const categories = [
  {
    title: 'Land Records (Dharani)',
    description: 'Land records, revenue services, mutations',
    icon: Building,
    services: ['Land Records', 'Survey Settlements', 'Revenue Services'],
    color: 'border-green-200 hover:border-green-400'
  },
  {
    title: 'Certificates (Dharani)',
    description: 'Birth, death, income, caste certificates',
    icon: Users,
    services: ['Birth Certificate', 'Death Certificate', 'Income Certificate'],
    color: 'border-blue-200 hover:border-blue-400'
  },
  {
    title: 'Transport Services',
    description: 'RTA services, vehicle registration, licenses',
    icon: Truck,
    services: ['Driving License', 'Vehicle Registration', 'NOC Services'],
    color: 'border-orange-200 hover:border-orange-400'
  },
  {
    title: 'Electricity Services',
    description: 'New connections, bill payments, complaints',
    icon: Zap,
    services: ['New Connection', 'Bill Payment', 'Load Enhancement'],
    color: 'border-yellow-200 hover:border-yellow-400'
  },
  {
    title: 'Water & Sanitation',
    description: 'Water connections, sewerage, sanitation',
    icon: Droplets,
    services: ['Water Connection', 'Sewerage Connection', 'Complaint Registration'],
    color: 'border-cyan-200 hover:border-cyan-400'
  },
  {
    title: 'Financial Services',
    description: 'Pensions, subsidies, banking services',
    icon: PiggyBank,
    services: ['Pension Registration', 'Subsidy Application', 'Loan Services'],
    color: 'border-purple-200 hover:border-purple-400'
  },
  {
    title: 'Legal & Judicial',
    description: 'Court services, legal aid, documentation',
    icon: Scale,
    services: ['Legal Aid', 'Court Fee Payment', 'Case Status'],
    color: 'border-gray-200 hover:border-gray-400'
  },
  {
    title: 'Health Services',
    description: 'Aarogyasri, medical services, health cards',
    icon: Activity,
    services: ['Aarogyasri Registration', 'Health Card', 'Medical Certificates'],
    color: 'border-red-200 hover:border-red-400'
  },
  {
    title: 'Agriculture & Environment',
    description: 'Crop insurance, soil health, forest clearances',
    icon: TreePine,
    services: ['Crop Insurance', 'Soil Health Card', 'Forest Clearance'],
    color: 'border-emerald-200 hover:border-emerald-400'
  }
];

export const ServiceCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of government services organized by department. 
            Find what you need quickly and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index}
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${category.color}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {category.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 mb-2">Popular Services:</h4>
                    <ul className="space-y-1">
                      {category.services.map((service, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
