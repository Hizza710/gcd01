import React, { useState } from 'react';
import { Compass, BookOpen, ExternalLink } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import MyPage from './MyPage';
import WelcomeModal from './WelcomeModal';
import InfoModal from './InfoModal';

const Layout = ({ children }) => {
    const [showMyPage, setShowMyPage] = useState(false);
    const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', content: '' });
    const { collectedCards, t, setLanguage, language } = useUser();

    const openInfo = (title, contentKey) => {
        // Simple placeholder content for now
        const content = contentKey === 'privacy'
            ? "Privacy Policy\n\nThis is a demonstration application. No personal data is permanently stored or shared with third parties. All data is stored locally in your browser."
            : "Terms of Service\n\nThis application is provided as-is for demonstration purposes. Use it to explore your career aspirations.";
        setInfoModal({ isOpen: true, title, content });
    };

    return (
        <>
            <div className="relative min-h-screen flex flex-col z-10 p-8 md:p-12 lg:p-20 transition-all duration-700">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 gap-6 pt-4">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="bg-white/80 p-3 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-500">
                            <Compass className="w-8 h-8 text-[#8EDE22] group-hover:rotate-45 transition-transform duration-700 ease-out" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#4A4A4A] -ml-2" style={{ fontFamily: 'var(--font-family-logo)', transform: 'scaleX(0.95)', transformOrigin: 'left' }}>
                                CareerChanceCreation
                            </h1>
                            <p className="text-xs text-gray-400 tracking-widest uppercase font-medium mt-1 pl-1 hidden sm:block">
                                {t('header.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white/60 rounded-full p-1 border border-white/50 backdrop-blur-sm shadow-sm">
                            <button
                                onClick={() => setLanguage('ja')}
                                className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${language === 'ja' ? 'bg-[#8EDE22] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'}`}
                            >
                                JP
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 ${language === 'en' ? 'bg-[#ffb31a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'}`}
                            >
                                EN
                            </button>
                        </div>

                        <button
                            onClick={() => setShowMyPage(true)}
                            className="group flex items-center gap-3 bg-white/60 hover:bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="relative">
                                <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-[#FFAA00] transition-colors" />
                                {collectedCards.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                        {collectedCards.length}
                                    </span>
                                )}
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-[#FFAA00] hidden md:block">{t('header.myPage')}</span>
                        </button>
                    </div>
                </header>

                {/* Main Content - Centered */}
                <main className="flex-grow flex flex-col justify-center items-center w-full max-w-7xl mx-auto z-10">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-20 py-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="pl-2">&copy; {new Date().getFullYear()} PATHWEAVE Co.,Ltd. All rights reserved.</div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => openInfo('Privacy Policy', 'privacy')} className="hover:text-indigo-600 transition-colors text-left">Privacy Policy</button>
                        <button onClick={() => openInfo('Terms of Service', 'terms')} className="hover:text-indigo-600 transition-colors text-left">Terms of Service</button>
                        <div className="flex items-center gap-1 group transition-colors">
                            <span className="mr-1">Powered by</span>
                            <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-indigo-600 border-b border-transparent hover:border-indigo-600 transition-all">Gemini</a>
                            <span>&</span>
                            <a href="https://pollinations.ai/" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-indigo-600 border-b border-transparent hover:border-indigo-600 transition-all">Pollinations AI</a>
                            <ExternalLink className="w-3 h-3 ml-1 text-gray-400 group-hover:text-indigo-600" />
                        </div>
                    </div>
                </footer>
            </div>

            {/* Overlays */}
            {showMyPage && <MyPage onClose={() => setShowMyPage(false)} />}
            {infoModal.isOpen && (
                <InfoModal
                    title={infoModal.title}
                    content={infoModal.content}
                    onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
                />
            )}
            <WelcomeModal />

            {/* Mesh Background */}
            <div className="mesh-background" />
        </>
    );
};

export default Layout;
