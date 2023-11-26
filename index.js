import helmet from 'helmet'
import cors from 'cors'
import express from 'express'
import initRoutes from "./initializer/initRoutes.js"
import initServer from './initializer/initServer.js'
import { initprisma } from "./initializer/initprisma.js"

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
initprisma();
initRoutes(app);
initServer(app);