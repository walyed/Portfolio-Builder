import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function AboutEditor() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [about, setAbout] = useState(data.aboutPage);

  const saveChanges = () => {
    updateData({ aboutPage: about });
    toast({ title: "Saved", description: "About page content updated successfully." });
  };

  const moveProcess = (index: number, direction: 'up' | 'down') => {
    const newProcess = [...about.process];
    if (direction === 'up' && index > 0) {
      [newProcess[index - 1], newProcess[index]] = [newProcess[index], newProcess[index - 1]];
    } else if (direction === 'down' && index < newProcess.length - 1) {
      [newProcess[index + 1], newProcess[index]] = [newProcess[index], newProcess[index + 1]];
    }
    setAbout(p => ({...p, process: newProcess}));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">About Page Editor</h2>
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {/* HERO */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Hero Section</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={about.hero.visible} onCheckedChange={c => setAbout(p => ({...p, hero: {...p.hero, visible: c}}))} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="hero" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Headline</Label><Input value={about.hero.headline} onChange={e => setAbout(p => ({...p, hero: {...p.hero, headline: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Subtext</Label><Input value={about.hero.subtext} onChange={e => setAbout(p => ({...p, hero: {...p.hero, subtext: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Image URL</Label><Input value={about.hero.imageUrl} onChange={e => setAbout(p => ({...p, hero: {...p.hero, imageUrl: e.target.value}}))} /></div>
                {about.hero.imageUrl && <img src={about.hero.imageUrl} alt="" className="w-full h-48 object-cover rounded-md mt-2" />}
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* STORY */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Studio Story</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={about.story.visible} onCheckedChange={c => setAbout(p => ({...p, story: {...p.story, visible: c}}))} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="story" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Heading</Label><Input value={about.story.heading} onChange={e => setAbout(p => ({...p, story: {...p.story, heading: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Body Content</Label><Textarea rows={6} value={about.story.body} onChange={e => setAbout(p => ({...p, story: {...p.story, body: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Image URL</Label><Input value={about.story.imageUrl} onChange={e => setAbout(p => ({...p, story: {...p.story, imageUrl: e.target.value}}))} /></div>
                {about.story.imageUrl && <img src={about.story.imageUrl} alt="" className="w-48 h-48 object-cover rounded-md mt-2" />}
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* PROCESS */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-lg">Process Steps</CardTitle></CardHeader>
          <CardContent>
            <AccordionItem value="process" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {about.process.map((step, i) => (
                  <div key={step.id} className="p-4 border rounded-md relative space-y-4">
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => moveProcess(i, 'up')} disabled={i===0}><ArrowUp className="h-4 w-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => moveProcess(i, 'down')} disabled={i===about.process.length-1}><ArrowDown className="h-4 w-4"/></Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setAbout(p => ({...p, process: p.process.filter((_,idx)=>idx!==i)}))}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-4 pr-24">
                      <div className="space-y-2"><Label>Icon</Label><Input value={step.icon} onChange={e => { const pr=[...about.process]; pr[i].icon=e.target.value; setAbout(p=>({...p, process: pr})); }} /></div>
                      <div className="space-y-2"><Label>Title</Label><Input value={step.title} onChange={e => { const pr=[...about.process]; pr[i].title=e.target.value; setAbout(p=>({...p, process: pr})); }} /></div>
                    </div>
                    <div className="space-y-2"><Label>Description</Label><Textarea value={step.description} onChange={e => { const pr=[...about.process]; pr[i].description=e.target.value; setAbout(p=>({...p, process: pr})); }} /></div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setAbout(p => ({...p, process: [...p.process, {id:`step-${Date.now()}`, icon:'', title:'', description:''}]}))}><Plus className="h-4 w-4 mr-2"/> Add Step</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* TEAM */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-lg">Team Members</CardTitle></CardHeader>
          <CardContent>
            <AccordionItem value="team" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 grid grid-cols-1 gap-4">
                {about.team.map((member, i) => (
                  <div key={member.id} className="p-4 border rounded-md relative space-y-4">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => setAbout(p => ({...p, team: p.team.filter((_,idx)=>idx!==i)}))}><Trash2 className="h-4 w-4"/></Button>
                    <div className="grid grid-cols-2 gap-4 pr-10">
                      <div className="space-y-2"><Label>Name</Label><Input value={member.name} onChange={e => { const tm=[...about.team]; tm[i].name=e.target.value; setAbout(p=>({...p, team: tm})); }} /></div>
                      <div className="space-y-2"><Label>Role</Label><Input value={member.role} onChange={e => { const tm=[...about.team]; tm[i].role=e.target.value; setAbout(p=>({...p, team: tm})); }} /></div>
                    </div>
                    <div className="space-y-2"><Label>Bio</Label><Textarea value={member.bio} onChange={e => { const tm=[...about.team]; tm[i].bio=e.target.value; setAbout(p=>({...p, team: tm})); }} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Photo URL</Label><Input value={member.photo} onChange={e => { const tm=[...about.team]; tm[i].photo=e.target.value; setAbout(p=>({...p, team: tm})); }} /></div>
                      <div className="space-y-2"><Label>LinkedIn URL</Label><Input value={member.linkedIn} onChange={e => { const tm=[...about.team]; tm[i].linkedIn=e.target.value; setAbout(p=>({...p, team: tm})); }} /></div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setAbout(p => ({...p, team: [...p.team, {id:`tm-${Date.now()}`, name:'', role:'', bio:'', photo:'', linkedIn:''}]}))}><Plus className="h-4 w-4 mr-2"/> Add Team Member</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* VALUES */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-lg">Brand Values</CardTitle></CardHeader>
          <CardContent>
            <AccordionItem value="values" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {about.values.map((val, i) => (
                  <div key={val.id} className="p-4 border rounded-md relative space-y-4">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => setAbout(p => ({...p, values: p.values.filter((_,idx)=>idx!==i)}))}><Trash2 className="h-4 w-4"/></Button>
                    <div className="grid grid-cols-[80px_1fr] gap-4 pr-10">
                      <div className="space-y-2"><Label>Icon</Label><Input value={val.icon} onChange={e => { const v=[...about.values]; v[i].icon=e.target.value; setAbout(p=>({...p, values: v})); }} /></div>
                      <div className="space-y-2"><Label>Title</Label><Input value={val.title} onChange={e => { const v=[...about.values]; v[i].title=e.target.value; setAbout(p=>({...p, values: v})); }} /></div>
                    </div>
                    <div className="space-y-2"><Label>Description</Label><Textarea value={val.description} onChange={e => { const v=[...about.values]; v[i].description=e.target.value; setAbout(p=>({...p, values: v})); }} /></div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setAbout(p => ({...p, values: [...p.values, {id:`val-${Date.now()}`, icon:'', title:'', description:''}]}))}><Plus className="h-4 w-4 mr-2"/> Add Value</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* AWARDS */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-lg">Awards</CardTitle></CardHeader>
          <CardContent>
            <AccordionItem value="awards" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {about.awards.map((aw, i) => (
                  <div key={aw.id} className="flex gap-2 items-center">
                    <Input placeholder="Year" className="w-24" value={aw.year} onChange={e => { const a=[...about.awards]; a[i].year=e.target.value; setAbout(p=>({...p, awards: a})); }} />
                    <Input placeholder="Award Title" value={aw.title} onChange={e => { const a=[...about.awards]; a[i].title=e.target.value; setAbout(p=>({...p, awards: a})); }} />
                    <Input placeholder="Organization" value={aw.organization} onChange={e => { const a=[...about.awards]; a[i].organization=e.target.value; setAbout(p=>({...p, awards: a})); }} />
                    <Button variant="ghost" className="text-red-500" onClick={() => setAbout(p => ({...p, awards: p.awards.filter((_,idx)=>idx!==i)}))}><Trash2 className="h-4 w-4"/></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setAbout(p => ({...p, awards: [...p.awards, {id:`aw-${Date.now()}`, year:'', title:'', organization:''}]}))}><Plus className="h-4 w-4 mr-2"/> Add Award</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

      </Accordion>
    </AdminLayout>
  );
}
