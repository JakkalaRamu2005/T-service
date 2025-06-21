
-- Create housing scheme definitions table
CREATE TABLE public.housing_scheme_definitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  eligibility TEXT[],
  benefits TEXT[],
  required_documents TEXT[],
  form_fields JSONB,
  funding_amount TEXT,
  target_community TEXT,
  external_link TEXT,
  is_application_enabled BOOLEAN DEFAULT true,
  is_info_only BOOLEAN DEFAULT false,
  status_stages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create housing applications table
CREATE TABLE public.housing_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scheme_id UUID NOT NULL REFERENCES public.housing_scheme_definitions(id),
  application_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create housing status tracking table
CREATE TABLE public.housing_status_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.housing_applications(id),
  current_status TEXT NOT NULL DEFAULT 'Application Received',
  status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  remarks TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.housing_scheme_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing_status_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for housing_scheme_definitions (public read)
CREATE POLICY "Everyone can view housing schemes" 
  ON public.housing_scheme_definitions 
  FOR SELECT 
  USING (true);

-- RLS policies for housing_applications (user-specific)
CREATE POLICY "Users can view their own housing applications" 
  ON public.housing_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own housing applications" 
  ON public.housing_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own housing applications" 
  ON public.housing_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for housing_status_tracking
CREATE POLICY "Users can view their housing application status" 
  ON public.housing_status_tracking 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.housing_applications 
      WHERE id = housing_status_tracking.application_id 
      AND user_id = auth.uid()
    )
  );

-- Insert sample housing schemes
INSERT INTO public.housing_scheme_definitions (name, category, description, highlight, eligibility, benefits, required_documents, form_fields, funding_amount, target_community, is_application_enabled, status_stages) VALUES
('Indiramma Indlu Scheme', 'Housing Construction', 'Free housing for eligible families with complete construction assistance and land allocation under the Indiramma initiative.', 'Free House Construction', 
 ARRAY['Below Poverty Line families', 'Landless families', 'SC/ST/BC communities', 'Priority to women applicants'], 
 ARRAY['Free house construction', 'Land allocation if needed', 'Complete infrastructure', 'Utility connections'],
 ARRAY['Aadhaar Card', 'Income Certificate', 'Caste Certificate', 'Land Documents', 'Photo'],
 '{"applicant_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "address": {"type": "textarea", "required": true}, "district": {"type": "select", "required": true}, "category": {"type": "select", "required": true}, "family_income": {"type": "number", "required": true}, "land_ownership": {"type": "select", "required": true}, "land_area": {"type": "text", "required": false}}',
 'Complete House', 'BPL and landless families', true, 
 ARRAY['Application Received', 'Under Verification', 'Construction Sanctioned', 'Construction Completed', 'House Delivered']),

('Gruha Lakshmi Scheme', 'Housing Finance', 'Financial assistance and subsidized loans for middle-income families to construct or purchase homes with government support.', 'Subsidized Home Loans', 
 ARRAY['Middle income families', 'Salaried employees', 'Income between ₹3-8 lakhs annually', 'First-time home buyers'], 
 ARRAY['Interest subsidy on loans', 'Reduced processing fees', 'Government guarantee', 'Flexible repayment'],
 ARRAY['Aadhaar Card', 'Income Certificate', 'Employment Certificate', 'Bank Statements', 'Photo'],
 '{"applicant_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "address": {"type": "textarea", "required": true}, "district": {"type": "select", "required": true}, "category": {"type": "select", "required": true}, "family_income": {"type": "number", "required": true}, "employment_type": {"type": "select", "required": true}}',
 'Up to ₹2.5 Lakh Subsidy', 'Middle income families', true, 
 ARRAY['Application Received', 'Income Verification', 'Loan Approved', 'Subsidy Disbursed']),

('2BHK Housing/Dignity Housing Scheme', 'Social Housing', 'Ready-to-move 2BHK flats for eligible families with modern amenities and dignified living conditions in urban areas.', 'Ready 2BHK Flats', 
 ARRAY['Urban poor families', 'Slum dwellers', 'Migrant workers', 'Income below ₹2 lakhs annually'], 
 ARRAY['Ready 2BHK apartment', 'Modern amenities', 'Community facilities', 'Title ownership'],
 ARRAY['Aadhaar Card', 'Income Certificate', 'Residence Proof', 'Family Photo'],
 '{"applicant_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "address": {"type": "textarea", "required": true}, "district": {"type": "select", "required": true}, "category": {"type": "select", "required": true}, "family_income": {"type": "number", "required": true}, "current_residence": {"type": "select", "required": true}}',
 'Free 2BHK Flat', 'Urban poor families', true, 
 ARRAY['Application Received', 'Eligibility Verification', 'Flat Allocated', 'Keys Handed Over']),

('Housing for the Poor (Urban Flats)', 'Urban Development', 'Affordable urban housing units for economically weaker sections with basic amenities and legal ownership in city areas.', 'Affordable Urban Housing', 
 ARRAY['Economically weaker sections', 'Urban residents', 'Annual income below ₹3 lakhs', 'No existing house ownership'], 
 ARRAY['Affordable housing units', 'Basic amenities included', 'Legal ownership', 'Urban location'],
 ARRAY['Aadhaar Card', 'Income Certificate', 'Non-ownership Certificate', 'Urban Residence Proof'],
 '{"applicant_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "address": {"type": "textarea", "required": true}, "district": {"type": "select", "required": true}, "category": {"type": "select", "required": true}, "family_income": {"type": "number", "required": true}, "years_in_city": {"type": "number", "required": true}}',
 'Subsidized Rate', 'Urban economically weaker sections', true, 
 ARRAY['Application Received', 'Document Verification', 'Unit Allotted', 'Possession Given']),

('Free Sand for Indiramma Beneficiaries', 'Construction Support', 'Free sand supply for Indiramma house construction beneficiaries to support building activities and reduce construction costs.', 'Free Construction Sand', 
 ARRAY['Indiramma beneficiaries', 'House construction permit holders', 'Sand for self-construction only'], 
 ARRAY['Free sand supply', 'Transportation assistance', 'Quality assured sand', 'Multiple trips allowed'],
 ARRAY['Indiramma Approval Letter', 'Construction Permit', 'Aadhaar Card', 'Site Photos'],
 '{"applicant_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "indiramma_id": {"type": "text", "required": true}, "construction_site": {"type": "textarea", "required": true}, "sand_quantity": {"type": "select", "required": true}}',
 'Free Service', 'Indiramma beneficiaries', true, 
 ARRAY['Application Received', 'Site Verification', 'Sand Allocated', 'Delivered']);
