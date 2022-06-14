import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password provided.');
    }

    if (user?.post_status == 'suspended') {
      throw new UnauthorizedException('Your account is being reviewed, kindly reach out to us');
    }

    if (user?.closed_at) {
      throw new UnauthorizedException('Your account has been closed');
    }

    if (!user?.email_valid) {
      throw new UnauthorizedException('Your account is being open, But you need to login to your mail box and comfirm email.');
    }

    return user;
  }
}
