
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, Clock, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface BusinessApplicationStatusProps {
  applicationId: string;
  onClose: () => void;
}

const statusSteps = {
  'we-hub-incubation': [
    { id: 'received', label: 'Application Received', icon: CheckCircle },
    { id: 'review', label: 'Under Review', icon: Clock },
    { id: 'shortlisted', label: 'Shortlisted', icon: FileText },
    { id: 'approved', label: 'Approved', icon: CheckCircle }
  ],
  't-hub-accelerator': [
    { id: 'received', label: 'Application Received', icon: CheckCircle },
    { id: 'screening', label: 'Initial Screening', icon: Clock },
    { id: 'interview', label: 'Interview Round', icon: FileText },
    { id: 'selected', label: 'Selected for Batch', icon: CheckCircle }
  ],
  't-fund': [
    { id: 'submitted', label: 'Application Submitted', icon: CheckCircle },
    { id: 'due-diligence', label: 'Due Diligence', icon: Clock },
    { id: 'pitch-review', label: 'Pitch Review', icon: FileText },
    { id: 'co-invested', label: 'Co-Invested', icon: CheckCircle }
  ],
  'default': [
    { id: 'received', label: 'Application Received', icon: CheckCircle },
    { id: 'processing', label: 'Under Processing', icon: Clock },
    { id: 'review', label: 'Final Review', icon: FileText },
    { id: 'approved', label: 'Approved', icon: CheckCircle }
  ]
};

export const BusinessApplicationStatus: React.FC<BusinessApplicationStatusProps> = ({ applicationId, onClose }) => {
  const [applicationData, setApplicationData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Load application data from localStorage
    const data = localStorage.getItem(`application_${applicationId}`);
    if (data) {
      const parsedData = JSON.parse(data);
      setApplicationData(parsedData);
      
      // Simulate progression through steps
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [applicationId]);

  const getStepsForScheme = (schemeId: string) => {
    return statusSteps[schemeId as keyof typeof statusSteps] || statusSteps.default;
  };

  const handleDownloadReceipt = () => {
    // Simulate PDF download
    const receiptData = {
      applicationId,
      schemeName: applicationData?.schemeName,
      submittedAt: applicationData?.submittedAt,
      status: 'Submitted'
    };
    
    // Create a simple text receipt (in real app, generate PDF)
    const receiptText = `
APPLICATION RECEIPT
==================
Application ID: ${receiptData.applicationId}
Scheme: ${receiptData.schemeName}
Submitted: ${new Date(receiptData.submittedAt).toLocaleString()}
Status: ${receiptData.status}
==================
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${applicationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Receipt downloaded successfully!');
  };

  if (!applicationData) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <div className="text-center py-8">
            <p>Loading application details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const steps = getStepsForScheme(applicationData.schemeId);
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Application ID:</span>
              <Badge variant="outline">{applicationId}</Badge>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Scheme:</span>
              <span>{applicationData.schemeName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Submitted:</span>
              <span>{new Date(applicationData.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Progress</h3>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 mb-6" />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-green-50 border border-green-200' : 
                    isCurrent ? 'bg-blue-50 border border-blue-200' : 
                    'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    isActive ? 'bg-green-100 text-green-600' : 
                    isCurrent ? 'bg-blue-100 text-blue-600' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isActive ? 'text-green-800' : 
                      isCurrent ? 'text-blue-800' : 
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-sm text-green-600">✓ Completed</p>
                    )}
                    {isCurrent && (
                      <p className="text-sm text-blue-600">⏳ In Progress</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-4 pt-4 border-t">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
