// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ضع مفتاحك هنا (من صفحة OpenAI API Keys)
const OPENAI_KEY = "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";

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024"
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في الاتصال بالذكاء الاصطناعي" });
  }
});

app.listen(3000, () => console.log("✅ الخادم يعمل على http://localhost:3000"));
