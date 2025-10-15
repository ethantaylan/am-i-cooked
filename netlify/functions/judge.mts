import OpenAI from "openai";

export const handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { scenario, language } = body;

    if (!scenario) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Scenario is required" }),
      };
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const result = JSON.parse(completion.choices[0].message.content || "");

    return {
      statusCode: 200,
      body: JSON.stringify({
        percentage: result.percentage,
        verdict: result.verdict,
        isCooked: result.percentage >= 50,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as any).message }),
    };
  }
};
