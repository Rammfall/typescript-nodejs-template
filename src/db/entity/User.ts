import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'app_user',
})
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'varchar',
    length: '30',
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: '320',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password!: string;
}
