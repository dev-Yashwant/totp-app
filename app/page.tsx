"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TotpDisplay } from "@/components/TotpDisplay";
import { cn } from "@/lib/utils";
import { Settings, Key, Hash, Clock as ClockIcon, ShieldCheck, ChevronDown, ChevronUp, Clipboard } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { translations, Language } from "@/lib/i18n";

function TotpApp() {
  const searchParams = useSearchParams();

  // State
  const [lang, setLang] = useState<Language>('en');
  const [secret, setSecret] = useState("");
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);

  const [showSettings, setShowSettings] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from URL params once
  useEffect(() => {
    const keyParam = searchParams.get("key") || searchParams.get("secret");
    const digitsParam = searchParams.get("l") || searchParams.get("digits");
    const periodParam = searchParams.get("period");

    // Standard test key (Google Authenticator Example)
    const DEFAULT_SECRET = "JBSWY3DPEHPK3PXP";

    if (keyParam) {
      setSecret(keyParam);
    } else {
      // If no secret provided, default to a working example so the user sees *something*
      setSecret(DEFAULT_SECRET);
    }

    if (digitsParam) setDigits(parseInt(digitsParam, 10));
    if (periodParam) setPeriod(parseInt(periodParam, 10));

    // Automatically show settings if we defaulted the key (user didn't provide one)
    if (!keyParam) {
      setShowSettings(true);
    }

    setIsLoaded(true);
  }, [searchParams]);

  const t = translations[lang];

  // Prevent flash of unconfigured state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setSecret(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">

      {/* Language Selector */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
      </div>

      {/* Header */}
      <header className="mb-12 text-center animate-fade-in flex flex-col items-center">



        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-xl">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-2">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          {t.subtitle}
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>

        <TotpDisplay
          secret={secret}
          digits={digits}
          period={period}
          t={t}
        />

        {/* Input Form / Settings */}
        <div className={cn(
          "glass-card rounded-3xl overflow-hidden transition-all duration-500 ease-in-out",
          showSettings ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 bg-transparent border-transparent shadow-none backdrop-blur-0"
        )}>
          <div className="p-6 space-y-5">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer group/header"
              onClick={() => setShowSettings(!showSettings)}
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 group-hover/header:text-primary transition-colors">
                <Settings className="w-4 h-4 text-primary" />
                <span>{t.configuration}</span>
              </h2>
              {showSettings ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground group-hover/header:text-primary transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/header:text-primary transition-colors" />
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground ml-1">{t.secretKey}</label>
                <div className="relative group">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="JBSWY3DPEHPK3PXP..."
                    className="w-full glass-input pl-10 pr-10 py-3 rounded-xl text-sm font-mono placeholder:text-muted-foreground/50"
                  />
                  <button
                    onClick={handlePaste}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-primary transition-all"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground ml-1">{t.digits}</label>
                  <div className="relative group">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="number"
                      value={digits}
                      onChange={(e) => setDigits(parseInt(e.target.value) || 6)}
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground ml-1">{t.period}</label>
                  <div className="relative group">
                    <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="number"
                      value={period}
                      onChange={(e) => setPeriod(parseInt(e.target.value) || 30)}
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Settings Button (if hidden) */}
        {!showSettings && secret && (
          <button
            onClick={() => setShowSettings(true)}
            className="mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>{t.configureSettings}</span>
          </button>
        )}
      </main>

      <footer className="fixed bottom-4 text-center text-xs w-full px-4">
        <p className="text-white/60 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] hover:text-white/90 transition-colors duration-300">
          Prompted by <a href="https://github.com/dev-Yashwant" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-indigo-400 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] transition-all underline decoration-primary/30 underline-offset-4">dev-yash</a> made with <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">Anti Gravity</span>
        </p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    }>
      <TotpApp />
    </Suspense>
  );
}
