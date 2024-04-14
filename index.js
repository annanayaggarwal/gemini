import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser"; 
dotenv.config();
const app = express();
app.use(bodyParser.json())
export const parse = async (question) => {
    const genAI = new GoogleGenerativeAI("AIzaSyBaUvom6OlpJmhp1C3nOoHLTs0nBy-k_Bs");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);
    return text;
};

app.post("/api", async (req, res) => {
    try {
        console.log(req.body.question);
        const parsedText = await parse(req.body.question);
        res.send(parsedText);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred.");
    }
});

app.listen(5000, () => {
    console.log("Listening on port 3000");
});
