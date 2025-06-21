
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'T-Service',
    'header.subtitle': 'Government of Telangana',
    'header.services': 'Services',
    'header.schemes': 'Schemes',
    'header.feedback': 'Feedback',
    'header.news': 'News',
    'header.help': 'Help',
    'header.login': 'Login',
    'header.logout': 'Logout',
    'header.profile': 'Profile',
    'header.cmName': 'Sri A. Revanth Reddy',
    'header.cmTitle': "Hon'ble Chief Minister",
    
    // Hero Section
    'hero.title': 'Your Gateway to Government Services',
    'hero.subtitle': 'Access all Telangana Government services in one place. Fast, secure, and citizen-friendly.',
    'hero.getStarted': 'Get Started',
    'hero.mainTitle': 'GOVERNMENT OF\nTELANGANA',
    'hero.description': 'One app for all your government services. Access Dharani, MeeSeva, T-Wallet, TS-bPASS and more through a single unified platform.',
    'hero.accessServices': 'Access Services',
    'hero.learnMore': 'Learn More',
    'hero.downloadApp': 'Download App',
    'hero.newBadge': 'New',
    'hero.usageStats': '1M+ citizens already using T-Service App',
    'hero.feature1': 'All government services in one place',
    'hero.feature2': 'Secure Aadhaar-based authentication',
    'hero.feature3': 'Real-time service tracking',
    'hero.feature4': 'Multiple language support',
    
    // Popular Services
    'services.title': 'Popular Services',
    'services.subtitle': 'Quick access to the most commonly used government services. Everything you need, all in one place.',
    'services.viewAll': 'View All Services',
    
    // Schemes
    'schemes.title': 'Schemes',
    'schemes.subtitle': 'Comprehensive range of government schemes organized by Telangana Government. Find what you need quickly and efficiently.',
    'schemes.viewAll': 'View All',
    
    // Auth Modal
    'auth.loginRequired': 'Please log in to access this feature.',
    'auth.title': 'Secure Authentication',
    
    // Language Names
    'language.telugu': 'తెలుగు',
    'language.hindi': 'हिन्दी',
    'language.english': 'English',
  },
  te: {
    // Header
    'header.title': 'టీ-సర్వీస్',
    'header.subtitle': 'తెలంగాణ ప్రభుత్వం',
    'header.services': 'సేవలు',
    'header.schemes': 'పథకాలు',
    'header.feedback': 'అభిప్రాయం',
    'header.news': 'వార్తలు',
    'header.help': 'సహాయం',
    'header.login': 'లాగిన్',
    'header.logout': 'లాగ్ అవుట్',
    'header.profile': 'ప్రొఫైల్',
    'header.cmName': 'శ్రీ ఎ. రేవంత్ రెడ్డి',
    'header.cmTitle': 'గౌరవనీయ ముఖ్యమంత్రి',
    
    // Hero Section
    'hero.title': 'ప్రభుత్వ సేవలకు మీ ద్వారం',
    'hero.subtitle': 'అన్ని తెలంగాణ ప్రభుత్వ సేవలను ఒకే చోట పొందండి. వేగంగా, సురక్షితంగా మరియు పౌరుల అనుకూలంగా.',
    'hero.getStarted': 'ప్రారంభించండి',
    'hero.mainTitle': 'తెలంగాణ\nప్రభుత్వం',
    'hero.description': 'అన్ని ప్రభుత్వ సేవలకు ఒకే యాప్. ధరణి, మీసేవ, టీ-వాలెట్, టీఎస్-బిపాస్ మరియు మరిన్నింటిని ఒకే ఏకీకృత ప్లాట్‌ఫారమ్ ద్వారా యాక్సెస్ చేయండి.',
    'hero.accessServices': 'సేవలను యాక్సెస్ చేయండి',
    'hero.learnMore': 'మరింత తెలుసుకోండి',
    'hero.downloadApp': 'యాప్ డౌన్‌లోడ్ చేయండి',
    'hero.newBadge': 'కొత్తది',
    'hero.usageStats': '1M+ పౌరులు ఇప్పటికే టీ-సర్వీస్ యాప్‌ను ఉపయోగిస్తున్నారు',
    'hero.feature1': 'అన్ని ప్రభుత్వ సేవలు ఒకే చోట',
    'hero.feature2': 'సురక్షిత ఆధార్ ఆధారిత ప్రమాణీకరణ',
    'hero.feature3': 'రియల్ టైమ్ సర్వీస్ ట్రాకింగ్',
    'hero.feature4': 'బహుళ భాషా మద్దతు',
    
    // Popular Services
    'services.title': 'ప్రముఖ సేవలు',
    'services.subtitle': 'అత్యధికంగా ఉపయోగించే ప్రభుత్వ సేవలకు త్వరిత ప్రాప్యత. మీకు అవసరమైనవన్నీ ఒకే చోట.',
    'services.viewAll': 'అన్ని సేవలను చూడండి',
    
    // Schemes
    'schemes.title': 'పథకాలు',
    'schemes.subtitle': 'తెలంగాణ ప్రభుత్వం నిర్వహించే ప్రభుత్వ పథకాల విస్తృత శ్రేణి. మీకు అవసరమైనవి త్వరగా మరియు సమర్థవంతంగా కనుగొనండి.',
    'schemes.viewAll': 'అన్నీ చూడండి',
    
    // Auth Modal
    'auth.loginRequired': 'దయచేసి ఈ ఫీచర్‌ను యాక్సెస్ చేయడానికి లాగిన్ చేయండి.',
    'auth.title': 'సురక్షిత ప్రమాణీకరణ',
    
    // Language Names
    'language.telugu': 'తెలుగు',
    'language.hindi': 'हिन्दी',
    'language.english': 'English',
  },
  hi: {
    // Header
    'header.title': 'टी-सर्विस',
    'header.subtitle': 'तेलंगाना सरकार',
    'header.services': 'सेवाएं',
    'header.schemes': 'योजनाएं',
    'header.feedback': 'प्रतिक्रिया',
    'header.news': 'समाचार',
    'header.help': 'सहायता',
    'header.login': 'लॉगिन',
    'header.logout': 'लॉगआउट',
    'header.profile': 'प्रोफ़ाइल',
    'header.cmName': 'श्री ए. रेवंत रेड्डी',
    'header.cmTitle': 'माननीय मुख्यमंत्री',
    
    // Hero Section
    'hero.title': 'सरकारी सेवाओं का आपका प्रवेश द्वार',
    'hero.subtitle': 'सभी तेलंगाना सरकारी सेवाओं को एक स्थान पर प्राप्त करें। तेज़, सुरक्षित और नागरिक-अनुकूल।',
    'hero.getStarted': 'शुरू करें',
    'hero.mainTitle': 'तेलंगाना\nसरकार',
    'hero.description': 'सभी सरकारी सेवाओं के लिए एक ऐप। धरणी, मीसेवा, टी-वॉलेट, टीएस-बीपास और अधिक को एक एकीकृत प्लेटफॉर्म के माध्यम से एक्सेस करें।',
    'hero.accessServices': 'सेवाओं तक पहुंचें',
    'hero.learnMore': 'और जानें',
    'hero.downloadApp': 'ऐप डाउनलोड करें',
    'hero.newBadge': 'नया',
    'hero.usageStats': '1M+ नागरिक पहले से ही टी-सर्विस ऐप का उपयोग कर रहे हैं',
    'hero.feature1': 'सभी सरकारी सेवाएं एक स्थान पर',
    'hero.feature2': 'सुरक्षित आधार आधारित प्रमाणीकरण',
    'hero.feature3': 'रियल टाइम सेवा ट्रैकिंग',
    'hero.feature4': 'बहुभाषी समर्थन',
    
    // Popular Services
    'services.title': 'लोकप्रिय सेवाएं',
    'services.subtitle': 'सबसे अधिक उपयोग की जाने वाली सरकारी सेवाओं तक त्वरित पहुंच। आपको जो चाहिए वह सब एक ही स्थान पर।',
    'services.viewAll': 'सभी सेवाएं देखें',
    
    // Schemes
    'schemes.title': 'योजनाएं',
    'schemes.subtitle': 'तेलंगाना सरकार द्वारा आयोजित सरकारी योजनाओं की व्यापक श्रृंखला। जल्दी और कुशलता से जो आपको चाहिए वह खोजें।',
    'schemes.viewAll': 'सभी देखें',
    
    // Auth Modal
    'auth.loginRequired': 'कृपया इस सुविधा तक पहुंचने के लिए लॉगिन करें।',
    'auth.title': 'सुरक्षित प्रमाणीकरण',
    
    // Language Names
    'language.telugu': 'తెలుగు',
    'language.hindi': 'हिन्दी',
    'language.english': 'English',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['en']] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
