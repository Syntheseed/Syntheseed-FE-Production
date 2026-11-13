export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category?: string;
  summary?: string;
  content?: string;
  image?: string | null;
  created_at: string;
};

const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
const API_BASE = (configured || (import.meta.env.DEV ? "" : "https://api-prod.syntheseed.com")).replace(/\/$/, "");

async function readJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) throw new Error(`Blog request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function fetchBlogs() {
  return readJson<BlogPost[]>("/api/blogs/");
}

export function fetchBlog(slug: string) {
  return readJson<BlogPost>(`/api/blogs/${slug}/`);
}

export function blogDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function blogExcerpt(html?: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, "\"")
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, "\"")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function blogHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}
