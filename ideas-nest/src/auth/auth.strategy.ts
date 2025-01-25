import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';
import { parseBody } from '../utils/parse-body';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? '',
    });
  }

  validate(payloadRaw: unknown) {
    const payloadSchema = z.object({
      sub: z.string(),
      username: z.string(),
    });

    const payload = parseBody(payloadRaw, payloadSchema);

    return Promise.resolve({ userId: payload.sub, username: payload.username });
  }
}
