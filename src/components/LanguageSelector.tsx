
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en' as const, name: t('language.english'), nativeName: 'English' },
    { code: 'te' as const, name: t('language.telugu'), nativeName: 'తెలుగు' },
    { code: 'hi' as const, name: t('language.hindi'), nativeName: 'हिन्दी' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200">
          <Globe className="w-4 h-4 mr-2" />
          <span>{currentLang?.nativeName}</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50 min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-200 ${
              currentLanguage === language.code ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
            }`}
          >
            {language.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
