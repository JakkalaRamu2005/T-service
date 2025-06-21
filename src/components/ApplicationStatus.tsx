
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApplicationStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApplicationData {
  id: string;
  service: string;
  applicantName: string;
  submittedDate: string;
  status: 'submitted' | 'verification' | 'processing' | 'ready' | 'completed';
  estimatedCompletion: string;
}

const mockApplications: ApplicationData[] = [
  {
    id: 'BC123456',
    service: 'Birth Certificate Services',
    applicantName: 'John Doe',
    submittedDate: '2024-01-15',
    status: 'ready',
    estimatedCompletion: '2024-01-25'
  },
  {
    id: 'IC789012',
    service: 'Income Certificate Issuance',
    applicantName: 'Jane Smith',
    submittedDate: '2024-01-18',
    status: 'processing',
    estimatedCompletion: '2024-01-28'
  },
  {
    id: 'CC345678',
    service: 'Caste Certificate Issuance',
    applicantName: 'Ram Kumar',
    submittedDate: '2024-01-20',
    status: 'verification',
    estimatedCompletion: '2024-01-30'
  }
];

export const ApplicationStatus = ({ isOpen, onClose }: ApplicationStatusProps) => {
  const [searchId, setSearchId] = useState('');
  const [foundApplication, setFoundApplication] = useState<ApplicationData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'submitted':
        return {
          label: 'Application Submitted',
          color: 'bg-blue-500',
          icon: FileText,
          description: 'Your application has been received and is in queue for processing.'
        };
      case 'verification':
        return {
          label: 'Under Verification',
          color: 'bg-yellow-500',
          icon: Clock,
          description: 'Documents are being verified by the concerned department.'
        };
      case 'processing':
        return {
          label: 'Document Processing',
          color: 'bg-orange-500',
          icon: AlertCircle,
          description: 'Your certificate is being prepared and processed.'
        };
      case 'ready':
        return {
          label: 'Ready for Collection',
          color: 'bg-green-500',
          icon: CheckCircle,
          description: 'Your certificate is ready. You can download or collect it.'
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-purple-500',
          icon: CheckCircle,
          description: 'Application completed successfully.'
        };
      default:
        return {
          label: 'Unknown Status',
          color: 'bg-gray-500',
          icon: AlertCircle,
          description: 'Unable to determine current status.'
        };
    }
  };

  const handleSearch = () => {
    if (!searchId.trim()) {
      toast({
        title: "Application ID Required",
        description: "Please enter your application ID to check status.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const application = mockApplications.find(app => 
        app.id.toLowerCase() === searchId.toLowerCase()
      );
      
      if (application) {
        setFoundApplication(application);
        toast({
          title: "Application Found",
          description: `Status for application ${application.id} retrieved successfully.`,
        });
      } else {
        setFoundApplication(null);
        toast({
          title: "Application Not Found",
          description: "No application found with the provided ID. Please check and try again.",
          variant: "destructive",
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your certificate download has started.",
    });
  };

  const renderStatusProgress = (currentStatus: string) => {
    const statuses = ['submitted', 'verification', 'processing', 'ready'];
    const currentIndex = statuses.indexOf(currentStatus);

    return (
      <div className="space-y-3">
        {statuses.map((status, index) => {
          const statusInfo = getStatusInfo(status);
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={status} className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                isActive ? statusInfo.color : 'bg-gray-300'
              } ${isCurrent ? 'animate-pulse' : ''}`}></div>
              <span className={`font-medium ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {statusInfo.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center">
            <Search className="w-6 h-6 mr-2" />
            Application Status
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Your Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="applicationId">Application ID</Label>
                  <Input
                    id="applicationId"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter your application ID (e.g., BC123456)"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isSearching ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Enter your application ID to track the current status of your application.</p>
                <p className="mt-1">Sample IDs for testing: BC123456, IC789012, CC345678</p>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          {foundApplication && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Application ID:</span>
                    <p className="font-mono text-lg">{foundApplication.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Service:</span>
                    <p>{foundApplication.service}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Applicant Name:</span>
                    <p>{foundApplication.applicantName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Submitted Date:</span>
                    <p>{new Date(foundApplication.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Current Status:</span>
                  <div className="mt-2">
                    <Badge className={`${getStatusInfo(foundApplication.status).color} text-white`}>
                      {getStatusInfo(foundApplication.status).label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {getStatusInfo(foundApplication.status).description}
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Estimated Completion:</span>
                  <p>{new Date(foundApplication.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Progress */}
          {foundApplication && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {renderStatusProgress(foundApplication.status)}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {foundApplication && foundApplication.status === 'ready' && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Available Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
