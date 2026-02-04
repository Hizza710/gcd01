import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

// Use a known stable model, though we will fallback anyway
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getJobSuggestions = async (aspiration, homeCountry, randomCountries) => {
  // 1. Immediate Mock Fallback for Demo if no key
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("No Gemini API Key found. Returning mock data.");
    return mockData(homeCountry, randomCountries);
  }

  const prompt = `
    You are a visionary career guide connecting personal aspirations to global value creation.
    
    User's Core Aspiration: "${aspiration}"
    
    TASK: Find existing or plausible "Value Creating Roles" in these countries: ${[homeCountry, ...randomCountries].join(", ")}.
    
    CRITICAL: The goal is NOT just to describe the country. It is to find a specific job/role in that country where this person can Create Value based on their aspiration ("${aspiration}").
    
    For each country, provide:
    1. "country": The country name.
    2. "jobTitle": A specific, inspiring job title (e.g. "Community Weaver", "Sustainable Artisan").
    3. "jobDescription": How this specific role in this country CREATES VALUE aligned with the aspiration. focus on the contribution (max 200 chars).
    4. "culturalContext": Explain the specific cultural background/custom/value (e.g. "Omotenashi", "Ubuntu") that makes this role significant here. Why does this culture value this? (max 200 chars).
    5. "experience": The lifestyle accommpanying this value creation. What does it feel like to live there and do this meaningful work? (max 400 chars).
    6. "imageKeywords": English keywords for a photo showing the *action* of this value creation (e.g. "pottery hands clay japan workshop").
    
    Return strictly JSON array.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "");
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // CRITICAL: Always fallback to mock data on error so the user sees the app working
    console.warn("API Request failed. Falling back to Mock Data for demonstration.");
    return mockData(homeCountry, randomCountries, aspiration);
  }
};

const mockData = (homeCountry, countries, aspiration) => {
  const allCountries = [homeCountry, ...countries].slice(0, 9);

  // Dynamic mock data attempting to reflect the aspiration roughly
  return allCountries.map((country, index) => ({
    country,
    jobTitle: `Value Creator in ${country}`,
    jobDescription: `In ${country}, you translate "${aspiration}" into tangible value for the local community, bridging tradition and future needs.`,
    culturalContext: `This role is rooted in the ${country} tradition of collective well-being, where individual success is measured by community contribution.`,
    experience: `Your days in ${country} are filled with purpose. The local culture embraces your vision, and you feel a deep connection to the people you serve through your work.`,
    imageKeywords: `${country} artisan working lifestyle`,
    isMock: true
  }));
};

