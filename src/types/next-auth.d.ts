import type { DefaultUser } from 'next-auth';
import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultUser {
    tenantId?: string;
  }
  interface Session {
    user?: {
      id: string;
      tenantId?: string;
    } & DefaultSession['user'];
  }
}
