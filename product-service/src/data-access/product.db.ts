
import { Repository, DataSource } from 'typeorm';

import { AppDataSource } from '../database';
import { Product, Stock } from '../entities';

// export class ProductDB {

//   private productRepository: Repository<Product>

//   constructor() {
//     this.productRepository = AppDataSource.getRepository(Product);
//   }

//   public getRepository(): Repository<Product> {
//     return this.productRepository;
//   }

//   public closeConnection() {
//     return AppDataSource.destroy();
//   }
// }


export class ProductDB {

  private dbSource!: DataSource;

  async initConnections() {
    if (!this.dbSource) {
      this.dbSource = await AppDataSource.initialize();
    }

    return this.dbSource
  }

  public getProductRepository(): Repository<Product> {
    return this.getRepository(Product);
  }

  public getStockRepository(): Repository<Stock> {
    return this.getRepository(Stock);
  }

  private getRepository(entity: any): Repository<any> {
    this.initConnections();
    return this.dbSource.getRepository(entity);
  }
}
