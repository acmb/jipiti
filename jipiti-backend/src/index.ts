import "dotenv/config";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import auth from "./controllers/auth";
import user from "./controllers/user";

const app = express();

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('error', err => {
  console.error(err);
});
mongoose.connection.on('connecting', err => {
  console.info("Connecting...");
});
mongoose.connection.on('connected', err => {
  console.info("Connected.");
});
mongoose.connection.on('open', err => {
  console.info("Open.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.post('/auth/login', auth.login);

app.get('/users/:userId', user.getUserById);
app.get('/users/:userId/messages', user.getUserMessages);
app.post('/users/:userId/messages', user.sendUserMessage);

app.listen(process.env.PORT, () => {
    console.log(`server running : http://${process.env.HOST}:${process.env.PORT}`);
});
