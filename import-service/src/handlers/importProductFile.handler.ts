import { Request, Response } from 'express';
import { env } from 'process';

import { LoggerConstants, FoldersConstants, HTTPStatuses, HandlerTypes, ResponseConstants } from '../constants';
import { LOGGER, ResponseService, ImportService } from '../services'

export const importProductsFile = async (req: Request, res: Response) => {
  const responseService = new ResponseService();
  const fileName = req.query.name;

  if (!fileName) {
    return responseService.createResponce(res, ResponseConstants.BAD_FILE_NAME, HTTPStatuses.BAD_REQUEST);
  }

  try {
    const importService = new ImportService({
      bucketName: String(env.AWS_IMPORT_BUCKET),
      region: String(env.AWS_REGION),
    });

    const filePath = `${FoldersConstants.UPLOADED}/${fileName}`;
    const signedUrl = await importService.getS3ImportSignedUrl(filePath);

    LOGGER.info(`${HandlerTypes.IMPORT_PRODUCTS_FILE} ${LoggerConstants.IMPORT_SUCCEEDED} ${signedUrl}`);
    return responseService.createResponce(res, signedUrl, HTTPStatuses.SUCCESS);
  } catch (error) {
    LOGGER.error(`${HandlerTypes.IMPORT_PRODUCTS_FILE} ${error}`);
    return responseService.createResponce(res, error, HTTPStatuses.SERVER_ERROR);
  }
}
