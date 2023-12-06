import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";

export enum UserGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  RATHERNOT = "rather not say",
}

export enum ViewMode {
  DARK = "dark",
  LIGHT = "light",
}

@Entity()
export class Staff {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(3, 30)
  firstName: string;

  @Column()
  @Length(3, 30)
  lastName: string;

  @Column()
  dob: string;

  @Column({ unique: true })
  phone: string;

  @Column({
    type: "enum",
    enum: UserGender,
    default: UserGender.RATHERNOT,
  })
  gender: UserGender;

  @Column("simple-json", { nullable: true })
  address: {
    country: string;
    district: string;
    municipality: string;
    city: string;
    street_one: string;
    street_two: string;
    postal_code: string;
  };

  @Column("simple-json", { nullable: true })
  social_links: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    github: string;
    youtube: string;
  };

  @Column({ nullable: true })
  staffPhoto: string;

  @Column("simple-json", { nullable: true })
  documents: {
    citizenship_front: string;
    citizenship_back: string;
    driving_license: string;
    pan_card: string;
  };

  @Column({
    type: "enum",
    enum: ViewMode,
    default: ViewMode.LIGHT,
  })
  viewMode: ViewMode;

  @Column({ nullable: true })
  joinedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
