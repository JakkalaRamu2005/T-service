
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileText, Search, RefreshCw, Copy, Download, Calendar, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DrivingLicenseProps {
  onBack: () => void;
}

const dlServices = [
  {
    id: 'apply-new',
    title: 'Apply New Licence',
    description: 'Apply for a new driving license',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    id: 'check-status',
    title: 'Check Status',
    description: 'Check application status',
    icon: Search,
    color: 'bg-green-500'
  },
  {
    id: 'renew',
    title: 'Renew',
    description: 'Renew existing license',
    icon: RefreshCw,
    color: 'bg-orange-500'
  },
  {
    id: 'duplicate',
    title: 'Duplicate',
    description: 'Get duplicate license',
    icon: Copy,
    color: 'bg-purple-500'
  },
  {
    id: 'idp',
    title: 'IDP',
    description: 'International Driving Permit',
    icon: FileText,
    color: 'bg-red-500'
  },
  {
    id: 'test-slot',
    title: 'Test Slot Booking',
    description: 'Book driving test slot',
    icon: Calendar,
    color: 'bg-teal-500'
  },
  {
    id: 'upload-docs',
    title: 'Upload Docs',
    description: 'Upload required documents',
    icon: FileText,
    color: 'bg-indigo-500'
  },
  {
    id: 'print-licence',
    title: 'Print Licence',
    description: 'Print/Download license',
    icon: Download,
    color: 'bg-pink-500'
  }
];

export const DrivingLicense = ({ onBack }: DrivingLicenseProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [llNumber, setLlNumber] = useState('');
  const [dob, setDob] = useState('');
  const [rto, setRto] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleLLVerification = () => {
    if (llNumber.length !== 15) {
      toast.error('Please enter a valid 15-digit Learner\'s License number');
      return;
    }
    if (!dob) {
      toast.error('Please select your date of birth');
      return;
    }
    if (!rto) {
      toast.error('Please select RTO office');
      return;
    }
    toast.success('LL verified successfully! Proceeding to DL application...');
    // Proceed to actual DL application form
  };

  const handleStatusCheck = () => {
    if (!applicationNumber) {
      toast.error('Please enter application number');
      return;
    }
    // Mock status response
    toast.success('Application found! Status: Under Review');
  };

  const renderServiceGrid = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dlServices.map((service) => {
        const IconComponent = service.icon;
        return (
          <Card 
            key={service.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            onClick={() => handleServiceClick(service.id)}
          >
            <CardHeader className="pb-3">
              <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform w-fit`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-semibold group-hover:text-purple-700 transition-colors">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderApplyNewDL = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Verify Learner's License</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="llNumber">Learner's License Number *</Label>
            <Input
              id="llNumber"
              value={llNumber}
              onChange={(e) => setLlNumber(e.target.value)}
              placeholder="Enter 15-digit LL number"
              maxLength={15}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rto">RTO Office *</Label>
              <select
                id="rto"
                className="w-full p-2 border rounded-md"
                value={rto}
                onChange={(e) => setRto(e.target.value)}
              >
                <option value="">Select RTO</option>
                <option value="TS01">TS01 - Hyderabad East</option>
                <option value="TS02">TS02 - Hyderabad West</option>
                <option value="TS03">TS03 - Secunderabad</option>
                <option value="TS04">TS04 - Warangal</option>
                <option value="TS05">TS05 - Khammam</option>
              </select>
            </div>
          </div>
          <Button onClick={handleLLVerification} className="w-full">
            Verify LL & Proceed
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs">Note</Badge>
              <p>LL must be at least 30 days old before applying for DL</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs">Fee</Badge>
              <p>DL Fee: ₹700 (includes test fee and license fee)</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs">Form 1A</Badge>
              <p>Mandatory for applicants above 40 years or for commercial vehicles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStatusCheck = () => (
    <Card>
      <CardHeader>
        <CardTitle>Check Application Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="applicationNumber">Application Number *</Label>
          <Input
            id="applicationNumber"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            placeholder="Enter application number"
          />
        </div>
        <Button onClick={handleStatusCheck} className="w-full">
          Check Status
        </Button>
        
        {/* Mock status display */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Application Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Application No:</span>
              <span className="font-medium">DL2024001234</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge className="bg-yellow-500">Under Review</Badge>
            </div>
            <div className="flex justify-between">
              <span>Test Date:</span>
              <span>25/01/2024 - 10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>RTO:</span>
              <span>Hyderabad East</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'apply-new':
        return renderApplyNewDL();
      case 'check-status':
        return renderStatusCheck();
      case 'renew':
      case 'duplicate':
      case 'idp':
      case 'test-slot':
      case 'upload-docs':
      case 'print-licence':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Service Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This service is currently under development. Please visit your nearest RTO office 
                or check back later for online availability.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedService(null)}
                className="mt-4"
              >
                Back to Services
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return renderServiceGrid();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={selectedService ? () => setSelectedService(null) : onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {selectedService ? 'Back to DL Services' : 'Back to Services'}
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedService ? 'Driving License Service' : 'Driving License Services'}
        </h1>
      </div>

      {renderServiceContent()}

      {/* Additional Features */}
      {!selectedService && (
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Driving Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                Practice with sample questions before your test
              </p>
              <Button variant="outline" className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Renewal Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                Get notified before your license expires
              </p>
              <Button variant="outline" className="w-full">
                Set Reminder
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">e-DL Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                Download Aadhaar-linked digital license
              </p>
              <Button variant="outline" className="w-full">
                Download e-DL
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
