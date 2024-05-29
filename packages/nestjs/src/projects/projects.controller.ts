import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;

    return this.projectsService.findAll({ where: { user: { id: user.id } } });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProjectDto, @Request() req) {
    const user = req.user;

    return this.projectsService.create({
      ...body,
      user: { id: user.id },
    });
  }
}
