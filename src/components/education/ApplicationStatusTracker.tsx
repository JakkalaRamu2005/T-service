
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, X, Search } from 'lucide-react';

interface ApplicationStatusTrackerProps {
  onClose: () => void;
  isOpen?: boolean;
}

const mockApplications = [
  {
    id: 'APP2024001',
    type: 'Scholarship',
    scheme: 'TS EAMCET Merit Scholarship',
    status: 'approved',
    submittedDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    progress: 100
  },
  {
    id: 'APP2024002',
    type: 'Admission',
    scheme: 'Government High School Admission',
    status: 'review',
    submittedDate: '2024-01-18',
    lastUpdated: '2024-01-19',
    progress: 60
  },
  {
    id: 'APP2024003',
    type: 'Scholarship',
    scheme: 'BC Welfare Scholarship',
    status: 'received',
    submittedDate: '2024-01-20',
    lastUpdated: '2024-01-20',
    progress: 25
  }
];

export const ApplicationStatusTracker = ({ onClose, isOpen = true }: ApplicationStatusTrackerProps) => {
  const [applicationId, setApplicationId] = useState('');
  const [searchedApplication, setSearchedApplication] = useState<any>(null);
  const [showAllApplications, setShowAllApplications] = useState(false);

  const handleSearch = () => {
    const found = mockApplications.find(app => app.id === applicationId.toUpperCase());
    setSearchedApplication(found || null);
    
    if (!found) {
      // toast.error('Application not found. Please check your application ID.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <X className="w-5 h-5 text-red-500" />;
      case 'review': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'received': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderApplicationCard = (application: any) => (
    <Card key={application.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              Application #{application.id}
            </CardTitle>
            <p className="text-gray-600">{application.scheme}</p>
          </div>
          <Badge className={getStatusColor(application.status)}>
            {application.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Type:</span>
              <p className="font-medium">{application.type}</p>
            </div>
            <div>
              <span className="text-gray-500">Submitted:</span>
              <p className="font-medium">{application.submittedDate}</p>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <p className="font-medium">{application.lastUpdated}</p>
            </div>
            <div>
              <span className="text-gray-500">Progress:</span>
              <p className="font-medium">{application.progress}%</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">{application.progress}%</span>
            </div>
            <Progress value={application.progress} className="h-2" />
          </div>

          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            {getStatusIcon(application.status)}
            <span className="text-sm">
              {application.status === 'approved' && 'Your application has been approved!'}
              {application.status === 'rejected' && 'Application has been rejected. Contact support for details.'}
              {application.status === 'review' && 'Your application is currently under review.'}
              {application.status === 'received' && 'Application received and being processed.'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Application Status Tracker
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Search by Application ID */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="applicationId">Search by Application ID</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="applicationId"
                  placeholder="Enter application ID (e.g., APP2024001)"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {searchedApplication && (
              <div>
                <h3 className="font-semibold mb-2">Search Result:</h3>
                {renderApplicationCard(searchedApplication)}
              </div>
            )}

            {applicationId && !searchedApplication && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">
                  No application found with ID: <strong>{applicationId}</strong>
                </p>
                <p className="text-red-600 text-sm mt-1">
                  Please check your application ID and try again.
                </p>
              </div>
            )}
          </div>

          {/* View All Applications */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Recent Applications</h3>
              <Button 
                variant="outline" 
                onClick={() => setShowAllApplications(!showAllApplications)}
              >
                {showAllApplications ? 'Hide' : 'Show All'}
              </Button>
            </div>

            {showAllApplications && (
              <div>
                {mockApplications.map(renderApplicationCard)}
              </div>
            )}

            {!showAllApplications && (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  Click "Show All" to view your recent applications
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
