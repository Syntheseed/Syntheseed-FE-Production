import { useState, useEffect } from 'react';
import { fetchAdminContacts, type AdminContact } from '../../services/adminApi';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../ui/dialog';

interface Props {
  token: string;
  onUnauthorized: () => void;
}

export default function ContactsViewer({ token, onUnauthorized }: Props) {
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminContact | null>(null);

  useEffect(() => {
    fetchAdminContacts(token)
      .then(setContacts)
      .catch((e: unknown) => {
        if (e instanceof Error && e.message === 'UNAUTHORIZED') onUnauthorized();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">Contact Messages ({contacts.length})</h2>
      </div>

      {loading ? (
        <p className="text-sm text-[rgb(var(--text-secondary))]">Loading…</p>
      ) : (
        <div className="rounded-xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-elevated))] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))]">
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Name</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Email</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Subject</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Preview</TableHead>
                <TableHead className="text-[rgb(var(--text-secondary))] font-medium">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map(c => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer border-b border-[rgb(var(--border-subtle))] hover:bg-[rgb(var(--surface-muted))] transition-colors"
                  onClick={() => setSelected(c)}
                >
                  <TableCell className="font-medium text-[rgb(var(--text-primary))]">{c.name}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{c.email}</TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{c.subject || '—'}</TableCell>
                  <TableCell className="max-w-xs text-[rgb(var(--text-secondary))]">
                    <span className="truncate block">{c.message.slice(0, 80)}{c.message.length > 80 ? '…' : ''}</span>
                  </TableCell>
                  <TableCell className="text-[rgb(var(--text-secondary))]">{new Date(c.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-[rgb(var(--text-secondary))] py-10">
                    No messages yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-lg bg-[rgb(var(--surface-elevated))] border-[rgb(var(--border-subtle))]">
          <DialogHeader>
            <DialogTitle className="text-[rgb(var(--text-primary))]">Message from {selected?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="text-[rgb(var(--text-secondary))]">
              <span className="font-medium text-[rgb(var(--text-primary))]">Email:</span> {selected?.email}
            </div>
            {selected?.phone && (
              <div className="text-[rgb(var(--text-secondary))]">
                <span className="font-medium text-[rgb(var(--text-primary))]">Phone:</span> {selected.phone}
              </div>
            )}
            {selected?.subject && (
              <div className="text-[rgb(var(--text-secondary))]">
                <span className="font-medium text-[rgb(var(--text-primary))]">Subject:</span> {selected.subject}
              </div>
            )}
            <div className="text-[rgb(var(--text-secondary))]">
              <span className="font-medium text-[rgb(var(--text-primary))]">Date:</span>{' '}
              {selected && new Date(selected.created_at).toLocaleString()}
            </div>
            <div>
              <span className="font-medium text-[rgb(var(--text-primary))]">Message:</span>
              <p className="mt-1 whitespace-pre-wrap text-[rgb(var(--text-secondary))]">{selected?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
