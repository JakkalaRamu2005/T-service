
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Hospital, Search, Loader2, Calendar, User, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface HospitalAdmissionTrackingProps {
  onClose: () => void;
}

export const HospitalAdmissionTracking = ({ onClose }: HospitalAdmissionTrackingProps) => {
  const [patientId, setPatientId] = useState('');
  const [admissionSlip, setAdmissionSlip] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [admissionData, setAdmissionData] = useState<any>(null);

  const handleTrackAdmission = async () => {
    if (!patientId && !admissionSlip) {
      toast.error('Please enter either Patient ID or Admission Slip number');
      return;
    }

    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsTracking(false);
      setAdmissionData({
        patientName: 'John Doe',
        patientId: 'PAT001234',
        admissionDate: '2024-01-15',
        hospitalName: 'Gandhi Hospital, Secunderabad',
        department: 'Cardiology',
        doctorName: 'Dr. Smith Kumar',
        bedNumber: 'ICU-05',
        status: 'Admitted',
        progress: 60,
        nextSteps: [
          { step: 'Registration', completed: true, date: '2024-01-15' },
          { step: 'Initial Consultation', completed: true, date: '2024-01-15' },
          { step: 'Diagnostic Tests', completed: true, date: '2024-01-16' },
          { step: 'Treatment Plan', completed: false, date: 'In Progress' },
          { step: 'Recovery', completed: false, date: 'Pending' }
        ]
      });
      toast.success('Admission status retrieved successfully!');
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Hospital className="w-6 h-6 mr-2 text-blue-600" />
            Hospital Admission Tracking
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {!admissionData ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">Track Admission Status</CardTitle>
                <p className="text-gray-600">
                  Enter your Patient ID or Hospital Admission Slip number to track status
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    placeholder="Enter Patient ID (e.g., PAT001234)"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>

                <div className="text-center text-gray-500 font-medium">OR</div>

                <div className="space-y-2">
                  <Label htmlFor="admissionSlip">Hospital Admission Slip Number</Label>
                  <Input
                    id="admissionSlip"
                    placeholder="Enter Admission Slip number"
                    value={admissionSlip}
                    onChange={(e) => setAdmissionSlip(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                  disabled={isTracking}
                  onClick={handleTrackAdmission}
                >
                  {isTracking ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Tracking Admission...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Track Admission
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Patient Information */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-700">Patient Name</p>
                        <p className="font-semibold text-blue-800">{admissionData.patientName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-700">Admission Date</p>
                        <p className="font-semibold text-blue-800">{admissionData.admissionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-700">Hospital</p>
                        <p className="font-semibold text-blue-800">{admissionData.hospitalName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Hospital className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-700">Department</p>
                        <p className="font-semibold text-blue-800">{admissionData.department}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">Treatment Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{admissionData.progress}%</span>
                    </div>
                    <Progress value={admissionData.progress} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    {admissionData.nextSteps.map((step: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.completed ? 'text-green-700' : 'text-gray-700'
                          }`}>
                            {step.step}
                          </p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Status:</span> {admissionData.status}</p>
                    <p><span className="font-medium">Attending Doctor:</span> {admissionData.doctorName}</p>
                    <p><span className="font-medium">Bed Number:</span> {admissionData.bedNumber}</p>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setAdmissionData(null)}
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Track Another Patient
              </Button>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Important Note</h4>
            <p className="text-sm text-green-700">
              For privacy and security, admission tracking is only available to authorized 
              family members and the patient themselves. Please ensure you have proper authorization.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
