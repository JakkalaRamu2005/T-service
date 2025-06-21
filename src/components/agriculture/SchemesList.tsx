
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wheat, 
  Sprout, 
  Droplets, 
  TreePine, 
  Shield, 
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { Scheme } from '@/pages/AgricultureSchemes';

interface SchemesListProps {
  onSchemeSelect: (scheme: Scheme) => void;
}

const schemeCategories = [
  {
    id: 'farmer-investment',
    name: '🌾 Farmer Investment & Support',
    icon: Wheat,
    color: 'bg-green-100 text-green-800',
    schemes: [
      {
        id: 'rythu-bandhu',
        name: 'Rythu Bandhu',
        category: 'Farmer Investment & Support',
        description: 'Financial assistance of ₹10,000 per acre per season to farmers for crop cultivation.',
        eligibility: ['Must be a farmer with agricultural land', 'Valid land documents required', 'Aadhaar card mandatory'],
        documents: ['Land ownership documents', 'Aadhaar card', 'Bank account details', 'Passport photo']
      },
      {
        id: 'rythu-bharosa',
        name: 'Rythu Bharosa',
        category: 'Farmer Investment & Support',
        description: 'Zero interest loan facility for farmers up to ₹1 lakh.',
        eligibility: ['Small and marginal farmers', 'Land holding up to 5 acres', 'No previous loan defaults'],
        documents: ['Land records', 'Income certificate', 'Bank statements', 'Aadhaar card']
      },
      {
        id: 'rythu-bima',
        name: 'Rythu Bima',
        category: 'Farmer Investment & Support',
        description: 'Life insurance scheme for farmers with ₹5 lakh coverage.',
        eligibility: ['Age between 18-70 years', 'Must be a practicing farmer', 'Premium payment capability'],
        documents: ['Age proof', 'Farmer certificate', 'Medical certificate', 'Nominee details']
      },
      {
        id: 'indiramma-atmiya-bharosa',
        name: 'Indiramma Atmiya Bharosa',
        category: 'Farmer Investment & Support',
        description: 'Support scheme for farmer families in distress.',
        eligibility: ['Farmer families below poverty line', 'Distress conditions verified', 'Local authority recommendation'],
        documents: ['BPL certificate', 'Family income proof', 'Distress verification', 'Bank account details']
      },
      {
        id: 'dalit-bandhu',
        name: 'Dalit Bandhu',
        category: 'Farmer Investment & Support',
        description: 'Financial assistance of ₹10 lakhs for Dalit families for agricultural activities.',
        eligibility: ['Must belong to Scheduled Caste', 'Age between 18-45 years', 'First time beneficiary'],
        documents: ['Caste certificate', 'Age proof', 'Bank account details', 'Project proposal']
      }
    ]
  },
  {
    id: 'extension-mechanization',
    name: '🌱 Extension, Mechanization & Seed Systems',
    icon: Sprout,
    color: 'bg-blue-100 text-blue-800',
    schemes: [
      {
        id: 'rythu-vedika',
        name: 'Rythu Vedika',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Farmer producer organizations support and capacity building program.',
        eligibility: ['Registered farmer groups', 'Minimum 10 members', 'Legal entity status'],
        documents: ['FPO registration', 'Member list', 'Bank account details', 'Business plan']
      },
      {
        id: 'farm-mechanization',
        name: 'Farm Mechanization',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Subsidy on agricultural machinery and equipment purchase.',
        eligibility: ['Individual farmers or FPOs', 'Valid land documents', 'Quotations from dealers'],
        documents: ['Land documents', 'Machinery quotations', 'Bank account details', 'Subsidy application']
      },
      {
        id: 'seed-chain-strengthening',
        name: 'Strengthening of Seed Chain',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Quality seed production and distribution system enhancement.',
        eligibility: ['Seed producers', 'Agricultural cooperatives', 'Certification agencies'],
        documents: ['Seed production license', 'Quality certificates', 'Storage facility proof', 'Distribution network']
      },
      {
        id: 'soil-health-card',
        name: 'Soil Health Card',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Free soil testing and health card issuance for optimal fertilizer use.',
        eligibility: ['All farmers with agricultural land', 'Valid land documents', 'Soil samples required'],
        documents: ['Land ownership proof', 'Aadhaar card', 'Soil sample collection receipt', 'Contact details']
      },
      {
        id: 'pkvy',
        name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Organic farming promotion with financial assistance of ₹50,000 per hectare.',
        eligibility: ['Farmers willing to adopt organic practices', 'Group formation mandatory', 'Training completion'],
        documents: ['Land documents', 'Group formation certificate', 'Training completion certificate', 'Organic farming plan']
      },
      {
        id: 'integrated-farming-rad',
        name: 'Integrated Farming Systems (RAD)',
        category: 'Extension, Mechanization & Seed Systems',
        description: 'Holistic farming approach combining crops, livestock, and allied activities.',
        eligibility: ['Farmers with minimum 2 acres', 'Willingness to integrate activities', 'Technical training completion'],
        documents: ['Land records', 'Integration plan', 'Training certificate', 'Bank account details']
      }
    ]
  },
  {
    id: 'irrigation-water',
    name: '💧 Irrigation & Water Resources',
    icon: Droplets,
    color: 'bg-cyan-100 text-cyan-800',
    schemes: [
      {
        id: 'mission-kakatiya',
        name: 'Mission Kakatiya',
        category: 'Irrigation & Water Resources',
        description: 'Revival and restoration of minor irrigation tanks and water bodies.',
        eligibility: ['Village communities', 'Water user associations', 'Panchayat raj institutions'],
        documents: ['Tank survey report', 'Community consent', 'Technical feasibility study', 'Cost estimates']
      },
      {
        id: 'mission-bhagiratha',
        name: 'Mission Bhagiratha',
        category: 'Irrigation & Water Resources',
        description: 'Safe drinking water supply to every household in rural areas.',
        eligibility: ['Rural households', 'Community water systems', 'Gram panchayat approval'],
        documents: ['Household survey', 'Water quality test', 'Community participation', 'Installation consent']
      },
      {
        id: 'indira-solar-giri-jal',
        name: 'Indira Solar Giri Jal Vikasam',
        category: 'Irrigation & Water Resources',
        description: 'Solar-powered water lifting systems for agricultural irrigation.',
        eligibility: ['Individual farmers', 'Farmer groups', 'Solar feasibility area'],
        documents: ['Land documents', 'Electricity connection proof', 'Solar feasibility report', 'Technical specifications']
      },
      {
        id: 'pmksy',
        name: 'PMKSY',
        category: 'Irrigation & Water Resources',
        description: 'Pradhan Mantri Krishi Sinchayee Yojana for micro irrigation development.',
        eligibility: ['All categories of farmers', 'Water source availability', 'Technical feasibility'],
        documents: ['Land ownership proof', 'Water source certificate', 'Technical design', 'Cost estimates']
      },
      {
        id: 'central-irrigation-support',
        name: 'Central Irrigation Support (NMOOP, NFSM, NMAET, RKVY)',
        category: 'Irrigation & Water Resources',
        description: 'Comprehensive irrigation support under various central schemes.',
        eligibility: ['Varies by specific scheme', 'Agricultural land ownership', 'Scheme-specific criteria'],
        documents: ['Scheme-specific documents', 'Land records', 'Project proposals', 'Technical clearances']
      }
    ]
  },
  {
    id: 'environment-animal',
    name: '🌳 Environment & Animal Husbandry',
    icon: TreePine,
    color: 'bg-emerald-100 text-emerald-800',
    schemes: [
      {
        id: 'haritha-haram',
        name: 'Telangana Ku Haritha Hāram',
        category: 'Environment & Animal Husbandry',
        description: 'Massive tree plantation program to increase forest cover.',
        eligibility: ['All citizens', 'Educational institutions', 'Community organizations'],
        documents: ['Plantation site details', 'Species selection plan', 'Maintenance commitment', 'Monitoring agreement']
      },
      {
        id: 'sheep-distribution',
        name: 'Sheep Distribution Scheme',
        category: 'Environment & Animal Husbandry',
        description: 'Free distribution of sheep to eligible beneficiaries for livelihood.',
        eligibility: ['SC/ST families', 'BPL category', 'No previous livestock ownership'],
        documents: ['Caste certificate', 'BPL card', 'Aadhaar card', 'Bank account details']
      },
      {
        id: 'national-livestock-mission',
        name: 'National Livestock Mission',
        category: 'Environment & Animal Husbandry',
        description: 'Comprehensive livestock development and productivity enhancement.',
        eligibility: ['Livestock farmers', 'SHG members', 'Cooperative societies'],
        documents: ['Livestock ownership proof', 'Group membership', 'Training certificates', 'Project proposal']
      }
    ]
  },
  {
    id: 'insurance-crop-risk',
    name: '📞 Insurance & Crop Risk Management',
    icon: Shield,
    color: 'bg-orange-100 text-orange-800',
    schemes: [
      {
        id: 'pmfby-crop-insurance',
        name: 'PMFBY (Crop Insurance)',
        category: 'Insurance & Crop Risk Management',
        description: 'Comprehensive crop insurance for all farmers against natural calamities.',
        eligibility: ['All farmers (sharecroppers included)', 'Crop cultivation proof', 'Premium payment capability'],
        documents: ['Land documents', 'Crop details', 'Bank account', 'Previous season records']
      },
      {
        id: 'pmfby-state-implementation',
        name: 'PMFBY (State Implementation)',
        category: 'Insurance & Crop Risk Management',
        description: 'State-level implementation support for crop insurance scheme.',
        eligibility: ['As per PMFBY guidelines', 'State registration', 'Compliance requirements'],
        documents: ['State implementation plan', 'Compliance certificates', 'Monitoring reports', 'Beneficiary database']
      },
      {
        id: 'vaddi-leni-runalu',
        name: 'Vaddi Leni Runalu',
        category: 'Insurance & Crop Risk Management',
        description: 'Interest-free loans for farmers up to ₹1 lakh.',
        eligibility: ['Small and marginal farmers', 'Crop loan requirement', 'No loan defaults'],
        documents: ['Land records', 'Crop plan', 'Bank statements', 'Income certificate']
      },
      {
        id: 'rkvy-production-enhancement',
        name: 'RKVY (Production Enhancement)',
        category: 'Insurance & Crop Risk Management',
        description: 'Rashtriya Krishi Vikas Yojana for agricultural production enhancement.',
        eligibility: ['Farmer groups', 'Agricultural cooperatives', 'Production enhancement projects'],
        documents: ['Project proposal', 'Group formation', 'Technical feasibility', 'Cost-benefit analysis']
      }
    ]
  },
  {
    id: 'infrastructure-markets',
    name: '🏬 Infrastructure & Markets',
    icon: Building2,
    color: 'bg-purple-100 text-purple-800',
    schemes: [
      {
        id: 'agricultural-marketing-nabard',
        name: 'Agricultural Marketing & NABARD Godown Scheme',
        category: 'Infrastructure & Markets',
        description: 'Infrastructure development for agricultural marketing and storage.',
        eligibility: ['Farmer producer organizations', 'Agricultural cooperatives', 'Private entrepreneurs'],
        documents: ['Project proposal', 'Land documents', 'Technical drawings', 'Financial projections']
      }
    ]
  }
];

