// messages.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const messagesFile = path.join(__dirname, "messages.json");

// Save message to JSON
function saveMessage(data) {
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile));
    }
    messages.push({ ...data, time: new Date().toISOString() });
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// Email setup (Gmail App Password)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",     // <-- change to your email
        pass: "your_app_password",        // <-- Gmail App password
    },
});

// POST /send - receive contact form
router.post("/send", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "All fields required" });

    saveMessage({ name, email, subject, message });

    // Send email notification
    transporter.sendMail({
        from: "your_email@gmail.com",
        to: "your_email@gmail.com",
        subject: `New Message: ${subject || "No Subject"}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }, (err, info) => {
        if (err) console.log("Email Error:", err);
        else console.log("Email sent:", info.response);
    });

    res.json({ message: "Message received" });
});

// Admin login (simple password check)
const ADMIN_PASSWORD = "123456";  // <-- change your password

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});

// GET /admin/messages - return JSON messages
router.get("/admin/messages/json", (req, res) => {
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile));
    }
    res.json(messages.reverse());
});

module.exports = router;