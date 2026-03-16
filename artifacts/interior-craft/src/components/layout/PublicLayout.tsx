import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { data } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { settings, categories } = data;

  const NavItem = ({ href, label, icon }: { href: string; label: string; icon?: string }) => {
    const [isActive] = useRoute(href === '/' ? '/' : `${href}/*`);
    return (
      <Link href={href} onClick={() => setMobileMenuOpen(false)}>
        <span className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-all cursor-pointer ${
          isActive
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:bg-black/5 hover:text-foreground'
        }`}>
          {icon && <span>{icon}</span>}
          {label}
        </span>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col pt-8 pb-6 px-4 relative">
      {/* Collapse toggle button */}
      <button
        onClick={() => setSidebarCollapsed(true)}
        className="absolute -right-3 top-8 z-10 bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center shadow-md text-muted-foreground hover:text-foreground transition-colors hidden md:flex"
        title="Collapse sidebar"
      >
        <ChevronLeft size={14} />
      </button>

      <div className="mb-10 px-4">
        {settings.logoUrl ? (
          <img src={settings.logoUrl} alt={settings.siteName} className="h-10" />
        ) : (
          <Link href="/">
            <span className="font-serif text-2xl font-bold tracking-wide text-foreground cursor-pointer">
              {settings.siteName}
            </span>
          </Link>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-8">
        <nav className="space-y-1">
          {settings.navLinks.filter(l => l.visible).map(link => (
            <NavItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div>
          <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Collections
          </h4>
          <nav className="space-y-1">
            {categories.filter(c => c.visible).sort((a, b) => a.order - b.order).map(cat => (
              <NavItem key={cat.id} href={`/products/${cat.slug}`} label={cat.name} icon={cat.icon} />
            ))}
          </nav>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-sidebar-border px-4 flex gap-4">
        {settings.instagramUrl && (
          <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">

      {/* Desktop Sidebar — animated slide */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.aside
            key="sidebar"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="hidden md:block fixed inset-y-0 left-0 z-50"
            style={{ width: 256 }}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Expand button — visible when sidebar is collapsed */}
      <AnimatePresence>
        {sidebarCollapsed && (
          <motion.button
            key="expand-btn"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarCollapsed(false)}
            className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-background border border-border rounded-r-xl px-1.5 py-4 shadow-md text-muted-foreground hover:text-foreground hover:shadow-lg transition-all flex-col items-center gap-1"
            title="Open sidebar"
          >
            <ChevronRight size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-background border-b z-40 sticky top-0">
        <Link href="/">
          <span className="font-serif text-xl font-bold tracking-wide text-foreground cursor-pointer">
            {settings.siteName}
          </span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2">
          <Menu />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-sidebar z-50 md:hidden shadow-xl"
            >
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground">
                <X />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content — shifts based on sidebar state */}
      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 0 : 256 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="flex-1 flex flex-col min-h-screen relative md:ml-0"
      >
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="bg-foreground text-background py-12 px-6 lg:px-12 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-2xl font-bold mb-2">{settings.siteName}</h2>
              <p className="text-white/60">{settings.footerTagline}</p>
            </div>
            <p className="text-sm text-white/40">{settings.footerText}</p>
          </div>
        </footer>
      </motion.main>

      {/* Floating WhatsApp */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <MessageCircle size={28} />
        </a>
      )}
    </div>
  );
}