export const SchemesList: React.FC<SchemesListProps> = ({ onSchemeSelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVisibleSchemes = () => {
    if (showAllSchemes) {
      return schemeCategories;
    }
    
    // Show first 2 categories fully expanded, others collapsed
    return schemeCategories.map((category, index) => ({
      ...category,
      schemes: index < 2 ? category.schemes : category.schemes.slice(0, 2)
    }));
  };

  const totalSchemes = schemeCategories.reduce((total, category) => total + category.schemes.length, 0);
  const visibleSchemesCount = getVisibleSchemes().reduce((total, category) => total + category.schemes.length, 0);

  return (
    <div className="space-y-8">
      {getVisibleSchemes().map((category, categoryIndex) => {
        const IconComponent = category.icon;
        const isExpanded = expandedCategories.has(category.id) || categoryIndex < 2;
        const hasMoreSchemes = !showAllSchemes && categoryIndex >= 2 && category.schemes.length > 2;
        
        return (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                <Badge className={category.color}>
                  {category.schemes.length} schemes
                </Badge>
              </div>
              
              {(hasMoreSchemes || category.schemes.length > 6) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category.id)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
                  ) : (
                    <>Show More <ChevronDown className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(isExpanded ? category.schemes : category.schemes.slice(0, 6)).map((scheme) => (
                <Card 
                  key={scheme.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border-2 hover:border-purple-300"
                  onClick={() => onSchemeSelect(scheme)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                      {scheme.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {scheme.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
      
      {!showAllSchemes && visibleSchemesCount < totalSchemes && (
        <div className="text-center pt-8">
          <Button 
            onClick={() => setShowAllSchemes(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View More Schemes ({totalSchemes - visibleSchemesCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
};
