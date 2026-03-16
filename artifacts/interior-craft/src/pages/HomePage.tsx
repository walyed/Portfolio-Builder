import { useCMS } from '@/context/CMSContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  const { data } = useCMS();
  const { homePage: { sections }, products } = data;

  const featuredProds = products.filter(p => sections.featured.productIds.includes(p.id) && p.visible);

  return (
    <PublicLayout>
      {/* Hero */}
      {sections.hero.visible && (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={sections.hero.imageUrl} 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-in slide-in-from-bottom-2 duration-1000"
          />
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              {sections.hero.headline}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 mb-10 font-light"
            >
              {sections.hero.subheadline}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Link href={sections.hero.ctaLink}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg">
                  {sections.hero.ctaLabel} <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Collections */}
      {sections.featured.visible && (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{sections.featured.heading}</h2>
            <p className="text-muted-foreground">{sections.featured.subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProds.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/products/${data.categories.find(c => c.id === product.categoryId)?.slug}/${product.slug}`}>
                  <Card className="group cursor-pointer border-transparent shadow-md hover:shadow-xl transition-all overflow-hidden rounded-2xl bg-card">
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
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.tagline}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      {sections.stats.visible && (
        <section className="bg-foreground text-background py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {sections.stats.items.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-white/70 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* About Teaser */}
      {sections.aboutTeaser.visible && (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div className="flex-1" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{sections.aboutTeaser.heading}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{sections.aboutTeaser.p1}</p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{sections.aboutTeaser.p2}</p>
            <Link href={sections.aboutTeaser.btnLink}>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6">{sections.aboutTeaser.btnLabel}</Button>
            </Link>
          </motion.div>
          <motion.div className="flex-1" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-2xl" />
              <img src={sections.aboutTeaser.imageUrl} alt="Studio" className="relative rounded-2xl shadow-xl z-10" />
            </div>
          </motion.div>
        </section>
      )}

      {/* Testimonials */}
      {sections.testimonials.visible && (
        <section className="py-24 bg-muted px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">{sections.testimonials.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.testimonials.items.map((t, i) => (
                <Card key={i} className="bg-card border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex text-primary mb-6">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-lg italic mb-8 leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold font-serif">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      {sections.ctaBanner.visible && (
        <section className="py-24 px-6 text-center" style={{ backgroundColor: sections.ctaBanner.bg, color: 'white' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">{sections.ctaBanner.heading}</h2>
            <p className="text-xl text-white/80 mb-10">{sections.ctaBanner.subtext}</p>
            <Link href={sections.ctaBanner.btnLink}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-6 text-lg">
                {sections.ctaBanner.btnLabel}
              </Button>
            </Link>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
