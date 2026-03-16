import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductsManager() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();
  
  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const defaultForm = {
    id: '', name: '', slug: '', categoryId: data.categories[0]?.id || '', tagline: '', description: '', visible: true, featured: false,
    images: [{ url: '', isPrimary: true }], portfolioPhotos: [], specs: [], dimensions: { width: 0, height: 0, depth: 0, unit: 'mm', weight: '', notes: '' }, meta: { title: '', description: '' }
  };
  const [form, setForm] = useState<any>(defaultForm);

  const filtered = data.products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) && 
    (filterCat === 'all' || p.categoryId === filterCat)
  );

  const openEditor = (product: any = null) => {
    if (product) {
      setForm(JSON.parse(JSON.stringify(product)));
      setEditingId(product.id);
    } else {
      setForm({...defaultForm, id: `prod-${Date.now()}`, slug: `new-product-${Date.now()}`});
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const saveProduct = () => {
    updateData(prev => {
      const prods = [...prev.products];
      if (editingId) {
        const idx = prods.findIndex(p => p.id === editingId);
        if (idx > -1) prods[idx] = form;
      } else {
        prods.push(form);
      }
      return { ...prev, products: prods };
    });
    toast({ title: "Saved", description: "Product saved successfully" });
    setIsDialogOpen(false);
  };

  const deleteProduct = (id: string) => {
    if(confirm("Are you sure?")) {
      updateData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
      toast({ title: "Deleted", description: "Product removed" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Products Manager</h2>
        <Button onClick={() => openEditor()}><Plus className="mr-2 h-4 w-4"/> Add Product</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {data.categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell>
                  <img src={p.images[0]?.url} alt="" className="w-12 h-12 rounded object-cover" />
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{data.categories.find(c=>c.id === p.categoryId)?.name}</TableCell>
                <TableCell>
                  {p.visible ? <Badge className="bg-green-100 text-green-800">Visible</Badge> : <Badge variant="secondary">Hidden</Badge>}
                  {p.featured && <Badge className="ml-2 bg-yellow-100 text-yellow-800">Featured</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEditor(p)}><Edit className="h-4 w-4"/></Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4"/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Product' : 'New Product'}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="specs">Specs & Dims</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g,'-')})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Slug</label><Input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Category</label>
                  <Select value={form.categoryId} onValueChange={v => setForm({...form, categoryId: v})}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>{data.categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Tagline</label><Input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} /></div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="flex gap-6 pt-2">
                <div className="flex items-center space-x-2"><Switch checked={form.visible} onCheckedChange={c => setForm({...form, visible: c})} /><label className="text-sm">Visible on Site</label></div>
                <div className="flex items-center space-x-2"><Switch checked={form.featured} onCheckedChange={c => setForm({...form, featured: c})} /><label className="text-sm">Featured Product</label></div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Main Product Images (URLs)</label>
                {form.images.map((img: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <Input value={img.url} onChange={e => { const newImgs = [...form.images]; newImgs[i].url = e.target.value; setForm({...form, images: newImgs}); }} placeholder="https://..." />
                    <Button variant="outline" onClick={() => { const newImgs = [...form.images]; newImgs[i].isPrimary = true; newImgs.forEach((_,idx)=> {if(idx!==i) newImgs[idx].isPrimary=false}); setForm({...form, images: newImgs}); }}>{img.isPrimary ? 'Primary' : 'Make Primary'}</Button>
                    <Button variant="ghost" className="text-red-500" onClick={() => setForm({...form, images: form.images.filter((_:any,idx:number) => idx !== i)})}>X</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setForm({...form, images: [...form.images, {url:'', isPrimary:form.images.length===0}]})}>Add Image URL</Button>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="space-y-6">
              <div>
                <label className="text-sm font-medium block mb-2">Specifications</label>
                {form.specs.map((s:any, i:number) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input placeholder="Key (e.g. Material)" value={s.key} onChange={e => { const ns=[...form.specs]; ns[i].key=e.target.value; setForm({...form, specs: ns}); }} />
                    <Input placeholder="Value (e.g. Oak)" value={s.value} onChange={e => { const ns=[...form.specs]; ns[i].value=e.target.value; setForm({...form, specs: ns}); }} />
                    <Button variant="ghost" className="text-red-500" onClick={() => setForm({...form, specs: form.specs.filter((_:any,idx:number) => idx !== i)})}>X</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setForm({...form, specs: [...form.specs, {key:'', value:''}]})}>Add Spec Row</Button>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div className="space-y-2"><label className="text-sm font-medium">Width</label><Input type="number" value={form.dimensions.width} onChange={e => setForm({...form, dimensions: {...form.dimensions, width: e.target.value}})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Height</label><Input type="number" value={form.dimensions.height} onChange={e => setForm({...form, dimensions: {...form.dimensions, height: e.target.value}})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Depth</label><Input type="number" value={form.dimensions.depth} onChange={e => setForm({...form, dimensions: {...form.dimensions, depth: e.target.value}})} /></div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-8 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProduct}>Save Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
