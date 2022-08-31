import { Request, Response } from 'express';
import { HTTPStatuses } from '../constants';

import { ResponseService, ProductDBService, LOGGER } from '../services';

export const getProductById = async (req: Request, res: Response) => {
  const responceService = new ResponseService();

  try {
    const { id } = req.params;
    const productService = new ProductDBService();
    const product = productService.getProductById(id);

    if (!product) {
      LOGGER.warn(`[getProductById] Product undefined`);
      return responceService.createBadResponce(res, 'No result');
    }

    LOGGER.info(`[getProductById] return response`);
    return responceService.createResponce(res, product);
  } catch (error) {
    LOGGER.error(`[getProductById] ${error}`);
    return responceService.createResponce(res, 'Some server error.', HTTPStatuses.SERVER_ERROR);
  }
};
