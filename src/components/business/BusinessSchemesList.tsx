
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import type { BusinessScheme } from '@/pages/BusinessEntrepreneurship';
import { 
  Lightbulb, 
  Rocket, 
  DollarSign, 
  Gift, 
  FileCheck, 
  Users, 
  Zap, 
  GraduationCap, 
  UserCheck, 
  Banknote 
} from 'lucide-react';

const businessSchemes: BusinessScheme[] = [
  {
    id: 'we-hub-incubation',
    name: 'WE Hub Incubation',
    category: 'Women Entrepreneurship',
    description: 'India\'s first state-led incubator for women entrepreneurs providing mentorship, workspace, and seed funding.',
    eligibility: [
      'Women-led startups',
      'Early to growth stage ventures',
      'Innovative business model',
      'Scalable solution'
    ],
    documents: [
      'Founder Aadhaar Card',
      'Pitch Deck (PDF)',
      'Team Member Details',
      'Business Registration (if applicable)'
    ],
    benefits: [
      'Mentorship from industry experts',
      'Co-working space access',
      'Seed funding up to ₹50L',
      'Network access to investors'
    ],
    fundingRange: 'Up to ₹50 Lakhs',
    type: 'incubation'
  },
  {
    id: 't-hub-accelerator',
    name: 'T-Hub Early Stage Accelerator',
    category: 'Startup Acceleration',
    description: 'India\'s largest startup ecosystem providing acceleration programs for early-stage startups.',
    eligibility: [
      'Tech-based startups',
      'Scalable business model',
      'Strong founding team',
      'Product-market fit potential'
    ],
    documents: [
      'Pitch Deck',
      'Founder profiles',
      'Product demo/prototype',
      'Market research'
    ],
    benefits: [
      '6-month acceleration program',
      'Mentorship from industry leaders',
      'Access to investor network',
      'Co-working space'
    ],
    type: 'incubation'
  },
  {
    id: 't-fund',
    name: 'T-Fund (Equity-based Co-Investment)',
    category: 'Growth Stage Funding',
    description: 'Co-investment fund for growth-stage startups with existing investor backing.',
    eligibility: [
      'Incorporated entity (LLP/Pvt Ltd)',
      'Existing investor backing',
      'Revenue generating',
      'Growth stage startup'
    ],
    documents: [
      'Incorporation certificate',
      'Shareholding pattern',
      'Financial statements',
      'Existing investor details'
    ],
    benefits: [
      'Co-investment with leading VCs',
      'Up to ₹10 Cr funding',
      'Strategic guidance',
      'Network access'
    ],
    fundingRange: 'Up to ₹10 Crores',
    type: 'funding'
  },
  {
    id: 't-spark-grants',
    name: 'T-Spark Grants',
    category: 'Innovation Grants',
    description: 'Grant support for early-stage innovation and R&D activities up to ₹20 lakhs.',
    eligibility: [
      'Innovation-based startups',
      'R&D focused ventures',
      'Prototype development stage',
      'IP creation potential'
    ],
    documents: [
      'Innovation proposal',
      'Team credentials',
      'Prototype details',
      'Mentor recommendation letter'
    ],
    benefits: [
      'Grant up to ₹20L',
      'R&D support',
      'Prototype development',
      'IP filing assistance'
    ],
    fundingRange: 'Up to ₹20 Lakhs',
    type: 'grant'
  },
  {
    id: 'ts-ipass',
    name: 'TS-iPASS Fast Track License',
    category: 'Business Licensing',
    description: 'Single-window clearance system for industrial and commercial licenses with 15-day approval.',
    eligibility: [
      'New business establishments',
      'Industrial units',
      'Commercial enterprises',
      'MSME units'
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Land agreement/lease',
      'Electricity connection proof'
    ],
    benefits: [
      '15-day approval guarantee',
      'Single-window clearance',
      'Online application process',
      'Reduced compliance burden'
    ],
    type: 'licensing'
  },
  {
    id: 'srix',
    name: 'SR Innovation Exchange (SRiX)',
    category: 'Tier-2 Incubation',
    description: 'Tier-2 city incubator in Warangal focusing on student and early-stage innovations.',
    eligibility: [
      'Student entrepreneurs',
      'Early-stage innovations',
      'Technology-based solutions',
      'Tier-2 city focus'
    ],
    documents: [
      'College enrollment proof',
      'Innovation abstract',
      'Prototype photos/videos',
      'Mentor reference'
    ],
    benefits: [
      'Incubation support',
      'Mentor guidance',
      'Bootcamp participation',
      'Seed funding access'
    ],
    type: 'incubation'
  },
  {
    id: 'tsiri',
    name: 'TSIRI (Rural Impact Innovation)',
    category: 'Rural Innovation',
    description: '₹30L support for innovations creating rural impact and addressing grassroots challenges.',
    eligibility: [
      'Rural impact focus',
      'Grassroots innovation',
      'Community benefit',
      'Scalable solution'
    ],
    documents: [
      'Innovation proposal',
      'Rural impact assessment',
      'Community validation',
      'Cost breakdown'
    ],
    benefits: [
      'Up to ₹30L support',
      'Rural pilot programs',
      'Community partnerships',
      'Impact measurement'
    ],
    fundingRange: 'Up to ₹30 Lakhs',
    type: 'grant'
  },
  {
    id: 'setwin',
    name: 'SETWIN Self Employment Training',
    category: 'Skill Development',
    description: 'Skill training programs for self-employment in various trades and technologies.',
    eligibility: [
      'Age 18-35 years',
      'Educational qualification varies by course',
      'Commitment to self-employment',
      'Telangana resident'
    ],
    documents: [
      'Aadhaar Card',
      'Educational certificates',
      'Passport size photo',
      'Income certificate'
    ],
    benefits: [
      'Free skill training',
      'Employment assistance',
      'Certification',
      'Tool kit support'
    ],
    type: 'training'
  },
  {
    id: 'wep-niti',
    name: 'Women Entrepreneur Platform (WEP)',
    category: 'Women Empowerment',
    description: 'NITI Aayog platform linked with T-Hub/WE Hub for comprehensive women entrepreneur support.',
    eligibility: [
      'Women entrepreneurs',
      'Student/MSME/SHG categories',
      'Business plan ready',
      'Commitment to growth'
    ],
    documents: [
      'Aadhaar Card',
      'Business plan',
      'Category proof',
      'Bank account details'
    ],
    benefits: [
      'Mentorship programs',
      'Grant opportunities',
      'MSME loan referrals',
      'Network access'
    ],
    type: 'incubation'
  },
  {
    id: 'banking-credit',
    name: 'Banking & Loan Support - Credit Linkages',
    category: 'Financial Support',
    description: 'Credit linkage support through CGTMSE, StandUp India, and Mudra loan schemes.',
    eligibility: [
      'Registered business entity',
      'GST registration',
      'Good credit history',
      'Viable business plan'
    ],
    documents: [
      'PAN Card',
      'GST registration',
      'Udyam certificate',
      'Bank passbook',
      'KYC documents'
    ],
    benefits: [
      'Collateral-free loans',
      'Interest subsidies',
      'Credit guarantee',
      'Banking partnerships'
    ],
    type: 'funding'
  }
];

