
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, X, Gift, DollarSign, Target, Users, ExternalLink } from 'lucide-react';
import type { EducationScheme } from '@/pages/EducationServices';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

interface EducationSchemeModalProps {
  scheme: EducationScheme;
  onClose: () => void;
  onApplyNow: () => void;
}

export const EducationSchemeModal: React.FC<EducationSchemeModalProps> = ({ 
  scheme, 
  onClose, 
  onApplyNow 
}) => {
  const { isAuthenticated } = useAuthStore();

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to apply for this scheme.');
      return;
    }
    onApplyNow();
  };

  const handleTrackStatus = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to track application status.');
      return;
    }
    toast.info('Status tracking feature will be available soon.');
  };

  const handleExternalLink = () => {
    if (scheme.external_link) {
      window.open(scheme.external_link, '_blank');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 pr-8">
              {scheme.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-purple-100 text-purple-800 w-fit">
              {scheme.category}
            </Badge>
            {scheme.target_community && (
              <Badge className="bg-blue-100 text-blue-800 w-fit">
                <Users className="w-3 h-3 mr-1" />
                {scheme.target_community}
              </Badge>
            )}
            {scheme.funding_amount && (
              <Badge className="bg-green-100 text-green-800 w-fit">
                <DollarSign className="w-3 h-3 mr-1" />
                {scheme.funding_amount}
              </Badge>
            )}
            {scheme.is_application_enabled && (
              <Badge className="bg-green-100 text-green-800 w-fit">
                Applications Open
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {scheme.highlight && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-yellow-800 font-medium">
                ✨ {scheme.highlight}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Program Overview
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {scheme.benefits && scheme.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-green-600" />
                Key Benefits
              </h3>
              <ul className="space-y-2">
                {scheme.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Eligibility Criteria
            </h3>
            <ul className="space-y-2">
              {scheme.eligibility.map((criterion, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Required Documents
            </h3>
            <ul className="space-y-2">
              {scheme.required_documents.map((document, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {scheme.is_application_enabled && !scheme.is_info_only && (
              <Button
                onClick={handleApplyClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold transition-all duration-300"
              >
                Apply Now
              </Button>
            )}
            
            {scheme.external_link && (
              <Button
                onClick={handleExternalLink}
                variant="outline"
                className="w-full py-3 font-semibold border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Official Website
              </Button>
            )}
            
            {!scheme.is_info_only && (
              <Button
                onClick={handleTrackStatus}
                variant="outline"
                className="w-full py-3 font-semibold border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-300"
              >
                Track Application Status
              </Button>
            )}
          </div>
          
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
