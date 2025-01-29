import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import AppRequest from '../utils/app-request';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const token = request.cookies['authToken'];

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      request.user = await admin.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      console.error('Invalid Firebase ID token:', error);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
