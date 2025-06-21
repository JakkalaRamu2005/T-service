
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DigitalMarkSheetsProps {
  onClose: () => void;
}

const markSheetOptions = [
  {
    value: '10th',
    label: '10th Class (SSC)',
    description: 'Secondary School Certificate Mark Sheet'
  },
  {
    value: '11th',
    label: '11th Class (Intermediate)',
    description: 'First Year Intermediate Mark Sheet'
  },
  {
    value: '12th',
    label: '12th Class (Intermediate)',
    description: 'Second Year Intermediate Mark Sheet'
  }
];

export const DigitalMarkSheets = ({ onClose }: DigitalMarkSheetsProps) => {
  const [selectedMarkSheet, setSelectedMarkSheet] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = (markSheetType: string) => {
    setIsDownloading(true);
    
    // Show downloading message
    toast.info(`Your ${markSheetType} mark sheet is being downloaded...`);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      // Create a mock PDF download
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihNYXJrIFNoZWV0IC0gU2FtcGxlKSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzIzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE3CiUlRU9G';
      link.download = `${markSheetType}_marksheet_sample.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`${markSheetType} mark sheet downloaded successfully!`);
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <FileText className="w-6 h-6 mr-2 text-purple-600" />
            Digital Mark Sheets
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="text-center">
            <p className="text-gray-600">
              Select which mark sheet you need to download
            </p>
          </div>

          <div className="grid gap-4">
            {markSheetOptions.map((option) => (
              <Card 
                key={option.value}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-300"
                onClick={() => handleDownload(option.value)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-purple-700">
                          {option.label}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isDownloading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      ) : (
                        <Download className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isDownloading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(option.value);
                    }}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download {option.label}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Important Notes:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Mark sheets are digitally signed and verified</li>
              <li>• Downloaded files are in PDF format</li>
              <li>• These are official documents accepted by all institutions</li>
              <li>• Contact support if you face any issues with downloads</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
