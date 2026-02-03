import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import DetailModal from './DetailModal';
import { Trash2 } from 'lucide-react';

const MyPage = ({ onClose }) => {
    const { collectedCards, removeCard, t } = useUser();
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div className="fixed inset-0 z-40 bg-gray-50/95 overflow-y-auto animate-slide-in-right">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="title-lg !text-4xl text-gray-800">{t('myPage.title')}</h2>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold transition-colors"
                    >
                        {t('modal.close')}
                    </button>
                </div>

                {collectedCards.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-2xl">{t('myPage.empty')}</p>
                        <p>{t('myPage.back')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collectedCards.map(card => (
                            <div key={card.id} className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                                <div className="aspect-square relative cursor-pointer" onClick={() => setSelectedCard(card)}>
                                    <img src={card.imageUrl} alt={card.jobTitle} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                                        View Details
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="text-xs uppercase text-gray-500 font-bold mb-1">{card.country}</div>
                                    <h3 className="font-bold text-gray-800 leading-tight">{card.jobTitle}</h3>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        title="Remove from collection"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedCard && (
                <DetailModal
                    data={selectedCard}
                    imageUrl={selectedCard.imageUrl}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};

export default MyPage;
