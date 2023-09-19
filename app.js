import express from "express";
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3002, () => {
    console.log("Application started and Listening on port 3002");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/question/data", (req, res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) throw err;
     
        res.send(data)
    })
});

