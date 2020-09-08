import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity({
  name: 'user_profile',
})
export default class UserProfile extends BaseEntity {
  @PrimaryColumn()
  readonly userId!: number;

  @Column({
    type: 'varchar',
    length: '30',
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    length: '30',
  })
  lastName!: string;

  @Column({
    type: 'text',
  })
  about: string | undefined;

  @Column({
    type: 'varchar',
    length: '70',
  })
  location: string | undefined;

  @Column({
    type: 'text',
  })
  photo: string | undefined;

  @OneToOne(() => User, (user) => user.profile)
  user!: User;
}
