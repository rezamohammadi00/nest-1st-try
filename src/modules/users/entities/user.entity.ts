import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  // 1. Never selected from DB by default
  @Column({ select: false })
  // 2. Hidden during serialization even if it gets selected/loaded
  @Exclude({ toPlainOnly: true }) // Hides it ONLY when converting class -> plain (HTTP response)
  password: string;
}

//when the password is showing?

//1) QueryBuilder + addSelect() :
// const user = await userRepository.findOne({
//   where: { email: loginDto.email },
//   select: {
//     id: true,
//     email: true,
//     name: true,
//     password: true,
//   },
// });

//2 findOne() + select.password: true :
//  const user = await this.userRepository.findOne({
//     where: { email },
//     select: {
//       id: true,
//       email: true,
//       name: true,
//       password: true,
//     },
//   });
