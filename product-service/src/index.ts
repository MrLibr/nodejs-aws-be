import serverless from "serverless-http";
import bodyParser from 'body-parser';
import express from "express";

import { RouterConstants } from './constants';
import { headersMiddleware } from './middlewares';
import { getAllProducts, getProductById } from './handlers';

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(headersMiddleware);

app.get( RouterConstants.PRODUCTS, getAllProducts );
app.get( RouterConstants.PRODUCTS + RouterConstants.BY_ID, getProductById );

export const handler = serverless(app);
