
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Upload, Send, FileText, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface HealthCardApplicationsProps {
  onClose: () => void;
}

const healthSchemes = [
  {
    id: 'aarogyasri',
    name: 'Aarogyasri',
    description: 'Free healthcare up to ₹5,00,000 per family per year',
    eligibility: 'BPL families, annual income < ₹5,00,000'
  },
  {
    id: 'employee-health',
    name: 'Employee Health Scheme',
    description: 'Healthcare benefits for government employees',
    eligibility: 'Government employees and their families'
  },
  {
    id: 'pradhan-mantri',
    name: 'Pradhan Mantri Jan Arogya Yojana',
    description: 'Healthcare coverage up to ₹5,00,000 annually',
    eligibility: 'Socio-economically disadvantaged families'
  }
];

export const HealthCardApplications = ({ onClose }: HealthCardApplicationsProps) => {
  const [selectedScheme, setSelectedScheme] = useState('');
  const [applicationData, setApplicationData] = useState({
    applicantName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    address: '',
    familySize: '',
    annualIncome: '',
    documents: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        documents: file
      }));
      toast.success('Document uploaded successfully');
    }
  };

  const handleSubmitApplication = async () => {
    if (!selectedScheme) {
      toast.error('Please select a health scheme');
      return;
    }

    const requiredFields = ['applicantName', 'aadhaarNumber', 'mobileNumber', 'address'];
    const missingFields = requiredFields.filter(field => !applicationData[field as keyof typeof applicationData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate application submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Application submitted successfully! Reference ID: HA' + Date.now());
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <CreditCard className="w-6 h-6 mr-2 text-orange-600" />
            Health Card Applications
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Scheme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-700">Select Health Scheme</CardTitle>
              <p className="text-gray-600">Choose the health scheme you want to apply for</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {healthSchemes.map((scheme) => (
                <div 
                  key={scheme.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedScheme === scheme.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedScheme(scheme.id)}
                >
                  <div className="flex items-start">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 mr-3 ${
                      selectedScheme === scheme.id 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'border-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-orange-500" />
                        {scheme.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                      <p className="text-xs text-orange-600 mt-1"><strong>Eligibility:</strong> {scheme.eligibility}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedScheme && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-700">Application Form</CardTitle>
                <p className="text-gray-600">Fill in your details to apply for the selected scheme</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicantName">Applicant Name *</Label>
                    <Input
                      id="applicantName"
                      placeholder="Enter full name"
                      value={applicationData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                    <Input
                      id="aadhaarNumber"
                      placeholder="Enter 12-digit Aadhaar number"
                      value={applicationData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                      maxLength={12}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter 10-digit mobile number"
                      value={applicationData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      maxLength={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familySize">Family Size</Label>
                    <Input
                      id="familySize"
                      placeholder="Number of family members"
                      value={applicationData.familySize}
                      onChange={(e) => handleInputChange('familySize', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address"
                    value={applicationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Family Income</Label>
                  <Input
                    id="annualIncome"
                    placeholder="Enter annual income in rupees"
                    value={applicationData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Upload Documents</Label>
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
                      {applicationData.documents && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {applicationData.documents.name}
                        </p>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                  disabled={isSubmitting}
                  onClick={handleSubmitApplication}
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
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Required Documents</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Aadhaar Card copy</li>
              <li>• Income Certificate</li>
              <li>• Ration Card copy</li>
              <li>• Passport size photographs</li>
              <li>• Bank account details</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
