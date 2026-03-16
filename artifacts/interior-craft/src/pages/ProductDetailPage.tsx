import { useState } from 'react';
import { useRoute } from 'wouter';
import { useCMS } from '@/context/CMSContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Check } from 'lucide-react';
import NotFound from '@/pages/not-found';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const [, params] = useRoute('/products/:category/:productId');
  const { data } = useCMS();
  
  const category = data.categories.find(c => c.slug === params?.category);
  const product = data.products.find(p => p.slug === params?.productId && p.categoryId === category?.id);
  
  if (!category || !product) return <NotFound />;

  const [activeImage, setActiveImage] = useState(product.images.find(img => img.isPrimary)?.url || product.images[0]?.url);

  const inquireMsg = encodeURIComponent(`Hi, I'm interested in the ${product.name} from the ${category.name} collection.`);
  const waLink = `https://wa.me/${data.settings.whatsappNumber.replace(/\D/g, '')}?text=${inquireMsg}`;

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-lg">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(img.url)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${activeImage === img.url ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <Badge variant="secondary" className="mb-4">{category.name}</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-primary font-medium mb-8">{product.tagline}</p>
            <div className="prose prose-lg text-muted-foreground mb-10">
              <p>{product.description}</p>
            </div>

            <a href={waLink} target="_blank" rel="noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white rounded-full px-8 mb-12 h-14 text-lg">
                <MessageCircle className="mr-2" /> Inquire on WhatsApp
              </Button>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {product.specs.length > 0 && (
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4 border-b pb-2">Specifications</h3>
                  <ul className="space-y-3">
                    {product.specs.map((s, i) => (
                      <li key={i} className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">{s.key}</span>
                        <span className="font-medium text-right text-foreground">{s.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.dimensions && (
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4 border-b pb-2">Dimensions</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Size (W×H×D)</span>
                      <span className="font-medium text-foreground">{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} {product.dimensions.unit}</span>
                    </li>
                    <li className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium text-foreground">{product.dimensions.weight}</span>
                    </li>
                    {product.dimensions.notes && (
                      <li className="text-sm text-muted-foreground mt-2 italic flex gap-2">
                        <Check size={16} className="text-primary shrink-0" /> {product.dimensions.notes}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        {product.portfolioPhotos && product.portfolioPhotos.length > 0 && (
          <div className="border-t pt-20">
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">Featured Installations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.portfolioPhotos.map((photo, i) => (
                <div key={i} className="group">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-md">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-center text-muted-foreground font-medium">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
