import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractModel } from './abstract.model';

@Entity('user')
export class User extends AbstractModel {
  @Column({ name: 'username', type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive?: boolean;
}
