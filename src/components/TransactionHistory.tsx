
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Calendar
} from 'lucide-react';

interface TransactionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleTransactions = [
  {
    id: 'TXN001',
    type: 'debit',
    description: 'Electricity Bill Payment',
    amount: 2850,
    date: '2024-12-20',
    time: '14:30',
    status: 'Success',
    reference: 'ELEC001234'
  },
  {
    id: 'TXN002',
    type: 'credit',
    description: 'Money Received from John',
    amount: 5000,
    date: '2024-12-19',
    time: '11:15',
    status: 'Success',
    reference: 'P2P001234'
  },
  {
    id: 'TXN003',
    type: 'debit',
    description: 'DTH Recharge - Tata Sky',
    amount: 399,
    date: '2024-12-18',
    time: '09:45',
    status: 'Success',
    reference: 'DTH001234'
  },
  {
    id: 'TXN004',
    type: 'debit',
    description: 'Property Tax Payment',
    amount: 12500,
    date: '2024-12-17',
    time: '16:20',
    status: 'Pending',
    reference: 'TAX001234'
  },
  {
    id: 'TXN005',
    type: 'debit',
    description: 'Water Bill Payment',
    amount: 680,
    date: '2024-12-16',
    time: '13:10',
    status: 'Success',
    reference: 'WAT001234'
  }
];

export const TransactionHistory = ({ isOpen, onClose }: TransactionHistoryProps) => {
  const handleDownloadStatement = () => {
    console.log('Downloading statement...');
    // Implement download functionality here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-purple-600" />
              Transaction History
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadStatement}
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-100 text-sm">Available Balance</p>
                  <p className="text-3xl font-bold">₹ 25,450.00</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm">Account Number</p>
                  <p className="font-semibold">****1234</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter Options */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">All Transactions</Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">Credits Only</Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">Debits Only</Button>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {sampleTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date} at {transaction.time} • Ref: {transaction.reference}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹ {transaction.amount.toLocaleString()}
                      </p>
                      <Badge 
                        className={
                          transaction.status === 'Success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-4">
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
              Load More Transactions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
