import { useState, useEffect } from 'react';
import {
  fetchAdminBlogs, createBlog, updateBlog, deleteBlog,
  type AdminBlog,
} from '../../services/adminApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import RichTextEditor from './RichTextEditor';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter,
} from '../ui/sheet';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '../ui/alert-dialog';

interface Props {
  token: string;
  onUnauthorized: () => void;
}

const EMPTY = { title: '', slug: '', category: '', summary: '', content: '' };

function autoSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogsManager({ token, onUnauthorized }: Props) {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<AdminBlog | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminBlog | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setBlogs(await fetchAdminBlogs(token));
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNAUTHORIZED') onUnauthorized();
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setImageFile(null);
    setError('');
    setSheetOpen(true);
  }

  function openEdit(blog: AdminBlog) {
    setEditing(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      summary: blog.summary ?? '',
      content: blog.content ?? '',
    });
    setImageFile(null);
    setError('');
    setSheetOpen(true);
  }

  function handleTitleChange(val: string) {
    setForm(f => ({
      ...f,
      title: val,
      slug: editing ? f.slug : autoSlug(val),
    }));
  }

  async function handleSave() {
    setError('');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('slug', form.slug);
      fd.append('category', form.category);
      fd.append('summary', form.summary);
      fd.append('content', form.content);
      if (imageFile) fd.append('image', imageFile);

      if (editing) {
        await updateBlog(token, editing.id, fd);
      } else {
        await createBlog(token, fd);
      }
      setSheetOpen(false);
      await load();
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNAUTHORIZED') { onUnauthorized(); return; }
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBlog(token, deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNAUTHORIZED') { onUnauthorized(); return; }
      setError(e instanceof Error ? e.message : 'Failed to delete');
    }
  }

  const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">Blogs ({blogs.length})</h2>
        <Button
          onClick={openCreate}
          className="bg-gradient-to-r from-[#3276ff] to-[#5095ea] text-white border-0 shadow-[0_8px_20px_rgba(50,118,255,0.4)] hover:-translate-y-px transition-all duration-200 rounded-xl"
        >
          New Blog
        </Button>
      </div>

      {error && <p className="text-sm text-[rgb(var(--s-orange))] mb-3">{error}</p>}

      {loading ? (
        <p className="text-sm text-[rgb(var(--text-secondary))]">Loading…</p>
      ) : (
        <div className="rounded-xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-elevated))] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))]">
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Title</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Category</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Created</TableHead>
                <TableHead className="w-36 text-[rgb(var(--text-secondary))] font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map(b => (
                <TableRow key={b.id} className="border-b border-[rgb(var(--border-subtle))] hover:bg-[rgb(var(--surface-muted))] transition-colors">
                  <TableCell className="font-medium text-[rgb(var(--text-primary))]">{b.title}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{b.category}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{new Date(b.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openEdit(b)}
                        className="border border-[rgb(var(--border-color))] bg-transparent text-[rgb(var(--synth-blue))] hover:bg-[rgba(50,118,255,0.08)] transition-all rounded-lg"
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(b)} className="rounded-lg">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-[rgb(var(--text-secondary))] py-10">
                    No blogs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-2xl flex flex-col p-0 bg-[rgb(var(--bg-secondary))] border-l border-[rgb(var(--border-subtle))]">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-[rgb(var(--border-subtle))]">
            <SheetTitle className="text-[rgb(var(--text-primary))]">{editing ? 'Edit Blog' : 'New Blog'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Title</Label>
              <Input
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Slug</Label>
              <Input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Category</Label>
              <Input
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Summary</Label>
              <RichTextEditor
                value={form.summary}
                onChange={val => setForm(f => ({ ...f, summary: val }))}
                placeholder="Short summary shown on blog cards…"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Content</Label>
              <RichTextEditor
                value={form.content}
                onChange={val => setForm(f => ({ ...f, content: val }))}
                placeholder="Write the full article…"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Image</Label>
              {editing?.image && !imageFile && (
                <img
                  src={`${BASE}${editing.image}`}
                  alt=""
                  className="h-24 rounded-xl object-cover mb-1 border border-[rgb(var(--border-subtle))]"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] ?? null)}
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            {error && <p className="text-sm text-[rgb(var(--s-orange))]">{error}</p>}
          </div>
          <SheetFooter className="px-6 py-4 border-t border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))]">
            <Button
              onClick={() => setSheetOpen(false)}
              className="border border-[rgb(var(--border-strong))] bg-transparent text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-elevated))] transition-all rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-[#3276ff] to-[#5095ea] text-white border-0 shadow-[0_8px_20px_rgba(50,118,255,0.4)] hover:-translate-y-px transition-all duration-200 rounded-xl"
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
