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
export class Technology {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Company, (company) => company.technologies)
  @JoinTable()
  companies: Company[];

  @ManyToMany(() => Job, (job) => job.technologies)
  @JoinTable()
  jobs: Job[];
}
