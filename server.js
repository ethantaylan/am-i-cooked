import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration - update with your production domain
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || "https://am-i-c00ked.netlify.app"
      : ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" })); // Limit request size

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/judge", async (req, res) => {
  try {
    const { scenario, language } = req.body;

    // Validation
    if (!scenario || !scenario.trim()) {
      return res.status(400).json({ error: "Scenario is required" });
    }

    if (scenario.length > 200) {
      return res
        .status(400)
        .json({ error: "Scenario too long. Max 200 characters." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a humorous judge that determines how "cooked" someone is based on their situation.
"Cooked" means being in trouble, embarrassed, or in a bad situation.

Analyze the scenario and respond with:
1. A cooking percentage (0-100%) - how badly cooked they are
2. A brief, witty explanation (1-2 sentences max)

Be funny, slightly sarcastic, but not mean. Use internet slang when appropriate.

Please verdict in the JSON below should be in ${language}

Response format (JSON):
{
  "percentage": <number 0-100>,
  "verdict": "<brief witty explanation>"
}`,
        },
        {
          role: "user",
          content: scenario,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const result = JSON.parse(completion.choices[0].message.content);

    res.json({
      percentage: result.percentage,
      verdict: result.verdict,
      isCooked: result.percentage >= 50,
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({
      error: "Failed to judge scenario",
      details: error.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
