import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableRow({ category, productCount, onEdit, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 1 : 0 };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? "bg-muted/50" : ""}>
      <TableCell className="w-[50px]"><Button variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}><GripVertical className="h-4 w-4" /></Button></TableCell>
      <TableCell className="text-xl">{category.icon}</TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>{productCount}</TableCell>
      <TableCell>{category.visible ? 'Visible' : 'Hidden'}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" onClick={() => onEdit(category)}><Edit className="h-4 w-4"/></Button>
        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => onDelete(category.id)}><Trash2 className="h-4 w-4"/></Button>
      </TableCell>
    </TableRow>
  );
}

export default function CategoriesManager() {
  const [, navigate] = useLocation();
  const { data, updateData } = useCMS();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const [categories, setCategories] = useState([...data.categories].sort((a,b) => a.order - b.order));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const defaultForm = { id: '', name: '', slug: '', icon: '', description: '', bannerUrl: '', visible: true, order: 0 };
  const [form, setForm] = useState(defaultForm);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex).map((cat, idx) => ({ ...cat, order: idx + 1 }));
        updateData({ categories: reordered });
        return reordered;
      });
      toast({ title: "Reordered", description: "Categories order updated" });
    }
  };

  const openEditor = (cat: any = null) => {
    if (cat) {
      setForm({ ...cat });
      setEditingId(cat.id);
    } else {
      setForm({ ...defaultForm, id: `cat-${Date.now()}`, order: categories.length + 1 });
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const saveCategory = () => {
    let newCats;
    if (editingId) {
      newCats = categories.map(c => c.id === editingId ? form : c);
    } else {
      newCats = [...categories, form];
    }
    setCategories(newCats);
    updateData({ categories: newCats });
    toast({ title: "Saved", description: "Category saved successfully" });
    setIsDialogOpen(false);
  };

  const deleteCategory = (id: string) => {
    if(confirm("Are you sure? This won't delete the products, but they will lose their category.")) {
      const newCats = categories.filter(c => c.id !== id);
      setCategories(newCats);
      updateData({ categories: newCats });
      toast({ title: "Deleted", description: "Category removed" });
    }
  };

  const getProductCount = (catId: string) => data.products.filter(p => p.categoryId === catId).length;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Categories Manager</h2>
        <Button onClick={() => openEditor()}><Plus className="mr-2 h-4 w-4"/> Add Category</Button>
      </div>

      <div className="border rounded-md bg-white mb-8">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
                {categories.map(cat => (
                  <SortableRow key={cat.id} category={cat} productCount={getProductCount(cat.id)} onEdit={openEditor} onDelete={deleteCategory} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="border rounded-md bg-white p-6">
        <h3 className="text-lg font-bold mb-4 font-serif">Sidebar Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input value={data.settings.whatsappNumber} onChange={e => updateData(p => ({...p, settings: {...p.settings, whatsappNumber: e.target.value}}))} />
          </div>
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input value={data.settings.instagramUrl} onChange={e => updateData(p => ({...p, settings: {...p.settings, instagramUrl: e.target.value}}))} />
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Category' : 'New Category'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g,'-')})} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Icon (Emoji or Text)</Label>
              <Input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} placeholder="e.g. 🛁" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Banner Image URL</Label>
              <Input value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} />
              {form.bannerUrl && <img src={form.bannerUrl} alt="" className="w-full h-32 object-cover rounded mt-2" />}
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch checked={form.visible} onCheckedChange={c => setForm({...form, visible: c})} />
              <Label>Visible on Site</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveCategory}>Save Category</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
