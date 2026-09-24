import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Gemini client with proper User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

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
   - Direct them to relevant app tabs when useful: Search Rooms (/search), Student Marketplace (/marketplace), Budget Calculator (/budget), Safety Rules (/safety).

Keep answers well-structured with clear bullet points, accurate local advice, and encouraging tone!
`;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));

  // AI Chat Endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required and must be a string.' });
        return;
      }

      if (!ai) {
        res.status(503).json({
          error: 'Gemini AI service is not initialized on the server.',
          fallback: true,
        });
        return;
      }

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

      // Add the latest user message
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      let replyText = '';
      let usedModel = 'gemini-3.1-flash-lite';

      // Robust multi-model failover chain:
      // Try high-speed 3.1-flash-lite first, then flash-latest, then 3.8-flash
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];

      for (const candidate of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: candidate,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          if (response.text && response.text.trim()) {
            replyText = response.text;
            usedModel = candidate;
            break;
          }
        } catch (modelError: any) {
          console.warn(`Model ${candidate} error (trying next):`, modelError?.message || modelError);
        }
      }

      if (!replyText) {
        const lower = message.toLowerCase();
        
        // Dynamic detection for Bihar towns (Nawada, Gaya, etc.)
        if (lower.includes('nawada') || lower.includes('bihar sharif') || lower.includes('nalanda') || lower.includes('gaya') || lower.includes('jehanabad')) {
          replyText = `📍 **Student Hostel & Lodge Guide for Nawada / Magadh Region (Bihar):**\n\n` +
            `1. **Key Localities to Find Hostels & Lodges in Nawada:**\n` +
            `- **Station Road & Railway Station Area:** Maximum private student lodges and room availability. Excellent connectivity for daily coaching.\n` +
            `- **Prajatantra Chowk & Main Road:** Main market center with tiffin centers, book shops, and easy auto access.\n` +
            `- **Near K.L.S. College & T.S. College:** Affordable student rooms within walking distance of academic campuses.\n\n` +
            `2. **Average Monthly Rent in Nawada:**\n` +
            `- **Double Sharing Room:** ₹1,200 – ₹2,000 / month per student.\n` +
            `- **Single Private Room:** ₹2,200 – ₹3,500 / month (Self-cook option).\n` +
            `- **Hostel with Food (Mess):** ₹4,500 – ₹6,000 / month.\n` +
            `- **Self-Study Library:** ₹350 – ₹600 / month.\n\n` +
            `3. **Pro-Tips Before Booking in Nawada:**\n` +
            `- 🛑 **Never pay advance online** without physically meeting the landlord.\n` +
            `- Check water availability, summer inverter/power backup, and quiet study environment.\n` +
            `- Search **[City Helpline Verified Listings](/search)** for zero-brokerage direct owner contacts!`;
        } else if (lower.includes('kota') || lower.includes('allen') || lower.includes('pw') || lower.includes('motion')) {
          replyText = `📍 **Kota Student Guide (Allen, PW, Motion):**\n- **Indraprastha (IP Area):** Large hostels near Allen Supath. Single room + food: ₹8,000 – ₹13,500/month.\n- **Landmark City (Kunadi):** Nearest to Allen Sangyan & Samyak. Sharing: ₹5,000 – ₹7,500/mo, Single: ₹8,500 – ₹14,000/mo.\n- **Talwandi & Vigyan Nagar:** Peaceful self-study zones with top AC libraries (₹800 – ₹1,200/mo).\n\n⚠️ **Tip:** Electricity sub-meter reading agreement par likhein aur kisi ko bina physical room visit advance token na dein!`;
        } else if (lower.includes('patna') || lower.includes('boring road') || lower.includes('khan sir') || lower.includes('bazar samiti')) {
          replyText = `📍 **Patna Student Zone Guide:**\n- **Boring Road / Canal Road:** Top JEE, NEET & Foundation coaching corridor. Double sharing: ₹4,000 – ₹6,500/mo, Single room: ₹7,500 – ₹11,000/mo.\n- **Bazar Samiti & Musallahpur Hat:** Khan GS & General Competition hub. Budget lodges: ₹2,500 – ₹4,500/mo.\n- **Kankarbagh:** Peaceful residential area with 24x7 study libraries.`;
        } else if (lower.includes('hostel') || lower.includes('hostal') || lower.includes('pg') || lower.includes('room') || lower.includes('rent')) {
          replyText = `🏠 **Student Accommodation Guide:**\n\n- **Zero-Brokerage Search:** City Helpline par aap direct verified owners se bina kisi broker commission ke deal kar sakte hain.\n- **Rent Checklist:**\n  1. Daylight physical inspection zaroor karein.\n  2. Drinking RO water, washroom sanitation aur Wi-Fi speed test karein.\n  3. Electricity unit rate (₹7–₹10/unit) written agreement par confirm karein.\n  4. Advance token transfer tabhi karein jab room key aur receipt hath me ho.\n\nAap jis specific coaching ya colony ke paas room chahte hain, uska naam batayein!`;
        } else if (lower.includes('token') || lower.includes('advance') || lower.includes('scam') || lower.includes('fraud')) {
          replyText = `⚠️ **Anti-Scam Alert:**\n**Bina physically room dekhe ₹1 bhi online token advance na bhejein!**\n- City Helpline zero-brokerage platform hai. Agar koi fake owner WhatsApp par "Gate pass" ya "Token" maangta hai, toh wo 100% scam hai.\n- Daylight me room, bathroom water pressure aur electricity meter check karke hi deal karein.`;
        } else if (lower.includes('stress') || lower.includes('tension') || lower.includes('depression') || lower.includes('dar')) {
          replyText = `💙 **Aap akele nahi hain:**\nExam ki taiyari ka safar challenging hota hai, lekin yaad rakhein ki koi bhi exam aapki zindagi aur khushiyo se bada nahi hai.\n\n- **Tele-MANAS (Mental Health Helpline):** 📞 **14416** (Toll-Free, 24/7)\n- **National Emergency:** 📞 **112**\nThoda break lein, family se baat karein, aur lambi saans lein. Sab theek ho jayega!`;
        } else {
          replyText = `Namaste! Main **City Helpline AI Mitra** hu. 🎓\n\nAap mujhse kisi bhi educational hub (Kota, Patna, Nawada, Gaya, Delhi, Sikar, Prayagraj) ke PGs, student rent budget, mess food quality, ya safe booking rules ke baare me pooch sakte hain!\n\nBataiye, aap kis coaching ya shehar ke baare me janna chahte hain?`;
        }
      }

      res.json({
        reply: replyText,
        model: usedModel,
      });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: error?.message || 'Internal Server Error while generating AI response',
        fallback: true,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Mount Vite or serve static files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`City Helpline Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
