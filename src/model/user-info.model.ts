import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractModel } from './abstract.model';
import { User } from './user.model';

@Entity('user_info')
export class UserInfo extends AbstractModel {
  @Column({ name: 'fullname', type: 'varchar', nullable: true })
  fullname?: string;

  @Column({ name: 'birth', type: 'varchar', nullable: true })
  birth?: string;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}
