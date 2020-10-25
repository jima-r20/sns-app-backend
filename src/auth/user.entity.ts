import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column()
  avatar: string;

  @Column()
  about: string;

  @Column()
  is_active: boolean;

  @Column()
  is_staff: boolean;
}
