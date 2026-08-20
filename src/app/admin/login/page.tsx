import Link from "next/link";
import { signIn } from "@/lib/auth";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "Accès refusé. Ton compte Google n’est pas dans la liste ADMIN_EMAILS.",
  Configuration: "Configuration OAuth incomplète (GOOGLE_CLIENT_*).",
  OAuthCallback: "Échec du retour Google. Vérifie l’URI de redirection.",
  Default: "Connexion impossible. Réessaie ou contacte l’équipe.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const errorKey = sp.error ?? "";
  const errorText =
    errorKey.length > 0
      ? ERROR_MESSAGES[errorKey] ?? `${ERROR_MESSAGES.Default} (${errorKey})`
      : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1208] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#2A1F14] p-8 text-[#FFF8F0] shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A017]">
          Back-office
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black">
          JoDy&apos;s Admin
        </h1>
        <p className="mt-2 text-sm text-[#C9B8A4]">
          Connexion réservée aux administrateurs autorisés.
        </p>
        {errorText ? (
          <p className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
            {errorText}
          </p>
        ) : null}
        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-[#C2185B] px-4 py-3 font-bold text-white hover:opacity-90"
          >
            Continuer avec Google
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-[#8A7A68]">
          <Link href="/" className="underline hover:text-[#FFF8F0]">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
