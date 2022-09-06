import { Stock } from './../../entities/stock.entity';
import { DeleteResult } from 'typeorm';

import { NotificationService } from '../notification/notification.service';
import { ProductServiceDB } from '../../data-access';
import { LOGGER } from '../logger/logger.service';
import { HandlerTypes } from '../../constants';
import { Product } from '../../entities';


export class ProductService {

  private productServiceDB: ProductServiceDB;
  private notificationService: NotificationService

  constructor() {
    this.productServiceDB = new ProductServiceDB();
    this.notificationService = new NotificationService();
  }

  public async addProduct(product: Product): Promise<Product> {
    const productRepository = await this.productServiceDB.getProductRepository()
    return productRepository.save(product);
  }

  public async deleteProductById(id: string): Promise<DeleteResult> {
    const productRepository = await this.productServiceDB.getProductRepository()
    return productRepository.delete({ id });
  }

  public async getProductById(id: string): Promise<Product | null> {
    const productRepository = await this.productServiceDB.getProductRepository()
    return productRepository.findOneBy({ id });
  }

  public async getAllProduct(): Promise<Product[]> {
    const productRepository = await this.productServiceDB.getProductRepository()
    return productRepository.find();
  }

  public async createProductBatch(products: any[]): Promise<Product[]> {
    const stockRepository = await this.productServiceDB.getStockRepository()

    const newProducts = [];

    for (const product of products) {
      let createdProduct = new Product();

      createdProduct.title = product.title;
      createdProduct.description = product.description;
      createdProduct.img = product.img;
      createdProduct.currency = product.currency;
      createdProduct.price = product.price

      createdProduct = await this.addProduct(createdProduct);
      LOGGER.info(`${HandlerTypes.CATALOG_BATCH_PROCESS} ${createdProduct.id}`)

      let stock = new Stock();

      stock.count = product.count;
      stock.product = createdProduct;

      stock = await stockRepository.create(stock)

      LOGGER.info(`${HandlerTypes.CATALOG_BATCH_PROCESS} ${stock.count}`)
      newProducts.push(createdProduct);
    }

    return newProducts;
  }
}
