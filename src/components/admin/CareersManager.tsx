import { useState, useEffect } from 'react';
import {
  fetchAdminCareers, createCareer, updateCareer, deleteCareer,
  type AdminCareer,
} from '../../services/adminApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../ui/select';
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

const EMPTY = {
  title: '',
  department: '',
  location: '',
  work_mode: 'Remote',
  job_type: 'Full-time',
  description: '',
  tags: '',
  details: '',
};

export default function CareersManager({ token, onUnauthorized }: Props) {
  const [careers, setCareers] = useState<AdminCareer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCareer | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminCareer | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setCareers(await fetchAdminCareers(token));
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNAUTHORIZED') onUnauthorized();
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setError('');
    setSheetOpen(true);
  }

  function openEdit(career: AdminCareer) {
    setEditing(career);
    setForm({
      title: career.title,
      department: career.department,
      location: career.location,
      work_mode: career.work_mode,
      job_type: career.job_type,
      description: career.description ?? '',
      tags: career.tags ?? '',
      details: career.details ?? '',
    });
    setError('');
    setSheetOpen(true);
  }

  function set(key: keyof typeof EMPTY, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function handleSave() {
    setError('');
    setSaving(true);
    try {
      if (editing) {
        await updateCareer(token, editing.id, form);
      } else {
        await createCareer(token, form);
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
      await deleteCareer(token, deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNAUTHORIZED') { onUnauthorized(); return; }
      setError(e instanceof Error ? e.message : 'Failed to delete');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Careers ({careers.length})</h2>
        <Button onClick={openCreate}>New Career</Button>
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
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="w-36">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.department}</TableCell>
                  <TableCell>{c.location}</TableCell>
                  <TableCell>{c.job_type}</TableCell>
                  <TableCell>{new Date(c.posted_on).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(c)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(c)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {careers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-10">
                    No career listings yet
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
            <SheetTitle>{editing ? 'Edit Career' : 'New Career'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Department</Label>
                <Input value={form.department} onChange={e => set('department', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Location</Label>
                <Input value={form.location} onChange={e => set('location', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Work Mode</Label>
                <Select value={form.work_mode} onValueChange={val => set('work_mode', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Job Type</Label>
                <Select value={form.job_type} onValueChange={val => set('job_type', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                placeholder="React, TypeScript, Remote…"
              />
            </div>
            <div className="space-y-1">
              <Label>Description (HTML)</Label>
              <Textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={8}
                className="font-mono text-xs"
                placeholder="<p>Role description HTML…</p>"
              />
            </div>
            <div className="space-y-1">
              <Label>Details (HTML)</Label>
              <Textarea
                value={form.details}
                onChange={e => set('details', e.target.value)}
                rows={8}
                className="font-mono text-xs"
                placeholder="<p>Requirements, benefits HTML…</p>"
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
            <AlertDialogTitle>Delete career?</AlertDialogTitle>
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
