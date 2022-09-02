import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm"

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn({ type: 'uuid'  })
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  img!: string;

  @Column({ type: "text" })
  currency!: string;

  @Column({ type: 'float' })
  price!: number;
}
