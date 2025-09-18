import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: 'daily' | 'weekly';

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'datetime', nullable: true })
  lastResetDate: Date;
}