import { Request, Response } from 'express';

import { ResponseService, LOGGER, ProductService } from '../services';
import { HandlerTypes, HTTPStatuses, LoggerConstants, ResponseConstants } from '../constants';
import { Product } from '../entities';

export const addNewProduct = async (req: Request, res: Response) => {
  const {title, description, img, currency, price, count} = req.body;

  const responseService = new ResponseService();
  const productService = new ProductService();

  try {
    const newProduct = new Product();

    newProduct.title = title;
    newProduct.description = description;
    newProduct.img = img;
    newProduct.currency = currency;
    newProduct.price = price;

    const createdProduct = await productService.addProduct(newProduct);

    LOGGER.info(`${HandlerTypes.ADD_NEW_PRODUCT} ${LoggerConstants.PRODUCT_WAS_CREATED_SUCCESSFUL} `);
    return responseService.createResponce(res, createdProduct);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.GET_ALL_PRODUCT_HANDLER} ${error}`);
    return responseService.createResponce(res, ResponseConstants.SERVER_ERROR, HTTPStatuses.SERVER_ERROR);
  }
};
