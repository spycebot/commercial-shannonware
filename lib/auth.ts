import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

const ALLOWED_EMAIL = 'bearwaker@gmail.com';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const email = (user.email ?? (profile as { email?: string })?.email ?? '').toLowerCase();
      return email === ALLOWED_EMAIL;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { email: string; isAdmin?: boolean }).isAdmin =
          token.email === ALLOWED_EMAIL;
      }
      return session;
    },
  },
  pages: {
    error: '/',
  },
};
