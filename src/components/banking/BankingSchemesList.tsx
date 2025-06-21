
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  GraduationCap, 
  Briefcase, 
  Building2,
  Users,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import type { BankingScheme } from '@/pages/BankingSchemes';

interface BankingSchemesListProps {
  onSchemeSelect: (scheme: BankingScheme) => void;
}

const bankingSchemes: BankingScheme[] = [
  {
    id: 'family-first-2',
    name: 'Family First 2.0 Initiative',
    category: 'Life & Accident Insurance',
    description: 'Comprehensive insurance coverage with ₹4 lakh life & accident coverage plus ₹5K/month pension for financial security.',
    eligibility: ['Age between 18-50 years', 'Valid Aadhaar card', 'Telangana resident', 'No existing similar insurance'],
    documents: ['Aadhaar card', 'Address proof', 'Bank account details', 'Nominee details'],
    coverage: '₹4 lakh life & accident coverage + ₹5K/month pension',
    benefits: ['Life insurance coverage', 'Accident protection', 'Monthly pension', 'Family financial security'],
    type: 'insurance'
  },
  {
    id: 'accident-insurance',
    name: '₹1 Crore Accident Insurance Scheme',
    category: 'Employee Insurance',
    description: 'Exclusive accident insurance for TS power department employees with ₹80L for permanent disability, ₹10L for natural death, ₹10L for family support.',
    eligibility: ['TS Power Department employee only', 'Valid employee ID', 'Active service status', 'Age between 21-58 years'],
    documents: ['Employee ID card', 'Aadhaar card', 'Service certificate', 'Nominee details', 'Emergency contact'],
    coverage: '₹1 Crore total coverage',
    benefits: ['₹80L for permanent disability', '₹10L for natural death', '₹10L for family support'],
    type: 'insurance'
  },
  {
    id: 'financial-literacy',
    name: 'Financial Literacy & Investor Awareness (WE HUB + NSE)',
    category: 'Education & Training',
    description: 'Comprehensive financial literacy program for women-led MSMEs and students covering mutual funds, insurance, and digital banking.',
    eligibility: ['Women-led MSME owners', 'Students (any stream)', 'Age above 18 years', 'Basic education required'],
    documents: ['Aadhaar card', 'Educational certificate', 'Business registration (for entrepreneurs)', 'ID proof'],
    benefits: ['Mutual funds training', 'Insurance awareness', 'Digital banking skills', 'Investment strategies'],
    type: 'course'
  },
  {
    id: 'bfsi-skilling',
    name: 'BFSI Skilling Program (10K Students)',
    category: 'Skill Development',
    description: 'Get certified training for BFSI jobs under Telangana CSR funding with placement assistance and industry certification.',
    eligibility: ['Students (final year/graduated)', 'Age 18-28 years', 'Basic computer knowledge', 'English proficiency'],
    documents: ['Student ID', 'Educational certificates', 'Aadhaar card', 'College ID', 'Resume'],
    benefits: ['Industry certification', 'Job placement assistance', 'Mock interviews', 'Skill development'],
    type: 'skilling'
  },
  {
    id: 'grameena-bank',
    name: 'Banking Access via Telangana Grameena Bank',
    category: 'Rural Banking',
    description: 'Access all PMJDY, PMSBY, PMJJBY, APY services in rural Telangana with zero-balance accounts and insurance benefits.',
    eligibility: ['Rural Telangana residents', 'Valid Aadhaar card', 'Age above 18 years', 'No existing bank account (for zero-balance)'],
    documents: ['Aadhaar card', 'Address proof', 'Passport photo', 'Bank passbook (if applicable)'],
    benefits: ['Zero-balance account', 'RuPay insurance', 'Atal Pension Yojana', 'Digital banking access'],
    type: 'banking'
  }
];

export const BankingSchemesList: React.FC<BankingSchemesListProps> = ({ onSchemeSelect }) => {
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  const getSchemeIcon = (type: string) => {
    switch (type) {
      case 'insurance': return Shield;
      case 'course': return GraduationCap;
      case 'skilling': return Briefcase;
      case 'banking': return Building2;
      default: return Users;
    }
  };

  const getSchemeColor = (type: string) => {
    switch (type) {
      case 'insurance': return 'bg-blue-50 border-blue-200 hover:border-blue-400';
      case 'course': return 'bg-green-50 border-green-200 hover:border-green-400';
      case 'skilling': return 'bg-purple-50 border-purple-200 hover:border-purple-400';
      case 'banking': return 'bg-orange-50 border-orange-200 hover:border-orange-400';
      default: return 'bg-gray-50 border-gray-200 hover:border-gray-400';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'insurance': return 'text-blue-600 bg-blue-100';
      case 'course': return 'text-green-600 bg-green-100';
      case 'skilling': return 'text-purple-600 bg-purple-100';
      case 'banking': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const visibleSchemes = showAllSchemes ? bankingSchemes : bankingSchemes.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available BFSI Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive Banking, Financial Services & Insurance schemes designed for your financial security and growth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleSchemes.map((scheme) => {
          const IconComponent = getSchemeIcon(scheme.type || 'general');
          const cardColor = getSchemeColor(scheme.type || 'general');
          const iconColor = getIconColor(scheme.type || 'general');
          
          return (
            <Card 
              key={scheme.id}
              className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${cardColor}`}
              onClick={() => onSchemeSelect(scheme)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${iconColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <HelpCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                  {scheme.name}
                </CardTitle>
                {scheme.coverage && (
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium mb-2">
                    {scheme.coverage}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {scheme.description}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {scheme.category}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Track Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {!showAllSchemes && bankingSchemes.length > 3 && (
        <div className="text-center pt-6">
          <Button 
            onClick={() => setShowAllSchemes(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View More Schemes <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
      
      {showAllSchemes && (
        <div className="text-center pt-6">
          <Button 
            onClick={() => setShowAllSchemes(false)}
            variant="outline"
            className="px-8 py-3 rounded-lg font-semibold"
          >
            Show Less <ChevronUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};
