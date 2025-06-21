
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, Car, CreditCard, Download, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface RoadTaxPaymentProps {
  onBack: () => void;
}

const taxTypes = [
  { id: 'one-time', label: 'One-time Payment', description: 'Pay for full validity period' },
  { id: 'quarterly', label: 'Quarterly Payment', description: 'Pay in quarterly installments' },
  { id: 're-registration', label: 'Re-registration', description: 'Re-registration tax payment' }
];

export const RoadTaxPayment = ({ onBack }: RoadTaxPaymentProps) => {
  const [step, setStep] = useState(1);
  const [searchType, setSearchType] = useState('registration');
  const [searchValue, setSearchValue] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [selectedTaxType, setSelectedTaxType] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Mock vehicle data
  const mockVehicleData = {
    registration: 'TS09EA1234',
    owner: 'RAJESH KUMAR',
    vehicle: 'MARUTI SUZUKI SWIFT',
    model: '2020',
    fuel: 'PETROL',
    cc: '1197',
    seatingCapacity: '5',
    vehicleClass: 'LMV',
    rto: 'HYDERABAD EAST',
    taxPaidUpto: '31/12/2023',
    status: 'Tax Expired'
  };

  const taxCalculation = {
    baseTax: 8500,
    penalty: 850,
    additionalCharges: 200,
    total: 9550
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.error('Please enter a valid search value');
      return;
    }
    
    // Mock API call
    setTimeout(() => {
      setVehicleData(mockVehicleData);
      setStep(2);
      toast.success('Vehicle details found!');
    }, 1000);
  };

  const handleTaxTypeSelection = (taxType: string) => {
    setSelectedTaxType(taxType);
    setStep(3);
  };

  const handlePayment = () => {
    // Mock payment process
    setTimeout(() => {
      setPaymentCompleted(true);
      setStep(4);
      toast.success('Payment successful! Tax receipt generated.');
    }, 2000);
  };

  const renderSearchStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Vehicle Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Search By</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="searchType"
                value="registration"
                checked={searchType === 'registration'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Registration Number</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="searchType"
                value="chassis"
                checked={searchType === 'chassis'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Chassis Number</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="searchType"
                value="engine"
                checked={searchType === 'engine'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Engine Number</span>
            </label>
          </div>
        </div>
        
        <div>
          <Label htmlFor="searchValue">
            {searchType === 'registration' ? 'Registration Number' : 
             searchType === 'chassis' ? 'Chassis Number' : 'Engine Number'} *
          </Label>
          <Input
            id="searchValue"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
            placeholder={
              searchType === 'registration' ? 'e.g., TS09EA1234' :
              searchType === 'chassis' ? 'Enter chassis number' : 'Enter engine number'
            }
          />
        </div>
        
        <Button onClick={handleSearch} className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Search Vehicle
        </Button>
      </CardContent>
    </Card>
  );

  const renderVehicleDetails = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Vehicle Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Registration Number</Label>
                <p className="font-semibold">{mockVehicleData.registration}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Owner Name</Label>
                <p className="font-semibold">{mockVehicleData.owner}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Vehicle</Label>
                <p className="font-semibold">{mockVehicleData.vehicle}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Model Year</Label>
                <p className="font-semibold">{mockVehicleData.model}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Fuel Type</Label>
                <p className="font-semibold">{mockVehicleData.fuel}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Engine CC</Label>
                <p className="font-semibold">{mockVehicleData.cc}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Tax Paid Upto</Label>
                <p className="font-semibold text-red-600">{mockVehicleData.taxPaidUpto}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <Badge variant="destructive">{mockVehicleData.status}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Tax Payment Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taxTypes.map(taxType => (
              <div
                key={taxType.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleTaxTypeSelection(taxType.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{taxType.label}</h4>
                    <p className="text-sm text-gray-600">{taxType.description}</p>
                  </div>
                  <div className="text-right">
                    <Button size="sm">Select</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Tax Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Tax</span>
              <span>₹{taxCalculation.baseTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Penalty (Late Payment)</span>
              <span>₹{taxCalculation.penalty.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Charges</span>
              <span>₹{taxCalculation.additionalCharges.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{taxCalculation.total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Payment Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Payment valid for {selectedTaxType === 'quarterly' ? '3 months' : '15 years'}</li>
              <li>• Receipt will be sent via SMS and email</li>
              <li>• Digital receipt available in DigiLocker</li>
            </ul>
          </div>
          
          <Button onClick={handlePayment} className="w-full mt-4 bg-green-600 hover:bg-green-700">
            Pay ₹{taxCalculation.total.toLocaleString()}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuccessStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          Payment Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Tax Payment Completed Successfully
          </h3>
          <p className="text-gray-600">
            Your road tax has been paid. Receipt details below:
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Receipt Number</Label>
              <p className="font-semibold">RT2024001234</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Payment Date</Label>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Amount Paid</Label>
              <p className="font-semibold">₹{taxCalculation.total.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Valid Until</Label>
              <p className="font-semibold">31/12/2039</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1">
            Send to DigiLocker
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Receipt sent to your registered mobile number and email
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderSearchStep();
      case 2:
        return renderVehicleDetails();
      case 3:
        return renderPaymentStep();
      case 4:
        return renderSuccessStep();
      default:
        return renderSearchStep();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Road Tax Payment</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 ${step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2 space-x-8 text-sm text-gray-600">
          <span>Search</span>
          <span>Details</span>
          <span>Payment</span>
          <span>Receipt</span>
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
};
