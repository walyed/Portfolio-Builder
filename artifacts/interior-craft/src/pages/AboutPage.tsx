import { useCMS } from '@/context/CMSContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const { data } = useCMS();
  const { aboutPage: content } = data;

  return (
    <PublicLayout>
      {content.hero.visible && (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img src={content.hero.imageUrl} alt="About Us" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-20 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              {content.hero.headline}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-white/90 max-w-2xl mx-auto">
              {content.hero.subtext}
            </motion.p>
          </div>
        </section>
      )}

      {content.story.visible && (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">{content.story.heading}</h2>
            <div className="prose prose-lg text-muted-foreground whitespace-pre-wrap">
              {content.story.body}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 border-2 border-primary/30 m-4 rounded-xl z-20 pointer-events-none" />
              <img src={content.story.imageUrl} alt="Studio Story" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-foreground text-background px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Process</h2>
            <p className="text-white/60">How we bring your vision to life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.process.map((step, i) => (
              <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white/5 border-none text-white h-full text-center hover:bg-white/10 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-6">{step.icon}</div>
                    <h3 className="font-serif text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Meet The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.team.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </PublicLayout>
  );
}
