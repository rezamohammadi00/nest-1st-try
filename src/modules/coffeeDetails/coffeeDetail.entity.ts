import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';

import { Coffee } from '../coffees/coffee.entity.js';

@Entity('coffee_details')
export class CoffeeDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TypeORM columns are NOT NULL by default,
  @Column()
  title: string;

  @Column()
  description: string;

  @JoinColumn()            //JoinColumn: This side owns the foreign key. Create the column here.”
  @OneToOne(() => Coffee, (coffee) => coffee.coffee_detail, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  coffee: Relation<Coffee> //coffee + Id = coffeeId
}   
