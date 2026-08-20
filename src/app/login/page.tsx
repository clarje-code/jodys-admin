import { signIn } from "@/lib/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <LoginInner searchParams={searchParams} />
  );
}

async function LoginInner({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E4D5C3] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black">JoDy&apos;s Admin</h1>
        <p className="mt-2 text-sm text-[#6B5B4D]">
          Connexion réservée aux administrateurs autorisés.
        </p>
        {sp.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Accès refusé. Vérifie que ton email Google est dans ADMIN_EMAILS.
          </p>
        ) : null}
        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-[#1A1208] px-4 py-3 font-bold text-white hover:opacity-90"
          >
            Continuer avec Google
          </button>
        </form>
      </div>
    </div>
  );
}
