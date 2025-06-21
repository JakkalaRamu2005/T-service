
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Receipt, 
  Search,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Download
} from 'lucide-react';

interface ChallanPaymentProps {
  onBack: () => void;
}

export const ChallanPayment: React.FC<ChallanPaymentProps> = ({ onBack }) => {
  const [searchType, setSearchType] = useState<'vehicle' | 'challan'>('vehicle');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 'CH001',
          challanNumber: 'TS01AB1234567890',
          vehicleNumber: 'TS09EA1234',
          violation: 'Over Speeding',
          amount: 1000,
          date: '2024-01-15',
          location: 'Jubilee Hills, Hyderabad',
          status: 'Pending',
          dueDate: '2024-02-15'
        },
        {
          id: 'CH002',
          challanNumber: 'TS01AB1234567891',
          vehicleNumber: 'TS09EA1234',
          violation: 'Signal Jump',
          amount: 500,
          date: '2024-01-10',
          location: 'Banjara Hills, Hyderabad',
          status: 'Pending',
          dueDate: '2024-02-10'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handlePayment = (challan: any) => {
    console.log('Processing payment for challan:', challan.challanNumber);
    // Implement payment logic here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-yellow-500 text-yellow-900">Pending</Badge>;
      case 'Paid':
        return <Badge className="bg-green-500 text-green-900">Paid</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500 text-red-900">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={onBack}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Button>
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800">Challan Payment</h1>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Challans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={searchType === 'vehicle' ? 'default' : 'outline'}
                onClick={() => setSearchType('vehicle')}
                className="flex-1"
              >
                By Vehicle Number
              </Button>
              <Button
                variant={searchType === 'challan' ? 'default' : 'outline'}
                onClick={() => setSearchType('challan')}
                className="flex-1"
              >
                By Challan Number
              </Button>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="searchValue">
                  {searchType === 'vehicle' ? 'Vehicle Number' : 'Challan Number'}
                </Label>
                <Input
                  id="searchValue"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchType === 'vehicle' ? 'e.g., TS09EA1234' : 'e.g., TS01AB1234567890'}
                  className="uppercase"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!searchValue || isSearching}
                  className="flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
            {searchResults.map((challan) => (
              <Card key={challan.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {challan.challanNumber}
                      </h3>
                      <p className="text-sm text-gray-600">Vehicle: {challan.vehicleNumber}</p>
                    </div>
                    {getStatusBadge(challan.status)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Violation: {challan.violation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Date: {challan.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {challan.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due Date: {challan.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-red-600">₹{challan.amount}</span>
                      <span className="text-sm text-gray-500 ml-2">Fine Amount</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        onClick={() => handlePayment(challan)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Payment Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pay within 15 days to avoid penalty</li>
                  <li>• 25% discount for payment within 3 days</li>
                  <li>• Online payment available 24/7</li>
                  <li>• Receipt will be sent via SMS/Email</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Support</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📞 Helpline: 040-2345-6789</p>
                  <p>📧 Email: challans@tsrta.gov.in</p>
                  <p>🕒 Office Hours: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
