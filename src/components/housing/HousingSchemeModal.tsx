
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Gift, 
  FileText, 
  ExternalLink,
  Users,
  ArrowRight 
} from 'lucide-react';

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

interface HousingSchemeModalProps {
  scheme: HousingScheme;
  onClose: () => void;
  onApply: () => void;
}

export const HousingSchemeModal: React.FC<HousingSchemeModalProps> = ({
  scheme,
  onClose,
  onApply
}) => {
  const isApplicationEnabled = scheme.is_application_enabled && !scheme.is_info_only;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                {scheme.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {scheme.category}
                </Badge>
                {scheme.target_community && (
                  <Badge variant="outline" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {scheme.target_community}
                  </Badge>
                )}
              </div>
            </div>
            {scheme.funding_amount && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Funding Amount</p>
                <p className="text-xl font-bold text-green-600">{scheme.funding_amount}</p>
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {scheme.highlight && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Key Highlight</h4>
                <p className="text-blue-700">{scheme.highlight}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
              <p className="text-gray-600 leading-relaxed">{scheme.description}</p>
            </div>

            {scheme.eligibility && scheme.eligibility.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scheme.benefits && scheme.benefits.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-purple-600" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scheme.required_documents && scheme.required_documents.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Required Documents
                </h4>
                <ul className="space-y-2">
                  {scheme.required_documents.map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scheme.external_link && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">More Information</h4>
                <a
                  href={scheme.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Visit Official Website
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {isApplicationEnabled && (
            <Button onClick={onApply} className="bg-blue-600 hover:bg-blue-700">
              Apply Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
