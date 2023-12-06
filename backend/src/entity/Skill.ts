import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Job } from "./Job";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Job, (job) => job.skills)
  @JoinTable()
  jobs: Job[];
}
