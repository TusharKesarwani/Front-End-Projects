import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Read contributors JSON
app.get("/contributors", (req, res) => {
  const data = fs.readFileSync("./backend/contributors.json", "utf8");
  res.json(JSON.parse(data));
});

// Write new contributor
app.post("/contributors", (req, res) => {
  const newContributor = req.body;

  const data = JSON.parse(fs.readFileSync("./backend/contributors.json", "utf8"));
  data.push(newContributor);
  fs.writeFileSync("./backend/contributors.json", JSON.stringify(data, null, 2));

  res.json({ message: "Contributor added", newContributor });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
