
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Loader2, User, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

interface MedicalCertificateIssuanceProps {
  onClose: () => void;
}

export const MedicalCertificateIssuance = ({ onClose }: MedicalCertificateIssuanceProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    illness: '',
    doctorName: '',
    hospitalName: '',
    certificateType: 'sick-leave',
    duration: '',
    remarks: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateCertificate = async ()=> {
    const requiredFields = ['patientName', 'age', 'illness', 'doctorName', 'hospitalName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate certificate generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create a mock PDF download
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggMTAwCj4+CnN0cmVhbQpCVAovRjEgMTIgVGYKMTAwIDcwMCBUZAooTWVkaWNhbCBDZXJ0aWZpY2F0ZSAtIFNhbXBsZSkgVGoKMTAwIDY4MCBUZAooUGF0aWVudDogU2FtcGxlIE5hbWUpIFRqCkVUCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNDUgMDAwMDAgbiAKMDAwMDAwMDMyMyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQ3MwolJUVPRg==';
      link.download = `medical_certificate_${formData.patientName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Medical certificate generated and downloaded successfully!');
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Medical Certificate Issuance
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient full name"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.certificateType}
                    onChange={(e) => handleInputChange('certificateType', e.target.value)}
                  >
                    <option value="sick-leave">Sick Leave</option>
                    <option value="fitness">Fitness Certificate</option>
                    <option value="disability">Disability Certificate</option>
                    <option value="general">General Medical Certificate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="illness">Illness/Condition *</Label>
                <Textarea
                  id="illness"
                  placeholder="Describe the medical condition or illness"
                  value={formData.illness}
                  onChange={(e) => handleInputChange('illness', e.target.value)}
                  rows={3}
                />
              </div>

              {formData.certificateType === 'sick-leave' && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration of Leave</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 days, 2 weeks"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                Medical Authority Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor Name *</Label>
                  <Input
                    id="doctorName"
                    placeholder="Enter doctor's full name"
                    value={formData.doctorName}
                    onChange={(e) => handleInputChange('doctorName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospitalName">Hospital/Clinic Name *</Label>
                  <Input
                    id="hospitalName"
                    placeholder="Enter hospital or clinic name"
                    value={formData.hospitalName}
                    onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Additional Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Any additional medical remarks or recommendations"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
            disabled={isGenerating}
            onClick={handleGenerateCertificate}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Certificate...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Generate & Download Certificate
              </>
            )}
          </Button>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• This certificate is digitally generated and legally valid</li>
              <li>• Ensure all information is accurate before generation</li>
              <li>• The certificate will be signed by the authorized medical officer</li>
              <li>• Keep the certificate safe for official purposes</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
