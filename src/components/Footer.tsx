
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Facebook, 
  Twitter, 
  Youtube,
  Instagram,
  Globe
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://www.en.etemaaddaily.com/pages/world/hyderabad/7982telangana.png" 
                alt="Telangana Government" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">T-Service</h3>
                <p className="text-sm text-gray-400">Unified Citizen Services</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing seamless access to government services for all citizens of Telangana. 
              Secure, fast, and reliable.
            </p>
            
            {/* Mobile App Download */}
            <div className="space-y-2">
              <h4 className="font-semibold">Download T-Service App</h4>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Google Play
                </Button>
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  App Store
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">About T-Service</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Popular Services</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Service Status</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help & Support</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Feedback</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Grievance Portal</a>
            </nav>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Government Portals</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">TS Gov Portal</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">MeeSeva</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Dharani</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">T-Wallet</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">RTA Telangana</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">UMANG</a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm">Helpline</p>
                  <p className="text-white font-medium">+91-40-2345-6789</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm">Email</p>
                  <p className="text-white font-medium">support@tservice.telangana.gov.in</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-sm">Address</p>
                  <p className="text-white font-medium text-sm">
                    Secretariat, Hyderabad<br />
                    Telangana - 500022
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex space-x-3">
                <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-400 hover:bg-blue-500 rounded transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors">
                  <Youtube className="w-4 h-4" />
                </button>
                <button className="p-2 bg-pink-600 hover:bg-pink-700 rounded transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <p>© 2024 Government of Telangana. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Last Updated: December 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
