import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractModel } from './abstract.model';
import { User } from './user.model';

@Entity({ name: 'user-session' })
export class UserSession extends AbstractModel {
  @Column({ name: 'refresh-uuid', type: 'varchar' })
  refreshUUID: string;

  @Column({name: 'is_expired', type: 'boolean'})
  isExpired: boolean;

  @Column({name: 'is_active', type: 'boolean', default: 'true'})
  isActive: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user-id' })
  user: User;
}
