
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { NewsList } from '@/components/news/NewsList';
import { NewsFilters } from '@/components/news/NewsFilters';
import { ArrowLeft, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream-50" style={{ backgroundColor: '#faf9f6' }}>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4 text-purple-600 hover:text-purple-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Newspaper className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Government News & Announcements
                </h1>
                <p className="text-lg text-gray-600">
                  Stay updated with the latest Telangana Government initiatives, schemes, and service updates
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">Live</p>
                    <p className="text-sm text-gray-600">Real-time Updates</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">50+</p>
                    <p className="text-sm text-gray-600">Daily Updates</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">Official</p>
                    <p className="text-sm text-gray-600">Verified Sources</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">24/7</p>
                    <p className="text-sm text-gray-600">News Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <NewsFilters 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>

          {/* News Content */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Latest News & Updates</h2>
              <p className="text-gray-600">
                Get the most recent updates on government schemes, policy changes, and public service announcements.
              </p>
            </div>
            
            <NewsList selectedCategory={selectedCategory} />
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default News;
