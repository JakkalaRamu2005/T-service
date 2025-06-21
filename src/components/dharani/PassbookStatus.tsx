
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Clock, Truck, Package } from 'lucide-react';

const statusSteps = [
  {
    id: 1,
    title: 'Application Received',
    description: 'Your passbook request has been received and is being processed',
    icon: BookOpen,
    color: 'bg-blue-500',
    completed: true
  },
  {
    id: 2,
    title: 'Verification',
    description: 'Documents and land records are being verified',
    icon: CheckCircle,
    color: 'bg-yellow-500',
    completed: true
  },
  {
    id: 3,
    title: 'Issued',
    description: 'Passbook has been generated and approved',
    icon: Package,
    color: 'bg-orange-500',
    completed: false
  },
  {
    id: 4,
    title: 'Out for Delivery',
    description: 'Passbook is being dispatched to your address',
    icon: Truck,
    color: 'bg-purple-500',
    completed: false
  },
  {
    id: 5,
    title: 'Delivered',
    description: 'Passbook has been successfully delivered',
    icon: CheckCircle,
    color: 'bg-green-500',
    completed: false
  }
];

export const PassbookStatus = () => {
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const handleGetPassbook = () => {
    const newApplicationId = `PB-${Date.now().toString().slice(-6)}`;
    setApplicationId(newApplicationId);
    setHasApplied(true);
  };

  const currentStep = statusSteps.findIndex(step => !step.completed);
  const completedSteps = statusSteps.filter(step => step.completed).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
          Land Passbook Services
        </CardTitle>
        <p className="text-gray-600">Get your official land ownership passbook</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasApplied ? (
          <div className="text-center py-12">
            <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Your Land Passbook</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Apply for your official land ownership passbook. This document serves as proof of your land ownership and contains all relevant details.
            </p>
            <Button 
              onClick={handleGetPassbook}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Get Your Passbook
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Application Info */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-800">Application Submitted Successfully!</h4>
                    <p className="text-purple-700">Your passbook request is being processed</p>
                  </div>
                  <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                    ID: {applicationId}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Processing Status</h4>
                <Badge variant="outline" className="text-sm">
                  Step {completedSteps + 1} of {statusSteps.length}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(completedSteps / statusSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {completedSteps} of {statusSteps.length} steps completed
              </p>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Tracking Timeline</h4>
              {statusSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep;
                const isCompleted = step.completed;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? `${step.color} text-white animate-pulse` 
                          : 'bg-gray-300 text-gray-500'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className={`font-semibold ${
                          isCompleted 
                            ? 'text-green-700' 
                            : isActive 
                              ? 'text-purple-700' 
                              : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h5>
                        {isCompleted && (
                          <Badge className="bg-green-500 text-white text-xs">
                            Completed
                          </Badge>
                        )}
                        {isActive && (
                          <Badge className="bg-purple-500 text-white text-xs">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isCompleted || isActive ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Completed on {new Date().toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimated Delivery */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Estimated Delivery</h4>
                    <p className="text-blue-700">
                      Your passbook will be delivered within 7-10 working days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <div className="text-center pt-4">
              <p className="text-gray-600 mb-4">Need help with your application?</p>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
