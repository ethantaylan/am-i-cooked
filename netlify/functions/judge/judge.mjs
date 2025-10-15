import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (request, context) => {
  try {
    // ✅ Handle different body formats
    let body;
    try {
      body = await request.json();
    } catch {
      const text = await request.text();
      body = text ? JSON.parse(text) : {};
    }

    const { scenario, language } = body || {};

    if (!scenario || !scenario.trim()) {
      return new Response(JSON.stringify({ error: "Scenario is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (scenario.length > 200) {
      return new Response(
        JSON.stringify({ error: "Scenario too long. Max 200 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
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

The verdict must be written in ${language}.
Respond strictly in this JSON format:
{
  "percentage": <number 0-100>,
  "verdict": "<brief witty explanation>"
}`,
        },
        { role: "user", content: scenario },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const rawContent = completion.choices?.[0]?.message?.content || "{}";

    let result;
    try {
      result = JSON.parse(rawContent);
    } catch (e) {
      console.error("Invalid JSON returned by OpenAI:", rawContent);
      throw new Error("OpenAI response was not valid JSON");
    }

    return new Response(
      JSON.stringify({
        percentage: result.percentage,
        verdict: result.verdict,
        isCooked: result.percentage >= 50,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to judge scenario",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
