"use client";

import { Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
    currentLang: Language;
    onLanguageChange: (lang: Language) => void;
}

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
    return (
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
                {(['en', 'ru', 'cn'] as Language[]).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => onLanguageChange(lang)}
                        className={`
              text-xs font-medium px-2 py-0.5 rounded-full transition-colors
              ${currentLang === lang
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:text-white hover:bg-white/5'}
            `}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}
