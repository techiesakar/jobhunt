import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Company } from "./Company";
import { Job } from "./Job";
@Entity()
export class Benefit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Company, (company) => company.benefits)
  @JoinTable()
  companies: Company[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Job, (job) => job.benefits)
  @JoinTable()
  jobs: Job[];
}
