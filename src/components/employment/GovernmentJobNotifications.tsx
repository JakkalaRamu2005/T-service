
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Calendar, MapPin, GraduationCap, ExternalLink } from 'lucide-react';

interface GovernmentJobNotificationsProps {
  onClose: () => void;
}

const jobNotifications = [
  {
    id: 1,
    title: 'Assistant Engineer - PWD',
    department: 'Public Works Department',
    qualification: 'B.Tech Civil Engineering',
    location: 'Hyderabad',
    lastDate: '2024-07-15',
    posts: 50,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Village Revenue Officer',
    department: 'Revenue Department',
    qualification: 'Degree, Computer Knowledge',
    location: 'Various Districts',
    lastDate: '2024-07-20',
    posts: 1200,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Junior Lecturer - Mathematics',
    department: 'Education Department',
    qualification: 'M.Sc Mathematics, B.Ed',
    location: 'Warangal, Karimnagar',
    lastDate: '2024-07-10',
    posts: 25,
    status: 'Closed'
  },
  {
    id: 4,
    title: 'Police Constable',
    department: 'Telangana State Police',
    qualification: '12th Pass, Physical Standards',
    location: 'Statewide',
    lastDate: '2024-07-25',
    posts: 2000,
    status: 'New'
  }
];

export const GovernmentJobNotifications = ({ onClose }: GovernmentJobNotificationsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [qualificationFilter, setQualificationFilter] = useState('');

  const filteredJobs = jobNotifications.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (qualificationFilter === '' || job.qualification.toLowerCase().includes(qualificationFilter.toLowerCase()));
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'New': return 'bg-blue-500';
      case 'Closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Bell className="w-6 h-6 mr-2 text-orange-600" />
            Government Job Notifications
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-orange-700">Search & Filter Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Jobs</Label>
                  <Input
                    id="search"
                    placeholder="Search by job title or department"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Filter by location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    placeholder="Filter by qualification"
                    value={qualificationFilter}
                    onChange={(e) => setQualificationFilter(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <Badge className={`${getStatusColor(job.status)} text-white hover:${getStatusColor(job.status)}`}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 font-medium">{job.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Posts Available</p>
                      <p className="text-2xl font-bold text-orange-600">{job.posts}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.qualification}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Last Date: {job.lastDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700"
                      disabled={job.status === 'Closed'}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {job.status === 'Closed' ? 'Application Closed' : 'Apply Now'}
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No jobs found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h4 className="font-medium text-gray-800 mb-2">Application Process</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click "Apply Now" to visit the official application portal</li>
            <li>• Complete the online application form</li>
            <li>• Upload required documents</li>
            <li>• Pay application fee (if applicable)</li>
            <li>• Download and print application receipt</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
