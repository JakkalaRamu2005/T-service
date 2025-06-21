
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { HousingSchemeModal } from './HousingSchemeModal';
import { HousingApplicationForm } from './HousingApplicationForm';
import { 
  Home, 
  Building, 
  Banknote, 
  Users,
  ArrowRight,
  Hammer
} from 'lucide-react';
import { toast } from 'sonner';

interface HousingScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  highlight: string | null;
  eligibility: string[] | null;
  benefits: string[] | null;
  required_documents: string[] | null;
  form_fields: any;
  funding_amount: string | null;
  target_community: string | null;
  external_link: string | null;
  is_application_enabled: boolean | null;
  is_info_only: boolean | null;
  status_stages: string[] | null;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'housing construction':
      return Hammer;
    case 'housing finance':
      return Banknote;
    case 'social housing':
      return Building;
    case 'urban development':
      return Building;
    case 'construction support':
      return Hammer;
    default:
      return Home;
  }
};

export const HousingSchemesList = () => {
  const [selectedScheme, setSelectedScheme] = useState<HousingScheme | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const { data: schemes, isLoading, error } = useQuery({
    queryKey: ['housing-schemes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('housing_scheme_definitions')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as HousingScheme[];
    }
  });

  const handleSchemeClick = (scheme: HousingScheme) => {
    if (!isAuthenticated) {
      toast.error('Please login to view scheme details');
      return;
    }
    setSelectedScheme(scheme);
  };

  const handleApplyClick = (scheme: HousingScheme) => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for schemes');
      return;
    }
    
    if (!scheme.is_application_enabled) {
      toast.error('Applications are not currently enabled for this scheme');
      return;
    }
    
    setSelectedScheme(scheme);
    setShowApplication(true);
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading housing schemes. Please try again later.</p>
      </div>
    );
  }

  if (!schemes || schemes.length === 0) {
    return (
      <div className="text-center py-8">
        <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No housing schemes available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => {
          const IconComponent = getCategoryIcon(scheme.category);
          const isApplicationEnabled = scheme.is_application_enabled && !scheme.is_info_only;
          
          return (
            <Card 
              key={scheme.id}
              className="border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400"
              onClick={() => handleSchemeClick(scheme)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                      {scheme.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      {scheme.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {scheme.highlight && (
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-blue-800 font-medium text-sm">{scheme.highlight}</p>
                  </div>
                )}
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {scheme.description}
                </p>
                
                {scheme.target_community && (
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Users className="w-3 h-3 mr-1" />
                    <span>Target: {scheme.target_community}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {scheme.funding_amount && (
                      <span className="font-semibold text-green-600">
                        {scheme.funding_amount}
                      </span>
                    )}
                  </div>
                  
                  {isApplicationEnabled && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(scheme);
                      }}
                    >
                      Apply
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedScheme && !showApplication && (
        <HousingSchemeModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onApply={() => setShowApplication(true)}
        />
      )}

      {selectedScheme && showApplication && (
        <HousingApplicationForm
          scheme={selectedScheme}
          onClose={() => {
            setSelectedScheme(null);
            setShowApplication(false);
          }}
        />
      )}
    </>
  );
};
