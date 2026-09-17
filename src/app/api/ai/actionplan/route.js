import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { NextResponse } from "next/server";

const budgetHackerSchema = z.object({
  weeklyTarget: z.number().describe("Roughly the monthly rate divided by 4"),
  hacks: z
    .array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    )
    .length(3),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { finalAmount, duration, monthlyRate } = body;

    const systemPrompt = `You are a practical, encouraging financial coach for a European audience. You do NOT give financial advice. Write in clear, objective English. Always return valid JSON matching the schema. 
    CRITICAL: For the "icon" field in each hack, you MUST provide a single relevant emoji character (e.g., "☕", "🥗", "🚲", "💡"), NEVER write text words like "coffee" or "utensils".`;

    const userPrompt = `The user needs to save ${monthlyRate} € every month for ${duration} years to reach their goal of ${finalAmount} €.
      
    Generate a practical action plan:
    1. Calculate the weekly target (monthlyRate / 4).
    2. Provide exactly 3 realistic, everyday lifestyle "hacks" to free up this weekly amount. Use modern European contexts (e.g., swapping a specialty flat white for home-brewed coffee, cooking dinner instead of ordering takeout). Keep descriptions to ONE sentence.`;

    const { output } = await generateText({
      model: google("gemini-3.6-flash"),
      system: systemPrompt,
      prompt: userPrompt,
      output: Output.object({ schema: budgetHackerSchema }),
    });

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("AI Coach Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights" },
      { status: 500 },
    );
  }
}
