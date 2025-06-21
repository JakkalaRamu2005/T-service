
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Upload, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ScholarshipServicesProps {
  onClose: () => void;
}

const scholarshipSchemes = [
  {
    id: 'ts-eamcet',
    name: 'TS EAMCET Merit Scholarship',
    eligibility: 'Merit-based for Engineering/Medical students',
    amount: '₹50,000 per year',
    deadline: '2024-08-15'
  },
  {
    id: 'bc-welfare',
    name: 'BC Welfare Scholarship',
    eligibility: 'For Backward Class students',
    amount: '₹25,000 per year',
    deadline: '2024-07-30'
  },
  {
    id: 'minority-scholarship',
    name: 'Minority Community Scholarship',
    eligibility: 'For minority community students',
    amount: '₹30,000 per year',
    deadline: '2024-08-20'
  },
  {
    id: 'post-matric',
    name: 'Post-Matric Scholarship',
    eligibility: 'For students after 10th standard',
    amount: '₹15,000 per year',
    deadline: '2024-09-15'
  }
];

export const ScholarshipServices = ({ onClose }: ScholarshipServicesProps) => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'received' | 'review' | 'approved' | 'rejected'>('received');
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    caste: '',
    income: '',
    marks: '',
    course: '',
    college: '',
    bankAccount: '',
    ifscCode: '',
    address: ''
  });

  const handleSchemeSelect = (schemeId: string) => {
    setSelectedScheme(schemeId);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setShowStatus(true);
    toast.success('Scholarship application submitted successfully!');
    
    // Simulate status progression
    setTimeout(() => setApplicationStatus('review'), 2000);
    setTimeout(() => setApplicationStatus('approved'), 5000);
  };

  const selectedSchemeData = scholarshipSchemes.find(scheme => scheme.id === selectedScheme);

  const getStatusProgress = () => {
    switch (applicationStatus) {
      case 'received': return 25;
      case 'review': return 50;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'review': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <X className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Scholarship Schemes List */}
      <Dialog open={!showForm && !showStatus} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <GraduationCap className="w-6 h-6 mr-2 text-purple-600" />
              Available Scholarship Schemes
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {scholarshipSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleSchemeSelect(scheme.id)}>
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">{scheme.name}</CardTitle>
                  <Badge className="w-fit bg-green-100 text-green-800">{scheme.amount}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{scheme.eligibility}</p>
                  <p className="text-sm text-red-600 font-medium">Deadline: {scheme.deadline}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Form */}
      <Dialog open={showForm} onOpenChange={() => setShowForm(false)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedSchemeData?.name}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Student Name *</Label>
                <Input 
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input 
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input 
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="caste">Caste Category *</Label>
                <Select onValueChange={(value) => setFormData({...formData, caste: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select caste category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="income">Annual Family Income *</Label>
                <Input 
                  id="income"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  placeholder="₹"
                  required
                />
              </div>
              <div>
                <Label htmlFor="marks">Previous Year Marks % *</Label>
                <Input 
                  id="marks"
                  value={formData.marks}
                  onChange={(e) => setFormData({...formData, marks: e.target.value})}
                  placeholder="85.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="course">Course/Stream *</Label>
                <Input 
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="college">Institution Name *</Label>
                <Input 
                  id="college"
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input 
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input 
                  id="ifscCode"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea 
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Document Uploads *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="outline" className="h-20 flex flex-col">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">Income Certificate</span>
                </Button>
                <Button type="button" variant="outline" className="h-20 flex flex-col">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">Caste Certificate</span>
                </Button>
                <Button type="button" variant="outline" className="h-20 flex flex-col">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">Mark Sheet</span>
                </Button>
                <Button type="button" variant="outline" className="h-20 flex flex-col">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">Bank Passbook</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Application Status */}
      <Dialog open={showStatus} onOpenChange={() => setShowStatus(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Application Status</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Application ID: #APP2024001
              </div>
              <Badge className={`${
                applicationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {applicationStatus.toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="text-center mb-4">
                <Progress value={getStatusProgress()} className="mb-2" />
                <p className="text-sm text-gray-600">{getStatusProgress()}% Complete</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700">Application Received</span>
                </div>
                
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  applicationStatus === 'received' ? 'bg-gray-50' : 'bg-yellow-50'
                }`}>
                  {getStatusIcon('review')}
                  <span className={applicationStatus === 'received' ? 'text-gray-500' : 'text-yellow-700'}>
                    Under Review
                  </span>
                </div>
                
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  applicationStatus === 'approved' ? 'bg-green-50' :
                  applicationStatus === 'rejected' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  {getStatusIcon(applicationStatus)}
                  <span className={
                    applicationStatus === 'approved' ? 'text-green-700' :
                    applicationStatus === 'rejected' ? 'text-red-700' : 'text-gray-500'
                  }>
                    {applicationStatus === 'approved' ? 'Approved' :
                     applicationStatus === 'rejected' ? 'Rejected' : 'Final Decision'}
                  </span>
                </div>
              </div>
            </div>

            {applicationStatus === 'approved' && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">Congratulations!</p>
                <p className="text-green-700 text-sm">Your scholarship has been approved. The amount will be credited to your bank account within 7-10 working days.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
