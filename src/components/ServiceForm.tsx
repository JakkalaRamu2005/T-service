import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface ServiceFormProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  aadharNumber: string;
  additionalInfo: string;
  [key: string]: string;
}

export const ServiceForm = ({ service, isOpen, onClose }: ServiceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    aadharNumber: '',
    additionalInfo: '',
  });
  const [showStatus, setShowStatus] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast: toastHook } = useToast();
  const { user } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateApplicationId = () => {
    const prefix = service.id.split('-').map(word => word.charAt(0).toUpperCase()).join('');
    const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${prefix}${number}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to submit application');
      return;
    }
    
    // Validate required fields
    if (!formData.fullName || !formData.dateOfBirth || !formData.address || !formData.phoneNumber) {
      toastHook({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newApplicationId = generateApplicationId();
      
      // Store application in localStorage for now
      const applicationData = {
        id: newApplicationId,
        user_id: user.id,
        service_type: service.id,
        service_name: service.title,
        application_data: formData,
        status: 'Submitted',
        submitted_at: new Date().toISOString()
      };

      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('applications', JSON.stringify(existingApplications));

      setApplicationId(newApplicationId);
      setShowStatus(true);

      toastHook({
        title: "Application Submitted",
        description: `Your application has been submitted successfully. Application ID: ${newApplicationId}`,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceSpecificFields = () => {
    switch (service.id) {
      case 'birth-certificate':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth || ''}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                  placeholder="Enter place of birth"
                />
              </div>
              <div>
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  value={formData.hospitalName || ''}
                  onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                  placeholder="Enter hospital name"
                />
              </div>
            </div>
          </>
        );
      case 'death-certificate':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfDeath">Date of Death *</Label>
                <Input
                  id="dateOfDeath"
                  type="date"
                  value={formData.dateOfDeath || ''}
                  onChange={(e) => handleInputChange('dateOfDeath', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="causeOfDeath">Cause of Death</Label>
                <Input
                  id="causeOfDeath"
                  value={formData.causeOfDeath || ''}
                  onChange={(e) => handleInputChange('causeOfDeath', e.target.value)}
                  placeholder="Enter cause of death"
                />
              </div>
            </div>
          </>
        );
      case 'income-certificate':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  id="occupation"
                  value={formData.occupation || ''}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="Enter occupation"
                />
              </div>
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="Enter monthly income"
                />
              </div>
            </div>
          </>
        );
      case 'caste-certificate':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="caste">Caste *</Label>
                <Input
                  id="caste"
                  value={formData.caste || ''}
                  onChange={(e) => handleInputChange('caste', e.target.value)}
                  placeholder="Enter caste"
                />
              </div>
              <div>
                <Label htmlFor="subCaste">Sub-Caste</Label>
                <Input
                  id="subCaste"
                  value={formData.subCaste || ''}
                  onChange={(e) => handleInputChange('subCaste', e.target.value)}
                  placeholder="Enter sub-caste"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (showStatus) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-700 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Application Submitted Successfully
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Application ID:</span>
                  <Badge className="bg-green-600 text-white font-mono">
                    {applicationId}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Service:</span>
                  <span>{service.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Applicant:</span>
                  <span>{formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">Application Submitted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-700 font-medium">Under Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Document Processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Ready for Collection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-800 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Your application is currently under verification</li>
                  <li>• Processing time: 7-10 working days</li>
                  <li>• You will receive SMS/Email updates on your registered mobile/email</li>
                  <li>• Use the Application Status button to track progress</li>
                  <li>• Keep your application ID safe for future reference</li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Apply for Another Service
              </Button>
              <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            {service.title} - Application Form
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    placeholder="Enter father's name"
                  />
                </div>
                <div>
                  <Label htmlFor="motherName">Mother's Name</Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                    placeholder="Enter mother's name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Specific Fields */}
          {getServiceSpecificFields() && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Specific Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getServiceSpecificFields()}
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    placeholder="Enter Aadhar number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="additionalInfo">Additional Details (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Enter any additional information or special requests"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
