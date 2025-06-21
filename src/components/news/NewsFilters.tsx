
import React from 'react';
import { Button } from '@/components/ui/button';

interface NewsFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'schemes', label: 'Government Schemes' },
  { id: 'health', label: 'Health Services' },
  { id: 'education', label: 'Education' },
  { id: 'employment', label: 'Employment' },
  { id: 'housing', label: 'Housing' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'technology', label: 'Digital Services' },
];

export const NewsFilters = ({ selectedCategory, onCategoryChange }: NewsFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={`${
              selectedCategory === category.id
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
