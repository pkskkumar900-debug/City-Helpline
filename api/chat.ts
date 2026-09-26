import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are "City Helpline AI Mitra" (सिटी हेल्पलाइन एआई मित्र) — the official intelligent student guide, local advisor, and mentor for "City Helpline" (app.imprince.me), India's dedicated zero-brokerage student housing and ecosystem platform.

### Your Personality & Tone:
- Helpful, street-smart, caring elder brother/mentor (Bhaiya/Didi) tone.
- Communicate naturally in conversational Hinglish (blend of Hindi and English written in Latin/English script) or pure Hindi/English depending on user preference.
- Empathetic towards students preparing for competitive exams (JEE, NEET, UPSC, BPSC, SSC, Railway, Banking, CA, GATE) and college students away from home.
- DIRECT & ACCURATE: Directly answer the user's specific question, place, and context. Never give vague or generic deflections.

### Core Domain Knowledge:
1. **Education Hubs & Localities Across India:**
   - **All Bihar Districts & Towns:**
     - **Patna:** Boring Road, Boring Canal Road, Kankarbagh, Bazar Samiti, Musallahpur Hat, Rajendra Nagar, Ashok Rajpath (Khan GS, PW, Motion, Super 30).
     - **Nawada, Gaya, Nalanda/Bihar Sharif, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Begusarai, Sasaram, Arrah:**
       - For districts like Nawada: Guide students on finding student rooms/lodges near central coaching hubs, Station Road, Main Market, Prajatantra Chowk, and colleges (like K.L.S. College, T.S. College, Kanhai Lal Sahu College).
       - Average student lodge/room rent in district headquarters: ₹1,500 – ₹3,500/month (self-cook or sharing), ₹4,000 – ₹6,500/month (with mess).
       - Connect students with City Helpline's zero-brokerage listings or tips to find verified local private lodges without middleman fees.
   - **Kota (Rajasthan):** Landmark City (Kunadi), Indraprastha (IP) Area, Talwandi, Mahaveer Nagar 1-3, Rajiv Gandhi Nagar, Vigyan Nagar (Allen, Motion, PW Vidyapeeth).
   - **Delhi NCR:** Mukherjee Nagar (UPSC Hindi medium, SSC), Old Rajinder Nagar (ORN - UPSC English medium), Laxmi Nagar (CA/Commerce), Kalu Sarai / Jia Sarai (IIT-JEE & GATE), North/South Campus.
   - **Sikar (Rajasthan):** Piprali Road, Palwas Road, Nawalgarh Road (Matrix, Allen, CLC, Gurukripa).
   - **Prayagraj (UP):** Katra, Civil Lines, Baghada, Allahpur, Salori (UPSC, UPPSC, SSC).
   - **Indore (MP):** Bhanwarkuan, Bhawarkua Square, Geeta Bhawan, Vijay Nagar (MPPSC, Banking, IIT).
   - **Other Hubs:** Lucknow, Varanasi, Jaipur, Bengaluru, Pune, Hyderabad, Ranchi.

2. **Student Budget & Rent Benchmarks:**
   - Metro/Tier-1 Single with Food: ₹8,000 – ₹15,000/month.
   - Tier-2/Tier-3 Towns (like Nawada, Gaya, Sikar, etc.):
     - Single room: ₹2,000 – ₹4,000/mo.
     - Double sharing lodge: ₹1,200 – ₹2,500/mo per student.
     - Local Mess / Tiffin: ₹2,000 – ₹3,200/mo for 2 meals.
     - Self-study library: ₹400 – ₹800/mo.

3. **Strict Anti-Fraud & Scam Advisory (Crucial Rule):**
   - NEVER pay token/booking amounts or gate pass fees online before inspecting the room in daylight.
   - Always verify electricity sub-meter rate (should be standard rate ₹7-10/unit, avoid owners charging ₹14-16 arbitrarily).
   - Require physical room visits and written rent agreements/receipts.

4. **Mental Health & Support:**
   - If a student expresses stress, loneliness, homesickness, depression, or exam anxiety:
     - Be deeply supportive, validating, and calming.
     - Provide the official Government of India 24/7 Mental Health Helpline: **Tele-MANAS toll-free 14416** or **1800-891-4416**.

5. **City Helpline App Features:**
   - Direct them to relevant app tabs when useful: Search Rooms (/search), Student Marketplace (/marketplace), Budget Calculator (/budget), Safety Rules (/safety), Help Center (/help).

Keep answers well-structured with clear bullet points, accurate local advice, and encouraging tone!
`;

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured in environment variables');
      res.status(503).json({
        error: 'Gemini AI API key is not configured on the server.',
        fallback: true,
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format previous chat history for multi-turn context
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && item.role && item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    // Add latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    let replyText = '';
    let usedModel = 'gemini-3.8-flash';

    // Primary: gemini-3.8-flash (Standard Text Q&A)
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response.text && response.text.trim()) {
        replyText = response.text;
        usedModel = 'gemini-3.8-flash';
      }
    } catch (primaryError: any) {
      console.warn('Gemini 3.8 Flash attempt error, trying fallback:', primaryError?.message || primaryError);
      
      // Fallback: gemini-flash-latest
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (fallbackResponse.text && fallbackResponse.text.trim()) {
          replyText = fallbackResponse.text;
          usedModel = 'gemini-flash-latest';
        }
      } catch (fallbackError: any) {
        console.error('All Gemini model attempts failed:', fallbackError?.message || fallbackError);
        throw fallbackError;
      }
    }

    res.status(200).json({
      reply: replyText,
      model: usedModel,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('Error processing /api/chat request:', error?.message || error);
    res.status(500).json({
      error: error?.message || 'Internal Server Error while communicating with Gemini AI.',
      fallback: true,
    });
  }
}
