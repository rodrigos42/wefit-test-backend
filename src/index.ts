import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./Routes/userRoutes";

const app = express();

const port = process.env.PORT || 4568;

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/user', userRoutes)

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});