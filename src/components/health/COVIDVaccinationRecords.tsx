
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Download, Loader2, Search, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface COVIDVaccinationRecordsProps {
  onClose: () => void;
}

export const COVIDVaccinationRecords = ({ onClose }: COVIDVaccinationRecordsProps) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [vaccinationData, setVaccinationData] = useState<any>(null);

  const handleSearchRecords = async () => {
    if (!mobileNumber || !aadhaarNumber) {
      toast.error('Please enter both mobile number and Aadhaar number');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call to CoWIN
    setTimeout(() => {
      setIsSearching(false);
      setVaccinationData({
        beneficiaryName: 'John Doe',
        aadhaar: '****-****-' + aadhaarNumber.slice(-4),
        mobile: '*****' + mobileNumber.slice(-5),
        doses: [
          {
            doseNumber: 'First Dose',
            vaccine: 'COVISHIELD',
            date: '2021-05-15',
            center: 'PHC Kondapur, Hyderabad',
            batchNo: 'COV001',
            certificateId: 'CERT001234'
          },
          {
            doseNumber: 'Second Dose',
            vaccine: 'COVISHIELD',
            date: '2021-08-20',
            center: 'PHC Kondapur, Hyderabad',
            batchNo: 'COV002',
            certificateId: 'CERT001235'
          }
        ],
        fullyVaccinated: true
      });
      toast.success('Vaccination records found successfully!');
    }, 2000);
  };

  const handleDownloadCertificate = () => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggMTIwCj4+CnN0cmVhbQpCVAovRjEgMTIgVGYKMTAwIDcwMCBUZAooQ09WSUQtMTkgVmFjY2luYXRpb24gQ2VydGlmaWNhdGUpIFRqCjEwMCA2ODAgVGQKKEJlbmVmaWNpYXJ5OiBTYW1wbGUgTmFtZSkgVGoKMTAwIDY2MCBUZAooRnVsbHkgVmFjY2luYXRlZCkgVGoKRVQKZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzIzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkzCiUlRU9G';
    link.download = 'covid_vaccination_certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Vaccination certificate downloaded successfully!');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Shield className="w-6 h-6 mr-2 text-purple-600" />
            COVID Vaccination Records
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {!vaccinationData ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-700">Fetch Vaccination Certificate</CardTitle>
                <p className="text-gray-600">
                  Enter your registered mobile number and Aadhaar to fetch your CoWIN vaccination certificate
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Registered Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    placeholder="Enter 12-digit Aadhaar number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    maxLength={12}
                  />
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
                  disabled={isSearching}
                  onClick={handleSearchRecords}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Searching Records...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Fetch Records
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Vaccination Status */}
              <Card className={`border-2 ${vaccinationData.fullyVaccinated ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className={`w-8 h-8 mr-3 ${vaccinationData.fullyVaccinated ? 'text-green-600' : 'text-yellow-600'}`} />
                      <div>
                        <h3 className={`text-lg font-semibold ${vaccinationData.fullyVaccinated ? 'text-green-800' : 'text-yellow-800'}`}>
                          {vaccinationData.fullyVaccinated ? 'Fully Vaccinated' : 'Partially Vaccinated'}
                        </h3>
                        <p className={`${vaccinationData.fullyVaccinated ? 'text-green-700' : 'text-yellow-700'}`}>
                          {vaccinationData.beneficiaryName} | {vaccinationData.aadhaar}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleDownloadCertificate}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Vaccination Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Vaccination Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vaccinationData.doses.map((dose: any, index: number) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                        <h4 className="font-semibold text-gray-800">{dose.doseNumber}</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mt-1">
                          <p><span className="font-medium">Vaccine:</span> {dose.vaccine}</p>
                          <p><span className="font-medium">Date:</span> {dose.date}</p>
                          <p><span className="font-medium">Center:</span> {dose.center}</p>
                          <p><span className="font-medium">Batch:</span> {dose.batchNo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setVaccinationData(null)}
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Search Another Record
              </Button>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">About CoWIN Certificate</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This certificate is issued by the Ministry of Health & Family Welfare</li>
              <li>• It serves as proof of COVID-19 vaccination for travel and other purposes</li>
              <li>• The certificate contains a QR code for verification</li>
              <li>• Keep your certificate safe and carry it when required</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
