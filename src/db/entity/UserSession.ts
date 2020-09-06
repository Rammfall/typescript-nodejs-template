import { Column, Entity, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';

import User from './User';

@Entity({
  name: 'user_session',
})
export default class UserSession extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  refreshToken!: string;

  @Column({
    type: 'text',
  })
  accessToken!: string;

  @Column({
    type: 'timestamp',
  })
  expiredDate!: Date;

  @Column({
    type: 'bigint',
  })
  readonly userId!: number;

  @ManyToOne(() => User, (user: User) => user.id)
  user!: User;
}
