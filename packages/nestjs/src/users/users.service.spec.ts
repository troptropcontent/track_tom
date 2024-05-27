import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { TestUtils } from '../utils/test-utils';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TestUtils.database([User]), TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    describe('when there are no users', () => {
      it('should return an empty array', async () => {
        const users = await service.getAll();
        expect(users).toEqual([]);
      });
    });

    describe('when there are users', () => {
      it('should return all users', async () => {
        const user = await service.create({ email: 'test@test.com' });
        const users = await service.getAll();
        expect(users).toEqual([user]);
      });
    });
  });

  describe('getOne', () => {
    describe('when the user exists', () => {
      it('should return the user', async () => {
        const user = await service.create({ email: 'test@test.com' });
        const foundUser = await service.getOne({ email: 'test@test.com' });
        expect(foundUser).toEqual(user);
      });
    });

    describe('when the user does not exist', () => {
      it('should return null', async () => {
        const foundUser = await service.getOne({ email: 'test@test.com' });
        expect(foundUser).toBeNull();
      });
    });
  });

  describe('create', () => {
    describe('when the user is valid', () => {
      it('should create a user', async () => {
        const user = await service.create({ email: 'test@test.com' });
        expect(user).toEqual({
          id: expect.any(Number),
          email: 'test@test.com',
          encryptedPassword: null,
          isActive: true,
        });
        const users = await service.getAll();
        expect(users).toEqual([user]);
      });
    });

    describe('when the user is invalid', () => {
      it.todo('should throw an error');
    });
  });

  describe('update', () => {
    describe('when the user is valid', () => {
      it('should update a user', async () => {
        const user = await service.create({ email: 'test@test.com' });
        const newEmail = 'updated@test.com';
        const updatedUser = await service.update(user.id, {
          email: newEmail,
        });
        expect(updatedUser).toEqual({
          id: user.id,
          email: newEmail,
          encryptedPassword: null,
          isActive: true,
        });
      });
    });

    describe('when the user is invalid', () => {
      it.todo('should throw an error');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = await service.create({ email: 'test@test.com' });
      await service.remove(user.id);
      const users = await service.getAll();
      expect(users).toEqual([]);
    });
  });

  afterEach(async () => {
    const users = await service.getAll();
    for (const user of users) {
      await service.remove(user.id);
    }
    await module.close();
  });
});
