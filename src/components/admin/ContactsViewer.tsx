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
        <h2 className="text-lg font-semibold">Contact Messages ({contacts.length})</h2>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map(c => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelected(c)}
                >
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject || '—'}</TableCell>
                  <TableCell className="max-w-xs">
                    <span className="truncate block">{c.message.slice(0, 80)}{c.message.length > 80 ? '…' : ''}</span>
                  </TableCell>
                  <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-10">
                    No messages yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selected?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div><span className="font-medium">Email:</span> {selected?.email}</div>
            {selected?.phone && (
              <div><span className="font-medium">Phone:</span> {selected.phone}</div>
            )}
            {selected?.subject && (
              <div><span className="font-medium">Subject:</span> {selected.subject}</div>
            )}
            <div>
              <span className="font-medium">Date:</span>{' '}
              {selected && new Date(selected.created_at).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Message:</span>
              <p className="mt-1 whitespace-pre-wrap text-gray-700">{selected?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
