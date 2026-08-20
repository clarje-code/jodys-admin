import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/decks", label: "Decks" },
  { href: "/copy", label: "Textes" },
  { href: "/themes", label: "Thèmes" },
  { href: "/publish", label: "Publier" },
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#E4D5C3] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-black tracking-tight">
              JoDy&apos;s <span className="text-[#D4A017]">Admin</span>
            </Link>
            <nav className="hidden gap-3 md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-semibold text-[#6B5B4D] hover:text-[#1A1208]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-[#6B5B4D] sm:inline">
              {session?.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-lg border border-[#D9C7B0] px-3 py-1.5 font-semibold hover:bg-[#FFF8F0]"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
