import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());

const messages = [];
app.get('/v1/message', (req, res) => {
    res.json(messages).end();
});
app.post('/v1/message', (req, res) => {
    const body = req.body;
    for (const message of body) {
        messages.push(message)
    }
    res.json({ "status": 200, "message": "Zpravy ulozeny." }).end();
});
app.listen(80, () => {
    console.log("Server is running...");
});