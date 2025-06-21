
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AarogyasriServicesProps {
  onClose: () => void;
}

export const AarogyasriServices = ({ onClose }: AarogyasriServicesProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [eligibilityData, setEligibilityData] = useState<any>(null);

  const handleCheckEligibility = async () => {
    if (!aadhaarNumber || !healthCardNumber) {
      toast.error('Please enter both Aadhaar and Health Card numbers');
      return;
    }

    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      setEligibilityData({
        eligible: true,
        beneficiaryName: 'Sample Name',
        cardStatus: 'Active',
        availableBenefits: [
          'Free treatment up to ₹5,00,000',
          'Pre-authorization for surgeries',
          'Emergency services coverage',
          'Diagnostic services'
        ],
        nearbyHospitals: [
          'Gandhi Hospital, Secunderabad',
          'Osmania General Hospital, Hyderabad',
          'NIMS Hospital, Punjagutta'
        ]
      });
      toast.success('Eligibility checked successfully!');
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Heart className="w-6 h-6 mr-2 text-red-600" />
            Aarogyasri Services
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {!eligibilityData ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-red-700">Check Eligibility & Benefits</CardTitle>
                <p className="text-gray-600">
                  Enter your details to check Aarogyasri eligibility and available benefits
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    placeholder="Enter 12-digit Aadhaar number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    maxLength={12}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="healthCard">Health Card Number</Label>
                  <Input
                    id="healthCard"
                    placeholder="Enter Health Card number"
                    value={healthCardNumber}
                    onChange={(e) => setHealthCardNumber(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg"
                  disabled={isChecking}
                  onClick={handleCheckEligibility}
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Checking Eligibility...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Check Eligibility
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Eligibility Status */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">
                        Eligible for Aarogyasri Benefits
                      </h3>
                      <p className="text-green-700">
                        Beneficiary: {eligibilityData.beneficiaryName} | Status: {eligibilityData.cardStatus}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">Available Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {eligibilityData.availableBenefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Nearby Hospitals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">Nearby Empaneled Hospitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {eligibilityData.nearbyHospitals.map((hospital: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
                        {hospital}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setEligibilityData(null)}
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-50"
              >
                Check Another Beneficiary
              </Button>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">About Aarogyasri</h4>
            <p className="text-sm text-blue-700">
              Aarogyasri is a community health insurance scheme that provides medical coverage 
              up to ₹5,00,000 per family per year for secondary and tertiary healthcare.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
