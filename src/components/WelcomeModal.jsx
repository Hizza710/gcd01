import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Globe } from 'lucide-react';

const COUNTRIES = [
    "Japan", "United States", "United Kingdom", "France", "Germany",
    "Italy", "Canada", "Australia", "Brazil", "India", "China",
    "South Korea", "Spain", "Mexico", "Switzerland"
];

const WelcomeModal = () => {
    const { homeCountry, setHomeCountry, t } = useUser();
    const [selected, setSelected] = useState('');

    if (homeCountry) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected) {
            setHomeCountry(selected);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="glass-panel p-8 max-w-md w-full animate-fade-in text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white/20 rounded-full">
                        <Globe className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h2 className="title-lg !text-4xl mb-4">{t('welcome.title')}</h2>
                <p className="text-gray-600 mb-8 text-lg">
                    {t('welcome.subtitle')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <select
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            className="w-full appearance-none bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        >
                            <option value="" disabled>{t('welcome.placeholder')}</option>
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selected}
                        className="w-full py-4 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {t('welcome.start')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WelcomeModal;
