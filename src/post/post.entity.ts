import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '..//user/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postFrom: User;

  @Column()
  content: string;
}
