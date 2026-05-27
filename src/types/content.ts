export interface Blog {
  id: number;
  title: string;
  slug: string;
  category?: string;
  summary?: string;
  excerpt?: string;       // optional fallback
  content?: string;       // CKEditor HTML (optional)
  image?: string;         // absolute URL returned by API
  created_at: string;     // timestamp string
}

export interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  work_mode: string;          // Remote / Hybrid / Onsite
  job_type: string;           // Full-time / Part-time / etc.
  description?: string;       // CKEditor HTML
  short_description?: string; // optional preview
  details?: string;           // CKEditor HTML for job detail page
  posted_on: string;          // date string
  tags?: string;              // comma-separated tags
}
