import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException, HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  @Post('login')
  @HttpCode(204)
  async login(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.firebaseAdminService.getAuth().verifyIdToken(idToken);

      res.cookie('authToken', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw new UnauthorizedException('Invalid ID token');
    }
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
}
