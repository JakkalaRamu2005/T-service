
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, CheckCircle, Clock, AlertCircle, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface BankingApplicationStatusProps {
  applicationId: string;
  onClose: () => void;
}

interface StatusStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
}

export const BankingApplicationStatus: React.FC<BankingApplicationStatusProps> = ({ 
  applicationId, 
  onClose 
}) => {
  const [statusSteps, setStatusSteps] = useState<StatusStep[]>([
    {
      id: 'received',
      title: 'Application Received',
      description: 'Your application has been successfully submitted',
      status: 'completed',
      timestamp: new Date().toLocaleString()
    },
    {
      id: 'processing',
      title: 'Document Verification',
      description: 'Verifying submitted documents and eligibility',
      status: 'current'
    },
    {
      id: 'approval',
      title: 'Approval Process',
      description: 'Application under review by concerned department',
      status: 'pending'
    },
    {
      id: 'active',
      title: 'Service Active',
      description: 'Your scheme benefits are now active',
      status: 'pending'
    }
  ]);

  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Simulate status updates
    const timer = setTimeout(() => {
      setStatusSteps(prev => prev.map((step, index) => {
        if (index === 1) {
          return { ...step, status: 'completed', timestamp: new Date().toLocaleString() };
        }
        if (index === 2) {
          return { ...step, status: 'current' };
        }
        return step;
      }));
      setProgress(50);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300';
      case 'current':
        return 'bg-blue-100 border-blue-300';
      case 'pending':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const handleDownloadAcknowledgment = () => {
    toast.success('Downloading acknowledgment receipt...');
    // Handle download logic here
  };

  const completedSteps = statusSteps.filter(step => step.status === 'completed').length;
  const totalSteps = statusSteps.length;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                Application Status
              </DialogTitle>
              <div className="flex items-center space-x-3">
                <Badge className="bg-purple-100 text-purple-800">
                  Application ID: {applicationId}
                </Badge>
                <Badge variant="outline">
                  Step {completedSteps + 1} of {totalSteps}
                </Badge>
              </div>
            </div>
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

        <div className="space-y-6 mt-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round((completedSteps / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Status Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Application Timeline</h3>
            
            {statusSteps.map((step, index) => (
              <div
                key={step.id}
                className={`border-2 rounded-lg p-4 transition-all duration-300 ${getStatusColor(step.status)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">{step.title}</h4>
                      {step.timestamp && (
                        <span className="text-xs text-gray-500">{step.timestamp}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    
                    {step.status === 'current' && (
                      <div className="mt-2">
                        <div className="animate-pulse flex space-x-1">
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button
              onClick={handleDownloadAcknowledgment}
              variant="outline"
              className="flex-1 py-3 font-semibold flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              onClick={() => toast.info('SMS notifications are enabled for this application.')}
              variant="outline"
              className="flex-1 py-3 font-semibold"
            >
              Enable SMS Updates
            </Button>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-2">
              For any queries regarding your application, contact our support team:
            </p>
            <div className="flex flex-col space-y-1 text-sm">
              <span>📞 Helpline: +91-40-2345-6789</span>
              <span>📧 Email: bfsi.support@telangana.gov.in</span>
              <span>🕒 Working Hours: 9:00 AM - 6:00 PM (Mon-Fri)</span>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
