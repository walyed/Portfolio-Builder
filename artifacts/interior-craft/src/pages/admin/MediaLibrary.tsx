import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Plus, Image as ImageIcon } from 'lucide-react';

export default function MediaLibrary() {
  const [, navigate] = useLocation();
  const { data } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [newUrl, setNewUrl] = useState('');
  const [localUrls, setLocalUrls] = useState<string[]>([]);

  // Collect all image URLs from CMS Context
  const allImages = useMemo(() => {
    const urls = new Set<string>();
    
    // Global Settings
    if (data.settings.logoUrl) urls.add(data.settings.logoUrl);
    
    // Home Page
    if (data.homePage.sections.hero.imageUrl) urls.add(data.homePage.sections.hero.imageUrl);
    if (data.homePage.sections.aboutTeaser.imageUrl) urls.add(data.homePage.sections.aboutTeaser.imageUrl);
    data.homePage.sections.testimonials.items.forEach(t => urls.add(t.avatar));
    data.homePage.sections.brands.items.forEach(b => urls.add(b.logoUrl));
    
    // Categories
    data.categories.forEach(c => { if(c.bannerUrl) urls.add(c.bannerUrl) });
    
    // Products
    data.products.forEach(p => {
      p.images.forEach(img => urls.add(img.url));
      p.portfolioPhotos?.forEach(pp => urls.add(pp.url));
    });
    
    // About Page
    if (data.aboutPage.hero.imageUrl) urls.add(data.aboutPage.hero.imageUrl);
    if (data.aboutPage.story.imageUrl) urls.add(data.aboutPage.story.imageUrl);
    data.aboutPage.team.forEach(t => { if(t.photo) urls.add(t.photo) });

    // Local manually added
    localUrls.forEach(url => urls.add(url));

    return Array.from(urls).filter(u => u && u.trim() !== '');
  }, [data, localUrls]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  const addImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl && !allImages.includes(newUrl)) {
      setLocalUrls(prev => [newUrl, ...prev]);
      setNewUrl('');
      toast({ title: "Added", description: "Image URL added to media library view." });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold font-serif">Media Library</h2>
        
        <form onSubmit={addImageUrl} className="flex gap-2 w-full md:w-auto">
          <Input 
            placeholder="Paste image URL here..." 
            value={newUrl} 
            onChange={e => setNewUrl(e.target.value)} 
            className="w-full md:w-64"
          />
          <Button type="submit"><Plus className="h-4 w-4 mr-2" /> Add URL</Button>
        </form>
      </div>

      {allImages.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-xl">
          <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No images found</h3>
          <p className="text-gray-500">Images added to your content will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allImages.map((url, i) => (
            <div key={i} className="bg-white border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 relative">
                <img 
                  src={url} 
                  alt="" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJyb2tlbiBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" onClick={() => copyUrl(url)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy URL
                  </Button>
                </div>
              </div>
              <div className="p-3 text-xs text-gray-500 truncate border-t" title={url}>
                {url}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
