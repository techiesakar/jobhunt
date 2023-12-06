import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Company } from "./Company";
import { Job } from "./Job";
@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Company, (company) => company.locations)
  @JoinTable()
  companies: Company[];

  @ManyToMany(() => Job, (job) => job.locations)
  @JoinTable()
  jobs: Job[];
}
