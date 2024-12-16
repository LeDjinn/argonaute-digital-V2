import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/drizzle.config"; // Adjust the import path
import { eq } from "drizzle-orm";
import { users } from "../../../../db/schema"; // Adjust the path to your schema

const handler = NextAuth({
    secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null; // Invalid credentials
        }

        const { email, password } = credentials;

        // Use Drizzle query builder to fetch the user
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((res) => res[0]);

        // Validate user and password
        if (user && user.password === password) {
          return {
            id: String(user.id), // Ensure `id` is a string
            name: typeof user.name === "string" ? user.name : null, // Validate `name` as string or null
            email: typeof user.email === "string" ? user.email : null, // Validate `email` as string or null
          };
        }

        return null; // Authentication failed
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens for sessions
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
});

export { handler as GET, handler as POST };
