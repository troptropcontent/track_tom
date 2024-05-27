import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { TestUtils } from '../utils/test-utils';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        TestUtils.database([User]),
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);

    console.log({ userService });

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
