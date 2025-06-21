
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { School, MapPin, Phone, Users, CheckCircle, X } from 'lucide-react';

interface AdmissionServicesProps {
  onClose: () => void;
}

const schoolInstitutions = [
  {
    id: 'govt-high-1',
    name: 'Government High School, Secunderabad',
    district: 'Hyderabad',
    mandal: 'Secunderabad',
    medium: ['Telugu', 'English'],
    contact: '040-2784-5612',
    seatsAvailable: 45,
    grades: ['6th', '7th', '8th', '9th', '10th']
  },
  {
    id: 'govt-high-2',
    name: 'Telangana Model School, Warangal',
    district: 'Warangal',
    mandal: 'Warangal Urban',
    medium: ['Telugu', 'English', 'Hindi'],
    contact: '0870-255-4789',
    seatsAvailable: 32,
    grades: ['6th', '7th', '8th', '9th', '10th']
  },
  {
    id: 'zp-school-1',
    name: 'ZP High School, Nizamabad',
    district: 'Nizamabad',
    mandal: 'Nizamabad Rural',
    medium: ['Telugu'],
    contact: '08462-224-567',
    seatsAvailable: 28,
    grades: ['6th', '7th', '8th', '9th', '10th']
  }
];

const intermediateInstitutions = [
  {
    id: 'govt-junior-1',
    name: 'Government Junior College, Kukatpally',
    district: 'Hyderabad',
    mandal: 'Kukatpally',
    medium: ['Telugu', 'English'],
    contact: '040-2311-8965',
    seatsAvailable: 120,
    grades: ['11th', '12th'],
    streams: ['MPC', 'BiPC', 'CEC', 'MEC']
  },
  {
    id: 'govt-junior-2',
    name: 'Telangana Social Welfare Junior College, Karimnagar',
    district: 'Karimnagar',
    mandal: 'Karimnagar',
    medium: ['Telugu', 'English'],
    contact: '0878-225-4123',
    seatsAvailable: 80,
    grades: ['11th', '12th'],
    streams: ['MPC', 'BiPC', 'MEC']
  },
  {
    id: 'residential-college-1',
    name: 'Telangana Residential Junior College, Khammam',
    district: 'Khammam',
    mandal: 'Khammam',
    medium: ['English'],
    contact: '08742-255-789',
    seatsAvailable: 60,
    grades: ['11th', '12th'],
    streams: ['MPC', 'BiPC']
  }
];

export const AdmissionServices = ({ onClose }: AdmissionServicesProps) => {
  const [educationLevel, setEducationLevel] = useState<'school' | 'intermediate' | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [institutions, setInstitutions] = useState<any[]>([]);

  const handleEducationLevelChange = (level: 'school' | 'intermediate') => {
    setEducationLevel(level);
    setSelectedGrade('');
    setInstitutions([]);
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    
    if (educationLevel === 'school') {
      const filteredInstitutions = schoolInstitutions.filter(inst => 
        inst.grades.includes(grade)
      );
      setInstitutions(filteredInstitutions);
    } else if (educationLevel === 'intermediate') {
      setInstitutions(intermediateInstitutions);
    }
  };

  const getGradeOptions = () => {
    if (educationLevel === 'school') {
      return ['6th', '7th', '8th', '9th', '10th'];
    } else if (educationLevel === 'intermediate') {
      return ['11th', '12th'];
    }
    return [];
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <School className="w-6 h-6 mr-2 text-green-600" />
            Admission Services
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Education Level Selection */}
          {!educationLevel && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Education Level:</h3>
              <RadioGroup onValueChange={handleEducationLevelChange} className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="school" id="school" />
                  <Label htmlFor="school" className="cursor-pointer flex-1">
                    <div className="font-medium">School</div>
                    <div className="text-sm text-gray-600">Classes 6th to 10th</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer flex-1">
                    <div className="font-medium">Intermediate</div>
                    <div className="text-sm text-gray-600">Classes 11th to 12th</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Grade Selection */}
          {educationLevel && !selectedGrade && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Select Grade/Class:</h3>
                <Button variant="outline" onClick={() => setEducationLevel(null)}>
                  Back
                </Button>
              </div>
              <Select onValueChange={handleGradeSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose grade/class" />
                </SelectTrigger>
                <SelectContent>
                  {getGradeOptions().map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade} Class
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Institutions List */}
          {institutions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Available Institutions for {selectedGrade} Class
                </h3>
                <Button variant="outline" onClick={() => setSelectedGrade('')}>
                  Back
                </Button>
              </div>
              
              <div className="grid gap-4">
                {institutions.map((institution) => (
                  <Card key={institution.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-green-700">
                          {institution.name}
                        </CardTitle>
                        <Badge className={`${
                          institution.seatsAvailable > 50 ? 'bg-green-100 text-green-800' :
                          institution.seatsAvailable > 20 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {institution.seatsAvailable} seats available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              {institution.district}, {institution.mandal}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{institution.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              Medium: {institution.medium.join(', ')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {institution.streams && (
                            <div>
                              <span className="text-sm font-medium">Available Streams:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {institution.streams.map((stream: string) => (
                                  <Badge key={stream} variant="outline" className="text-xs">
                                    {stream}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-2">
                            <Button 
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                // Handle admission application
                                console.log(`Apply to ${institution.name}`);
                              }}
                            >
                              Apply for Admission
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
