import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity({
  name: 'user_profile',
})
export default class UserProfile extends BaseEntity {
  @PrimaryColumn()
  userId!: number;

  @Column({
    type: 'varchar',
    length: '30',
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    length: '30',
    nullable: false,
  })
  lastName!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  about: string | undefined;

  @Column({
    type: 'varchar',
    length: '70',
    nullable: true,
  })
  location: string | undefined;

  @Column({
    type: 'text',
    nullable: true,
  })
  photo: string | undefined;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user!: User;
}
