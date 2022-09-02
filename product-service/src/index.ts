import "reflect-metadata";
import serverless from "serverless-http";
import bodyParser from 'body-parser';
import express from "express";

import { getAllProducts, getProductById, addNewProduct } from './handlers';
import { headersMiddleware } from './middlewares';
import { RouterConstants } from './constants';

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(headersMiddleware);

app.get(RouterConstants.PRODUCTS, getAllProducts);
app.get(RouterConstants.PRODUCTS + RouterConstants.BY_ID, getProductById);
app.post(RouterConstants.ADD_PRODUCT, addNewProduct);

export const handler = serverless(app);
