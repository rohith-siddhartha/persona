import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column()
  text: string;

  @ManyToOne(() => Topic, { eager: true })
  @JoinColumn()
  topic: Topic;
}
