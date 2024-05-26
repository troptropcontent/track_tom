import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  static SaltRounds = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | Omit<User, 'encryptedPassword'>> {
    const user = await this.usersService.getOne({ email });
    if (
      user &&
      (await this.comparePassword(password, user.encryptedPassword))
    ) {
      delete user.encryptedPassword;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<null | Omit<User, 'encryptedPassword'>> {
    const encryptedPassword = await this.hashPassword(password);
    const newUser = await this.usersService.create({
      email,
      encryptedPassword,
    });
    delete newUser.encryptedPassword;
    return newUser;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(AuthService.SaltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
