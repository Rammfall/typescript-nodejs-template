import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity()
export default class UserTwoFA extends BaseEntity {
  @PrimaryColumn({})
  readonly userId!: number;

  @Column()
  status!: string;

  @Column()
  secretKey!: string;

  @OneToOne(() => User, (user) => user.twoFA)
  user!: User;
}
