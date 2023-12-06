import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Staff } from "./staff";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost",
}

export enum UserType {
  EMPLOYEER = "employeer",
  EMPLOYEE = "employee",
  JOBHUNT = "jobhunt",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.EMPLOYEER,
  })
  type: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Staff)
  @JoinColumn()
  staff: Staff;
}
