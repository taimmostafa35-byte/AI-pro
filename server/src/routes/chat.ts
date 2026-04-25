import { Router, Request, Response } from "express";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const router = Router();

interface ChatMessage {
  role: "user" | "assistant";
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

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error:
          "Gemini API key not configured. Set GEMINI_API_KEY in your .env file.",
      });
      return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are a helpful, friendly AI assistant. Provide clear, concise, and accurate responses.",
    });

    const history: Content[] = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    res.json({ message: reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

export default router;
