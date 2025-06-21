
import React, { useState } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  category: string;
  imageUrl?: string;
  readMoreUrl?: string;
}

// Sample news data - in a real application, this would come from an API
const sampleNews: NewsItem[] = [
  {
    id: '1',
    title: 'Telangana CM Announces New Digital Healthcare Initiative',
    description: 'Chief Minister Revanth Reddy launches comprehensive digital health services platform connecting all government hospitals and PHCs across the state.',
    date: '2024-12-20',
    source: 'Telangana Today',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '2',
    title: 'Indiramma Housing Scheme Reaches 50,000 Beneficiaries',
    description: 'The state government celebrates a major milestone as the Indiramma housing program successfully provides homes to over 50,000 families across Telangana.',
    date: '2024-12-19',
    source: 'The Hindu',
    category: 'housing',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '3',
    title: 'New Skill Development Centers Opens in 10 Districts',
    description: 'Telangana government inaugurates state-of-the-art skill development centers focusing on IT, manufacturing, and service sectors to boost employment.',
    date: '2024-12-18',
    source: 'Deccan Chronicle',
    category: 'employment',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '4',
    title: 'Rythu Bharosa Scheme Payments Disbursed to 58 Lakh Farmers',
    description: 'The government successfully transfers ₹7,750 crores under the Rythu Bharosa scheme, benefiting farmers across all districts of Telangana.',
    date: '2024-12-17',
    source: 'Times of India',
    category: 'agriculture',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '5',
    title: 'T-SAT Education Portal Launches New Features',
    description: 'Telangana State Government introduces AI-powered learning modules and multilingual support on the T-SAT education platform.',
    date: '2024-12-16',
    source: 'Eenadu',
    category: 'education',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '6',
    title: 'Digital Ration Card System Shows 95% Success Rate',
    description: 'The state reports exceptional adoption of digital ration cards with seamless integration across PDS outlets statewide.',
    date: '2024-12-15',
    source: 'Sakshi',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '7',
    title: 'New Medical Colleges Approved for Rural Districts',
    description: 'Government approves establishment of 5 new medical colleges in underserved rural areas to improve healthcare accessibility.',
    date: '2024-12-14',
    source: 'Hans India',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  },
  {
    id: '8',
    title: 'Telangana Launches State-Wide Free WiFi Initiative',
    description: 'Government announces comprehensive plan to provide free high-speed internet access in all villages and towns across the state.',
    date: '2024-12-13',
    source: 'The New Indian Express',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
    readMoreUrl: '#'
  }
];

interface NewsListProps {
  selectedCategory: string;
}

export const NewsList = ({ selectedCategory }: NewsListProps) => {
  const [visibleNews, setVisibleNews] = useState(6);
  const [loading, setLoading] = useState(false);

  const filteredNews = selectedCategory === 'all' 
    ? sampleNews 
    : sampleNews.filter(news => news.category === selectedCategory);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleNews(prev => prev + 6);
      setLoading(false);
    }, 1000);
  };

  const displayedNews = filteredNews.slice(0, visibleNews);
  const hasMoreNews = visibleNews < filteredNews.length;

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Loader2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">No news found</h3>
          <p>No articles found for the selected category.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {displayedNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {hasMoreNews && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More News'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
