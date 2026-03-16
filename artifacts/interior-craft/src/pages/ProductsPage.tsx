import { useRoute } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import NotFound from '@/pages/not-found';

export default function ProductsPage() {
  const [, params] = useRoute('/products/:category');
  const { data } = useCMS();
  
  const category = data.categories.find(c => c.slug === params?.category);
  if (!category) return <NotFound />;

  const products = data.products.filter(p => p.categoryId === category.id && p.visible);

  return (
    <PublicLayout>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-foreground">
        {category.bannerUrl && (
          <>
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img src={category.bannerUrl} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
          </>
        )}
        <div className="relative z-20 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">{category.icon}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {category.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-2xl mx-auto">
            {category.description}
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <h3 className="text-2xl font-serif mb-2">No products found</h3>
            <p>Check back soon for new additions to this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              >
                <Link href={`/products/${category.slug}/${product.slug}`}>
                  <Card className="group cursor-pointer border-transparent shadow-md hover:shadow-xl transition-all overflow-hidden rounded-2xl bg-card h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2">View Details <ArrowRight size={16}/></span>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground flex-1">{product.tagline}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
