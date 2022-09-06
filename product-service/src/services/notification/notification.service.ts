import AWS, { SNS } from 'aws-sdk';
import { env } from 'process';

import { LOGGER } from '../logger/logger.service';
import { HandlerTypes, LoggerConstants, Subjects } from './../../constants';

export class NotificationService {

  private snsQueue: SNS;

  constructor() {
    this.snsQueue = new AWS.SNS({ region: env.BE_AWS_REGION });
  }

  public notifyBatch(products: any): void {
    if (!products || !products.length) {
      throw new Error(LoggerConstants.NO_DATA_PROVIDED);
    }

    for (const product of products) {
      this.sendEmail(product);
    }
  }

  public async sendEmail(product: any): Promise<void> {
    this.snsQueue.publish({
        Subject: Subjects.NEW_PRODUCT_IS_IMPORTED,
        Message: JSON.stringify(product),
        MessageAttributes: {
          currency: {
            DataType: 'String',
            StringValue: product.currency
          },
          price: {
            DataType: 'Number',
            StringValue: product.price
          }
        },
        TopicArn: env.SNS_TOPIC_ARN
      }, (error) => {
        if (error) {
          LOGGER.info(`${HandlerTypes.NOTIFICATION_SERVICE} ${error.message}`);
        } else {
          LOGGER.info(`${HandlerTypes.NOTIFICATION_SERVICE} ${LoggerConstants.SEND_EMAIL_WITH_NEW_PRODUCT} ${product}`);
        }
      })
  }
}
