import express from "express";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3000;
env.config();

// ---- Best-practice middleware ----
// Helmet sets useful security-related HTTP headers
app.use(helmet());

// Logging: use morgan for concise request logging
app.use(morgan(process.env.MORGAN_FORMAT || 'dev'));

// no CORS_ORIGIN set — default to allow same-origin requests only
app.use(cors());

// Rate limiting: configurable via env
const limiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to X requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.get("/me", async (req, res) => {
    const PROFILE_EMAIL =  process.env.PROFILE_EMAIL || 'Dolami.ayinuola@gmail.com';
    const PROFILE_NAME = process.env.PROFILE_NAME || 'Dolami Ayinuola';
    const PROFILE_STACK = process.env.PROFILE_STACK || 'Node.js/Express';

    const result = {
        status: 'success',
        user: {
            email: PROFILE_EMAIL,
            name:  PROFILE_NAME,
            stack: PROFILE_STACK
        },
        timestamp: new Date().toISOString(),
        fact: null
    };

    try {
        const response = await axios.get('https://catfact.ninja/fact', { timeout : 5000 });
        result.fact = response.data && response.data.fact ? response.data.fact : 'No fact available';
        return res.json(result);
    } catch (err) {
        console.error('Error fetching cat fact:', err.message);
        result.fact = 'Could not fetch cat fact at this time.';
        return res.json(result);
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
