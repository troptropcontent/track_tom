import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(conditions: FindManyOptions<Project>) {
    return this.projectsRepository.find(conditions);
  }

  create(data: CreateProjectDto & { user: { id: number } }) {
    const newProject = this.projectsRepository.create(data);
    return this.projectsRepository.save(newProject);
  }
}
