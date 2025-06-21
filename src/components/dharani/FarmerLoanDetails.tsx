
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calculator, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export const FarmerLoanDetails = () => {
  const [landData, setLandData] = useState({
    totalAcres: '',
    landValue: '',
    cropType: '',
    annualIncome: ''
  });
  const [loanEligibility, setLoanEligibility] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setLandData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLoanEligibility = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const acres = parseFloat(landData.totalAcres) || 0;
      const value = parseFloat(landData.landValue.replace(/[₹,]/g, '')) || 0;
      const income = parseFloat(landData.annualIncome.replace(/[₹,]/g, '')) || 0;

      // Loan calculation logic
      const maxLoanAmount = Math.min(value * 0.7, acres * 500000); // 70% of land value or ₹5L per acre
      const eligibleAmount = Math.min(maxLoanAmount, income * 10); // Up to 10x annual income
      
      const interestRate = acres > 5 ? 7.5 : 9.0; // Lower rate for larger holdings
      const tenure = acres > 2 ? 15 : 10; // Longer tenure for larger holdings

      setLoanEligibility({
        maxAmount: eligibleAmount,
        interestRate,
        tenure,
        monthlyEMI: (eligibleAmount * (interestRate/100/12) * Math.pow(1 + interestRate/100/12, tenure*12)) / (Math.pow(1 + interestRate/100/12, tenure*12) - 1),
        status: eligibleAmount > 100000 ? 'Eligible' : 'Partially Eligible'
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const cropTypes = [
    'Rice/Paddy',
    'Cotton',
    'Sugarcane',
    'Maize',
    'Groundnut',
    'Chilli',
    'Turmeric',
    'Mixed Crops'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <CreditCard className="w-6 h-6 mr-2 text-orange-600" />
          Farmer Loan Eligibility Calculator
        </CardTitle>
        <p className="text-gray-600">Calculate your loan eligibility based on land holdings and farming income</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="totalAcres">Total Land Holdings (Acres) *</Label>
            <Input
              id="totalAcres"
              type="number"
              value={landData.totalAcres}
              onChange={(e) => handleInputChange('totalAcres', e.target.value)}
              placeholder="e.g., 5.5"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landValue">Current Land Value (₹) *</Label>
            <Input
              id="landValue"
              value={landData.landValue}
              onChange={(e) => handleInputChange('landValue', e.target.value)}
              placeholder="e.g., ₹50,00,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cropType">Primary Crop Type *</Label>
            <select
              id="cropType"
              value={landData.cropType}
              onChange={(e) => handleInputChange('cropType', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select crop type</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualIncome">Annual Farming Income (₹) *</Label>
            <Input
              id="annualIncome"
              value={landData.annualIncome}
              onChange={(e) => handleInputChange('annualIncome', e.target.value)}
              placeholder="e.g., ₹3,00,000"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button 
            onClick={calculateLoanEligibility}
            className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
            disabled={isCalculating || !landData.totalAcres || !landData.landValue || !landData.annualIncome}
          >
            {isCalculating ? (
              <>
                <Calculator className="w-4 h-4 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Loan Eligibility
              </>
            )}
          </Button>
        </div>

        {/* Loan Eligibility Results */}
        {loanEligibility && (
          <div className="space-y-6 pt-6 border-t">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Loan Eligibility Results</h3>
              <Badge className={`text-lg px-4 py-2 ${
                loanEligibility.status === 'Eligible' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-white'
              }`}>
                {loanEligibility.status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">
                    {formatCurrency(loanEligibility.maxAmount)}
                  </div>
                  <div className="text-sm text-green-600">Maximum Loan Amount</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {loanEligibility.interestRate}%
                  </div>
                  <div className="text-sm text-blue-600">Interest Rate (Annual)</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {loanEligibility.tenure} Years
                  </div>
                  <div className="text-sm text-purple-600">Maximum Tenure</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-700">
                    {formatCurrency(loanEligibility.monthlyEMI)}
                  </div>
                  <div className="text-sm text-orange-600">Estimated Monthly EMI</div>
                </CardContent>
              </Card>
            </div>

            {/* Loan Features */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Farmer Loan Benefits
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Interest subsidy available
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Flexible repayment options
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Crop insurance coverage
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Lower processing fees
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Government guarantee scheme
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Agricultural equipment financing
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Note */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-yellow-800">Important Note</h5>
                    <p className="text-sm text-yellow-700">
                      This is an estimated calculation. Final loan amount and terms will be determined by the bank based on detailed verification of documents, credit history, and current policies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Now Button */}
            <div className="text-center">
              <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
                Apply for Farmer Loan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
