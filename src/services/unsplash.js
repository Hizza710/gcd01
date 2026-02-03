// using Pollinations.ai for dynamic, relevant images without API keys
export const searchImage = async (query) => {
    // Clean query for better prompt
    const cleanQuery = query.replace(/[^a-zA-Z0-9 ]/g, '');
    // Construct Pollinations URL - vivid, high quality style
    return `https://image.pollinations.ai/prompt/cinematic photo of ${encodeURIComponent(cleanQuery)}, professional photography, highly detailed, sustainable, inspiring, warm lighting?width=800&height=800&nologo=true`;
};
