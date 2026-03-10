import { put, list } from "@vercel/blob";

export default async function handler(req, res) {

if (req.method === "POST") {

const { name, email, subject, message } = req.body;

const data = JSON.stringify({
name,
email,
subject,
message,
date:new Date()
});

const filename = `message-${Date.now()}.json`;

await put(filename, data, { access: "public" });

res.status(200).json({message:"saved"});
}

if (req.method === "GET") {

const blobs = await list();

res.status(200).json(blobs);

}

}