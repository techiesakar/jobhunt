import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Location } from "./Location";
import { Technology } from "./Technology";
import { Benefit } from "./Benefit";
import { Category } from "./Category";
import { Job } from "./Job";

type SocialLinks = {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  tiktok: string;
  linkedin: string;
  github: string;
  pinterest: string;
  thread: string;
};

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  company_name: string;

  @Column({
    default: "not-available",
  })
  company_code: string;

  @Column({ nullable: true })
  ceo_name: string;

  @Column({ nullable: true })
  agent_name: string;

  @Column()
  company_phone: string;

  @Column()
  company_email: string;

  @Column({ nullable: true })
  total_employee: number;

  @Column({ nullable: true })
  date_founded: Date;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  social_links: Array<{} | SocialLinks>; // Array of JSON objects

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @ManyToMany(() => Location, (location) => location.companies)
  locations: Location[];

  @ManyToMany(() => Technology, (technology) => technology.companies, {
    nullable: true,
  })
  technologies: Technology[];

  @ManyToMany(() => Benefit, (benefit) => benefit.companies, { nullable: true })
  benefits: Benefit[];

  @ManyToMany(() => Category, (category) => category.companies, {
    nullable: true,
  })
  categories: Category[];

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
