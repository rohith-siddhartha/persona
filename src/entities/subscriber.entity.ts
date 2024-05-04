import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Topic, { eager: false })
  @JoinTable()
  topics: Topic[];
}
