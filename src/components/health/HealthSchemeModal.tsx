
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Users, 
  FileText, 
  Gift, 
  DollarSign, 
  ExternalLink,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

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

interface HealthSchemeModalProps {
  scheme: HealthScheme;
  onClose: () => void;
  onApply: () => void;
}

export const HealthSchemeModal = ({ scheme, onClose, onApply }: HealthSchemeModalProps) => {
  const handleExternalLink = () => {
    if (scheme.external_link) {
      window.open(scheme.external_link, '_blank');
    }
  };

  const isApplicationEnabled = scheme.is_application_enabled && !scheme.is_info_only;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Heart className="w-6 h-6 mr-2 text-orange-600" />
            {scheme.name}
          </DialogTitle>
          <Badge variant="secondary" className="w-fit bg-orange-100 text-orange-700">
            {scheme.category}
          </Badge>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Highlight Section */}
          {scheme.highlight && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-600 mr-2" />
                <p className="text-orange-800 font-semibold">{scheme.highlight}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-orange-700">About This Scheme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
              {scheme.target_community && (
                <div className="mt-3 flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span><strong>Target Community:</strong> {scheme.target_community}</span>
                </div>
              )}
              {scheme.funding_amount && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span><strong>Funding:</strong> {scheme.funding_amount}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligibility */}
            {scheme.eligibility && scheme.eligibility.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-700 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {scheme.benefits && scheme.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-700 flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Required Documents */}
          {scheme.required_documents && scheme.required_documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-700 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {scheme.required_documents.map((document, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Process */}
          {scheme.status_stages && scheme.status_stages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scheme.status_stages.map((stage, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {index + 1}. {stage}
                      </Badge>
                      {index < scheme.status_stages!.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {isApplicationEnabled && (
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                onClick={onApply}
              >
                <FileText className="w-4 h-4 mr-2" />
                Apply for This Scheme
              </Button>
            )}
            
            {scheme.external_link && (
              <Button 
                variant="outline"
                onClick={handleExternalLink}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Official Website
              </Button>
            )}
            
            <Button 
              variant="ghost"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
