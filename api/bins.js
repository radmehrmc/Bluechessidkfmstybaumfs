import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "bins.json");

  if (req.method === "GET") {
    const data = JSON.parse(await fs.readFile(filePath));
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      const { title, text } = JSON.parse(body);

      const data = JSON.parse(await fs.readFile(filePath));
      const newBin = {
        id: Date.now().toString(),
        title,
        text,
        created: new Date().toISOString()
      };

      data.push(newBin);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      return res.status(200).json({ success: true, id: newBin.id });
    });

    return;
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
