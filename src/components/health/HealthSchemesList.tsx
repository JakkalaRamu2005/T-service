
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { HealthSchemeModal } from './HealthSchemeModal';
import { HealthApplicationForm } from './HealthApplicationForm';
import { 
  Heart, 
  Baby, 
  Shield, 
  Stethoscope, 
  Phone, 
  Briefcase,
  CreditCard,
  ArrowRight,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

interface HealthScheme {
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
    case 'maternal & child health':
      return Baby;
    case 'nutrition support':
      return Heart;
    case 'government healthcare':
      return Briefcase;
    case 'health insurance':
      return Shield;
    case 'digital healthcare':
      return Stethoscope;
    case 'emergency services':
      return Phone;
    default:
      return Heart;
  }
};

export const HealthSchemesList = () => {
  const [selectedScheme, setSelectedScheme] = useState<HealthScheme | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const { data: schemes, isLoading, error } = useQuery({
    queryKey: ['health-schemes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_scheme_definitions')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as HealthScheme[];
    }
  });

  const handleSchemeClick = (scheme: HealthScheme) => {
    if (!isAuthenticated) {
      toast.error('Please login to view scheme details');
      return;
    }
    setSelectedScheme(scheme);
  };

  const handleApplyClick = (scheme: HealthScheme) => {
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
        <p className="text-red-600">Error loading health schemes. Please try again later.</p>
      </div>
    );
  }

  if (!schemes || schemes.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No health schemes available at the moment.</p>
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
              className="border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-400"
              onClick={() => handleSchemeClick(scheme)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                      {scheme.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {scheme.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {scheme.highlight && (
                  <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 mb-3">
                    <p className="text-orange-800 font-medium text-sm">{scheme.highlight}</p>
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
                      className="bg-orange-600 hover:bg-orange-700 text-white"
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
        <HealthSchemeModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onApply={() => setShowApplication(true)}
        />
      )}

      {selectedScheme && showApplication && (
        <HealthApplicationForm
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
