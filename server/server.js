require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Note = require("./models/Note");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());


// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


// ✅ Test route
app.get("/", (req, res) => {
    res.send("API running 🚀");
});


// ================= NOTES =================

// ➕ Create note
app.post("/notes", async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📥 Get notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ❌ Delete note
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ================= AUTH =================

// 📝 Register
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔐 Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey");

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ================= AI CHAT =================

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "Nexora Notes AI"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        console.log("AI response:", data);

        res.json({
            reply: data.choices?.[0]?.message?.content || "No response 😢"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


// ================= SERVER =================

app.listen(5000, () => console.log("Server running on 5000 🚀"));