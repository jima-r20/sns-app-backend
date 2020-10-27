import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  askFrom: number;

  @Column()
  askTo: number;

  @Column()
  approved: boolean;
}
