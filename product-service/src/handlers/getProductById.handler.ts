import { Request, Response } from 'express';

import { HandlerTypes, HTTPStatuses, LoggerConstants, ResponseConstants } from '../constants';

import { ResponseService, ProductDBService, LOGGER } from '../services';

export const getProductById = async (req: Request, res: Response) => {
  const responceService = new ResponseService();

  try {
    const { id } = req.params;
    const productService = new ProductDBService();
    const product = productService.getProductById(id);

    if (!product) {
      LOGGER.warn(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${LoggerConstants.PRODUCT_NOT_FOUND}`);
      return responceService.createBadResponce(res, ResponseConstants.NO_RESULTS);
    }

    LOGGER.info(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${LoggerConstants.RESPONSE_WAS_CREATED}`);
    return responceService.createResponce(res, product);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${error}`);
    return responceService.createResponce(res, ResponseConstants.SERVER_ERROR, HTTPStatuses.SERVER_ERROR);
  }
};
