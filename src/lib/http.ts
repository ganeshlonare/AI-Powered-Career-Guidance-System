import { API_BASE_URL, STORAGE_KEYS } from '../config/env';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpOptions<TBody = any> {
  method?: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: TBody;
  auth?: boolean; // include auth header
  headers?: Record<string, string>;
}

export interface HttpError extends Error {
  status: number;
  details?: any;
}

function buildQuery(query?: HttpOptions['query']): string {
  if (!query) return '';
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) params.append(k, String(v));
  });
  const s = params.toString();
  return s ? `?${s}` : '';
}

export async function http<TResp = any, TBody = any>(opts: HttpOptions<TBody>): Promise<TResp> {
  const { method = 'GET', path, query, body, auth = true, headers = {} } = opts;

  const url = `${API_BASE_URL}${path}${buildQuery(query)}`;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (auth) {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);
    if (token) {
      (init.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  if (body !== undefined && body !== null) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = text && isJson ? JSON.parse(text) : text ? text : undefined;

  if (!res.ok) {
    const err: HttpError = Object.assign(new Error(data?.message || res.statusText), {
      status: res.status,
      details: data,
      name: 'HttpError',
    });
    throw err;
  }

  return data as TResp;
}
