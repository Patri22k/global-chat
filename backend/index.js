import express from "express";
import bp from "body-parser";
import cors from "cors";

const { json } = bp;

const app = express();
const messages = [];

app.use(cors());
app.use(json());
app.use((req, res, next) => {
    console.log('Request from: ' + req.socket.address().address + ' on ' + req.path + ' (' + req.method + ') with body ' + JSON.stringify(req.body));
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
app.post('/v1/delete', (req, res) => {
    const body = req.body;
    console.log(req.body);
    for (const i of body) {
        messages.splice(i, 1);
    }
    res.json({ "status": 200, "data": messages }).end();
});
app.listen(80, () => {
    console.log("Server is running...");
});