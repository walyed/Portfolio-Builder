import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { data, updateData } = useCMS();
  const { contactPage: content } = data;
  const { toast } = useToast();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', productInterest: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...formData,
      date: new Date().toISOString(),
      status: 'new'
    };
    updateData((prev) => ({ ...prev, messages: [newMessage, ...prev.messages] }));
    toast({ title: "Success", description: content.successMessage });
    setFormData({ name: '', email: '', phone: '', productInterest: '', message: '' });
  };

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{content.formHeading}</h1>
            <p className="text-lg text-muted-foreground mb-10">{content.formSubtext}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Interest</label>
                  <Select value={formData.productInterest} onValueChange={v => setFormData({...formData, productInterest: v})}>
                    <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                    <SelectContent>
                      {content.productOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea rows={6} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <Button type="submit" size="lg" className="w-full">Send Message</Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <Card className="bg-sidebar border-none shadow-lg h-full">
              <CardContent className="p-8 md:p-12 space-y-10">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <MapPin className="text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground whitespace-pre-wrap">{content.address}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Phone className="text-primary shrink-0" />
                      <p className="text-muted-foreground">{content.phone}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Mail className="text-primary shrink-0" />
                      <p className="text-muted-foreground">{content.email}</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <Clock className="text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground whitespace-pre-wrap">{content.officeHours}</p>
                    </div>
                  </div>
                </div>

                {content.mapsUrl && (
                  <div className="rounded-xl overflow-hidden shadow-md h-64 border">
                    <iframe src={content.mapsUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
