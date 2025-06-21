
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Send, FileText, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface HealthScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  highlight: string | null;
  eligibility: string[] | null;
  benefits: string[] | null;
  required_documents: string[] | null;
  form_fields: any;
  funding_amount: string | null;
  target_community: string | null;
  external_link: string | null;
  is_application_enabled: boolean | null;
  is_info_only: boolean | null;
  status_stages: string[] | null;
}

interface HealthApplicationFormProps {
  scheme: HealthScheme;
  onClose: () => void;
}

export const HealthApplicationForm = ({ scheme, onClose }: HealthApplicationFormProps) => {
  const [applicationData, setApplicationData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  // Parse form fields - handle both string and array formats
  let formFields: any[] = [];
  if (scheme.form_fields) {
    if (typeof scheme.form_fields === 'string') {
      try {
        formFields = JSON.parse(scheme.form_fields);
      } catch (e) {
        console.error('Error parsing form fields:', e);
      }
    } else if (Array.isArray(scheme.form_fields)) {
      formFields = scheme.form_fields;
    }
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileUpload = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
      toast.success('Document uploaded successfully');
    }
  };

  const renderFormField = (field: any, index: number) => {
    const { name, label, type, required, options } = field;
    const fieldLabel = label || name;

    switch (type) {
      case 'text':
      case 'email':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type={type}
              value={applicationData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={`Enter ${fieldLabel.toLowerCase()}`}
              required={required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="number"
              value={applicationData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={`Enter ${fieldLabel.toLowerCase()}`}
              required={required}
            />
          </div>
        );

      case 'date':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="date"
              value={applicationData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      case 'select':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={applicationData[name] || ''}
              onValueChange={(value) => handleInputChange(name, value)}
              required={required}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${fieldLabel.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'textarea':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={name}
              value={applicationData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={`Enter ${fieldLabel.toLowerCase()}`}
              required={required}
              rows={3}
            />
          </div>
        );

      case 'file':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={name}>
              {fieldLabel} {required && <span className="text-red-500">*</span>}
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                id={name}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(name, e)}
                required={required}
              />
              <label htmlFor={name} className="cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload {fieldLabel.toLowerCase()}
                </p>
                {applicationData[name] && (
                  <p className="text-sm text-green-600 mt-2 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {applicationData[name]}
                  </p>
                )}
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      toast.error('Please login to submit application');
      return;
    }

    // Validate required fields
    const requiredFields = formFields
      .filter(field => field.required)
      .map(field => field.name);

    const missingFields = requiredFields.filter(field => !applicationData[field]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data: applicationResult, error: applicationError } = await supabase
        .from('health_applications')
        .insert({
          user_id: user.id,
          scheme_id: scheme.id,
          application_data: applicationData
        })
        .select()
        .single();

      if (applicationError) throw applicationError;

      // Create status tracking entry
      if (applicationResult && scheme.status_stages && scheme.status_stages.length > 0) {
        const { error: statusError } = await supabase
          .from('health_status_tracking')
          .insert({
            application_id: applicationResult.id,
            current_status: scheme.status_stages[0],
            status_history: [{
              status: scheme.status_stages[0],
              timestamp: new Date().toISOString(),
              remarks: 'Application submitted successfully'
            }]
          });

        if (statusError) {
          console.error('Status tracking error:', statusError);
        }
      }

      const referenceId = `HA${Date.now()}`;
      toast.success(`Application submitted successfully! Reference ID: ${referenceId}`);
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Heart className="w-6 h-6 mr-2 text-orange-600" />
            Apply for {scheme.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {scheme.highlight && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-orange-800 font-medium text-sm">{scheme.highlight}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-700">Application Form</CardTitle>
              <p className="text-gray-600">Fill in your details to apply for this health scheme</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {formFields.map((field, index) => renderFormField(field, index))}
              </div>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                disabled={isSubmitting}
                onClick={handleSubmitApplication}
              >
                {isSubmitting ? (
                  <>
                    <FileText className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {scheme.required_documents && scheme.required_documents.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Required Documents
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {scheme.required_documents.map((document, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    {document}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
