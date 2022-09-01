import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  img!: string;

  @Column()
  currency!: string;

  @Column()
  price!: number;

  @Column()
  count!: number;
}
