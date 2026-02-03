import React, { createContext, useContext, useState, useEffect } from "react";
import { ja } from "../locales/ja";
import { en } from "../locales/en";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [homeCountry, setHomeCountry] = useState(
        localStorage.getItem("career-weaver-country") || null
    );

    // Language State - Default to browser lang or 'ja'
    const [language, setLanguage] = useState(
        localStorage.getItem("career-weaver-lang") || "ja"
    );

    const [collectedCards, setCollectedCards] = useState(() => {
        const saved = localStorage.getItem("career-weaver-collection");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (homeCountry) {
            localStorage.setItem("career-weaver-country", homeCountry);
        }
    }, [homeCountry]);

    useEffect(() => {
        localStorage.setItem("career-weaver-collection", JSON.stringify(collectedCards));
    }, [collectedCards]);

    useEffect(() => {
        localStorage.setItem("career-weaver-lang", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "ja" ? "en" : "ja"));
    };

    const t = (key) => {
        const keys = key.split(".");
        const resources = language === "ja" ? ja : en;
        let value = resources;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const addToCollection = (card) => {
        if (!collectedCards.find((c) => c.id === card.id)) {
            setCollectedCards([...collectedCards, card]);
        }
    };

    return (
        <UserContext.Provider
            value={{
                homeCountry,
                setHomeCountry,
                collectedCards,
                addToCollection,
                language,
                setLanguage,
                toggleLanguage,
                t
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
