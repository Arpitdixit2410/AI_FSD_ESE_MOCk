const axios = require('axios');

// @desc    AI Shortlist Generation using OpenRouter API
// @route   POST /api/ai/shortlist
exports.shortlistAI = async (req, res) => {
  try {
    const { candidates, jobRequirements } = req.body;

    if (!candidates || candidates.length === 0) {
      return res.status(400).json({ message: 'Candidates data is required for AI evaluation' });
    }
    
    if (!jobRequirements) {
       return res.status(400).json({ message: 'Job requirements are required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey || openRouterApiKey === 'YOUR_OPENROUTER_API_KEY_HERE') {
      return res.status(400).json({ message: 'OpenRouter API Key is missing or not configured in .env' });
    }

    const promptText = `
    You are an expert HR Technical Recruiter. Based on the provided job requirements and list of shortlisted candidates, evaluate and rank them.
    Provide a concise explanation for EACH candidate detailing why they are suitable (or not), highlighting their matching skills.
    Discuss their potential purely based on the provided skills and experience.
    Finally, suggest 2-3 interview questions to ask the top candidate.
    
    Job Requirements:
    ${JSON.stringify(jobRequirements)}
    
    Candidates:
    ${candidates.map((c, i) => `${i+1}. ${c.candidate.name}: ${c.candidate.experience} years exp, Skills: ${c.candidate.skills.join(', ')}. Initial Match Score: ${c.matchScore}%`).join('\n')}
    
    Return the output in a clean, easily readable Markdown structured format.
    `;

    // Using meta-llama/llama-3.1-8b-instruct:free as it's a good free fast model on OpenRouter, but can be changed.
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: 'user', content: promptText }],
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'HTTP-Referer': 'http://localhost:5000',
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    res.json({ aiRecommendation: aiResponse });

  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    res.status(500).json({ message: error.response?.data?.error?.message || error.message });
  }
};
