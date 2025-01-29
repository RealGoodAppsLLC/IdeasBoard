import { Request } from 'express';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;

export default interface AppRequest extends Request {
  cookies: { [key: string]: string };
  user?: DecodedIdToken;
}
