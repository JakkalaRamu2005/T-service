
-- Create health scheme definitions table
CREATE TABLE public.health_scheme_definitions (
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

-- Create health applications table
CREATE TABLE public.health_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scheme_id UUID NOT NULL REFERENCES public.health_scheme_definitions(id),
  application_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health status tracking table
CREATE TABLE public.health_status_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.health_applications(id),
  current_status TEXT NOT NULL DEFAULT 'Submitted',
  status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  remarks TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.health_scheme_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_status_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for health_scheme_definitions (public read)
CREATE POLICY "Everyone can view health schemes" 
  ON public.health_scheme_definitions 
  FOR SELECT 
  USING (true);

-- RLS policies for health_applications (user-specific)
CREATE POLICY "Users can view their own health applications" 
  ON public.health_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health applications" 
  ON public.health_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health applications" 
  ON public.health_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for health_status_tracking
CREATE POLICY "Users can view their health application status" 
  ON public.health_status_tracking 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.health_applications 
      WHERE id = health_status_tracking.application_id 
      AND user_id = auth.uid()
    )
  );

-- Insert sample health schemes
INSERT INTO public.health_scheme_definitions (name, category, description, highlight, eligibility, benefits, required_documents, form_fields, funding_amount, target_community, is_application_enabled, status_stages) VALUES
('KCR Kit / Amma Vodi / MCH Kit', 'Maternal & Child Health', 'Maternal and newborn care with ₹12,000 cash assistance and delivery kit for safe delivery and child care.', '₹12,000 Cash Assistance', 
 ARRAY['Pregnant women', 'New mothers', 'Telangana residents'], 
 ARRAY['₹12,000 cash assistance', 'Delivery kit with essentials', '102 ambulance transport', 'Medical support'],
 ARRAY['Mother Aadhaar Card', 'Discharge Summary', 'Hospital ID'],
 '{"mothers_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "delivery_hospital": {"type": "text", "required": true}, "district": {"type": "select", "required": true}, "expected_date": {"type": "date", "required": true}, "janani_card": {"type": "text", "required": false}}',
 '₹12,000', 'Pregnant and lactating women', true, 
 ARRAY['Submitted', 'Medical Officer Review', 'Approved', 'Kit Dispatched', 'Funds Released']),

('Aarogya Lakshmi', 'Nutrition Support', 'Free nutritious meals at Anganwadi centers for pregnant/lactating women and children under 6 years.', 'Free Nutritious Meals', 
 ARRAY['Pregnant women', 'Lactating mothers', 'Children under 6 years', 'Anganwadi beneficiaries'], 
 ARRAY['Free daily meals', 'Nutritional supplements', 'Health monitoring', 'Growth tracking'],
 ARRAY['Ration Card', 'Aadhaar Card'],
 '{"aadhaar": {"type": "text", "required": true}, "ration_card": {"type": "text", "required": true}}',
 'Free Service', 'Women and children', false, 
 ARRAY[]::TEXT[]),

('Employee & Journalist Health Scheme (EJHS)', 'Government Healthcare', 'Cashless healthcare coverage for government employees, pensioners, and registered journalists with family coverage.', 'Cashless Healthcare', 
 ARRAY['Government employees', 'Pensioners', 'Registered journalists', 'Their dependents'], 
 ARRAY['Cashless treatment', 'Family coverage', 'Network hospitals', 'Preventive care'],
 ARRAY['Employee ID', 'Aadhaar Card', 'Dependent List'],
 '{"employee_id": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": true}, "department": {"type": "text", "required": true}, "mobile": {"type": "tel", "required": true}, "dependent_count": {"type": "number", "required": true}}',
 'As per grade', 'Government employees and journalists', true, 
 ARRAY['Application Submitted', 'ID Verified', 'Hospital Linked', 'Card Issued']),

('Aarogyasri / Cheyutha Scheme', 'Health Insurance', '₹10 lakh health coverage for serious ailments for BPL/NFSA families with comprehensive medical support.', '₹10 Lakh Coverage', 
 ARRAY['BPL families', 'NFSA cardholders', 'Below poverty line', 'Serious ailment patients'], 
 ARRAY['₹10 lakh health coverage', 'Cashless treatment', 'Network hospitals', 'Pre and post operative care'],
 ARRAY['White Ration Card', 'Aadhaar Card', 'Medical Reports'],
 '{"aadhaar": {"type": "text", "required": true}, "mobile": {"type": "tel", "required": true}, "ration_card": {"type": "text", "required": true}, "disease_name": {"type": "select", "required": true}, "preferred_hospital": {"type": "text", "required": true}}',
 '₹10 Lakh', 'BPL and NFSA families', true, 
 ARRAY['Submitted', 'Medical Approval', 'Hospital Admission', 'Claim Approved']),

('eSanjeevani Telemedicine Services', 'Digital Healthcare', 'Free online doctor consultation via government doctors for basic health queries and follow-ups.', 'Free Online Consultation', 
 ARRAY['All citizens', 'Internet access required', 'Basic health queries'], 
 ARRAY['Free consultation', 'Government doctors', 'Digital prescriptions', 'Follow-up support'],
 ARRAY['Aadhaar Card'],
 '{"name": {"type": "text", "required": true}, "mobile": {"type": "tel", "required": true}, "age": {"type": "number", "required": true}, "symptoms": {"type": "textarea", "required": true}}',
 'Free Service', 'All citizens', false, 
 ARRAY[]::TEXT[]),

('Emergency & PHC Services (108/102/104)', 'Emergency Services', 'Free emergency transport and mobile health services for emergencies, pregnancy, and rural outreach.', 'Free Emergency Transport', 
 ARRAY['Emergency patients', 'Pregnant women', 'Rural population', 'All citizens'], 
 ARRAY['Free ambulance service', '24/7 availability', 'Emergency care', 'Transport support'],
 ARRAY['Patient details', 'Emergency contact'],
 '{"patient_name": {"type": "text", "required": true}, "aadhaar": {"type": "text", "required": false}, "emergency_type": {"type": "select", "required": true}, "location": {"type": "text", "required": true}, "contact": {"type": "tel", "required": true}}',
 'Free Service', 'All citizens', true, 
 ARRAY['Request Submitted', 'Ambulance Dispatched', 'Patient Picked Up', 'Delivered to Hospital']);
