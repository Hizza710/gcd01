import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Globe, Plane } from 'lucide-react';

const AspirationInput = ({ onSearch, isLoading }) => {
    const { t } = useUser();
    const [value, setValue] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const examples = t('hero.examples') || [];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % examples.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [examples.length]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() && !isLoading) {
            onSearch(value);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative py-12 md:py-20">
            {/* 3D Globe Visual Background */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
                <div className="globe-container w-[600px] h-[400px]">
                    <div className="globe-ring"></div>
                    <div className="globe-ring"></div>
                    <div className="globe-ring"></div>
                    {/* Central Core Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#8EDE22]/20 to-[#FFB31A]/20 blur-[60px] rounded-full animate-pulse"></div>
                </div>
            </div>

            <h2 className="relative z-10 text-center mb-12" style={{ fontFamily: 'var(--font-family-base)' }}>
                <div className="text-3xl md:text-5xl font-light text-[#4A4A4A] tracking-wide mb-8 leading-relaxed">
                    {t('hero.title')}
                </div>
                <div className="text-lg md:text-xl font-light text-gray-500 tracking-wider leading-relaxed">
                    {t('hero.subtitle')}
                </div>
            </h2>

            <form onSubmit={handleSubmit} className="relative w-full max-w-2xl z-20 group">
                {/* Input Container - Floating "Equator" */}
                <div className="relative flex items-center glass-panel rounded-full p-2 pl-8 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/60 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 hover:shadow-[0_30px_80px_rgba(142,222,34,0.1)]">

                    <div className="text-[#8EDE22] mr-4 animate-pulse">
                        <Globe className="w-6 h-6" strokeWidth={1.5} />
                    </div>

                    <input
                        type="text"
                        className="w-full bg-transparent border-none focus:ring-0 text-lg md:text-2xl font-light placeholder-gray-400 text-gray-700 py-4 focus:outline-none tracking-wide"
                        placeholder={`${examples[placeholderIndex]}`}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isLoading}
                        style={{ fontFamily: 'var(--font-family-base)' }}
                    />

                    <button
                        type="submit"
                        disabled={isLoading || !value.trim()}
                        className="ml-2 w-14 h-14 md:w-16 md:h-16 bg-[#4A4A4A] text-white rounded-full hover:bg-black transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-2xl hover:rotate-12 active:scale-90 group-hover:bg-[#8EDE22]"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Plane className="w-6 h-6 md:w-7 md:h-7 -rotate-45 translate-x-0.5 translate-y-0.5" strokeWidth={2} />
                        )}
                    </button>
                </div>

                {/* Helper text under input */}
                <div className="absolute top-full left-0 right-0 text-center mt-6 transition-opacity duration-700 opacity-60 group-hover:opacity-100">
                    <span className="text-xs tracking-[0.2em] text-[#8EDE22] uppercase font-bold">
                        Weave Your Future
                    </span>
                </div>
            </form>
        </div>
    );
};

export default AspirationInput;
