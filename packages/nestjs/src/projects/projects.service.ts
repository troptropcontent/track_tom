import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(conditions: FindManyOptions<Project>) {
    return this.projectsRepository.find(conditions);
  }
}
