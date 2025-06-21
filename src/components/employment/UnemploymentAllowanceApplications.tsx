
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Send, User } from 'lucide-react';
import { toast } from 'sonner';

interface UnemploymentAllowanceApplicationsProps {
  onClose: () => void;
}

export const UnemploymentAllowanceApplications = ({ onClose }: UnemploymentAllowanceApplicationsProps) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    aadhaarNumber: '',
    age: '',
    lastEmployment: '',
    unemploymentDuration: '',
    bankAccount: '',
    ifscCode: '',
    documents: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: file
      }));
      toast.success('Documents uploaded successfully');
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['applicantName', 'aadhaarNumber', 'age', 'lastEmployment'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Unemployment allowance application submitted! Application ID: UA' + Date.now());
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Unemployment Allowance Application
          </DialogTitle>
        </DialogHeader>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-xl text-green-700">Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicantName">Applicant Name *</Label>
                <Input
                  id="applicantName"
                  placeholder="Enter full name"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  maxLength={12}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastEmployment">Last Employment Status *</Label>
                <Input
                  id="lastEmployment"
                  placeholder="e.g., Private Company, Government, Self-employed"
                  value={formData.lastEmployment}
                  onChange={(e) => handleInputChange('lastEmployment', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unemploymentDuration">Unemployment Duration</Label>
                <Input
                  id="unemploymentDuration"
                  placeholder="Duration since unemployment (months)"
                  value={formData.unemploymentDuration}
                  onChange={(e) => handleInputChange('unemploymentDuration', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <Input
                  id="bankAccount"
                  placeholder="Enter bank account number"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                placeholder="Enter bank IFSC code"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Upload Supporting Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="documents"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
                <label htmlFor="documents" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload documents (PDF, JPG, PNG)
                  </p>
                  {formData.documents && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <FileText className="w-5 h-5 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-medium text-gray-800 mb-2">Required Documents</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Aadhaar Card copy</li>
            <li>• Last employment certificate/relieving letter</li>
            <li>• Bank account details</li>
            <li>• Income certificate (if applicable)</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
