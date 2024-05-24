import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        TypeOrmModule.forFeature([User]),
      ],
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

  describe('create', () => {
    describe('when the user is valid', () => {
      it('should create a user', async () => {
        const user = await service.create({ email: 'test@test.com' });
        expect(user).toEqual({
          id: expect.any(Number),
          email: 'test@test.com',
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
