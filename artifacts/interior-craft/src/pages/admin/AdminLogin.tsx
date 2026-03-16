import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (localStorage.getItem('cms_admin_session') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('cms_admin_session', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center pb-8 pt-10">
          <CardTitle className="font-serif text-3xl font-bold text-gray-900">InteriorCraft CMS</CardTitle>
          <p className="text-muted-foreground mt-2">Enter admin password to access the panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-red-500 text-sm">Incorrect password. (Hint: admin123)</p>}
            </div>
            <Button type="submit" className="w-full" size="lg">Enter Admin</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
