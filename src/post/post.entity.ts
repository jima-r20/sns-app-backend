import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PostUser } from './interfaces/post-user.interface';
import { User } from '../user/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(
    type => User,
    user => user.posts,
    { eager: false },
  )
  postFrom: PostUser;

  // @Column()
  // postFromId: number;
}
