import express, {urlencoded} from "express";
import dotenv from "dotenv";
import router from "./Routes";

dotenv.config();

const server = express();
server.use(express.urlencoded({extended: true}));

server.use(router);
server.listen(process.env.PORT);