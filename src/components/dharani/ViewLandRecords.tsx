
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, MapPin, DollarSign, Calendar, User, Home } from 'lucide-react';

const sampleLandRecords = [
  {
    id: 'LR001',
    surveyNumber: 'SY-123/45',
    acres: '2.5',
    location: 'Madhapur Village, Serilingampally',
    marketPrice: '₹45,00,000',
    registrationDate: '15-Mar-2020',
    ownerName: 'Ravi Kumar',
    landType: 'Agricultural',
    status: 'Active'
  },
  {
    id: 'LR002',
    surveyNumber: 'SY-678/90',
    acres: '1.2',
    location: 'Gachibowli Village, Serilingampally',
    marketPrice: '₹78,00,000',
    registrationDate: '22-Aug-2019',
    ownerName: 'Lakshmi Devi',
    landType: 'Residential',
    status: 'Active'
  },
  {
    id: 'LR003',
    surveyNumber: 'SY-456/78',
    acres: '0.8',
    location: 'Kondapur Village, Serilingampally',
    marketPrice: '₹65,00,000',
    registrationDate: '10-Jan-2021',
    ownerName: 'Suresh Reddy',
    landType: 'Commercial',
    status: 'Under Verification'
  }
];

export const ViewLandRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(sampleLandRecords);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRecords(sampleLandRecords);
      return;
    }

    const filtered = sampleLandRecords.filter(record => 
      record.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Under Verification':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <Home className="w-6 h-6 mr-2 text-blue-600" />
          Land Records Database
        </CardTitle>
        <p className="text-gray-600">Search and view detailed land record information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by Survey Number, Owner Name, or Location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Results Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Survey Number</TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Acres
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Market Price
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Registration Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Owner
                  </div>
                </TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{record.surveyNumber}</TableCell>
                  <TableCell>{record.acres}</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell className="font-semibold text-green-600">{record.marketPrice}</TableCell>
                  <TableCell>{record.registrationDate}</TableCell>
                  <TableCell>{record.ownerName}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(record.status)} text-white hover:${getStatusColor(record.status)}`}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No land records found matching your search criteria.</p>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredRecords.length}</div>
              <div className="text-sm text-blue-700">Total Records Found</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredRecords.reduce((acc, record) => acc + parseFloat(record.acres), 0).toFixed(1)}
              </div>
              <div className="text-sm text-green-700">Total Acres</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredRecords.filter(record => record.status === 'Active').length}
              </div>
              <div className="text-sm text-purple-700">Active Records</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
