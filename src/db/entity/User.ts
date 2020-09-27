import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import UserProfile from './UserProfile';
// eslint-disable-next-line import/no-cycle
import UserSession from './UserSession';
// eslint-disable-next-line import/no-cycle
import UserTwoFA from './UserTwoFA';
// eslint-disable-next-line import/no-cycle
import RecoveryCode from './RecoveryCode';

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

  @OneToMany(() => UserSession, (session) => session.user)
  @JoinColumn()
  sessions: UserSession[] | undefined;

  @OneToMany(() => RecoveryCode, (code) => code.user)
  @JoinColumn()
  codes: RecoveryCode[] | undefined;

  @OneToOne(() => UserTwoFA, (twofa) => twofa.user)
  twoFA: UserTwoFA | undefined;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile | undefined;
}
