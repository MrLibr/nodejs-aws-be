import { Repository } from 'typeorm';

import { HandlerTypes, LoggerConstants } from '../constants';
import { AppDataSource } from '../database';
import { Product, Stock } from '../entities';
import { LOGGER } from '../services';

export class ProductServiceDB {
  private async initConnection() {
    try {
      await AppDataSource.initialize();
      LOGGER.info(`${HandlerTypes.DB} ${LoggerConstants.DB_CONNECTED}`);
    } catch (error) {
      LOGGER.error(`${HandlerTypes.DB} ${LoggerConstants.DB_ERROR} ${error}`);
    }
  }

  public async closeConnection() {
    await AppDataSource.destroy();
  }

  public async getProductRepository(): Promise<Repository<Product>> {
    return this.getRepository(Product);
  }

  public async getStockRepository(): Promise<Repository<Product>> {
    return this.getRepository(Stock);
  }

  private async getRepository(entity: any): Promise<Repository<any>> {
    if (!AppDataSource.isInitialized) {
      await this.initConnection();
    }

    return AppDataSource.getRepository(entity);
  }
}
