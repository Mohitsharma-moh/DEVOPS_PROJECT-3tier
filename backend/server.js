const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Add data
app.post("/add", async (req, res) => {
    try {
        const { name } = req.body;
        await db.query("INSERT INTO users (name) VALUES (?)", [name]);
        res.send("Data added");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Get data
app.get("/data", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});