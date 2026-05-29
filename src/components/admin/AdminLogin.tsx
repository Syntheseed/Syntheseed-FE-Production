import { useState } from 'react';
import { adminLogin } from '../../services/adminApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Props {
  onLogin: (token: string) => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await adminLogin(username, password);
      onLogin(token);
    } catch {
      setError('Invalid credentials. Make sure you have staff or superuser access.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-primary))] brand-gradient-soft">
      <Card className="w-full max-w-sm border-[rgb(var(--border-subtle))] bg-[rgba(255,255,255,0.86)] dark:bg-[rgba(12,22,37,0.92)] backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-2 pt-8 px-8">
          <CardTitle className="text-2xl text-center font-bold text-gradient">
            Syntheseed Admin
          </CardTitle>
          <p className="text-center text-sm text-[rgb(var(--text-secondary))] mt-1">
            Sign in to manage content
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-[rgb(var(--text-primary))] font-medium text-sm">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))] focus:border-[rgb(var(--synth-blue))] focus:ring-[rgb(var(--synth-blue))] placeholder:text-[rgb(var(--text-secondary))]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-[rgb(var(--text-primary))] font-medium text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-muted))] text-[rgb(var(--text-primary))] focus:border-[rgb(var(--synth-blue))] focus:ring-[rgb(var(--synth-blue))] placeholder:text-[rgb(var(--text-secondary))]"
              />
            </div>
            {error && <p className="text-sm text-[rgb(var(--s-orange))]">{error}</p>}
            <Button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-[#3276ff] to-[#5095ea] text-white border-0 shadow-[0_12px_30px_rgba(50,118,255,0.45)] hover:-translate-y-px hover:shadow-[0_16px_38px_rgba(50,118,255,0.55)] transition-all duration-300 rounded-2xl font-semibold"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
