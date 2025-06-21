
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, FileText, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MutationServices = () => {
  const [formData, setFormData] = useState({
    surveyNumber: '',
    currentOwner: '',
    newOwner: '',
    documentId: '',
    landLocation: '',
    mutationType: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mutation Request Submitted",
        description: "Your mutation request has been submitted successfully. Reference ID: MUT-2024-001",
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        surveyNumber: '',
        currentOwner: '',
        newOwner: '',
        documentId: '',
        landLocation: '',
        mutationType: '',
        reason: ''
      });
    }, 2000);
  };

  const mutationTypes = [
    'Sale Deed',
    'Gift Deed',
    'Partition Deed',
    'Will/Testament',
    'Court Order',
    'Settlement'
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <RefreshCw className="w-6 h-6 mr-2 text-green-600" />
          Land Mutation Services
        </CardTitle>
        <p className="text-gray-600">Update ownership and property details for land records</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Survey Number */}
            <div className="space-y-2">
              <Label htmlFor="surveyNumber">Survey Number *</Label>
              <Input
                id="surveyNumber"
                value={formData.surveyNumber}
                onChange={(e) => handleInputChange('surveyNumber', e.target.value)}
                placeholder="e.g., SY-123/45"
                required
              />
            </div>

            {/* Land Location */}
            <div className="space-y-2">
              <Label htmlFor="landLocation">Land Location *</Label>
              <Input
                id="landLocation"
                value={formData.landLocation}
                onChange={(e) => handleInputChange('landLocation', e.target.value)}
                placeholder="Village, Mandal, District"
                required
              />
            </div>

            {/* Current Owner */}
            <div className="space-y-2">
              <Label htmlFor="currentOwner">Current Owner Name *</Label>
              <Input
                id="currentOwner"
                value={formData.currentOwner}
                onChange={(e) => handleInputChange('currentOwner', e.target.value)}
                placeholder="Enter current owner's full name"
                required
              />
            </div>

            {/* New Owner */}
            <div className="space-y-2">
              <Label htmlFor="newOwner">New Owner Name *</Label>
              <Input
                id="newOwner"
                value={formData.newOwner}
                onChange={(e) => handleInputChange('newOwner', e.target.value)}
                placeholder="Enter new owner's full name"
                required
              />
            </div>

            {/* Document ID */}
            <div className="space-y-2">
              <Label htmlFor="documentId">Document ID/Number *</Label>
              <Input
                id="documentId"
                value={formData.documentId}
                onChange={(e) => handleInputChange('documentId', e.target.value)}
                placeholder="Sale deed/Gift deed number"
                required
              />
            </div>

            {/* Mutation Type */}
            <div className="space-y-2">
              <Label htmlFor="mutationType">Mutation Type *</Label>
              <select
                id="mutationType"
                value={formData.mutationType}
                onChange={(e) => handleInputChange('mutationType', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select mutation type</option>
                {mutationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Mutation</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Provide additional details about the mutation request..."
              rows={4}
            />
          </div>

          {/* Document Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Supporting Documents</h3>
              <p className="text-gray-500 mb-4">Upload sale deed, gift deed, or other relevant documents</p>
              <Button type="button" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <FileText className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>

          {/* Required Documents Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Required Documents:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Original Sale Deed/Gift Deed/Will</li>
                <li>• Previous Title Documents</li>
                <li>• Identity Proof of Current & New Owner</li>
                <li>• Address Proof</li>
                <li>• Survey Settlement Document</li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Mutation Request
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Process Timeline */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4">Mutation Process Timeline:</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-500 text-white">1</Badge>
              <span className="text-sm">Application Submission & Document Verification (2-3 days)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-yellow-500 text-white">2</Badge>
              <span className="text-sm">Field Verification by Village Revenue Officer (5-7 days)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-orange-500 text-white">3</Badge>
              <span className="text-sm">Mandal Revenue Officer Review (3-5 days)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500 text-white">4</Badge>
              <span className="text-sm">Final Approval & Record Update (2-3 days)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
