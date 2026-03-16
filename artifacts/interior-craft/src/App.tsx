import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CMSProvider } from "@/context/CMSContext";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

import AdminLogin from "@/pages/admin/AdminLogin";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsManager from "@/pages/admin/ProductsManager";
import MessagesInbox from "@/pages/admin/MessagesInbox";
import HomeEditor from "@/pages/admin/HomeEditor";
import CategoriesManager from "@/pages/admin/CategoriesManager";
import AboutEditor from "@/pages/admin/AboutEditor";
import ContactEditor from "@/pages/admin/ContactEditor";
import GlobalSettings from "@/pages/admin/GlobalSettings";
import MediaLibrary from "@/pages/admin/MediaLibrary";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/products/:category" component={ProductsPage} />
      <Route path="/products/:category/:productId" component={ProductDetailPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/products" component={ProductsManager} />
      <Route path="/admin/messages" component={MessagesInbox} />
      
      <Route path="/admin/home" component={HomeEditor} />
      <Route path="/admin/categories" component={CategoriesManager} />
      <Route path="/admin/about" component={AboutEditor} />
      <Route path="/admin/contact" component={ContactEditor} />
      <Route path="/admin/settings" component={GlobalSettings} />
      <Route path="/admin/media" component={MediaLibrary} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CMSProvider>
    </QueryClientProvider>
  );
}

export default App;
