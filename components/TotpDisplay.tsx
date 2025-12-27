"use client";

import { useEffect, useState, useCallback } from "react";
import { Copy, Check, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateTotp, DEFAULT_DIGITS, DEFAULT_PERIOD } from "@/lib/totp";
import { Translations } from "@/lib/i18n";

interface TotpDisplayProps {
    secret: string;
    digits?: number;
    period?: number;
    t: Translations;
}

export function TotpDisplay({
    secret,
    digits = DEFAULT_DIGITS,
    period = DEFAULT_PERIOD,
    t
}: TotpDisplayProps) {
    const [token, setToken] = useState("");
    const [progress, setProgress] = useState(100);
    const [timeLeft, setTimeLeft] = useState(period);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateToken = useCallback(() => {
        if (!secret) return;

        const result = generateTotp(secret, digits, period);

        if (!result.isValid) {
            setError(t.invalidSecret);
            return;
        }

        setError(null);
        setToken(result.token);
        setTimeLeft(result.remaining);
        setProgress(result.remainingProgress);
    }, [secret, digits, period, t]);

    useEffect(() => {
        updateToken();

        // Update progress/timer frequently for smooth animation
        const interval = setInterval(() => {
            // We can just rely on re-calculating everything based on time
            updateToken();
        }, 100); // 10fps is enough for this logic, or we can just animate CSS for progress

        return () => clearInterval(interval);
    }, [updateToken]);

    const handleCopy = () => {
        if (!token) return;
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Format token for readability (e.g. 123 456)
    const formattedToken = token
        ? token.match(new RegExp(`.{1,${Math.ceil(token.length / 2)}}`, 'g'))?.join(" ")
        : "------";

    if (!secret) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                <Clock className="w-12 h-12 mb-4 opacity-20" />
                <p>{t.enterSecret}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative animate-fade-in">
            {/* Error State */}
            {error && (
                <div className="mb-6 w-full p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium text-center animate-pulse">
                    {error}
                </div>
            )}

            {/* Main Card */}
            <div className="glass-card rounded-3xl p-8 w-full flex flex-col items-center relative overflow-hidden group">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

                {/* Timer / Progress */}
                <div className="relative w-full flex items-center justify-center mb-8">
                    <div className="text-5xl sm:text-6xl font-mono font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 tabular-nums drop-shadow-sm text-center whitespace-nowrap">
                        {formattedToken || "------"}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(129,140,248,0.5)]",
                            timeLeft < 5 ? "bg-red-500 shadow-red-500/50" : "bg-primary"
                        )}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between w-full px-2">
                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                        <RefreshCw className={cn("w-3 h-3", timeLeft < 5 && "animate-spin")} />
                        <span>{t.refreshesIn} {Math.ceil(timeLeft)}s</span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            copied
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                        )}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>{t.copied}</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>{t.copyCode}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
