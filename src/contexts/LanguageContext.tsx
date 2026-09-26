import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'en' | 'hi' | 'hinglish';

export interface MultilingualText {
  en: string;
  hi?: string;
  hinglish?: string;
}

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (content: MultilingualText | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGE_OPTIONS: Array<{ id: AppLanguage; label: string; shortLabel: string; nativeName: string }> = [
  { id: 'hinglish', label: 'Hinglish', shortLabel: 'Hing', nativeName: 'Hinglish (Easy)' },
  { id: 'hi', label: 'हिंदी (Hindi)', shortLabel: 'हिंदी', nativeName: 'हिंदी' },
  { id: 'en', label: 'English', shortLabel: 'ENG', nativeName: 'English' },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const stored = localStorage.getItem('app_language') as AppLanguage;
      if (stored && ['en', 'hi', 'hinglish'].includes(stored)) {
        return stored;
      }
    } catch {
      // fallback
    }
    return 'hinglish'; // Default comfortable language for Indian student users
  });

  const setLanguage = (newLang: AppLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('app_language', newLang);
      window.dispatchEvent(new CustomEvent('language_changed', { detail: newLang }));
    } catch (e) {
      console.warn('Error saving language preference:', e);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('app_language') as AppLanguage;
      if (stored && ['en', 'hi', 'hinglish'].includes(stored)) {
        setLanguageState(stored);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = (content: MultilingualText | string): string => {
    if (typeof content === 'string') return content;
    if (language === 'hi' && content.hi) return content.hi;
    if (language === 'hinglish' && content.hinglish) return content.hinglish;
    return content.en || content.hinglish || content.hi || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
