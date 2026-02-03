import React, { useState, useEffect } from 'react';
import { searchImage } from '../services/unsplash';

const DiscoveryCard = ({ data, onClick }) => {
    const [imageUrl, setImageUrl] = useState("https://image.pollinations.ai/prompt/abstract%20art%20blur?width=800&height=800&nologo=true");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchImage = async () => {
            try {
                const url = await searchImage(data.unsplashKeywords || `${data.country} ${data.jobTitle}`);
                if (mounted) setImageUrl(url);
            } catch (e) {
                console.error("Failed to load image", e);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchImage();
        return () => { mounted = false; };
    }, [data.unsplashKeywords, data.country, data.jobTitle]);

    return (
        <div
            onClick={() => onClick(data, imageUrl)}
            className="group relative aspect-square rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-200">
                <img
                    src={imageUrl}
                    alt={data.jobTitle}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loading ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>

            {/* Skeleton Loading */}
            {loading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {/* Overlay - Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Content - Minimal Design */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-3xl font-black uppercase tracking-widest opacity-90 drop-shadow-lg select-none">
                    {data.country}
                </span>
            </div>
        </div>
    );
};

export default DiscoveryCard;
