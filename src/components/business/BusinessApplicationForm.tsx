
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import type { BusinessScheme } from '@/pages/BusinessEntrepreneurship';

interface BusinessApplicationFormProps {
  scheme: BusinessScheme;
  onClose: () => void;
  onSubmit: (applicationId: string) => void;
}

export const BusinessApplicationForm: React.FC<BusinessApplicationFormProps> = ({ scheme, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (file) {
      // Simulate file upload
      setFormData(prev => ({ ...prev, [field]: file.name }));
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const applicationId = `${scheme.id.toUpperCase()}-${Date.now()}`;
    
    // Store application data (simulate)
    localStorage.setItem(`application_${applicationId}`, JSON.stringify({
      ...formData,
      schemeId: scheme.id,
      schemeName: scheme.name,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    }));

    toast.success('Application submitted successfully!');
    onSubmit(applicationId);
    setIsSubmitting(false);
  };

  const renderFormFields = () => {
    switch (scheme.id) {
      case 'we-hub-incubation':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="founderName">Founder Name *</Label>
                <Input 
                  id="founderName"
                  value={formData.founderName || ''}
                  onChange={(e) => handleInputChange('founderName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                <Input 
                  id="aadhaar"
                  value={formData.aadhaar || ''}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="startupName">Startup Name *</Label>
              <Input 
                id="startupName"
                value={formData.startupName || ''}
                onChange={(e) => handleInputChange('startupName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="ideaStage">Idea Stage *</Label>
              <Select onValueChange={(value) => handleInputChange('ideaStage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="prototype">Prototype</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="pitchDeck">Upload Pitch Deck (PDF) *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('pitchDeck', e.target.files?.[0] || null)}
                  className="hidden"
                  id="pitchDeckUpload"
                />
                <Label htmlFor="pitchDeckUpload" className="cursor-pointer text-purple-600 hover:text-purple-700">
                  Click to upload pitch deck
                </Label>
                {formData.pitchDeck && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.pitchDeck}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="teamDetails">Team Member Details</Label>
              <Textarea 
                id="teamDetails"
                value={formData.teamDetails || ''}
                onChange={(e) => handleInputChange('teamDetails', e.target.value)}
                placeholder="List team members with their roles and experience"
              />
            </div>
            <div>
              <Label htmlFor="fundingNeeded">Funding Needed (₹)</Label>
              <Input 
                id="fundingNeeded"
                type="number"
                value={formData.fundingNeeded || ''}
                onChange={(e) => handleInputChange('fundingNeeded', e.target.value)}
                placeholder="Amount in Rupees"
              />
            </div>
          </>
        );

      case 't-hub-accelerator':
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startupName">Startup Name *</Label>
                <Input 
                  id="startupName"
                  value={formData.startupName || ''}
                  onChange={(e) => handleInputChange('startupName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domain">Startup Domain *</Label>
                <Select onValueChange={(value) => handleInputChange('domain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="agritech">AgriTech</SelectItem>
                    <SelectItem value="retail">Retail Tech</SelectItem>
                    <SelectItem value="enterprise">Enterprise Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="problemStatement">Problem Statement *</Label>
              <Textarea 
                id="problemStatement"
                value={formData.problemStatement || ''}
                onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                placeholder="Describe the problem you're solving"
                required
              />
            </div>
            <div>
              <Label htmlFor="pitchUrl">Pitch Video URL</Label>
              <Input 
                id="pitchUrl"
                value={formData.pitchUrl || ''}
                onChange={(e) => handleInputChange('pitchUrl', e.target.value)}
                placeholder="YouTube/Vimeo link to your pitch"
              />
            </div>
            <div>
              <Label htmlFor="founderProfile">Founder Profile *</Label>
              <Textarea 
                id="founderProfile"
                value={formData.founderProfile || ''}
                onChange={(e) => handleInputChange('founderProfile', e.target.value)}
                placeholder="Brief background of founders"
                required
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicantName">Applicant Name *</Label>
                <Input 
                  id="applicantName"
                  value={formData.applicantName || ''}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input 
                  id="mobile"
                  value={formData.mobile || ''}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessDetails">Business/Project Details *</Label>
              <Textarea 
                id="businessDetails"
                value={formData.businessDetails || ''}
                onChange={(e) => handleInputChange('businessDetails', e.target.value)}
                placeholder="Describe your business or project"
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 pr-8">
              Apply for {scheme.name}
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {renderFormFields()}

          <div className="flex space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
