import { TestUtils } from '../utils/test-utils';
import { ProjectsModule } from './projects.module';
import { Project } from './entities/project.entity';
import { User } from '../users/users.entity';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

describe('Projects', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let projectRepository: Repository<Project>;
  let authService: AuthService;

  const createUser = async (email: string = 'test@test.com') => {
    const user = await userRepository.create({
      email,
      encryptedPassword: 'password',
    });
    await userRepository.save(user);
    return user;
  };

  const getToken = async (user: User) => {
    const { access_token } = await authService.login(user);
    return access_token;
  };

  const createProject = async (user: User) => {
    const project = await projectRepository.create({
      name: 'Test Project',
      user,
    });
    await projectRepository.save(project);
    return project;
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TestUtils.database([User, Project]),
        UsersModule,
        AuthModule,
        ProjectsModule,
      ],
    }).compile();
    app = module.createNestApplication();
    projectRepository = app.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    authService = app.get<AuthService>(AuthService);
    await app.init();
  });

  afterEach(async () => {
    await projectRepository.query(`DELETE FROM projects;`);
    await userRepository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /projects', () => {
    describe('when the user is not authenticated', () => {
      it('should return 401', async () => {
        await request(app.getHttpServer())
          .get('/projects')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });
    describe('when the user is authenticated', () => {
      it('should return 200', async () => {
        const user = await createUser();
        const access_token = await getToken(user);
        await request(app.getHttpServer())
          .get('/projects')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${access_token}`)
          .expect('Content-Type', /json/)
          .expect(200);
      });
      describe('when there are no projects', () => {
        it('should return an empty array', async () => {
          const user = await createUser();
          const access_token = await getToken(user);
          const response = await request(app.getHttpServer())
            .get('/projects')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .expect('Content-Type', /json/)
            .expect(200);
          expect(response.body).toEqual([]);
        });
      });
      describe('when there are projects', () => {
        it('should return the projects related to the user', async () => {
          const user = await createUser();
          const anotherUser = await createUser('another@test.com');
          const access_token = await getToken(user);
          const anotherAccessToken = await getToken(anotherUser);
          const project = await createProject(user);
          const anotherProject = await createProject(anotherUser);
          const response = await request(app.getHttpServer())
            .get('/projects')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .expect('Content-Type', /json/)
            .expect(200);
          expect(response.body).toEqual([
            {
              description: null,
              id: project.id,
              name: project.name,
            },
          ]);
          const anotherResponse = await request(app.getHttpServer())
            .get('/projects')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${anotherAccessToken}`)
            .expect('Content-Type', /json/)
            .expect(200);
          expect(anotherResponse.body).toEqual([
            {
              description: null,
              id: anotherProject.id,
              name: anotherProject.name,
            },
          ]);
        });
      });
    });
  });

  describe('POST /projects', () => {
    describe('when the user is not authenticated', () => {
      it('should return 401', async () => {
        await request(app.getHttpServer())
          .post('/projects')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });
    describe('when the user is authenticated', () => {
      it('should return 201 and the project', async () => {
        const projectsCountBefore = await projectRepository.count();
        const user = await createUser();
        const access_token = await getToken(user);
        const response = await request(app.getHttpServer())
          .post('/projects')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${access_token}`)
          .expect('Content-Type', /json/)
          .send({ name: 'Test Project' });

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
          description: null,
          id: response.body.id,
          name: 'Test Project',
          user: { id: user.id },
        });
        expect(await projectRepository.count()).toEqual(
          projectsCountBefore + 1,
        );
      });
    });
  });
});
