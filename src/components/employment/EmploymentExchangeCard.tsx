
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Upload, Send, Search } from 'lucide-react';
import { toast } from 'sonner';

interface EmploymentExchangeCardProps {
  onClose: () => void;
}

export const EmploymentExchangeCard = ({ onClose }: EmploymentExchangeCardProps) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    dateOfBirth: '',
    qualification: '',
    address: '',
    phone: '',
    email: '',
    documents: null as File | null
  });
  const [trackingId, setTrackingId] = useState('');
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
    const requiredFields = ['applicantName', 'fatherName', 'dateOfBirth', 'qualification'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Employment Exchange Card application submitted! Tracking ID: EEC' + Date.now());
      onClose();
    }, 2000);
  };

  const handleTrackStatus = () => {
    if (!trackingId) {
      toast.error('Please enter a tracking ID');
      return;
    }
    toast.success('Status: Application is under review. Expected completion: 7-10 working days');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <UserCheck className="w-6 h-6 mr-2 text-purple-600" />
            Employment Exchange Card
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex space-x-4 mb-6 mt-4">
          <Button
            variant={activeTab === 'apply' ? 'default' : 'outline'}
            onClick={() => setActiveTab('apply')}
            className="flex-1"
          >
            Apply for Card
          </Button>
          <Button
            variant={activeTab === 'track' ? 'default' : 'outline'}
            onClick={() => setActiveTab('track')}
            className="flex-1"
          >
            Track Status
          </Button>
        </div>

        {activeTab === 'apply' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">New Application</CardTitle>
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
                  <Label htmlFor="fatherName">Father's Name *</Label>
                  <Input
                    id="fatherName"
                    placeholder="Enter father's name"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification *</Label>
                  <Input
                    id="qualification"
                    placeholder="e.g., B.Tech, MBA, etc."
                    value={formData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
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
                    {formData.documents && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.documents.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <UserCheck className="w-5 h-5 mr-2 animate-spin" />
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
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-700">Track Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  id="trackingId"
                  placeholder="Enter your application tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 py-3"
                onClick={handleTrackStatus}
              >
                <Search className="w-5 h-5 mr-2" />
                Check Status
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-medium text-gray-800 mb-2">Required Documents</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Educational certificates</li>
            <li>• Passport size photographs</li>
            <li>• Aadhaar Card copy</li>
            <li>• Address proof</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
