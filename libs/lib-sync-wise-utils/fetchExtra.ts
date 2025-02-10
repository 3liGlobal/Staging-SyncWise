import { clearAccessToken, getAccessToken } from './accessToken';

const baseURL = 'http://192.168.1.36:4000/api/';

export async function fetchExtra(
  input: string,
  init: RequestInit,
  useAuth: boolean = true
) {
  if (useAuth) {
    const token = getAccessToken();
    if (token) {
      if (!init?.headers) {
        init!.headers = {};
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      init.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${baseURL}${input}`, init);

  switch (response.status) {
    case 200:
    case 201:
      return {
        status: response.status,
        response: response.json(),
      };
    case 204:
      return {
        status: response.status,
      };
    case 401:
      clearAccessToken();
      window.location.href = '/login';
      throw await response.json();
    default:
      throw await response.json();
  }
}
