import { Project } from '../projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  encryptedPassword: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
