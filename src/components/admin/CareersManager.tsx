import { useState, useEffect } from 'react';
import {
  fetchAdminCareers, createCareer, updateCareer, deleteCareer,
  type AdminCareer,
} from '../../services/adminApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import RichTextEditor from './RichTextEditor';
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
  is_active: true,
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
      is_active: career.is_active,
      description: career.description ?? '',
      tags: career.tags ?? '',
      details: career.details ?? '',
    });
    setError('');
    setSheetOpen(true);
  }

  function set<K extends keyof typeof EMPTY>(key: K, val: (typeof EMPTY)[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function toggleActive(career: AdminCareer) {
    const next = !career.is_active;
    setCareers(prev => prev.map(c => (c.id === career.id ? { ...c, is_active: next } : c)));
    try {
      await updateCareer(token, career.id, { is_active: next });
    } catch (e: unknown) {
      setCareers(prev => prev.map(c => (c.id === career.id ? { ...c, is_active: career.is_active } : c)));
      if (e instanceof Error && e.message === 'UNAUTHORIZED') { onUnauthorized(); return; }
      setError(e instanceof Error ? e.message : 'Failed to update status');
    }
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
        <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">Careers ({careers.length})</h2>
        <Button
          onClick={openCreate}
          className="bg-gradient-to-r from-[#3276ff] to-[#5095ea] text-white border-0 shadow-[0_8px_20px_rgba(50,118,255,0.4)] hover:-translate-y-px transition-all duration-200 rounded-xl"
        >
          New Career
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
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Department</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Location</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Type</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Posted</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Status</TableHead>
                <TableHead className="w-36 text-[rgb(var(--text-secondary))] font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.map(c => (
                <TableRow key={c.id} className="border-b border-[rgb(var(--border-subtle))] hover:bg-[rgb(var(--surface-muted))] transition-colors">
                  <TableCell className="font-medium text-[rgb(var(--text-primary))]">{c.title}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{c.department}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{c.location}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{c.job_type}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{new Date(c.posted_on).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={c.is_active}
                        onCheckedChange={() => toggleActive(c)}
                        aria-label={c.is_active ? `Disable ${c.title}` : `Enable ${c.title}`}
                        className="data-[state=checked]:bg-[rgb(var(--synth-blue))] data-[state=unchecked]:bg-[rgb(var(--border-strong))]"
                      />
                      <span className={`text-xs font-medium ${c.is_active ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--text-secondary))]'}`}>
                        {c.is_active ? 'Live' : 'Hidden'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openEdit(c)}
                        className="border border-[rgb(var(--border-color))] bg-transparent text-[rgb(var(--synth-blue))] hover:bg-[rgba(50,118,255,0.08)] transition-all rounded-lg"
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(c)} className="rounded-lg">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {careers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-[rgb(var(--text-secondary))] py-10">
                    No career listings yet
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
            <SheetTitle className="text-[rgb(var(--text-primary))]">{editing ? 'Edit Career' : 'New Career'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Title</Label>
              <Input
                value={form.title}
                onChange={e => set('title', e.target.value)}
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Department</Label>
                <Input
                  value={form.department}
                  onChange={e => set('department', e.target.value)}
                  className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Location</Label>
                <Input
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Work Mode</Label>
                <Select value={form.work_mode} onValueChange={val => set('work_mode', val)}>
                  <SelectTrigger className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(var(--surface-elevated))] border-[rgb(var(--border-subtle))]">
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Job Type</Label>
                <Select value={form.job_type} onValueChange={val => set('job_type', val)}>
                  <SelectTrigger className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(var(--surface-elevated))] border-[rgb(var(--border-subtle))]">
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] px-3 py-2.5">
              <div className="pr-4">
                <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Visible on careers page</Label>
                <p className="text-xs text-[rgb(var(--text-secondary))] mt-0.5">
                  When off, this position is hidden from the public site.
                </p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={val => set('is_active', val)}
                aria-label="Toggle position visibility"
                className="data-[state=checked]:bg-[rgb(var(--synth-blue))] data-[state=unchecked]:bg-[rgb(var(--border-strong))]"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Tags (comma-separated)</Label>
              <Input
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                placeholder="React, TypeScript, Remote…"
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))]"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Description</Label>
              <RichTextEditor
                value={form.description}
                onChange={val => set('description', val)}
                placeholder="Short role description shown on the careers cards…"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[rgb(var(--text-primary))] font-medium text-sm">Details</Label>
              <RichTextEditor
                value={form.details}
                onChange={val => set('details', val)}
                placeholder="Responsibilities, requirements, benefits…"
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
