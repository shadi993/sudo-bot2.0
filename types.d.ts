import { SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import 'express-session';

declare module 'http' {
  interface IncomingMessage {
    session: SessionData;
  }
}
declare module 'express-session' {
  interface SessionData {
    views: number;
  }
}