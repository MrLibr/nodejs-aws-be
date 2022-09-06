import * as AWS from 'aws-sdk';
import { env } from 'process';
import csv from 'csv-parser';

import { HandlerTypes, LoggerConstants, S3OperationsConstants } from '../../constants';
import { IAWSClientConfiguration } from '../../interfaces';
import { LOGGER } from '../logger/logger.service';


export class ImportService {
  private s3Service: AWS.S3;
  private sqsQueue: AWS.SQS;

  constructor(private config: IAWSClientConfiguration) {
    this.s3Service = new AWS.S3({ region: this.config.region, signatureVersion: 'v4' });
    this.sqsQueue = new AWS.SQS();
  }

  public publishToQueue(message: string): void {
    this.sqsQueue.sendMessage({
      QueueUrl: String(env.SQS_URL),
      MessageBody: message,
    }, (error) => {
      if (error) {
        LOGGER.error(`${HandlerTypes.SQS_MESSAGE} ${error}`);
      } else {
        LOGGER.info(`${HandlerTypes.SQS_MESSAGE} ${LoggerConstants.PUBLISH_MESSAGE} ${message}`);
      }
    });
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
          this.publishToQueue(JSON.stringify(data));
          LOGGER.info(`${HandlerTypes.IMPORT_FILE_PARSER} ${LoggerConstants.LOADING} ${data}`);
        })
        .on('error', (error) => {
          LOGGER.error(`${HandlerTypes.IMPORT_FILE_PARSER} ${error}`);
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
