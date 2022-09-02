import { Product } from './product.entity';
import { Entity, Column, JoinColumn, OneToOne, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'stock'})
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id!: string;

  @Column({type: 'int'})
  count!: number;

  @OneToOne(() => Product)
  @JoinColumn({name: "product_id"})
  product!: Product;

}
