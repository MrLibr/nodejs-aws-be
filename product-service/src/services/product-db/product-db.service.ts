import { ITea } from '../../interfaces';
import { products } from '../../mocks';


export class ProductDBService {

  public getAllProducts(): ITea[] {
    return products;
  }

  public getProductById(id: string): ITea | undefined {
    return this.getAllProducts().find(prodict => prodict.id === id);
  }
}
