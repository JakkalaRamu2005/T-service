
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, Calendar, MapPin, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface LearnerLicenseBookingProps {
  onBack: () => void;
}

const districts = [
  'Adilabad', 'Bhadradri Kothagudem', 'Hanamkonda', 'Hyderabad', 'Jagtial',
  'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy',
  'Karimnagar', 'Khammam', 'Komaram Bheem', 'Mahabubabad', 'Mahabubnagar',
  'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool',
  'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli',
  'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet',
  'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'
];

const vehicleClasses = [
  { id: 'LMV', label: 'Light Motor Vehicle (Car/Jeep)', fee: 150 },
  { id: 'MCWG', label: 'Motorcycle With Gear', fee: 150 },
  { id: 'MCWOG', label: 'Motorcycle Without Gear', fee: 150 },
  { id: 'FVG', label: 'Four Wheeler Goods', fee: 200 },
  { id: 'HMV', label: 'Heavy Motor Vehicle', fee: 200 }
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const LearnerLicenseBooking = ({ onBack }: LearnerLicenseBookingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    parentName: '',
    dob: '',
    gender: '',
    placeOfBirth: '',
    bloodGroup: '',
    
    // Address Details
    permanentAddress: '',
    presentAddress: '',
    district: '',
    pinCode: '',
    
    // Identity & Documents
    aadhaarNumber: '',
    
    // Vehicle Classes
    selectedClasses: [] as string[],
    
    // Slot Booking
    selectedRTO: '',
    selectedDate: '',
    selectedTime: ''
  });

  const [documents, setDocuments] = useState({
    ageProof: null as File | null,
    addressProof: null as File | null,
    photo: null as File | null,
    signature: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClassSelection = (classId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter(id => id !== classId)
        : [...prev.selectedClasses, classId]
    }));
  };

  const handleFileUpload = (field: keyof typeof documents, file: File) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  const calculateTotalFee = () => {
    const baseFee = formData.selectedClasses.reduce((total, classId) => {
      const vehicleClass = vehicleClasses.find(vc => vc.id === classId);
      return total + (vehicleClass?.fee || 0);
    }, 0);
    const processingFee = 50;
    return baseFee + processingFee;
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotalFee();
    toast.success(`Payment of ₹${totalAmount} processed successfully! Application submitted.`);
    // Here you would integrate with Stripe
    console.log('Processing payment for amount:', totalAmount);
  };

  const renderPersonalDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter full name as per Aadhaar"
            />
          </div>
          <div>
            <Label htmlFor="parentName">Parent/Spouse Name *</Label>
            <Input
              id="parentName"
              value={formData.parentName}
              onChange={(e) => handleInputChange('parentName', e.target.value)}
              placeholder="Father's/Mother's/Spouse name"
            />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select
              id="gender"
              className="w-full p-2 border rounded-md"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="placeOfBirth">Place of Birth</Label>
            <Input
              id="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              placeholder="Place of birth"
            />
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <select
              id="bloodGroup"
              className="w-full p-2 border rounded-md"
              value={formData.bloodGroup}
              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAddressDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>Address Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="permanentAddress">Permanent Address *</Label>
          <Textarea
            id="permanentAddress"
            value={formData.permanentAddress}
            onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
            placeholder="Enter permanent address"
          />
        </div>
        <div>
          <Label htmlFor="presentAddress">Present Address *</Label>
          <Textarea
            id="presentAddress"
            value={formData.presentAddress}
            onChange={(e) => handleInputChange('presentAddress', e.target.value)}
            placeholder="Enter present address"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>State</Label>
            <Input value="Telangana" disabled className="bg-gray-100" />
          </div>
          <div>
            <Label htmlFor="district">District *</Label>
            <select
              id="district"
              className="w-full p-2 border rounded-md"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="pinCode">Pin Code *</Label>
            <Input
              id="pinCode"
              value={formData.pinCode}
              onChange={(e) => handleInputChange('pinCode', e.target.value)}
              placeholder="Pin code"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentUploads = () => (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
          <Input
            id="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Age Proof *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload Age Proof (Birth Certificate/10th Certificate)</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFileUpload('ageProof', e.target.files[0])}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label>Address Proof *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload Address Proof</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFileUpload('addressProof', e.target.files[0])}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label>Passport Photo *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload Passport Size Photo</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFileUpload('photo', e.target.files[0])}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label>Signature *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload Signature</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFileUpload('signature', e.target.files[0])}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVehicleClassSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Class of Vehicle (COV)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {vehicleClasses.map(vehicleClass => (
            <div key={vehicleClass.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                id={vehicleClass.id}
                checked={formData.selectedClasses.includes(vehicleClass.id)}
                onCheckedChange={() => handleClassSelection(vehicleClass.id)}
              />
              <label htmlFor={vehicleClass.id} className="flex-1 cursor-pointer">
                <div className="font-medium">{vehicleClass.label}</div>
                <div className="text-sm text-gray-600">Fee: ₹{vehicleClass.fee}</div>
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSlotBooking = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Slot Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="rto">Select RTO *</Label>
          <select
            id="rto"
            className="w-full p-2 border rounded-md"
            value={formData.selectedRTO}
            onChange={(e) => handleInputChange('selectedRTO', e.target.value)}
          >
            <option value="">Select RTO Office</option>
            <option value="RTO-HYD-EAST">RTO Hyderabad East</option>
            <option value="RTO-HYD-WEST">RTO Hyderabad West</option>
            <option value="RTO-SECBAD">RTO Secunderabad</option>
            <option value="RTO-WGL">RTO Warangal</option>
            <option value="RTO-KMM">RTO Khammam</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="testDate">Test Date *</Label>
            <Input
              id="testDate"
              type="date"
              value={formData.selectedDate}
              onChange={(e) => handleInputChange('selectedDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="testTime">Time Slot *</Label>
            <select
              id="testTime"
              className="w-full p-2 border rounded-md"
              value={formData.selectedTime}
              onChange={(e) => handleInputChange('selectedTime', e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPayment = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {formData.selectedClasses.map(classId => {
            const vehicleClass = vehicleClasses.find(vc => vc.id === classId);
            return vehicleClass ? (
              <div key={classId} className="flex justify-between">
                <span>{vehicleClass.label}</span>
                <span>₹{vehicleClass.fee}</span>
              </div>
            ) : null;
          })}
          <div className="flex justify-between">
            <span>Processing Fee</span>
            <span>₹50</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{calculateTotalFee()}</span>
          </div>
        </div>
        <Button 
          onClick={handlePayment}
          className="w-full mt-4 bg-green-600 hover:bg-green-700"
        >
          Pay ₹{calculateTotalFee()} & Submit Application
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Learner's License Application</h1>
      </div>

      <div className="space-y-6">
        {renderPersonalDetails()}
        {renderAddressDetails()}
        {renderDocumentUploads()}
        {renderVehicleClassSelection()}
        {renderSlotBooking()}
        {formData.selectedClasses.length > 0 && renderPayment()}
      </div>
    </div>
  );
};
