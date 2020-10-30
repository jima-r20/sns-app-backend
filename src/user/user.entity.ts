import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Post } from '../post/post.entity';

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

  @Column()
  salt: string;

  @OneToMany(
    type => Post,
    post => post.postFrom,
    { eager: true },
  )
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
