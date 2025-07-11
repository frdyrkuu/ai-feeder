import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
  try {
    const { mixId } = await req.json();

    const mix = await prisma.mix.findUnique({
      where: { id: mixId },
      include: { ingredients: true },
    });

    if (!mix) {
      return new Response("Mix not found", { status: 404 });
    }

    const input = mix.ingredients
      .map(ing => `${ing.name} - ${ing.quantity}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.3-70b-instruct',
      messages: [
        {
          role: 'system',
          content: `You are a professional animal feed nutritionist and agricultural consultant. Given a list of ingredients and weights, return the following in HTML format:
1. A section titled: "Mix Ingredients"
    - Display a table with: Ingredient, Quantity, Unit
    - Include all ingredients from the provided list.
    - Ensure the total weight is calculated and displayed at the top of the table.

2. A section titled: "Nutritional Value of [total weight] Mix"
   - Display a table with: Calories, Carbohydrates, Sugars, Fiber, Protein, Fat, Water

3. A section titled: "Vitamins & Minerals"
   - Display a table with: Folate, Vitamin C, Potassium, Manganese, Iron, Magnesium, etc.

4. A section titled: "Farmer's Nutritional Feedback"
   - Provide a short paragraph (1–3 sentences) evaluating if the mix is nutritionally balanced for general livestock.
   - If nutrients are lacking or excessive, suggest specific improvements (e.g., "Add more protein source", "Too much sugar").
   - Add a note about the importance of balancing nutrients for animal health.
   - Use clear, concise language suitable for farmers.
5. A section titled: "Nutritional Report"
   - Summarize the nutritional content and feedback in a concise paragraph.
   - Make a recommendation chart for the list of animals that can benefit from this mix (Prioritize: chicken and pig).

Return only HTML (no Markdown, no extra text, IF YOU CANNOT PROVIDE DATA STILL USE THE TABLE AND GIVE THE CONS OF THE INGREDIENTS). Use <h2> for section titles and semantic <table> for data.`,
        },
        {
          role: 'user',
          content: `Ingredients:\n${input}`,
        },
      ],
    });


    const result = response.choices[0]?.message?.content;

    return new Response(result || 'No response', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err: any) {
    console.error('Error generating report:', err);
    return new Response('Failed to generate report', { status: 500 });
  }
}
