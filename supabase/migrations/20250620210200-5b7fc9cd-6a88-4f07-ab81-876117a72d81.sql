
-- Create health scheme definitions table to store all health service information
CREATE TABLE IF NOT EXISTS public.health_scheme_definitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  eligibility TEXT[],
  benefits TEXT[],
  required_documents TEXT[],
  target_community TEXT,
  funding_amount TEXT,
  form_fields JSONB,
  status_stages TEXT[],
  external_link TEXT,
  is_application_enabled BOOLEAN DEFAULT true,
  is_info_only BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health applications table for user submissions
CREATE TABLE IF NOT EXISTS public.health_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scheme_id UUID NOT NULL,
  application_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create status tracking table for applications
CREATE TABLE IF NOT EXISTS public.health_status_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  current_status TEXT NOT NULL DEFAULT 'Submitted',
  status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  remarks TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE public.health_applications 
ADD CONSTRAINT fk_health_applications_scheme_id 
FOREIGN KEY (scheme_id) REFERENCES public.health_scheme_definitions(id);

ALTER TABLE public.health_status_tracking 
ADD CONSTRAINT fk_health_status_tracking_application_id 
FOREIGN KEY (application_id) REFERENCES public.health_applications(id);

-- Insert initial health schemes data
INSERT INTO public.health_scheme_definitions (name, category, description, highlight, eligibility, benefits, required_documents, target_community, funding_amount, form_fields, status_stages, is_application_enabled) VALUES 
('Rajiv Aarogyasri Health Insurance', 'Health Insurance', 'Cashless treatment for major diseases for low-income groups', 'Up to ₹5 Lakh coverage for 2000+ procedures', 
ARRAY['Annual income below ₹5 lakhs', 'Resident of Telangana', 'White ration card holder'], 
ARRAY['Cashless treatment', 'Pre and post hospitalization', 'Coverage for major surgeries', 'Free diagnostics'], 
ARRAY['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Medical Reports'], 
'Below Poverty Line families', '₹5,00,000 per family per year', 
'[{"name": "aadhaar", "label": "Aadhaar Number", "type": "text", "required": true}, {"name": "patientName", "label": "Patient Name", "type": "text", "required": true}, {"name": "age", "label": "Age", "type": "number", "required": true}, {"name": "gender", "label": "Gender", "type": "select", "options": ["Male", "Female", "Other"], "required": true}, {"name": "disease", "label": "Disease/Condition", "type": "text", "required": true}, {"name": "hospitalPreference", "label": "Preferred Hospital", "type": "text", "required": false}]',
ARRAY['Application Submitted', 'Document Verification', 'Medical Board Review', 'Approved', 'Card Issued'], true),

('KCR Kit (Amma Odi)', 'Maternal Care', 'Maternal care with transport & ₹12-13k postnatal aid', 'Free nutrition kit + financial assistance', 
ARRAY['Pregnant women in Telangana', 'Below poverty line', 'First two children only'], 
ARRAY['Nutrition kit worth ₹12,000', 'Free transport to hospital', 'Postnatal care', 'Financial assistance'], 
ARRAY['Pregnancy certificate', 'Aadhaar Card', 'Ration Card', 'Bank Account details'], 
'Pregnant women', '₹12,000 - ₹13,000', 
'[{"name": "motherName", "label": "Mother Name", "type": "text", "required": true}, {"name": "aadhaar", "label": "Aadhaar Number", "type": "text", "required": true}, {"name": "pregnancyMonth", "label": "Pregnancy Month", "type": "number", "required": true}, {"name": "hospital", "label": "Registered Hospital", "type": "text", "required": true}, {"name": "bankAccount", "label": "Bank Account Number", "type": "text", "required": true}, {"name": "ifscCode", "label": "IFSC Code", "type": "text", "required": true}]',
ARRAY['Registration', 'Document Verification', 'Hospital Confirmation', 'Kit Distribution', 'Amount Transfer'], true),

('Aarogya Lakshmi', 'Nutrition Support', 'Free nutritious food for pregnant and lactating mothers', 'Daily nutrition support at Anganwadi centers', 
ARRAY['Pregnant women', 'Lactating mothers up to 6 months', 'Registered at Anganwadi'], 
ARRAY['Free nutritious food', 'Take-home rations', 'Health monitoring', 'Growth tracking'], 
ARRAY['Pregnancy certificate', 'Aadhaar Card', 'Anganwadi registration'], 
'Pregnant and lactating mothers', 'Free meals daily', 
'[{"name": "motherName", "label": "Mother Name", "type": "text", "required": true}, {"name": "aadhaar", "label": "Aadhaar Number", "type": "text", "required": true}, {"name": "anganwadiCenter", "label": "Anganwadi Center", "type": "text", "required": true}, {"name": "pregnancyStatus", "label": "Status", "type": "select", "options": ["Pregnant", "Lactating"], "required": true}, {"name": "expectedDelivery", "label": "Expected Delivery Date", "type": "date", "required": false}]',
ARRAY['Registration', 'Anganwadi Verification', 'Approved', 'Benefits Started'], true),

