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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">Syntheseed Admin</span>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="blogs">
          <TabsList className="mb-6">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
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
