import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FindManyOptions } from 'typeorm';
import { Project } from './entities/project.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param() filters: FindManyOptions<Project>) {
    return this.projectsService.findAll(filters);
  }
}
