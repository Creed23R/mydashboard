import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Admin } from '@/interfaces/Admins'
import { prisma } from '@/libs/prisma'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {


        if (!credentials?.password || !credentials.email) {
          return null;
        }

        const adminFound = await prisma.admins.findUnique({
          where: {
            email: credentials.email
          }
        })



        console.log(adminFound)

        if (!adminFound) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, adminFound.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: adminFound.adminId.toString(),
          name: adminFound.name,
          lastname: adminFound.lastname,
          email: adminFound.email,
          password: adminFound.password,
          role: adminFound.role,
          image: adminFound.image,
          imgId: adminFound.imgId,
          createdAt: adminFound.createdAt,
          updateAt: adminFound.updateAt,
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.lastname = user.lastname;
      }
      console.log(token.user)
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.lastname = token.user.lastname;
        session.user.email = token.email;
        session.user.role = token.user.role;
      }
      console.log(session.user.lastname)
      return session;
    },
  },
  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };
