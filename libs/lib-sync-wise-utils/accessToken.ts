const key = 'access_token';

export function hasAccessToken(): boolean {
  return !!localStorage.getItem(key);
}

export function setAccessToken(value: string): void {
  localStorage.setItem(key, value);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(key)!;
}

export function clearAccessToken(): void {
  localStorage.removeItem(key);
}
