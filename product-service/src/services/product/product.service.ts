import { Repository, DeleteResult } from 'typeorm';

import { ProductDB } from '../../data-access';
import { Product } from '../../entities';


export class ProductService {

  private productRepository: Repository<Product>;
  private productDB: ProductDB;

  constructor() {
    this.productDB = new ProductDB();
    this.productRepository = this.productDB.getProductRepository();
  }

  public addProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  public deleteProductById(id: string): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }

  public getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  public getAllProduct(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
