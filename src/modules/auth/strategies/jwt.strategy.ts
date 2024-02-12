import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService, private configService: ConfigService<EnvironmentVariables, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('AUTH_JWT_SECRET', { infer: true }),
    });
  }

  public validate(args: { email: string }): { email: string } {
    const { email } = args;

    if (!email) {
      throw new UnauthorizedException();
    }

    return {email};
  }
}
