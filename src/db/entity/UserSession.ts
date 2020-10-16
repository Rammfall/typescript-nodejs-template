import { Column, Entity, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity({
  name: 'user_session',
})
export default class UserSession extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    unique: true,
  })
  sessionIdentifier!: string;

  @Column({
    type: 'uuid',
    unique: true,
  })
  refreshToken!: string;

  @Column({
    type: 'text',
  })
  ipAddress!: string;

  @Column({
    type: 'text',
  })
  accessToken!: string;

  @Column({
    type: 'timestamp',
  })
  expiredDate!: Date;

  @Column({
    type: 'varchar',
    length: '30',
  })
  device!: string;

  @Column({
    type: 'bigint',
  })
  readonly userId!: number;

  @ManyToOne(() => User, (user: User) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}
