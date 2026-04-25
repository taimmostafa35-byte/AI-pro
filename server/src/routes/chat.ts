import { Router, Request, Response } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({
        error:
          "OpenAI API key not configured. Set OPENAI_API_KEY in your .env file.",
      });
      return;
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content:
        "You are a helpful, friendly AI assistant. Provide clear, concise, and accurate responses.",
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    res.json({ message: reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    if (error instanceof OpenAI.APIError) {
      res.status(error.status ?? 500).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

export default router;
