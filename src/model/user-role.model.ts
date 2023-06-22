import { Column, Entity } from 'typeorm';
import { AbstractModel } from './abstract.model';

@Entity('user_role')
export class UserRole extends AbstractModel {
  @Column({ name: 'user_name', type: 'varchar' })
  username: string;

  @Column({ name: 'role_name', type: 'varchar' })
  roleName: string;

  @Column({ name: 'is_main', type: 'boolean' })
  isMain: boolean;
}
