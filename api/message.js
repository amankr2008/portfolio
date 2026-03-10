\// messages.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

// File path to store messages (for backup)
const messagesFile = path.join(__dirname, "messages.json");

// Function to save message
function saveMessage(data) {
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile));
    }
    messages.push({ ...data, time: new Date().toISOString() });
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// Setup your Gmail (or any SMTP) credentials
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "amankr2008", // <-- change to your email
        pass: "amankr2008@12", // <-- change to your Gmail App Password
    },
});

// POST route to receive message
router.post("/send", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields required" });
    }

    // Save to file
    saveMessage({ name, email, subject, message });

    // Send email notification
    const mailOptions = {
        from: "amanjuly2009@gmail.com",
        to: "amanchu2323@gmail.com", // <-- you will receive the message here
        subject: `Message Received Successfully: ${subject || "No Subject"}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log("Email Error:", err);
        else console.log("Email sent:", info.response);
    });

    res.json({ message: "Message received" });
});

// GET route to show all messages in admin panel
router.get("/admin/messages", (req, res) => {
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile));
    }

    // Simple HTML admin panel
    let html = `<h1>Admin Panel - Messages</h1><table border="1" cellpadding="5"><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Time</th></tr>`;
    messages.reverse().forEach(m => {
        html += `<tr>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.subject || ""}</td>
        <td>${m.message}</td>
        <td>${m.time}</td>
        </tr>`;
    });
    html += "</table>";
    res.send(html);
});

module.exports = router;