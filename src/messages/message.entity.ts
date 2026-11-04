import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  msg: string;
}
