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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function HomeEditor() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [sections, setSections] = useState(data.homePage.sections);

  const saveChanges = () => {
    updateData(prev => ({
      ...prev,
      homePage: {
        ...prev.homePage,
        sections
      }
    }));
    toast({ title: "Saved", description: "Home page content updated successfully." });
  };

  const toggleVisibility = (sectionKey: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        visible: !prev[sectionKey].visible
      }
    }));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Home Page Editor</h2>
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {/* HERO SECTION */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Hero Section</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.hero.visible} onCheckedChange={() => toggleVisibility('hero')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="hero" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Headline</Label><Input value={sections.hero.headline} onChange={e => setSections(p => ({...p, hero: {...p.hero, headline: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Subheadline</Label><Textarea value={sections.hero.subheadline} onChange={e => setSections(p => ({...p, hero: {...p.hero, subheadline: e.target.value}}))} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>CTA Label</Label><Input value={sections.hero.ctaLabel} onChange={e => setSections(p => ({...p, hero: {...p.hero, ctaLabel: e.target.value}}))} /></div>
                  <div className="space-y-2"><Label>CTA Link</Label><Input value={sections.hero.ctaLink} onChange={e => setSections(p => ({...p, hero: {...p.hero, ctaLink: e.target.value}}))} /></div>
                </div>
                <div className="space-y-2"><Label>Image URL</Label><Input value={sections.hero.imageUrl} onChange={e => setSections(p => ({...p, hero: {...p.hero, imageUrl: e.target.value}}))} /></div>
                {sections.hero.imageUrl && <img src={sections.hero.imageUrl} alt="Hero" className="w-full h-48 object-cover rounded-md mt-2" />}
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* FEATURED PRODUCTS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Featured Collections</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.featured.visible} onCheckedChange={() => toggleVisibility('featured')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="featured" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Heading</Label><Input value={sections.featured.heading} onChange={e => setSections(p => ({...p, featured: {...p.featured, heading: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Subheading</Label><Input value={sections.featured.subheading} onChange={e => setSections(p => ({...p, featured: {...p.featured, subheading: e.target.value}}))} /></div>
                <div className="space-y-2">
                  <Label>Select Products (Max 6)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {data.products.map(prod => (
                      <div key={prod.id} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={sections.featured.productIds.includes(prod.id)}
                          onCheckedChange={(checked) => {
                            setSections(p => {
                              const newIds = checked 
                                ? [...p.featured.productIds, prod.id].slice(0, 6)
                                : p.featured.productIds.filter(id => id !== prod.id);
                              return { ...p, featured: { ...p.featured, productIds: newIds } };
                            });
                          }}
                          disabled={!sections.featured.productIds.includes(prod.id) && sections.featured.productIds.length >= 6}
                        />
                        <Label className="text-sm font-normal">{prod.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* STATS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Stats</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.stats.visible} onCheckedChange={() => toggleVisibility('stats')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="stats" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {sections.stats.items.map((stat, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input placeholder="Number (e.g. 200+)" value={stat.number} onChange={e => {
                      const newItems = [...sections.stats.items];
                      newItems[i].number = e.target.value;
                      setSections(p => ({...p, stats: {...p.stats, items: newItems}}));
                    }} />
                    <Input placeholder="Label" value={stat.label} onChange={e => {
                      const newItems = [...sections.stats.items];
                      newItems[i].label = e.target.value;
                      setSections(p => ({...p, stats: {...p.stats, items: newItems}}));
                    }} />
                    <Button variant="ghost" className="text-red-500" onClick={() => {
                      setSections(p => ({...p, stats: {...p.stats, items: p.stats.items.filter((_, idx) => idx !== i)}}));
                    }}><Trash2 className="h-4 w-4"/></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setSections(p => ({...p, stats: {...p.stats, items: [...p.stats.items, {number: '', label: ''}]}}))}><Plus className="h-4 w-4 mr-2"/> Add Stat</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* ABOUT TEASER */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">About Teaser</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.aboutTeaser.visible} onCheckedChange={() => toggleVisibility('aboutTeaser')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="about" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Heading</Label><Input value={sections.aboutTeaser.heading} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, heading: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Paragraph 1</Label><Textarea value={sections.aboutTeaser.p1} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, p1: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Paragraph 2</Label><Textarea value={sections.aboutTeaser.p2} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, p2: e.target.value}}))} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Button Label</Label><Input value={sections.aboutTeaser.btnLabel} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, btnLabel: e.target.value}}))} /></div>
                  <div className="space-y-2"><Label>Button Link</Label><Input value={sections.aboutTeaser.btnLink} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, btnLink: e.target.value}}))} /></div>
                </div>
                <div className="space-y-2"><Label>Image URL</Label><Input value={sections.aboutTeaser.imageUrl} onChange={e => setSections(p => ({...p, aboutTeaser: {...p.aboutTeaser, imageUrl: e.target.value}}))} /></div>
                {sections.aboutTeaser.imageUrl && <img src={sections.aboutTeaser.imageUrl} alt="About" className="w-48 h-48 object-cover rounded-md mt-2" />}
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* TESTIMONIALS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Testimonials</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.testimonials.visible} onCheckedChange={() => toggleVisibility('testimonials')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="testimonials" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Heading</Label><Input value={sections.testimonials.heading} onChange={e => setSections(p => ({...p, testimonials: {...p.testimonials, heading: e.target.value}}))} /></div>
                {sections.testimonials.items.map((test, i) => (
                  <div key={i} className="p-4 border rounded-md relative space-y-4">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => setSections(p => ({...p, testimonials: {...p.testimonials, items: p.testimonials.items.filter((_, idx) => idx !== i)}}))}><Trash2 className="h-4 w-4"/></Button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Name</Label><Input value={test.name} onChange={e => { const items = [...sections.testimonials.items]; items[i].name = e.target.value; setSections(p => ({...p, testimonials: {...p.testimonials, items}})); }} /></div>
                      <div className="space-y-2"><Label>Role</Label><Input value={test.role} onChange={e => { const items = [...sections.testimonials.items]; items[i].role = e.target.value; setSections(p => ({...p, testimonials: {...p.testimonials, items}})); }} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Avatar URL</Label><Input value={test.avatar} onChange={e => { const items = [...sections.testimonials.items]; items[i].avatar = e.target.value; setSections(p => ({...p, testimonials: {...p.testimonials, items}})); }} /></div>
                      <div className="space-y-2"><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={test.rating} onChange={e => { const items = [...sections.testimonials.items]; items[i].rating = Number(e.target.value); setSections(p => ({...p, testimonials: {...p.testimonials, items}})); }} /></div>
                    </div>
                    <div className="space-y-2"><Label>Quote</Label><Textarea value={test.quote} onChange={e => { const items = [...sections.testimonials.items]; items[i].quote = e.target.value; setSections(p => ({...p, testimonials: {...p.testimonials, items}})); }} /></div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setSections(p => ({...p, testimonials: {...p.testimonials, items: [...p.testimonials.items, {name:'', role:'', avatar:'', rating:5, quote:''}]}}))}><Plus className="h-4 w-4 mr-2"/> Add Testimonial</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* BRANDS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Brands</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.brands.visible} onCheckedChange={() => toggleVisibility('brands')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="brands" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {sections.brands.items.map((brand, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input placeholder="Brand Name" value={brand.name} onChange={e => { const items = [...sections.brands.items]; items[i].name = e.target.value; setSections(p => ({...p, brands: {...p.brands, items}})); }} />
                    <Input placeholder="Logo URL" value={brand.logoUrl} onChange={e => { const items = [...sections.brands.items]; items[i].logoUrl = e.target.value; setSections(p => ({...p, brands: {...p.brands, items}})); }} />
                    {brand.logoUrl && <img src={brand.logoUrl} alt="" className="h-8 w-16 object-contain" />}
                    <Button variant="ghost" className="text-red-500" onClick={() => setSections(p => ({...p, brands: {...p.brands, items: p.brands.items.filter((_, idx) => idx !== i)}}))}><Trash2 className="h-4 w-4"/></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setSections(p => ({...p, brands: {...p.brands, items: [...p.brands.items, {name:'', logoUrl:''}]}}))}><Plus className="h-4 w-4 mr-2"/> Add Brand</Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        {/* CTA BANNER */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">CTA Banner</CardTitle>
            <div className="flex items-center space-x-2">
              <Label>Visible</Label>
              <Switch checked={sections.ctaBanner.visible} onCheckedChange={() => toggleVisibility('ctaBanner')} />
            </div>
          </CardHeader>
          <CardContent>
            <AccordionItem value="cta" className="border-none">
              <AccordionTrigger className="pt-0 hover:no-underline text-sm text-primary">Edit Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Heading</Label><Input value={sections.ctaBanner.heading} onChange={e => setSections(p => ({...p, ctaBanner: {...p.ctaBanner, heading: e.target.value}}))} /></div>
                <div className="space-y-2"><Label>Subtext</Label><Input value={sections.ctaBanner.subtext} onChange={e => setSections(p => ({...p, ctaBanner: {...p.ctaBanner, subtext: e.target.value}}))} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Button Label</Label><Input value={sections.ctaBanner.btnLabel} onChange={e => setSections(p => ({...p, ctaBanner: {...p.ctaBanner, btnLabel: e.target.value}}))} /></div>
                  <div className="space-y-2"><Label>Button Link</Label><Input value={sections.ctaBanner.btnLink} onChange={e => setSections(p => ({...p, ctaBanner: {...p.ctaBanner, btnLink: e.target.value}}))} /></div>
                </div>
                <div className="space-y-2"><Label>Background Color</Label><Input value={sections.ctaBanner.bg} onChange={e => setSections(p => ({...p, ctaBanner: {...p.ctaBanner, bg: e.target.value}}))} /></div>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

      </Accordion>
    </AdminLayout>
  );
}
