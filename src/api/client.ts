const BASE_URL = process.env.API_URL || "https://dummyjson.com/";
const DELAY = process.env.FETCH_DELAY || "100";

export async function request<T>(path: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T> {
  const url = new URL(path, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  url.searchParams.set("delay", DELAY.toString());

  const data = await fetch(url, { signal: signal });

  if (!data.ok) {
    throw new Error(`Server error: ${data.status}`);
  }
  return await data.json() as T;
}