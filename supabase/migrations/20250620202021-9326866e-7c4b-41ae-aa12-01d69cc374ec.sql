
-- Create education schemes definitions table
CREATE TABLE public.education_scheme_definitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  eligibility TEXT[],
  required_documents TEXT[],
  benefits TEXT[],
  funding_amount TEXT,
  is_application_enabled BOOLEAN DEFAULT true,
  is_info_only BOOLEAN DEFAULT false,
  target_community TEXT,
  external_link TEXT,
  form_fields JSONB,
  status_stages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education applications table
CREATE TABLE public.education_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  scheme_id UUID REFERENCES public.education_scheme_definitions NOT NULL,
  application_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education status tracking table
CREATE TABLE public.education_status_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.education_applications NOT NULL,
  current_status TEXT NOT NULL DEFAULT 'Submitted',
  status_history JSONB NOT NULL DEFAULT '[]',
  remarks TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.education_scheme_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_status_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for education_scheme_definitions (public read access)
CREATE POLICY "Anyone can view education schemes" 
  ON public.education_scheme_definitions 
  FOR SELECT 
  USING (true);

-- RLS policies for education_applications
CREATE POLICY "Users can view their own education applications" 
  ON public.education_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own education applications" 
  ON public.education_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own education applications" 
  ON public.education_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for education_status_tracking
CREATE POLICY "Users can view their application status" 
  ON public.education_status_tracking 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.education_applications 
      WHERE id = application_id AND user_id = auth.uid()
    )
  );

-- Insert sample education schemes
INSERT INTO public.education_scheme_definitions (name, category, description, highlight, eligibility, required_documents, benefits, funding_amount, is_application_enabled, target_community, form_fields, status_stages) VALUES
('Mahatma Jyotiba Phule Overseas Vidya Nidhi', 'Overseas Education', 'Financial assistance for BC/EBC students to pursue higher education abroad', '₹20L scholarship for BC/EBC students to study abroad', 
  ARRAY['Must belong to BC/EBC category', 'Annual family income below ₹8 lakh', 'Secured admission in recognized foreign university'], 
  ARRAY['Aadhaar Card', 'Caste Certificate', 'Income Certificate', 'Degree Certificates', 'Passport', 'Admission Letter'],
  ARRAY['Up to ₹20 lakh financial assistance', 'Covers tuition fees and living expenses', 'No collateral required'],
  '₹20 Lakh', true, 'BC/EBC',
  '{"fields": [{"name": "aadhaar", "type": "text", "label": "Aadhaar Number", "required": true}, {"name": "mobile", "type": "tel", "label": "Mobile Number", "required": true}, {"name": "caste", "type": "select", "label": "Caste Category", "options": ["BC-A", "BC-B", "BC-C", "BC-D", "EBC"], "required": true}, {"name": "income_proof", "type": "file", "label": "Income Certificate", "required": true}, {"name": "degree_details", "type": "textarea", "label": "Educational Qualifications", "required": true}, {"name": "passport", "type": "file", "label": "Passport Copy", "required": true}]}',
  ARRAY['Submitted', 'Document Verification', 'Committee Review', 'Approved', 'Funds Disbursed']),

('Chief Minister''s Overseas Scholarship for Minorities', 'Overseas Education', 'Scholarship scheme for minority students to pursue higher education abroad', '₹15L scholarship for minority students', 
  ARRAY['Must belong to minority community', 'Merit-based selection', 'Admission in recognized foreign university'], 
  ARRAY['Minority Certificate', 'Income Certificate', 'Academic Records', 'Passport', 'Admission Letter'],
  ARRAY['Up to ₹15 lakh financial support', 'Merit-based selection', 'Career guidance support'],
  '₹15 Lakh', true, 'Minorities',
  '{"fields": [{"name": "aadhaar", "type": "text", "label": "Aadhaar Number", "required": true}, {"name": "mobile", "type": "tel", "label": "Mobile Number", "required": true}, {"name": "minority_certificate", "type": "file", "label": "Minority Certificate", "required": true}, {"name": "academic_records", "type": "file", "label": "Academic Transcripts", "required": true}, {"name": "passport", "type": "file", "label": "Passport Copy", "required": true}]}',
  ARRAY['Submitted', 'Document Verification', 'Merit Assessment', 'Final Selection', 'Scholarship Granted']),

('DOST (Degree Online Services Telangana)', 'Online Services', 'Digital platform for degree-related services and admissions', 'One-stop solution for degree admissions and services', 
  ARRAY['Telangana resident', 'Completed intermediate education'], 
  ARRAY['Intermediate Certificate', 'Transfer Certificate', 'Study Certificates'],
  ARRAY['Online degree admissions', 'Document verification', 'Seat allotment'],
  'Free Service', false, 'General',
  '{}',
  ARRAY[]::TEXT[]),

('TSWREIS Residential Admissions', 'Residential Education', 'Admissions to Telangana Social Welfare Residential Educational Institutions', 'Free residential education for SC/ST students', 
  ARRAY['SC/ST category students', 'Age criteria as per class', 'Telangana domicile'], 
  ARRAY['Caste Certificate', 'Income Certificate', 'Birth Certificate', 'Transfer Certificate', 'Aadhaar Card'],
  ARRAY['Free boarding and lodging', 'Quality education', 'Career guidance'],
  'Free Education', true, 'SC/ST',
  '{"fields": [{"name": "student_name", "type": "text", "label": "Student Name", "required": true}, {"name": "dob", "type": "date", "label": "Date of Birth", "required": true}, {"name": "parent_aadhaar", "type": "text", "label": "Parent Aadhaar", "required": true}, {"name": "district", "type": "select", "label": "District", "options": ["Hyderabad", "Warangal", "Khammam", "Nizamabad", "Karimnagar"], "required": true}, {"name": "transfer_certificate", "type": "file", "label": "Transfer Certificate", "required": true}]}',
  ARRAY['Submitted', 'Document Verification', 'Entrance Test', 'Merit List', 'Seat Allotted']),

('TASK (Telangana Academy for Skill & Knowledge)', 'Skill Development', 'Skill development and training programs for youth', 'Industry-relevant skill training programs', 
  ARRAY['Age 18-35 years', 'Basic educational qualification', 'Telangana resident'], 
  ARRAY['Educational Certificates', 'Age Proof', 'Residence Proof'],
  ARRAY['Industry-relevant training', 'Placement assistance', 'Certification'],
  'Free Training', true, 'General',
  '{"fields": [{"name": "name", "type": "text", "label": "Full Name", "required": true}, {"name": "college", "type": "text", "label": "College/Institution", "required": true}, {"name": "domain_interest", "type": "select", "label": "Domain of Interest", "options": ["IT & Software", "Healthcare", "Manufacturing", "Retail", "Banking"], "required": true}, {"name": "mobile", "type": "tel", "label": "Mobile Number", "required": true}, {"name": "email", "type": "email", "label": "Email Address", "required": true}]}',
  ARRAY['Submitted', 'Counseling', 'Training Started', 'Assessment', 'Certified']),

('Cyber Ambassadors Program', 'Digital Literacy', 'Training program to create cyber security awareness ambassadors', 'Digital literacy and cyber security training', 
  ARRAY['Students or working professionals', 'Basic computer knowledge', 'Interest in cyber security'], 
  ARRAY['Educational Certificate', 'ID Proof'],
  ARRAY['Cyber security training', 'Certificate of completion', 'Ambassador recognition'],
  'Free Program', false, 'General',
  '{}',
  ARRAY[]::TEXT[]);