('Balika Arogya Raksha Kits', 'Student Health', 'Hygiene kits for girl students in 7-12th grade', 'Free hygiene kits for adolescent girls', 
ARRAY['Girl students in classes 7-12', 'Studying in government schools', 'Resident of Telangana'], 
ARRAY['Monthly hygiene kit', 'Health education', 'Awareness programs', 'Medical check-ups'], 
ARRAY['Student ID', 'Aadhaar Card', 'School certificate'], 
'Girl students (7th-12th grade)', 'Free monthly kits', 
'[{"name": "studentName", "label": "Student Name", "type": "text", "required": true}, {"name": "aadhaar", "label": "Aadhaar Number", "type": "text", "required": true}, {"name": "schoolName", "label": "School Name", "type": "text", "required": true}, {"name": "class", "label": "Class", "type": "select", "options": ["7th", "8th", "9th", "10th", "11th", "12th"], "required": true}, {"name": "rollNumber", "label": "Roll Number", "type": "text", "required": true}]',
ARRAY['Application Submitted', 'School Verification', 'Approved', 'Kit Distribution'], true),

('Employee & Journalist Health Scheme (EJHS)', 'Employee Health', 'Free inpatient/post-care for state employees, pensioners, and accredited journalists', 'Comprehensive health coverage for government employees', 
ARRAY['State government employees', 'Pensioners', 'Accredited journalists', 'Family members included'], 
ARRAY['Cashless treatment', 'Inpatient care', 'Post-operative care', 'Family coverage'], 
ARRAY['Employee ID', 'Service certificate', 'Aadhaar Card', 'Medical reports'], 
'Government employees and journalists', 'Up to ₹2,00,000 per family', 
'[{"name": "employeeName", "label": "Employee/Journalist Name", "type": "text", "required": true}, {"name": "employeeId", "label": "Employee/Journalist ID", "type": "text", "required": true}, {"name": "department", "label": "Department/Organization", "type": "text", "required": true}, {"name": "designation", "label": "Designation", "type": "text", "required": true}, {"name": "familyMembers", "label": "Number of Family Members", "type": "number", "required": true}]',
ARRAY['Application Submitted', 'Department Verification', 'Health Card Generation', 'Approved'], true);

-- Insert additional services
INSERT INTO public.health_scheme_definitions (name, category, description, highlight, eligibility, benefits, required_documents, is_info_only) VALUES 
('Free Diagnostics & Arogya Mahila', 'Diagnostics', 'Free diagnostic services and women health programs', 'No-cost health screenings', 
ARRAY['All residents of Telangana', 'Especially women and children'], 
ARRAY['Free blood tests', 'X-rays and scans', 'Health screenings', 'Specialized women health services'], 
ARRAY['Aadhaar Card', 'Medical prescription if any'], true),

('e-Sanjeevani Telemedicine Consultations', 'Telemedicine', 'Online doctor consultations through government platform', 'Free video consultations with specialists', 
ARRAY['All citizens', 'Internet connection required'], 
ARRAY['Free online consultations', 'Specialist advice', 'Follow-up support', 'Medicine prescriptions'], 
ARRAY['Aadhaar Card', 'Medical history if available'], true),

('AYUSH Wellness & Integrated Hospitals', 'Alternative Medicine', 'Traditional medicine services through AYUSH system', 'Ayurveda, Yoga, Unani, Siddha, Homeopathy services', 
ARRAY['All residents', 'Interest in traditional medicine'], 
ARRAY['Alternative treatment options', 'Wellness programs', 'Yoga sessions', 'Herbal medicine'], 
ARRAY['Aadhaar Card'], true),

('Free Dialysis Services', 'Kidney Care', 'Free dialysis treatment at government hospitals', 'No-cost kidney treatment', 
ARRAY['Kidney patients', 'Below poverty line preferred'], 
ARRAY['Free dialysis sessions', 'Medical monitoring', 'Medicine support'], 
ARRAY['Medical reports', 'Aadhaar Card', 'Income certificate'], true),

('108 Ambulance & Emergency Transport', 'Emergency Services', 'Free emergency ambulance services across Telangana', '24/7 emergency response', 
ARRAY['Emergency situations', 'All residents'], 
ARRAY['Free ambulance service', 'Trained paramedics', 'Basic life support', 'Hospital transport'], 
ARRAY['None - Emergency service'], true);
