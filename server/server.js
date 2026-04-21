
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("API running 🚀");
});
app.post("/notes", async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
    });

    res.json(user);
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // user check
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        // token generate
        const token = jwt.sign({ id: user._id }, "secretkey");

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(5000, () => console.log("Server running on 5000"));