import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  static SaltRounds = 10;
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.getOne({ email });
    if (
      user &&
      (await this.comparePassword(password, user.encryptedPassword))
    ) {
      return true;
    }
    return false;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(AuthService.SaltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
