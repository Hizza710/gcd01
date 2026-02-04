// using Pollinations.ai for dynamic, relevant images without API keys
export const searchImage = async (query) => {
    // Clean query for better prompt
    // Clean query for better prompt - kept simple, just remove very special chars if needed, but allow Japanese
    // const cleanQuery = query.replace(/[^a-zA-Z0-9 ]/g, ''); 

    // Construct Pollinations URL - vivid, high quality style
    // We encode the full query to allow Japanese/International characters
    return `https://image.pollinations.ai/prompt/cinematic photo of ${encodeURIComponent(query)}, professional photography, highly detailed, sustainable, inspiring, warm lighting?width=800&height=800&nologo=true`;
};
