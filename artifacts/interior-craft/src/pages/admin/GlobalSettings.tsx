import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function GlobalSettings() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [settings, setSettings] = useState(data.settings);

  const saveChanges = () => {
    updateData({ settings });
    toast({ title: "Saved", description: "Global settings updated successfully." });
  };

  const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 p-0 rounded-md border shadow-sm" style={{ backgroundColor: value }} />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexColorPicker color={value} onChange={onChange} />
          </PopoverContent>
        </Popover>
        <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono" />
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Global Settings</h2>
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Branding</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Site Name</Label><Input value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} /></div>
            <div className="space-y-2"><Label>Tagline</Label><Input value={settings.tagline} onChange={e => setSettings({...settings, tagline: e.target.value})} /></div>
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input value={settings.logoUrl} onChange={e => setSettings({...settings, logoUrl: e.target.value})} placeholder="Leave empty for text logo" />
              {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" className="h-12 mt-2 object-contain" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Colors</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker label="Accent Color" value={settings.accentColor} onChange={v => setSettings({...settings, accentColor: v})} />
              <ColorPicker label="Background Color" value={settings.bgColor} onChange={v => setSettings({...settings, bgColor: v})} />
              <ColorPicker label="Text Color" value={settings.textColor} onChange={v => setSettings({...settings, textColor: v})} />
              <ColorPicker label="Sidebar Background" value={settings.sidebarBgColor} onChange={v => setSettings({...settings, sidebarBgColor: v})} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Typography</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Heading Font (Google Font Name)</Label>
              <Input value={settings.headingFont} onChange={e => setSettings({...settings, headingFont: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Body Font (Google Font Name)</Label>
              <Input value={settings.bodyFont} onChange={e => setSettings({...settings, bodyFont: e.target.value})} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Social Links</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>WhatsApp Number</Label><Input value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} /></div>
            <div className="space-y-2"><Label>Instagram URL</Label><Input value={settings.instagramUrl} onChange={e => setSettings({...settings, instagramUrl: e.target.value})} /></div>
            <div className="space-y-2"><Label>Facebook URL</Label><Input value={settings.facebookUrl} onChange={e => setSettings({...settings, facebookUrl: e.target.value})} /></div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-lg">Footer</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Footer Tagline</Label><Input value={settings.footerTagline} onChange={e => setSettings({...settings, footerTagline: e.target.value})} /></div>
              <div className="space-y-2"><Label>Copyright Text</Label><Input value={settings.footerText} onChange={e => setSettings({...settings, footerText: e.target.value})} /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-lg">Navigation Menu</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {settings.navLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-4 p-3 border rounded-md">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input value={link.label} onChange={e => {
                    const newLinks = [...settings.navLinks];
                    newLinks[i].label = e.target.value;
                    setSettings({...settings, navLinks: newLinks});
                  }} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Link (URL/Path)</Label>
                  <Input value={link.href} onChange={e => {
                    const newLinks = [...settings.navLinks];
                    newLinks[i].href = e.target.value;
                    setSettings({...settings, navLinks: newLinks});
                  }} disabled={link.href === '/'} />
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                  <Switch checked={link.visible} onCheckedChange={c => {
                    const newLinks = [...settings.navLinks];
                    newLinks[i].visible = c;
                    setSettings({...settings, navLinks: newLinks});
                  }} />
                  <Label className="text-xs">Visible</Label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
