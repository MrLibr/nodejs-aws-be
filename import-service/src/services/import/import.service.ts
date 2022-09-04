import * as AWS from 'aws-sdk';
import csv from 'csv-parser';
import { HandlerTypes, LoggerConstants, S3OperationsConstants } from '../../constants';

import { IAWSClientConfiguration } from '../../interfaces';
import { LOGGER } from '../logger/logger.service';


export class ImportService {
  private s3Service: AWS.S3;

  constructor(private config: IAWSClientConfiguration) {
    this.s3Service = new AWS.S3({ region: this.config.region });
  }

  public getS3ImportSignedUrl(filePath: string): Promise<string> {
    const params = {
      Bucket: this.config.bucketName,
      Key: filePath,
      Expires: 60,
      ContentType: 'text/csv',
    };

    return this.s3Service.getSignedUrlPromise(S3OperationsConstants.PUT_OBJECT, params);
  }

  public async parseFile(filePath: string): Promise<string> {
    const params = {
      Bucket: this.config.bucketName,
      Key: filePath,
    };
    const s3Stream = this.s3Service.getObject(params).createReadStream();

    return new Promise((resolve, reject) => {
      s3Stream
        .pipe(csv())
        .on('data', (data) => {
          LOGGER.info(`${HandlerTypes.IMPORT_FILE_PARSER} ${LoggerConstants.LOADING} ${data}`);
        })
        .on('error', (error) => {
          LOGGER.error(`${HandlerTypes.IMPORT_PRODUCTS_FILE} ${error}`);
          reject();
        })
        .on('end', () => {
          LOGGER.info(`${HandlerTypes.IMPORT_FILE_PARSER} ${LoggerConstants.DATA_AFTER_PARSING}`);
          resolve(LoggerConstants.SUCCESS);
        });
    });
  }

  public async moveFile(filePath: string, fromPath: string, targetPath: string): Promise<void> {
    await this.s3Service
      .copyObject({
        Bucket: this.config.bucketName,
        CopySource: `${this.config.bucketName}/${filePath}`,
        Key: filePath.replace(
          fromPath,
          targetPath
        ),
      })
      .promise();

    await this.s3Service
      .deleteObject({
        Bucket: this.config.bucketName,
        Key: filePath,
      })
      .promise();


    LOGGER.info(`${HandlerTypes.MOVE_UPLOADED_FILE} ${LoggerConstants.FILE_WAS_MOVED} `);
  }
}
