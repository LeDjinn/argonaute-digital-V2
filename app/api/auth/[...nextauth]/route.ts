import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/drizzle.config";
import { eq } from "drizzle-orm";
import { users } from "../../../../db/schema";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing email or password");
          return null;
        }

        const { email, password } = credentials;

        console.log("Attempting to authenticate user:", email);

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((res) => res[0]);

        if (!user) {
          console.log("User not found in the database");
          return null;
        }

        if (user.password !== password) {
          console.log("Invalid password for user:", email);
          return null;
        }

        console.log("Authentication successful for user:", email);
        return {
          id: String(user.id),
          name: user.name || null,
          email: user.email || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email,
        name: token.name || null,
      };
      return session;
    },
  },
  debug: true, // Enable debugging
});

export { handler as GET, handler as POST };