const schemeIcons = {
  incubation: Lightbulb,
  funding: DollarSign,
  licensing: FileCheck,
  training: GraduationCap,
  grant: Gift
};

const schemeColors = {
  incubation: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  funding: 'bg-green-50 border-green-200 hover:border-green-400',
  licensing: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  training: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  grant: 'bg-pink-50 border-pink-200 hover:border-pink-400'
};

const schemeIconColors = {
  incubation: 'text-blue-600 bg-blue-100',
  funding: 'text-green-600 bg-green-100',
  licensing: 'text-orange-600 bg-orange-100',
  training: 'text-purple-600 bg-purple-100',
  grant: 'text-pink-600 bg-pink-100'
};

interface BusinessSchemesListProps {
  onSchemeSelect: (scheme: BusinessScheme) => void;
}

export const BusinessSchemesList: React.FC<BusinessSchemesListProps> = ({ onSchemeSelect }) => {
  const [showAll, setShowAll] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleSchemeClick = (scheme: BusinessScheme) => {
    if (!isAuthenticated) {
      toast.error('Please log in to view scheme details.');
      return;
    }
    onSchemeSelect(scheme);
  };

  const displayedSchemes = showAll ? businessSchemes : businessSchemes.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive support ecosystem for entrepreneurs at every stage - from idea to IPO
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSchemes.map((scheme) => {
          const IconComponent = schemeIcons[scheme.type];
          return (
            <Card 
              key={scheme.id}
              className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${schemeColors[scheme.type]}`}
              onClick={() => handleSchemeClick(scheme)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${schemeIconColors[scheme.type]} mb-3`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {scheme.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                  {scheme.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {scheme.description}
                </p>
                {scheme.fundingRange && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600">
                      {scheme.fundingRange}
                    </span>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                      {scheme.type.charAt(0).toUpperCase() + scheme.type.slice(1)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={() => setShowAll(!showAll)}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300"
        >
          {showAll ? (
            <>
              View Less <ChevronUp className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              View More ({businessSchemes.length - 5} more schemes) <ChevronDown className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
