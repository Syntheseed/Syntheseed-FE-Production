import { useState, useEffect } from 'react';
import {
  fetchAdminBlogs, createBlog, updateBlog, deleteBlog,
  type AdminBlog,
} from '../../services/adminApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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
        <h2 className="text-lg font-semibold">Blogs ({blogs.length})</h2>
        <Button onClick={openCreate}>New Blog</Button>
      </div>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-36">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>{b.category}</TableCell>
                  <TableCell>{new Date(b.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(b)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(b)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-400 py-10">
                    No blogs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-2xl flex flex-col p-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b">
            <SheetTitle>{editing ? 'Edit Blog' : 'New Blog'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Summary (HTML)</Label>
              <Textarea
                value={form.summary}
                onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                rows={5}
                className="font-mono text-xs"
                placeholder="<p>Summary HTML…</p>"
              />
            </div>
            <div className="space-y-1">
              <Label>Content (HTML)</Label>
              <Textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={14}
                className="font-mono text-xs"
                placeholder="<p>Full content HTML…</p>"
              />
            </div>
            <div className="space-y-1">
              <Label>Image</Label>
              {editing?.image && !imageFile && (
                <img
                  src={`${BASE}${editing.image}`}
                  alt=""
                  className="h-24 rounded object-cover mb-1"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <SheetFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
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
