import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService],
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);

    expect(await userService.getAll()).toHaveLength(0);
  });

  afterEach(async () => {
    const createdUsers = await userService.getAll();
    for (const createdUser of createdUsers) {
      await userService.remove(createdUser.id);
    }
    expect(await userService.getAll()).toHaveLength(0);
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    describe('when the user exists', () => {
      let user: User;
      beforeEach(async () => {
        const encryptedPassword = await service.hashPassword('password');
        user = await userService.create({
          email: 'user@example.com',
          encryptedPassword,
        });
      });
      describe('when the password is correct', () => {
        it('should return true', async () => {
          const result = await service.validateUser(user.email, 'password');
          expect(result).toBeTruthy();
        });
      });
      describe('when the password is incorrect', () => {
        it('should return false', async () => {
          const result = await service.validateUser(
            user.email,
            'wrongPassword',
          );
          expect(result).toBeFalsy();
        });
      });
    });
    describe('when the user does not exist', () => {
      it('should return false', async () => {
        const result = await service.validateUser(
          'user@example.com',
          'password',
        );
        expect(result).toBeFalsy();
      });
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const password = 'password';
      const hashedPassword = await service.hashPassword(password);
      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('comparePassword', () => {
    describe('when the password is correct', () => {
      it('should return true', async () => {
        const password = 'password';
        const hashedPassword = await service.hashPassword(password);
        const result = await service.comparePassword(password, hashedPassword);
        expect(result).toBeTruthy();
      });
    });

    describe('when the password is incorrect', () => {
      it('should return false', async () => {
        const password = 'password';
        const hashedPassword = await service.hashPassword('wrongPassword');
        const result = await service.comparePassword(password, hashedPassword);
        expect(result).toBeFalsy();
      });
    });
  });
});
