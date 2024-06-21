import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          if (response.status !== 201) return null;
          const authData = await response.json();

          if (!authData) return null;

          cookies().set('token', authData.token.access_token);

          return {
            ...authData,
            user: authData.user,
            token: authData.token,
          };
        } catch (error) {
          return console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return user as unknown as JWT;
      }

      return token;
    },
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce(
        (previousValue, currentValue) => {
          if (!['iat', 'exp', 'jti', 'token'].includes(currentValue)) {
            return { ...previousValue, [currentValue]: token[currentValue] };
          } else {
            return previousValue;
          }
        },
        {}
      );
      return { ...session, user: sanitizedToken, apiToken: token.token };
    },
  },
};
