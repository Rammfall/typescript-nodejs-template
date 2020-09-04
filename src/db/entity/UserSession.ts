import { Column, Entity, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';

import AppUser from './AppUser';

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
  userId!: number;

  @ManyToOne(() => AppUser, (user: AppUser) => user.id)
  user!: AppUser;
}
