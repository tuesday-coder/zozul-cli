const LOCAL_DEV_API_KEY = "zozul_local_dev_key";
const LOCAL_DEV_API_URL = "http://localhost:8000";

export interface ResolvedBackend {
  apiUrl: string;
  apiKey: string;
}

// Dev: ZOZUL_DEV_API_URL (default localhost:8000) + ZOZUL_DEV_API_KEY (default built-in)
// IMPORTANT: must NOT fall through to ZOZUL_API_KEY (the prod key)
export function resolveDevBackend(): ResolvedBackend {
  return {
    apiUrl: process.env.ZOZUL_DEV_API_URL ?? LOCAL_DEV_API_URL,
    apiKey: process.env.ZOZUL_DEV_API_KEY ?? LOCAL_DEV_API_KEY,
  };
}

// Prod: reads ZOZUL_API_URL + ZOZUL_API_KEY; returns null if either missing
export function resolveProdBackend(): ResolvedBackend | null {
  const apiUrl = process.env.ZOZUL_API_URL;
  const apiKey = process.env.ZOZUL_API_KEY;
  if (!apiUrl || !apiKey) return null;
  return { apiUrl, apiKey };
}

// Sets process.env.ZOZUL_API_URL/KEY for interactive --dev only (dashboard injection)
export function applyDevModeEnv(): void {
  const { apiUrl, apiKey } = resolveDevBackend();
  process.env.ZOZUL_API_URL = apiUrl;
  process.env.ZOZUL_API_KEY = apiKey;
}
