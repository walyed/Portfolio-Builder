import { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Folders, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { data } = useCMS();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') !== 'true') navigate('/admin');
  }, [navigate]);

  const stats = [
    { title: "Total Products", value: data.products.length, icon: Package, link: "/admin/products" },
    { title: "Categories", value: data.categories.length, icon: Folders, link: "/admin/categories" },
    { title: "Unread Messages", value: data.messages.filter(m => m.status === 'new').length, icon: MessageSquare, link: "/admin/messages" },
    { title: "Testimonials", value: data.homePage.sections.testimonials.items.length, icon: Star, link: "/admin/home" }
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif">Welcome Back</h2>
          <p className="text-gray-500 mt-1">Here's what's happening with your portfolio today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4 font-serif border-b pb-2">Quick Actions</h3>
      <div className="flex gap-4">
        <Link href="/admin/products">
          <Button><Package className="mr-2 h-4 w-4" /> Manage Products</Button>
        </Link>
        <Link href="/admin/home">
          <Button variant="outline"><Home className="mr-2 h-4 w-4" /> Edit Home Page</Button>
        </Link>
        <Link href="/admin/messages">
          <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" /> View Inbox</Button>
        </Link>
      </div>
    </AdminLayout>
  );
}
