import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { questionaireInterface } from "./modules.js";

questionaireInterface.import();
const questionGenerator = questionaireInterface.init();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


let answer;

app.get("/data", (req, res) => {
    const nextQuestion = questionGenerator.next();
    if (nextQuestion.done){
        res.send({done:true});
    }else{
        const [question, answer] = nextQuestion.value;
        res.send(question);
    }
});

app.post("/answer", (req, res) => {
  console.log(req.json());
})

