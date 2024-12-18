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
          console.log("Missing email or password");
          return null;
        }
      
        const { email, password } = credentials;
      
        console.log("Attempting to authenticate user:", email);
      
        // Query database for the user by email
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((res) => res[0]);
      
        if (!user) {
          console.log("User not found in the database");
          return null;
        }
      
        console.log("User found:", user);
      
        // Validate the password
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
      }
      
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
