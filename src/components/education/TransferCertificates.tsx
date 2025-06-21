
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface TransferCertificatesProps {
  onClose: () => void;
}

export const TransferCertificates = ({ onClose }: TransferCertificatesProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Show downloading message
    toast.info('Your transfer certificate is being downloaded...');
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      // Create a mock PDF download
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNTAKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihUcmFuc2ZlciBDZXJ0aWZpY2F0ZSAtIFNhbXBsZSkgVGoKRVQKZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzIzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDIzCiUlRU9G';
      link.download = 'transfer_certificate_sample.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Transfer certificate downloaded successfully!');
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <CreditCard className="w-6 h-6 mr-2 text-orange-600" />
            Transfer Certificates
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="text-center">
            <p className="text-gray-600">
              Download your official transfer certificate instantly
            </p>
          </div>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-orange-100 rounded-full w-fit mb-4">
                <FileText className="w-12 h-12 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-orange-700">
                Official Transfer Certificate
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Digitally signed and verified by Telangana Education Department
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Certificate includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Student personal details</li>
                  <li>• Previous institution information</li>
                  <li>• Academic performance summary</li>
                  <li>• Conduct and character remarks</li>
                  <li>• Date of leaving and reason</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                disabled={isDownloading}
                onClick={handleDownload}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Downloading Transfer Certificate...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download Transfer Certificate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Important Information:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This is an official document recognized by all educational institutions</li>
              <li>• The certificate is digitally signed and tamper-proof</li>
              <li>• Keep multiple copies for your records</li>
              <li>• Contact your previous school if any information appears incorrect</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
