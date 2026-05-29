import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import BlogsManager from './BlogsManager';
import CareersManager from './CareersManager';
import ContactsViewer from './ContactsViewer';

interface Props {
  token: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      <header className="glass-header sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight text-white">
          <span className="text-gradient">Syntheseed</span>
          <span className="text-white/80 ml-1 font-normal">Admin</span>
        </span>
        <Button
          size="sm"
          onClick={onLogout}
          className="border border-[rgba(80,149,234,0.6)] bg-[rgba(18,28,45,0.8)] text-white hover:bg-[rgba(24,35,58,0.98)] hover:border-[rgba(80,149,234,0.9)] transition-all duration-200 rounded-xl"
        >
          Logout
        </Button>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="blogs">
          <TabsList className="mb-6 bg-[rgb(var(--surface-elevated))] border border-[rgb(var(--border-subtle))] rounded-xl p-1">
            <TabsTrigger
              value="blogs"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3276ff] data-[state=active]:to-[#5095ea] data-[state=active]:text-white data-[state=active]:shadow-md text-[rgb(var(--text-secondary))] transition-all"
            >
              Blogs
            </TabsTrigger>
            <TabsTrigger
              value="careers"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3276ff] data-[state=active]:to-[#5095ea] data-[state=active]:text-white data-[state=active]:shadow-md text-[rgb(var(--text-secondary))] transition-all"
            >
              Careers
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3276ff] data-[state=active]:to-[#5095ea] data-[state=active]:text-white data-[state=active]:shadow-md text-[rgb(var(--text-secondary))] transition-all"
            >
              Contact Messages
            </TabsTrigger>
          </TabsList>
          <TabsContent value="blogs">
            <BlogsManager token={token} onUnauthorized={onLogout} />
          </TabsContent>
          <TabsContent value="careers">
            <CareersManager token={token} onUnauthorized={onLogout} />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsViewer token={token} onUnauthorized={onLogout} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
