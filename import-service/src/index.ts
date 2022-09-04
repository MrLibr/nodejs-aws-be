import serverless from "serverless-http";
import bodyParser from 'body-parser';
import express from "express";

import { headersMiddleware } from './middlewares';
import { importProductsFile } from './handlers';
import { RouterConstants } from './constants';

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(headersMiddleware);

app.get(RouterConstants.IMPORT, importProductsFile);
export const handler = serverless(app);
