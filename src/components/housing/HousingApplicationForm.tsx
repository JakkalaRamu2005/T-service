
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { CheckCircle, Loader2 } from 'lucide-react';

interface HousingScheme {
  id: string;
  name: string;
  form_fields: any;
  status_stages: string[] | null;
}

interface HousingApplicationFormProps {
  scheme: HousingScheme;
  onClose: () => void;
}

export const HousingApplicationForm: React.FC<HousingApplicationFormProps> = ({
  scheme,
  onClose
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const form = useForm();

  const submitMutation = useMutation({
    mutationFn: async (formData: any) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Insert application
      const { data: application, error: appError } = await supabase
        .from('housing_applications')
        .insert({
          user_id: user.id,
          scheme_id: scheme.id,
          application_data: formData
        })
        .select()
        .single();

      if (appError) throw appError;

      // Insert initial status tracking
      const { error: statusError } = await supabase
        .from('housing_status_tracking')
        .insert({
          application_id: application.id,
          current_status: 'Application Received',
          status_history: [{
            status: 'Application Received',
            timestamp: new Date().toISOString(),
            remarks: 'Application submitted successfully'
          }]
        });

      if (statusError) throw statusError;

      return application;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['user-applications'] });
      toast.success('Application submitted successfully!');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  });

  const onSubmit = (data: any) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Your application for {scheme.name} has been submitted successfully. 
              You can track the status in your dashboard.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderFormField = (fieldKey: string, fieldConfig: any) => {
    const { type, required } = fieldConfig;

    return (
      <FormField
        key={fieldKey}
        control={form.control}
        name={fieldKey}
        rules={{ required: required ? `${fieldKey.replace('_', ' ')} is required` : false }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize">
              {fieldKey.replace('_', ' ')}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              {type === 'textarea' ? (
                <Textarea
                  placeholder={`Enter ${fieldKey.replace('_', ' ')}`}
                  {...field}
                />
              ) : type === 'select' ? (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${fieldKey.replace('_', ' ')}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldKey === 'district' && (
                      <>
                        <SelectItem value="adilabad">Adilabad</SelectItem>
                        <SelectItem value="bhadradri">Bhadradri Kothagudem</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="karimnagar">Karimnagar</SelectItem>
                        <SelectItem value="khammam">Khammam</SelectItem>
                        <SelectItem value="mahbubnagar">Mahbubnagar</SelectItem>
                        <SelectItem value="medchal">Medchal-Malkajgiri</SelectItem>
                        <SelectItem value="nalgonda">Nalgonda</SelectItem>
                        <SelectItem value="nizamabad">Nizamabad</SelectItem>
                        <SelectItem value="rangareddy">Rangareddy</SelectItem>
                        <SelectItem value="sangareddy">Sangareddy</SelectItem>
                        <SelectItem value="warangal">Warangal</SelectItem>
                      </>
                    )}
                    {fieldKey === 'category' && (
                      <>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
                        <SelectItem value="bc">BC</SelectItem>
                        <SelectItem value="minority">Minority</SelectItem>
                      </>
                    )}
                    {fieldKey === 'land_ownership' && (
                      <>
                        <SelectItem value="own">Own Land</SelectItem>
                        <SelectItem value="no_land">No Land</SelectItem>
                        <SelectItem value="disputed">Disputed</SelectItem>
                      </>
                    )}
                    {fieldKey === 'employment_type' && (
                      <>
                        <SelectItem value="government">Government Employee</SelectItem>
                        <SelectItem value="private">Private Employee</SelectItem>
                        <SelectItem value="self_employed">Self Employed</SelectItem>
                        <SelectItem value="daily_wage">Daily Wage</SelectItem>
                      </>
                    )}
                    {fieldKey === 'current_residence' && (
                      <>
                        <SelectItem value="slum">Slum Area</SelectItem>
                        <SelectItem value="rented">Rented House</SelectItem>
                        <SelectItem value="temporary">Temporary Structure</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </>
                    )}
                    {fieldKey === 'sand_quantity' && (
                      <>
                        <SelectItem value="1_load">1 Load</SelectItem>
                        <SelectItem value="2_loads">2 Loads</SelectItem>
                        <SelectItem value="3_loads">3 Loads</SelectItem>
                        <SelectItem value="more">More than 3 Loads</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              ) : type === 'number' ? (
                <Input
                  type="number"
                  placeholder={`Enter ${fieldKey.replace('_', ' ')}`}
                  {...field}
                />
              ) : (
                <Input
                  type={type === 'tel' ? 'tel' : type === 'date' ? 'date' : 'text'}
                  placeholder={`Enter ${fieldKey.replace('_', ' ')}`}
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Apply for {scheme.name}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Please fill in all the required information accurately.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {scheme.form_fields && Object.entries(scheme.form_fields).map(([fieldKey, fieldConfig]: [string, any]) => 
                renderFormField(fieldKey, fieldConfig)
              )}
            </form>
          </Form>
        </ScrollArea>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={submitMutation.isPending}>
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={submitMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
