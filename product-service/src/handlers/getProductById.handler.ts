import { Request, Response } from 'express';

import { HandlerTypes, HTTPStatuses, LoggerConstants, ResponseConstants } from '../constants';

import { ResponseService, ProductService, LOGGER } from '../services';

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const responseService = new ResponseService();
  const productService = new ProductService();

  try {
    if (!id) {
      LOGGER.warn(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${LoggerConstants.REQUEST_WITH_BAD_PARAMETERS}`);
      return responseService.createResponce(res, ResponseConstants.BAD_PARAMETRES, HTTPStatuses.BAD_REQUEST);
    }

    const product = await productService.getProductById(id);

    if (!product) {
      LOGGER.warn(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${LoggerConstants.PRODUCT_NOT_FOUND}`);
      return responseService.createBadResponce(res, ResponseConstants.NO_RESULTS);
    }

    LOGGER.info(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${LoggerConstants.RESPONSE_WAS_CREATED}`);
    return responseService.createResponce(res, product);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.GET_PRODUCT_DY_ID_HANDLER} ${error}`);
    return responseService.createResponce(res, ResponseConstants.SERVER_ERROR, HTTPStatuses.SERVER_ERROR);
  }
};
