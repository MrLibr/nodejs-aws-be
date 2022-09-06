import { Request, Response } from 'express';

import { ResponseService, LOGGER, ProductService } from '../services';
import { HandlerTypes, HTTPStatuses, LoggerConstants, ResponseConstants } from '../constants';

export const getAllProducts = async (req: Request, res: Response) => {
  const responseService = new ResponseService();
  const productService = new ProductService();

  try {
    const allProducts = await productService.getAllProduct();

    if (!allProducts) {
      LOGGER.warn(`${HandlerTypes.GET_ALL_PRODUCT_HANDLER} ${LoggerConstants.DB_IS_EMPTY}`);
      return responseService.createBadResponce(res, ResponseConstants.NO_RESULTS);
    }

    LOGGER.info(`${HandlerTypes.GET_ALL_PRODUCT_HANDLER} ${LoggerConstants.RESPONSE_WAS_CREATED} `);
    return responseService.createResponce(res, allProducts);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.GET_ALL_PRODUCT_HANDLER} ${error}`);
    return responseService.createResponce(res, ResponseConstants.SERVER_ERROR, HTTPStatuses.SERVER_ERROR);
  }
};
