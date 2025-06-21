
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EditProfileModal } from '@/components/EditProfileModal';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Bell,
  Download,
  Eye,
  ArrowRight,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

interface Application {
  id: string;
  service: string;
  status: string;
  date: string;
  type: 'success' | 'warning' | 'pending';
  category: string;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const quickActions = [
    { title: 'Apply for Certificate', icon: FileText, color: 'bg-blue-500' },
    { title: 'Track Application', icon: Clock, color: 'bg-green-500' },
    { title: 'Download Documents', icon: Download, color: 'bg-purple-500' },
    { title: 'Pay Bills', icon: Eye, color: 'bg-orange-500' },
  ];

  const fetchApplications = async () => {
    if (!user?.id) return;

    try {
      // Fetch education applications
      const { data: educationApps, error: eduError } = await supabase
        .from('education_applications')
        .select(`
          id,
          submitted_at,
          scheme_id,
          education_scheme_definitions(name),
          education_status_tracking(current_status)
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (eduError) throw eduError;

      // Fetch health applications
      const { data: healthApps, error: healthError } = await supabase
        .from('health_applications')
        .select(`
          id,
          submitted_at,
          scheme_id,
          health_scheme_definitions(name),
          health_status_tracking(current_status)
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (healthError) throw healthError;

      // Fetch housing applications
      const { data: housingApps, error: housingError } = await supabase
        .from('housing_applications')
        .select(`
          id,
          submitted_at,
          scheme_id,
          housing_scheme_definitions(name),
          housing_status_tracking(current_status)
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (housingError) throw housingError;

      // Combine and format all applications
      const allApps: Application[] = [];

      // Process education applications
      educationApps?.forEach(app => {
        allApps.push({
          id: app.id,
          service: (app.education_scheme_definitions as any)?.name || 'Education Service',
          status: (app.education_status_tracking as any)?.[0]?.current_status || 'Submitted',
          date: new Date(app.submitted_at).toLocaleDateString(),
          type: getStatusType((app.education_status_tracking as any)?.[0]?.current_status || 'Submitted'),
          category: 'Education'
        });
      });

      // Process health applications
      healthApps?.forEach(app => {
        allApps.push({
          id: app.id,
          service: (app.health_scheme_definitions as any)?.name || 'Health Service',
          status: (app.health_status_tracking as any)?.[0]?.current_status || 'Submitted',
          date: new Date(app.submitted_at).toLocaleDateString(),
          type: getStatusType((app.health_status_tracking as any)?.[0]?.current_status || 'Submitted'),
          category: 'Health'
        });
      });

      // Process housing applications
      housingApps?.forEach(app => {
        allApps.push({
          id: app.id,
          service: (app.housing_scheme_definitions as any)?.name || 'Housing Service',
          status: (app.housing_status_tracking as any)?.[0]?.current_status || 'Application Received',
          date: new Date(app.submitted_at).toLocaleDateString(),
          type: getStatusType((app.housing_status_tracking as any)?.[0]?.current_status || 'Application Received'),
          category: 'Housing'
        });
      });

      // Sort by date (newest first)
      allApps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setApplications(allApps.slice(0, 10)); // Show latest 10 applications
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusType = (status: string): 'success' | 'warning' | 'pending' => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('completed') || lowerStatus.includes('approved') || lowerStatus.includes('ready')) {
      return 'success';
    } else if (lowerStatus.includes('progress') || lowerStatus.includes('processing') || lowerStatus.includes('verification')) {
      return 'warning';
    } else {
      return 'pending';
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 mt-1">Here's your personalized dashboard</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Bell className="w-4 h-4 mr-2" />
              Notifications (3)
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col space-y-2 hover:shadow-md transition-all"
                      >
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Applications</CardTitle>
                  <Button variant="ghost" className="text-purple-600">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No applications found</p>
                    <p className="text-sm text-gray-500">Apply for services to see them here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {app.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {app.type === 'warning' && <Clock className="w-5 h-5 text-yellow-600" />}
                            {app.type === 'pending' && <AlertCircle className="w-5 h-5 text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{app.service}</h4>
                            <p className="text-sm text-gray-600">Application ID: {app.id.slice(0, 8)}...</p>
                            <p className="text-xs text-gray-500">{app.date} • {app.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={
                              app.type === 'success' ? 'bg-green-100 text-green-800' :
                              app.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-medium">{user?.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aadhaar</p>
                  <p className="font-medium">XXXX-XXXX-{user?.aadhaar?.slice(-4)}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Important Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Important Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-800">New Service Available</p>
                  <p className="text-xs text-blue-600">Online property tax payment is now live</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-medium text-yellow-800">Maintenance Notice</p>
                  <p className="text-xs text-yellow-600">System maintenance on Dec 25, 2-4 AM</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm font-medium text-green-800">Document Ready</p>
                  <p className="text-xs text-green-600">Your income certificate is ready for download</p>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
