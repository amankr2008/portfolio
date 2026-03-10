const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

/* ===== Middleware ===== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static folder (css, js, images)
app.use(express.static("static"));

/* ===== Home Page ===== */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
    // Admin page
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});
// Submit form via fetch
const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
    };

    // Send message to admin panel
    const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message); // "Message saved"
    contactForm.reset();
});
// Get messages API
app.get("/messages", (req, res) => {
import messageRoutes from './messages.js';
app.use('/', messageRoutes);
    fs.readFile("output.txt", "utf8", (err, data) => {

        if (err) return res.json([]);

        const messages = data.split("--------------------------")
        .filter(m => m.trim() !== "");

        res.json(messages);

    });

});
});

/* ===== Form Submit Route ===== */
app.post("/", (req, res) => {

    const { name, email, subject, message } = req.body;

    console.log(req.body);

    const data = `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
--------------------------
`;

    // create file if not exists & append data
    fs.appendFile("output.txt", data, (err) => {
        if (err) {
            console.log(err);
            return res.send("Error saving message");
        }

        res.send(`
            <h1>✅ Message Received Successfully</h1>
            <a href="/">Go Back</a>
        `);
    });
});

/* ===== Server Start ===== */
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});