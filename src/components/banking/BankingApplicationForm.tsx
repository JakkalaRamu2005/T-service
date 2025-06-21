
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Upload, User, Phone, CreditCard, Building } from 'lucide-react';
import type { BankingScheme } from '@/pages/BankingSchemes';
import { toast } from 'sonner';

interface BankingApplicationFormProps {
  scheme: BankingScheme;
  onClose: () => void;
  onSubmit: (applicationId: string) => void;
}

export const BankingApplicationForm: React.FC<BankingApplicationFormProps> = ({ 
  scheme, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    email: '',
    age: '',
    address: '',
    district: '',
    employeeId: '',
    department: '',
    college: '',
    occupation: '',
    schemeType: '',
    gender: '',
    emergencyContact: '',
    nomineeDetails: '',
    bankBranch: '',
    bfsiDomain: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.fullName || !formData.aadhaarNumber || !formData.mobileNumber) {
      toast.error('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const applicationId = `BFSI${Date.now()}`;
      toast.success('Application submitted successfully!');
      onSubmit(applicationId);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSchemeSpecific = () => {
    switch (scheme.id) {
      case 'family-first-2':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Your age"
                />
              </div>
              <div>
                <Label htmlFor="schemeType">Type of Scheme *</Label>
                <Select value={formData.schemeType} onValueChange={(value) => handleInputChange('schemeType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PMJJBY">PMJJBY</SelectItem>
                    <SelectItem value="PMSBY">PMSBY</SelectItem>
                    <SelectItem value="APY">APY</SelectItem>
                    <SelectItem value="PAI">PAI</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="nomineeDetails">Nominee Details *</Label>
              <Textarea
                id="nomineeDetails"
                value={formData.nomineeDetails}
                onChange={(e) => handleInputChange('nomineeDetails', e.target.value)}
                placeholder="Enter nominee name, relationship, and contact details"
                rows={3}
              />
            </div>
          </>
        );

      case 'accident-insurance':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="TS Power Department ID"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transmission">Transmission</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                    <SelectItem value="generation">Generation</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Emergency contact number"
              />
            </div>
          </>
        );

      case 'financial-literacy':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="occupation">Occupation *</Label>
                <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case 'bfsi-skilling':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="college">College *</Label>
                <Select value={formData.college} onValueChange={(value) => handleInputChange('college', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="osmania">Osmania University</SelectItem>
                    <SelectItem value="jntu">JNTU Hyderabad</SelectItem>
                    <SelectItem value="iiit">IIIT Hyderabad</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bfsiDomain">Preferred BFSI Domain *</Label>
                <Select value={formData.bfsiDomain} onValueChange={(value) => handleInputChange('bfsiDomain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banking">Banking</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case 'grameena-bank':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="warangal">Warangal</SelectItem>
                    <SelectItem value="nizamabad">Nizamabad</SelectItem>
                    <SelectItem value="karimnagar">Karimnagar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bankBranch">Preferred Bank Branch</Label>
                <Input
                  id="bankBranch"
                  value={formData.bankBranch}
                  onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                  placeholder="Nearest branch location"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 pr-8">
                Apply for {scheme.name}
              </DialogTitle>
              <Badge className="bg-purple-100 text-purple-800">
                {scheme.category}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
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
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                rows={2}
              />
            </div>
          </div>

          {/* Scheme-specific fields */}
          {renderSchemeSpecific()}

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Document Upload
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload Aadhaar Card</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload ID Proof</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
