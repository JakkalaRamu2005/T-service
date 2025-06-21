
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  FileSearch, 
  XCircle, 
  AlertCircle,
  Download,
  X
} from 'lucide-react';

interface ApplicationStatusProps {
  applicationId: string;
  onClose: () => void;
}

const statusSteps = [
  {
    step: 1,
    title: 'Application Submitted',
    description: 'Your application has been successfully submitted',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100'
  },
  {
    step: 2,
    title: 'Under Government Review',
    description: 'Application is being reviewed by the concerned department',
    icon: Clock,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    step: 3,
    title: 'Document Verification',
    description: 'Submitted documents are being verified',
    icon: FileSearch,
    color: 'text-orange-600 bg-orange-100'
  },
  {
    step: 4,
    title: 'Final Decision',
    description: 'Application approved or rejected with reasons',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100'
  }
];

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ applicationId, onClose }) => {
  // Simulate current status (in real app, this would come from API)
  const currentStep = 2; // Currently under review
  const progress = (currentStep / statusSteps.length) * 100;
  
  const applicationDetails = {
    id: applicationId,
    schemeName: 'Rythu Bandhu',
    submittedDate: new Date().toLocaleDateString('en-IN'),
    lastUpdated: new Date().toLocaleDateString('en-IN'),
    status: 'Under Review',
    estimatedCompletion: '15-20 working days'
  };

  const getCurrentStatusIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    } else if (stepIndex === currentStep) {
      return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />;
    } else {
      return <div className="w-6 h-6 rounded-full border-2 border-gray-300" />;
    }
  };

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = `
Application Receipt
==================
Application ID: ${applicationId}
Scheme: ${applicationDetails.schemeName}
Submitted: ${applicationDetails.submittedDate}
Status: ${applicationDetails.status}
    `.trim();
    
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `application-${applicationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 pr-8">
              Application Status
            </DialogTitle>
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
        
        <div className="space-y-6 mt-4">
          {/* Application Details Card */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Application ID</p>
                <p className="font-semibold text-lg">{applicationDetails.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheme Name</p>
                <p className="font-semibold">{applicationDetails.schemeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Submitted Date</p>
                <p className="font-semibold">{applicationDetails.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-semibold">{applicationDetails.lastUpdated}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="font-semibold text-blue-600">{applicationDetails.status}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadReceipt}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Receipt</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Status Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Journey</h3>
            
            {statusSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;
              
              return (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getCurrentStatusIcon(index)}
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold ${
                        isCompleted ? 'text-green-600' : 
                        isCurrent ? 'text-blue-600' : 
                        'text-gray-400'
                      }`}>
                        {step.title}
                      </h4>
                      {isCompleted && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {isCurrent && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-blue-600" />
                          <p className="text-sm text-blue-800">
                            Estimated completion: {applicationDetails.estimatedCompletion}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Next Steps */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• You will receive SMS updates on your registered mobile number</li>
              <li>• Check this portal regularly for status updates</li>
              <li>• Keep your documents ready for verification if required</li>
              <li>• Contact support if no update within the estimated timeframe</li>
            </ul>
          </div>
          
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              onClick={onClose}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
