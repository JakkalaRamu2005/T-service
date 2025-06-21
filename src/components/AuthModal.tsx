import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { Smartphone, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { currentStep, tempData, setStep, setTempData, login, resetAuth } = useAuthStore();
  const [mobile, setMobile] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetAuth();
      setMobile('');
      setMobileOtp('');
      setAadhaar('');
      setAadhaarOtp('');
    }
  }, [isOpen, resetAuth]);

  const handleMobileSubmit = async () => {
    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTempData({ mobile });
      setStep('mobile-otp');
      setIsLoading(false);
      toast.success('OTP sent to your mobile number');
    }, 1500);
  };

  const handleMobileOtpSubmit = async () => {
    if (mobileOtp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setStep('aadhaar');
      setIsLoading(false);
      toast.success('Mobile number verified successfully');
    }, 1500);
  };

  const handleAadhaarSubmit = async () => {
    if (aadhaar.length !== 12) {
      toast.error('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTempData({ aadhaar });
      setStep('aadhaar-otp');
      setIsLoading(false);
      toast.success('OTP sent to your Aadhaar-linked mobile number');
    }, 1500);
  };

  const handleAadhaarOtpSubmit = async () => {
    if (aadhaarOtp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate final verification and login
    setTimeout(() => {
      const user = {
        id: crypto.randomUUID(), // Generate a unique ID for the user
        name: 'Citizen User',
        mobile: tempData.mobile || mobile,
        aadhaar: tempData.aadhaar || aadhaar,
        email: 'citizen@example.com'
      };
      login(user);
      setIsLoading(false);
      toast.success('Authentication completed successfully!');
      onClose();
    }, 1500);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'mobile':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Mobile Verification</CardTitle>
              <p className="text-sm text-gray-600">Enter your mobile number to receive OTP</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleMobileSubmit}
                disabled={isLoading || mobile.length !== 10}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </CardContent>
          </Card>
        );

      case 'mobile-otp':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Verify Mobile OTP</CardTitle>
              <p className="text-sm text-gray-600">Enter the OTP sent to {tempData.mobile}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mobile-otp">OTP</Label>
                <Input
                  id="mobile-otp"
                  type="text"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="mt-1 text-center text-lg tracking-widest"
                />
              </div>
              <Button 
                onClick={handleMobileOtpSubmit}
                disabled={isLoading || mobileOtp.length !== 6}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('mobile')}
                className="w-full"
              >
                Change Mobile Number
              </Button>
            </CardContent>
          </Card>
        );

      case 'aadhaar':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Aadhaar Verification</CardTitle>
              <p className="text-sm text-gray-600">Enter your Aadhaar number for verification</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="Enter 12-digit Aadhaar number"
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleAadhaarSubmit}
                disabled={isLoading || aadhaar.length !== 12}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Verifying...' : 'Verify Aadhaar'}
              </Button>
            </CardContent>
          </Card>
        );

      case 'aadhaar-otp':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Verify Aadhaar OTP</CardTitle>
              <p className="text-sm text-gray-600">Enter the OTP sent to your Aadhaar-linked mobile</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aadhaar-otp">OTP</Label>
                <Input
                  id="aadhaar-otp"
                  type="text"
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="mt-1 text-center text-lg tracking-widest"
                />
              </div>
              <Button 
                onClick={handleAadhaarOtpSubmit}
                disabled={isLoading || aadhaarOtp.length !== 6}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Completing...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('aadhaar')}
                className="w-full"
              >
                Change Aadhaar Number
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-purple-800">
            Secure Authentication
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                ['mobile', 'mobile-otp'].includes(currentStep) ? 'bg-purple-600 text-white' : 
                ['aadhaar', 'aadhaar-otp'].includes(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <div className="w-8 h-1 bg-gray-200"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                ['aadhaar', 'aadhaar-otp'].includes(currentStep) ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
            </div>
          </div>

          {getStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
