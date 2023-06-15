import { Column, Entity } from 'typeorm';
import { AbstractModel } from './abstract.model';

@Entity('role')
export class Role extends AbstractModel {
  @Column({ name: 'role_name', type: 'varchar' })
  roleName: string;
}
