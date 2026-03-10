const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static")); // CSS/JS images

// Admin Panel HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});

// API: Get all messages
app.get("/api/messages", (req, res) => {
    const messagesFile = path.join(__dirname, "messages.json");

    // अगर file नहीं है तो create करो
    if (!fs.existsSync(messagesFile)) {
        fs.writeFileSync(messagesFile, JSON.stringify([]));
    }

    const messages = JSON.parse(fs.readFileSync(messagesFile));
    res.json(messages);
});

// API: Add new message (Website से call)
app.post("/api/messages", (req, res) => {
    const { name, email, subject, message } = req.body;
    const messagesFile = path.join(__dirname, "messages.json");

    if (!fs.existsSync(messagesFile)) {
        fs.writeFileSync(messagesFile, JSON.stringify([]));
    }

    const messages = JSON.parse(fs.readFileSync(messagesFile));
    messages.push({
        name,
        email,
        subject,
        message,
        date: new Date()
    });

    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    res.json({ message: "Message saved" });
});

app.listen(PORT, () => {
    console.log(`Admin panel running on http://localhost:${PORT}`);
});