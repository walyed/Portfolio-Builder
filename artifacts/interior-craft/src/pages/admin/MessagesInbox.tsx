import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Trash2, CheckCircle, MailOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MessagesInbox() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  
  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [filter, setFilter] = useState('all');
  const [viewingMsg, setViewingMsg] = useState<any>(null);

  const messages = data.messages.filter(m => filter === 'all' || m.status === filter).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const setStatus = (id: string, status: string) => {
    updateData(prev => ({
      ...prev,
      messages: prev.messages.map(m => m.id === id ? { ...m, status } : m)
    }));
    if(viewingMsg && viewingMsg.id === id) setViewingMsg({...viewingMsg, status});
  };

  const deleteMsg = (id: string) => {
    if(confirm('Delete message?')) {
      updateData(prev => ({ ...prev, messages: prev.messages.filter(m => m.id !== id) }));
      setViewingMsg(null);
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Interest', 'Message', 'Status'];
    const rows = messages.map(m => [
      new Date(m.date).toLocaleDateString(),
      `"${m.name}"`, `"${m.email}"`, `"${m.phone}"`, `"${m.productInterest}"`, `"${m.message.replace(/"/g, '""')}"`, m.status
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interiorcraft-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Messages Inbox</h2>
        <Button onClick={exportCSV} variant="outline"><Download className="mr-2 h-4 w-4"/> Export CSV</Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map(m => (
              <TableRow key={m.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setViewingMsg(m); if(m.status==='new') setStatus(m.id, 'read'); }}>
                <TableCell className="text-sm text-gray-500">{new Date(m.date).toLocaleDateString()}</TableCell>
                <TableCell className={`font-medium ${m.status==='new'?'text-black':'text-gray-600'}`}>{m.name}</TableCell>
                <TableCell>{m.productInterest}</TableCell>
                <TableCell>
                  {m.status === 'new' && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
                  {m.status === 'read' && <Badge variant="secondary">Read</Badge>}
                  {m.status === 'archived' && <Badge variant="outline">Archived</Badge>}
                </TableCell>
                <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
              </TableRow>
            ))}
            {messages.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No messages found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewingMsg} onOpenChange={(open) => !open && setViewingMsg(null)}>
        <DialogContent>
          {viewingMsg && (
            <>
              <DialogHeader>
                <DialogTitle>Message Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg text-sm">
                  <div><span className="font-semibold block">Name:</span> {viewingMsg.name}</div>
                  <div><span className="font-semibold block">Email:</span> <a href={`mailto:${viewingMsg.email}`} className="text-primary">{viewingMsg.email}</a></div>
                  <div><span className="font-semibold block">Phone:</span> {viewingMsg.phone}</div>
                  <div><span className="font-semibold block">Interest:</span> {viewingMsg.productInterest}</div>
                  <div><span className="font-semibold block">Date:</span> {new Date(viewingMsg.date).toLocaleString()}</div>
                </div>
                <div>
                  <span className="font-semibold block mb-2">Message:</span>
                  <div className="p-4 bg-white border rounded-md whitespace-pre-wrap">{viewingMsg.message}</div>
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <Button variant="destructive" size="sm" onClick={() => deleteMsg(viewingMsg.id)}><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
                <div className="space-x-2">
                  {viewingMsg.status !== 'read' && <Button variant="outline" size="sm" onClick={() => setStatus(viewingMsg.id, 'read')}><MailOpen className="mr-2 h-4 w-4"/> Mark Read</Button>}
                  {viewingMsg.status !== 'archived' && <Button variant="secondary" size="sm" onClick={() => setStatus(viewingMsg.id, 'archived')}><CheckCircle className="mr-2 h-4 w-4"/> Archive</Button>}
                  <a href={`https://wa.me/${viewingMsg.phone.replace(/\D/g, '')}?text=Hi ${viewingMsg.name}, responding to your inquiry on InteriorCraft...`} target="_blank" rel="noreferrer">
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#20b858]">Reply on WhatsApp</Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
