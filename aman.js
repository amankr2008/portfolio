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
    res.sendFile(path.join(__dirname, "views", "demo.html"));
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
