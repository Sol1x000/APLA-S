import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: question }]
  });
  res.json({ answer: response.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running"));
