import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, profile }) {
      const email = (user.email ?? profile?.email ?? "").toLowerCase();
      if (!email) return false;
      const allowed = adminEmails();
      if (allowed.length > 0 && !allowed.includes(email)) {
        return false;
      }
      const googleId =
        typeof profile === "object" && profile && "sub" in profile
          ? String((profile as { sub?: string }).sub ?? "")
          : null;

      await prisma.adminUser.upsert({
        where: { email },
        create: {
          email,
          name: user.name ?? null,
          image: user.image ?? null,
          googleId: googleId || null,
          lastLoginAt: new Date(),
        },
        update: {
          name: user.name ?? null,
          image: user.image ?? null,
          googleId: googleId || undefined,
          lastLoginAt: new Date(),
        },
      });
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
});

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  const email = session.user.email.toLowerCase();
  const allowed = adminEmails();
  if (allowed.length > 0 && !allowed.includes(email)) {
    return null;
  }
  return session;
}
