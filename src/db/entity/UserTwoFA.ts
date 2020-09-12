import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity({
  name: 'user_2fa',
})
export default class UserTwoFA extends BaseEntity {
  @PrimaryColumn()
  userId!: number;

  @Column({
    default: false,
    type: 'boolean',
  })
  status!: boolean;

  @Column({
    type: 'text',
  })
  secretKey!: string;

  @OneToOne(() => User, (user) => user.twoFA, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}
