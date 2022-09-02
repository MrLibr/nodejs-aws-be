import { DeleteResult } from 'typeorm';

import { ProductServiceDB } from '../../data-access';
import { Product } from '../../entities';


export class ProductService {

  private productServiceDB: ProductServiceDB;

  constructor() {
    this.productServiceDB = new ProductServiceDB();
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
}
