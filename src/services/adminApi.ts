const _raw = import.meta.env.VITE_ADMIN_API_BASE_URL
  ?? import.meta.env.VITE_API_BASE_URL
  ?? 'https://sy-57dc22110be1416ebd157f9def255581.ecs.us-east-1.on.aws';
const BASE = _raw.endsWith('/') ? _raw : _raw + '/';

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401 || res.status === 403) throw new Error('UNAUTHORIZED');
  if (res.status === 204) return undefined as T;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let msg = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      msg = Object.values(json).flat().join(' ');
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

function tokenHeader(token: string): HeadersInit {
  return { Authorization: `Token ${token}` };
}

export async function adminLogin(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}api/admin/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  return data.token as string;
}

// --- Blogs ---

export interface AdminBlog {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  image: string | null;
  created_at: string;
}

export async function fetchAdminBlogs(token: string): Promise<AdminBlog[]> {
  const res = await fetch(`${BASE}api/admin/blogs/`, { headers: tokenHeader(token) });
  return handleResponse<AdminBlog[]>(res);
}

export async function createBlog(token: string, data: FormData): Promise<AdminBlog> {
  const res = await fetch(`${BASE}api/admin/blogs/`, {
    method: 'POST',
    headers: tokenHeader(token),
    body: data,
  });
  return handleResponse<AdminBlog>(res);
}

export async function updateBlog(token: string, id: number, data: FormData): Promise<AdminBlog> {
  const res = await fetch(`${BASE}api/admin/blogs/${id}/`, {
    method: 'PATCH',
    headers: tokenHeader(token),
    body: data,
  });
  return handleResponse<AdminBlog>(res);
}

export async function deleteBlog(token: string, id: number): Promise<void> {
  const res = await fetch(`${BASE}api/admin/blogs/${id}/`, {
    method: 'DELETE',
    headers: tokenHeader(token),
  });
  return handleResponse<void>(res);
}

// --- Careers ---

export interface AdminCareer {
  id: number;
  title: string;
  department: string;
  location: string;
  work_mode: string;
  job_type: string;
  is_active: boolean;
  description: string;
  tags: string;
  details: string;
  posted_on: string;
}

export async function fetchAdminCareers(token: string): Promise<AdminCareer[]> {
  const res = await fetch(`${BASE}api/admin/careers/`, { headers: tokenHeader(token) });
  return handleResponse<AdminCareer[]>(res);
}

export async function createCareer(token: string, data: Record<string, string | boolean>): Promise<AdminCareer> {
  const res = await fetch(`${BASE}api/admin/careers/`, {
    method: 'POST',
    headers: { ...tokenHeader(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<AdminCareer>(res);
}

export async function updateCareer(
  token: string,
  id: number,
  data: Record<string, string | boolean>,
): Promise<AdminCareer> {
  const res = await fetch(`${BASE}api/admin/careers/${id}/`, {
    method: 'PATCH',
    headers: { ...tokenHeader(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<AdminCareer>(res);
}

export async function deleteCareer(token: string, id: number): Promise<void> {
  const res = await fetch(`${BASE}api/admin/careers/${id}/`, {
    method: 'DELETE',
    headers: tokenHeader(token),
  });
  return handleResponse<void>(res);
}

// --- Contacts ---

export interface AdminContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export async function fetchAdminContacts(token: string): Promise<AdminContact[]> {
  const res = await fetch(`${BASE}api/admin/contacts/`, { headers: tokenHeader(token) });
  return handleResponse<AdminContact[]>(res);
}
