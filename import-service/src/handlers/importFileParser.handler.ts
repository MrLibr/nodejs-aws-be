import { env } from 'process';

import { LoggerConstants, HandlerTypes, FoldersConstants } from '../constants';
import { LOGGER, ImportService } from '../services';

export const importFileParser = async (event: any) => {
  LOGGER.info(`${HandlerTypes.IMPORT_FILE_PARSER} ${event}`);

  try {
    const importService = new ImportService({
      bucketName: String(env.AWS_IMPORT_BUCKET),
      region: String(env.AWS_REGION),
    });

    for (const record of event.Records) {
      LOGGER.info(`${HandlerTypes.IMPORT_FILE_PARSER} ${LoggerConstants.PROCESSING_RECORD} ${record.s3.object.key}`);

      const filePath = record.s3.object.key;
      await importService.parseFile(filePath);
      await importService.moveFile(filePath, FoldersConstants.UPLOADED, FoldersConstants.PARSED);
    }
  } catch (error) {
    LOGGER.error(`${HandlerTypes.IMPORT_FILE_PARSER} ${error}`);
  }
};
