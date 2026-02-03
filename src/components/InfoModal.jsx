import React from 'react';
import { X } from 'lucide-react';

const InfoModal = ({ title, content, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up border border-white/50">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-family-base)' }}>{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap font-light">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
