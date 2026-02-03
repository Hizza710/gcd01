import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { getJobSuggestions } from '../services/gemini';
import DiscoveryCard from './DiscoveryCard';
import DetailModal from './DetailModal';

const ALL_COUNTRIES = [
    "Argentina", "Australia", "Brazil", "Canada", "Chile", "China", "Colombia",
    "Egypt", "Finland", "France", "Germany", "Greece", "India", "Indonesia",
    "Italy", "Japan", "Kenya", "Mexico", "Morocco", "Netherlands", "New Zealand",
    "Norway", "Peru", "Philippines", "Portugal", "South Africa", "South Korea",
    "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "United Kingdom",
    "United States", "Vietnam"
];

const getRandomCountries = (count, exclude) => {
    const filtered = ALL_COUNTRIES.filter(c => c !== exclude);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const WorldGrid = ({ aspiration }) => {
    const { homeCountry, t } = useUser();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Expose search function to parent via ref or context? 
    // Actually, standard react pattern is passing data down.
    // But here WorldGrid manages the data fetching based on aspiration prop change?
    // Let's make it so that the parent passes "isSearching" or "Trigger".
    // Better yet, let's move the fetch logic to specific trigger.

    // Refactoring: The search button is in AspirationInput.
    // The layout should probably coordinate.
    // But for now, let's assume the parent calls a function passed to it?
    // Or simply, we export a hook?

    // Let's stick to the props.
    // Re-thinking architecture: 
    // Layout -> AspirationInput (onSearch) -> Layout state update -> WorldGrid (prop: query)

    React.useEffect(() => {
        if (aspiration && !hasSearched) {
            handleSearch(aspiration);
        }
    }, [aspiration]);

    const handleSearch = async (query) => {
        setLoading(true);
        setResults([]);
        setHasSearched(true);

        try {
            const randoms = getRandomCountries(8, homeCountry);
            const suggestions = await getJobSuggestions(query, homeCountry, randoms);

            // Add unique IDs
            const suggestionsWithIds = suggestions.map((s, i) => ({
                ...s,
                id: `${s.country}-${i}-${Date.now()}`
            }));

            setResults(suggestionsWithIds);
        } catch (error) {
            console.error(error);
            alert(error.message || "Something went wrong. Please check your API key or network.");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (cardData, imageUrl) => {
        setSelectedCard(cardData);
        setSelectedImage(imageUrl);
    };

    if (!hasSearched && !loading) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-20">
            {loading && (
                <div className="text-center py-20">
                    <div className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-md animate-pulse">
                        <span className="text-xl font-medium text-gray-600">{t('aspiration.searching')}</span>
                    </div>
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
                    {results.map((item) => (
                        <DiscoveryCard
                            key={item.id}
                            data={item}
                            onClick={openModal}
                        />
                    ))}
                </div>
            )}

            {selectedCard && (
                <DetailModal
                    data={selectedCard}
                    imageUrl={selectedImage}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};

export default WorldGrid;
