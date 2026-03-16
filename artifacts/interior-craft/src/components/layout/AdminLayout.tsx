import React from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { LayoutDashboard, Home, Package, Folders, FileText, Mail, Settings, MessageSquare, Image, LogOut, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('cms_admin_session');
    navigate('/admin');
  };

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
    const [isActive] = useRoute(href);
    return (
      <Link href={href}>
        <span className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
          isActive ? 'bg-primary text-primary-foreground font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}>
          <Icon size={18} />
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col fixed inset-y-0 left-0 z-10 shadow-sm">
        <div className="p-6 border-b">
          <h1 className="font-serif font-bold text-2xl text-gray-900">CMS Admin</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavItem href="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem href="/admin/home" label="Home Page" icon={Home} />
          <NavItem href="/admin/products" label="Products" icon={Package} />
          <NavItem href="/admin/categories" label="Categories" icon={Folders} />
          <NavItem href="/admin/about" label="About Page" icon={FileText} />
          <NavItem href="/admin/contact" label="Contact Page" icon={Mail} />
          <NavItem href="/admin/settings" label="Settings" icon={Settings} />
          <NavItem href="/admin/messages" label="Messages" icon={MessageSquare} />
          <NavItem href="/admin/media" label="Media Library" icon={Image} />
        </nav>
        <div className="p-4 border-t space-y-2">
          <a href="/" target="_blank">
            <Button variant="outline" className="w-full justify-start"><ExternalLink size={16} className="mr-2"/> View Site</Button>
          </a>
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
            <LogOut size={16} className="mr-2"/> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-semibold text-lg text-gray-800">InteriorCraft Panel</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Live
            </span>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto bg-gray-50">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
