import React, { useRef } from 'react';
import { X, Camera, Heart, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useUser } from '../contexts/UserContext';
import clsx from 'clsx';

const DetailModal = ({ data, imageUrl, onClose }) => {
    const { addCard, collectedCards, t } = useUser();
    const cardRef = useRef(null);

    const isCollected = collectedCards.some(c => c.id === data.id);

    const handleCollect = () => {
        addCard({ ...data, capturedAt: new Date().toISOString(), imageUrl });
    };

    const handleScreenshot = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                backgroundColor: null,
            });
            const link = document.createElement('a');
            link.download = `pathweave-${data.jobTitle}-${data.country}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in will-change-opacity">
            <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Side */}
                <div ref={cardRef} className="w-full md:w-1/2 relative bg-gray-900 aspect-square md:aspect-auto">
                    <img
                        src={imageUrl}
                        alt={data.jobTitle}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <div className="uppercase tracking-widest text-sm font-semibold mb-2 opacity-80">{data.country}</div>
                        <h2 className="text-4xl font-bold leading-tight mb-2">{data.jobTitle}</h2>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto text-white">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-3 text-pink-200">{t('detail.role')}</h3>
                        <p className="text-lg leading-relaxed text-gray-200">{data.jobDescription}</p>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-semibold mb-3 text-pink-200">{t('detail.living')}</h3>
                        <p className="text-lg leading-relaxed text-gray-200 italic">"{data.experience}"</p>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                        <button
                            onClick={handleCollect}
                            disabled={isCollected}
                            className={clsx(
                                "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                                isCollected
                                    ? "bg-green-500/20 text-green-300 cursor-default"
                                    : "bg-white text-gray-900 hover:bg-gray-100 active:scale-95"
                            )}
                        >
                            <Heart className={clsx("w-5 h-5", isCollected && "fill-current")} />
                            {isCollected ? t('detail.collected') : t('detail.collect')}
                        </button>

                        <button
                            onClick={handleScreenshot}
                            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-all text-white active:scale-95"
                        >
                            <Camera className="w-5 h-5" />
                            {t('detail.download')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
