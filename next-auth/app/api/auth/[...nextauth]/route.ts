import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: 'email', type: 'text', placeholder: 'username' },
        password: { label: 'password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials: any) {
        console.log(credentials);

        return {
          id: "user1",
          name: "Nischay",
          email: "abc@gmail.com"
        };
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});

export const GET = handler;
export const POST = handler;