import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { 
  Home,
  Banknote,
  Briefcase,
  Book,
  Heart,
  Building,
  Scale,
  Cpu,
  Users,
  UserCheck,
  Trophy,
  Truck,
  MapPin,
  Settings
} from 'lucide-react';

const schemes = [
  {
    title: 'Agriculture, Rural & Environment',
    schemes: '24 Schemes',
    icon: Home,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600 bg-green-100',
    route: '/agriculture-schemes'
  },
  {
    title: 'Banking, Financial Services & Insurance',
    schemes: '5 Schemes',
    icon: Banknote,
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconColor: 'text-orange-600 bg-orange-100',
    route: '/banking-schemes'
  },
  {
    title: 'Business & Entrepreneurship',
    schemes: '10 Schemes',
    icon: Briefcase,
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconColor: 'text-purple-600 bg-purple-100',
    route: '/business-entrepreneurship'
  },
  {
    title: 'Education & Learning',
    schemes: '15 Schemes',
    icon: Book,
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    iconColor: 'text-pink-600 bg-pink-100',
    route: '/education-services'
  },
  {
    title: 'Health & Wellness',
    schemes: '216 Schemes',
    icon: Heart,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600 bg-green-100',
    route: '/health-services'
  },
  {
    title: 'Housing & Shelter',
    schemes: '5 Schemes',
    icon: Building,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-100',
    route: '/housing-services'
  },
  {
    title: 'Public Safety, Law & Justice',
    schemes: '10 Schemes',
    icon: Scale,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'Science, IT & Communications',
    schemes: '71 Schemes',
    icon: Cpu,
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconColor: 'text-orange-600 bg-orange-100'
  },
  {
    title: 'Skills & Employment',
    schemes: '287 Schemes',
    icon: Users,
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconColor: 'text-red-600 bg-red-100',
    route: '/employment-services'
  },
  {
    title: 'Social welfare & Empowerment',
    schemes: '1321 Schemes',
    icon: UserCheck,
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconColor: 'text-purple-600 bg-purple-100'
  },
  {
    title: 'Sports & Culture',
    schemes: '131 Schemes',
    icon: Trophy,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600 bg-green-100'
  },
  {
    title: 'Transport & Infrastructure',
    schemes: '53 Schemes',
    icon: Truck,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'Travel & Tourism',
    schemes: '38 Schemes',
    icon: MapPin,
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconColor: 'text-orange-600 bg-orange-100'
  },
  {
    title: 'Utility & Sanitation',
    schemes: '35 Schemes',
    icon: Settings,
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconColor: 'text-red-600 bg-red-100'
  },
  {
    title: 'Women and Child',
    schemes: '383 Schemes',
    icon: UserCheck,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600 bg-green-100'
  }
];

export const Schemes = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();

  const handleSchemeClick = (scheme: typeof schemes[0]) => {
    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired'));
      return;
    }
    
    if (scheme.route) {
      navigate(scheme.route);
    } else {
      // Handle other scheme navigation here
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
                {t('schemes.title')}
              </h2>
            </div>
            <Button 
              variant="ghost" 
              className="text-purple-600 hover:text-purple-700 font-medium"
              onClick={() => handleSchemeClick(schemes[0])}
            >
              {t('schemes.viewAll')}
            </Button>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('schemes.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => {
            const IconComponent = scheme.icon;
            return (
              <Card 
                key={index}
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${scheme.color}`}
                onClick={() => handleSchemeClick(scheme)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-lg ${scheme.iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                        {scheme.title}
                      </CardTitle>
                      <p className="text-orange-600 font-medium text-sm">
                        {scheme.schemes}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
