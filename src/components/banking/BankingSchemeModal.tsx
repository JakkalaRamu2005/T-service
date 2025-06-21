
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, X, Shield, Gift } from 'lucide-react';
import type { BankingScheme } from '@/pages/BankingSchemes';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

interface BankingSchemeModalProps {
  scheme: BankingScheme;
  onClose: () => void;
  onApplyNow: () => void;
}

export const BankingSchemeModal: React.FC<BankingSchemeModalProps> = ({ scheme, onClose, onApplyNow }) => {
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
    // Handle track status logic here
    toast.info('Status tracking feature will be available soon.');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
            {scheme.coverage && (
              <Badge className="bg-orange-100 text-orange-800 w-fit">
                {scheme.coverage}
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Scheme Description
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
              {scheme.documents.map((document, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              onClick={handleApplyClick}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            >
              Apply Now
            </Button>
            <Button
              onClick={handleTrackStatus}
              variant="outline"
              className="flex-1 py-3 font-semibold border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Track Status
            </Button>
          </div>
          
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
