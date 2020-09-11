import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity({
  name: 'twofa_recovery_code',
})
export default class RecoveryCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  code!: string;

  @Column()
  readonly userId!: number;

  @ManyToOne(() => User, (user) => user.codes)
  user!: User;
}
