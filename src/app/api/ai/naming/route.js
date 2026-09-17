import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(request) {
  try {
    //the entire data featured in a scenario but extracted
    const {
      type,
      startCapital,
      monthlyRate,
      targetAmount,
      duration,
      interestRate,
    } = await request.json();

    //"title" is the single-string object
    const titleSchema = z.object({
      title: z
        .string()
        .describe(
          "A short, catchy, professional title (in English) under 30 characters describing the financial scenario.",
        ),
    });

    // call generateText to use ai - defining the prompt for the ai,

    const { output } = await generateText({
      model: google("gemini-3.5-flash"),
      output: Output.object({
        schema: titleSchema,
      }),

      prompt: `Generate exactly one short, catchy, professional English title based on these inputs:
      Type: ${type}
      Start Capital: ${startCapital}
      Duration: ${duration} in years
      Interest Rate: ${interestRate}%
      Monthly Rate/Target Amount: ${monthlyRate || targetAmount}
      Strict rules: Maximum 30 characters including spaces, emojis allowed, no profanity, no quotes, and output only the title.`,
    });

    return Response.json({ title: output.title });
  } catch (error) {
    console.error("AI Naming error", error);
    return Response.json(
      { error: "Failed to generate title" },
      { status: 500 },
    );
  }
}
