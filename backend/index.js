import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const messages = [];

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Request from: ' + req.socket.address().address + ' on ' + req.path);
    next();
});
app.get('/v1/message', (req, res) => {
    res.json(messages).end();
});
app.post('/v1/message', (req, res) => {
    for (const message of req.body) {
        messages.push(message)
    }
    res.json({ "status": 200, "message": "Zpravy ulozeny." }).end();
});
app.delete('/v1/message', (req, res) => {
    const body = req.body;
    for (const i of body) {
        messages.splice(i, 1);
    }
    res.json({ "status": 200, "data": messages }).end();
});
app.listen(80, () => {
    console.log("Server is running...");
});