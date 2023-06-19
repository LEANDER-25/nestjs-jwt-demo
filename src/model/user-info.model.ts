import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractModel } from './abstract.model';
import { User } from './user.model';

@Entity('user_info')
export class UserInfo extends AbstractModel {
  @Column({ name: 'fullname', type: 'varchar' })
  fullname?: string;

  @Column({ name: 'age', type: 'int2' })
  age?: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}
