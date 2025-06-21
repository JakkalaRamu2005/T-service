
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { 
  Award, 
  Search, 
  Filter, 
  GraduationCap, 
  Globe, 
  Users, 
  BookOpen,
  Target,
  ExternalLink
} from 'lucide-react';
import type { EducationScheme } from '@/pages/EducationServices';

interface EducationSchemesListProps {
  onSchemeSelect: (scheme: EducationScheme) => void;
}

export const EducationSchemesList: React.FC<EducationSchemesListProps> = ({ onSchemeSelect }) => {
  const [schemes, setSchemes] = useState<EducationScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from('education_scheme_definitions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchemes(data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
      toast.error('Failed to load education schemes');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || scheme.category === selectedCategory;
    const matchesCommunity = !selectedCommunity || scheme.target_community === selectedCommunity;
    
    return matchesSearch && matchesCategory && matchesCommunity;
  });

  const categories = [...new Set(schemes.map(scheme => scheme.category))];
  const communities = [...new Set(schemes.map(scheme => scheme.target_community).filter(Boolean))];

  const handleSchemeClick = (scheme: EducationScheme) => {
    if (!isAuthenticated && !scheme.is_info_only) {
      toast.error('Please log in to access this scheme');
      return;
    }
    
    if (scheme.external_link) {
      window.open(scheme.external_link, '_blank');
    } else {
      onSchemeSelect(scheme);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'overseas education': return Globe;
      case 'residential education': return Users;
      case 'skill development': return Target;
      case 'digital literacy': return BookOpen;
      default: return Award;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
            <SelectTrigger>
              <SelectValue placeholder="All Communities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Communities</SelectItem>
              {communities.map(community => (
                <SelectItem key={community} value={community}>
                  {community}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedCommunity('');
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredSchemes.length} of {schemes.length} schemes
        </p>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-6">
        {filteredSchemes.map((scheme) => {
          const IconComponent = getCategoryIcon(scheme.category);
          return (
            <Card 
              key={scheme.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500"
              onClick={() => handleSchemeClick(scheme)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-purple-700 mb-2">
                        {scheme.name}
                        {scheme.external_link && (
                          <ExternalLink className="w-4 h-4 inline ml-2 text-gray-400" />
                        )}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap mb-3">
                        <Badge className="bg-purple-100 text-purple-800">
                          {scheme.category}
                        </Badge>
                        {scheme.target_community && (
                          <Badge className="bg-blue-100 text-blue-800">
                            {scheme.target_community}
                          </Badge>
                        )}
                        {scheme.funding_amount && (
                          <Badge className="bg-green-100 text-green-800">
                            {scheme.funding_amount}
                          </Badge>
                        )}
                      </div>
                      {scheme.highlight && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                          <p className="text-yellow-800 font-medium text-sm">
                            ✨ {scheme.highlight}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {scheme.is_application_enabled && (
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        Applications Open
                      </Badge>
                    )}
                    {scheme.is_info_only && (
                      <Badge className="bg-gray-100 text-gray-800">
                        Info Only
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {scheme.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Eligibility:</h4>
                    <ul className="space-y-1">
                      {scheme.eligibility.slice(0, 3).map((criterion, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Click to view details and apply
                  </div>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSchemeClick(scheme);
                    }}
                  >
                    {scheme.is_info_only ? 'View Details' : 'Apply Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No schemes found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
