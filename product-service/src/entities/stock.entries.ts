import { Product } from './product.entities';
import { Entity, Column, JoinColumn, OneToOne, BaseEntity } from "typeorm"

@Entity()
export class Stock extends BaseEntity {
  @Column()
  count!: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

}
