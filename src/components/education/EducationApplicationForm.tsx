
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
import { Select, SelectContent,SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Send, X, FileText, AlertCircle } from 'lucide-react';
import type { EducationScheme } from '@/pages/EducationServices';

interface EducationApplicationFormProps {
  scheme: EducationScheme;
  onClose: () => void;
  onSubmit: (applicationId: string) => void;
}

export const EducationApplicationForm: React.FC<EducationApplicationFormProps> = ({
  scheme,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to submit application');
      return;
    }

    setLoading(true);
    try {
      // Submit application
      const { data: application, error: appError } = await supabase
        .from('education_applications')
        .insert({
          user_id: user.id,
          scheme_id: scheme.id,
          application_data: formData
        })
        .select()
        .single();

      if (appError) throw appError;

      // Create initial status tracking
      const { error: statusError } = await supabase
        .from('education_status_tracking')
        .insert({
          application_id: application.id,
          current_status: 'Submitted',
          status_history: [
            {
              status: 'Submitted',
              timestamp: new Date().toISOString(),
              remarks: 'Application submitted successfully'
            }
          ]
        });

      if (statusError) throw statusError;

      toast.success('Application submitted successfully!');
      onSubmit(application.id);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (field: any) => {
    const { name, type, label, required, options } = field;

    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type={type}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={name}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
              rows={3}
            />
          </div>
        );

      case 'select':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={formData[name] || ''} onValueChange={(value) => handleInputChange(name, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
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

      case 'date':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="date"
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      case 'file':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleInputChange(name, file.name);
                }
              }}
              required={required}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-xs text-gray-500">
              Accepted formats: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const formFields = scheme.form_fields?.fields || [];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-bold text-gray-800 pr-8">
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
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <p className="text-blue-800 font-medium">Important Instructions</p>
                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                  <li>• Fill all required fields marked with *</li>
                  <li>• Upload clear and legible documents</li>
                  <li>• Ensure all information is accurate</li>
                  <li>• Keep copies of all documents for your records</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {formFields.map(renderFormField)}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Required Documents Checklist
            </h4>
            <ul className="space-y-1">
              {scheme.required_documents.map((doc, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4 pt-4 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
