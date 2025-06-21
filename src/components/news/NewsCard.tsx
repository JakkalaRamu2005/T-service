
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Share2, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      health: 'bg-red-100 text-red-700',
      education: 'bg-blue-100 text-blue-700',
      employment: 'bg-green-100 text-green-700',
      housing: 'bg-orange-100 text-orange-700',
      agriculture: 'bg-emerald-100 text-emerald-700',
      technology: 'bg-purple-100 text-purple-700',
      schemes: 'bg-yellow-100 text-yellow-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const handleShare = (platform: 'whatsapp' | 'email') => {
    const shareText = `${news.title} - ${news.description}`;
    const shareUrl = window.location.href;

    if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\nRead more: ${shareUrl}`)}`;
      window.open(whatsappUrl, '_blank');
    } else if (platform === 'email') {
      const emailUrl = `mailto:?subject=${encodeURIComponent(news.title)}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${shareUrl}`)}`;
      window.open(emailUrl);
    }
  };

  return (
    <Card className="gov-card-hover border border-gray-200 bg-white">
      {news.imageUrl && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className={getCategoryColor(news.category)}>
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(news.date)}</span>
          <span className="mx-2">•</span>
          <span className="font-medium">{news.source}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 leading-tight hover:text-purple-700 transition-colors">
          {news.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 leading-relaxed mb-4">
          {news.description}
        </p>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
            onClick={() => news.readMoreUrl && window.open(news.readMoreUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Read More
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('whatsapp')}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('email')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              title="Share via Email"
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
