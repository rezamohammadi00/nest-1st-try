import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Index,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { CoffeeDetail } from '../coffeeDetails/coffeeDetail.entity.js';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TypeORM columns are NOT NULL by default,
  @Column()
  @Index()  // EXPLAIN ANALYZE SELECT * FROM coffees where name='li';   (or: WHERE name LIKE '12%') 
  name: string;

  @OneToOne(() => CoffeeDetail, (detail) => detail.coffee)
  coffee_detail?: Relation<CoffeeDetail>; // (?) -> So sometimes it exists, and sometimes it does not. The ? describes that honestly.
  // the below works because coffee_detail is defined on Coffee:
  // relations: {
  //    coffee_detail: true
  // }

  // ---

  // one to many relation:
  // @OneToMany(() => Review, (review) => review.coffee)
  // reviews?: Relation<Review[] >; // no column created

  // @ManyToOne(() => Coffee, (coffee) => coffee.reviews, {
  //   nullable: false,
  //   onDelete: 'CASCADE',
  // })
  // coffee: Relation<Coffee>;   // creates coffeeId column
}
