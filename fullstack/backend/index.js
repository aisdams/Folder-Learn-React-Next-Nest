import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(UserRoute);

app.listen(5000, () => console.log("server up and running...."));
