import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;
  let userService: UsersService;
  let authService: AuthService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy],
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'db',
          port: 5432,
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_TEST,
          entities: [User],
          synchronize: true,
        }),
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    const users = await userService.getAll();
    for (const user of users) {
      userService.remove(user.id);
    }
    module.close();
  });

  describe('login', () => {
    describe('when the credentials are valid', () => {
      it('should return a token', async () => {
        await authService.register({
          email: 'test@gmail.com',
          password: 'test',
        });
        const result = await controller.login({
          email: 'test@gmail.com',
          password: 'test',
        });
        expect(result).toHaveProperty('access_token');
      });
    });
  });
});
