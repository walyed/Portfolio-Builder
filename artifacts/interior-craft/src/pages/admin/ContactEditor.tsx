import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function ContactEditor() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [contact, setContact] = useState(data.contactPage);

  const saveChanges = () => {
    updateData({ contactPage: contact });
    toast({ title: "Saved", description: "Contact page settings updated successfully." });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Contact Page Editor</h2>
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input value={contact.whatsapp} onChange={e => setContact({...contact, whatsapp: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea rows={3} value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Textarea rows={3} value={contact.mapsUrl} onChange={e => setContact({...contact, mapsUrl: e.target.value})} />
              <p className="text-sm text-gray-500">Paste the src URL from Google Maps embed code.</p>
            </div>
            
            <div className="space-y-2">
              <Label>Office Hours</Label>
              <Textarea rows={3} value={contact.officeHours} onChange={e => setContact({...contact, officeHours: e.target.value})} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Form Heading</Label>
                <Input value={contact.formHeading} onChange={e => setContact({...contact, formHeading: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Success Message</Label>
                <Input value={contact.successMessage} onChange={e => setContact({...contact, successMessage: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Form Subtext</Label>
              <Textarea rows={2} value={contact.formSubtext} onChange={e => setContact({...contact, formSubtext: e.target.value})} />
            </div>

            <div className="space-y-2 pt-4">
              <Label>Product Interest Options (Dropdown)</Label>
              {contact.productOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={opt} onChange={e => {
                    const newOpts = [...contact.productOptions];
                    newOpts[i] = e.target.value;
                    setContact({...contact, productOptions: newOpts});
                  }} />
                  <Button variant="ghost" className="text-red-500" onClick={() => {
                    setContact({...contact, productOptions: contact.productOptions.filter((_, idx) => idx !== i)});
                  }}><Trash2 className="h-4 w-4"/></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setContact({...contact, productOptions: [...contact.productOptions, "New Option"]})}>
                <Plus className="h-4 w-4 mr-2" /> Add Option
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
