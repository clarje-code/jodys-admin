/** Public download / store links from Coolify env. */
export function getDownloadLinks() {
  const apk =
    process.env.DOWNLOAD_APK_URL?.trim() ||
    process.env.NEXT_PUBLIC_DOWNLOAD_APK_URL?.trim() ||
    "/downloads/jodys.apk";
  const playStore = process.env.PLAY_STORE_URL?.trim() || "";
  const appStore = process.env.APP_STORE_URL?.trim() || "";
  return { apk, playStore, appStore };
}
