import { Request, Response } from 'express';
import { HTTPStatuses } from '../constants';

import { ResponseService, ProductDBService, LOGGER } from '../services';

export const getAllProducts = async (req: Request, res: Response) => {
  const responceService = new ResponseService();

  try {
    const productService = new ProductDBService();
    const allProducts = productService.getAllProducts();

    if (!allProducts) {
      LOGGER.warn(`[getAllProduct] DB is Empty`);
      return responceService.createBadResponce(res, 'No result');
    }

    LOGGER.info(`[getAllProduct] return response`);
    return responceService.createResponce(res, allProducts);
  } catch (error) {
    LOGGER.error(`[getAllProduct] ${error}`);
    return responceService.createResponce(res, 'Some server error.', HTTPStatuses.SERVER_ERROR);
  }
};
