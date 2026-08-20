/** Public download / store links from Coolify env (runtime). */
const DEFAULT_APK =
  "https://github.com/clarje-code/jodys-admin/releases/download/apk-v1.0.0/jodys.apk";

function runtimeEnv(key: string): string {
  // Bracket access avoids Next.js build-time inlining of missing envs.
  return process.env[key]?.trim() || "";
}

export function getDownloadLinks() {
  const apk =
    runtimeEnv("DOWNLOAD_APK_URL") ||
    runtimeEnv("NEXT_PUBLIC_DOWNLOAD_APK_URL") ||
    DEFAULT_APK;
  const playStore = runtimeEnv("PLAY_STORE_URL");
  const appStore = runtimeEnv("APP_STORE_URL");
  return { apk, playStore, appStore };
}
