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
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Company, (company) => company.categories)
  @JoinTable()
  companies: Company[];

  @ManyToMany(() => Job, (job) => job.categories)
  @JoinTable()
  jobs: Job[];
}
