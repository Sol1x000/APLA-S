import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 ТВОЙ OpenAI ключ вставляем сюда
const OPENAI_API_KEY = "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";

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (err) {
    res.json({ answer: "Ошибка сервера AI" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
