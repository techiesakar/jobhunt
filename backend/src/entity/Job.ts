import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Company } from "./Company";
import { JobType } from "./JobType";
import { Category } from "./Category";
import { Skill } from "./Skill";
import { Technology } from "./Technology";
import { Benefit } from "./Benefit";
import { Location } from "./Location";
@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  job_phone: string;

  @Column()
  job_email: string;

  // companyName
  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @ManyToMany(() => JobType, (jobType) => jobType.jobs)
  jobtypes: JobType[];

  @ManyToMany(() => Category, (category) => category.jobs)
  categories: Category[];

  @ManyToMany(() => Skill, (skill) => skill.jobs)
  skills: Skill[];

  @ManyToMany(() => Technology, (technology) => technology.jobs)
  technologies: Technology[];

  @ManyToMany(() => Benefit, (benefit) => benefit.jobs)
  @JoinTable()
  benefits: Benefit[];

  @ManyToMany(() => Location, (location) => location.jobs)
  @JoinTable()
  locations: Location[];

  @Column({
    default: "",
  })
  job_role: string;
  @Column()
  job_salary: string;

  @Column()
  job_desc: string;

  @Column({
    default: "",
  })
  who_to_apply: string;

  @Column()
  vacancy_deadline: string;

  @Column()
  job_image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
