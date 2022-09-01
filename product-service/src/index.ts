import { LoggerConstants } from './constants/logger.constants';
import { LOGGER } from './services/logger/logger.service';
import serverless from "serverless-http";
import bodyParser from 'body-parser';
import express from "express";

import { AppDataSource } from './database';
import { HandlerTypes, RouterConstants } from './constants';
import { headersMiddleware } from './middlewares';
import { getAllProducts, getProductById, addNewProduct } from './handlers';

const app = express();

AppDataSource
    .initialize()
    .then(() => {
        LOGGER.info(`${HandlerTypes.DB} ${LoggerConstants.DB_CONNECTED}`);

        app.use(bodyParser.json({ strict: false }));
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(headersMiddleware);

        app.get(RouterConstants.PRODUCTS, getAllProducts);
        app.get(RouterConstants.PRODUCTS + RouterConstants.BY_ID, getProductById);
        app.post(RouterConstants.ADD_PRODUCT, addNewProduct);
    })
    .catch((err) => LOGGER.error(`${HandlerTypes.DB} ${LoggerConstants.DB_ERROR}`));

export const handler = serverless(app);
