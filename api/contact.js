export default function handler(req, res) {

if (req.method === "POST") {

const { name, email, subject, message } = req.body;

console.log(name, email, subject, message);

res.status(200).json({ message: "Message received" });

}

else {
res.status(405).send("Method Not Allowed");
}

}