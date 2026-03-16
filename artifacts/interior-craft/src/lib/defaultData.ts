export const defaultData = {
  settings: {
    siteName: "InteriorCraft",
    tagline: "Crafting Spaces. Defining Luxury.",
    logoUrl: "",
    accentColor: "#C9A84C",
    bgColor: "#FAF9F7",
    textColor: "#1C1C1C",
    sidebarBgColor: "#F5F4F1",
    whatsappNumber: "+971501234567",
    instagramUrl: "https://instagram.com/interiorcraft",
    facebookUrl: "",
    footerText: "© 2025 InteriorCraft. All rights reserved.",
    footerTagline: "Crafting Spaces. Defining Luxury.",
    navLinks: [
      { label: "Home", href: "/", visible: true },
      { label: "About", href: "/about", visible: true },
      { label: "Contact Us", href: "/contact", visible: true }
    ],
    headingFont: "Cormorant Garamond",
    bodyFont: "Inter"
  },
  homePage: {
    sections: {
      hero: {
        visible: true,
        headline: "Where Every Space Tells a Story",
        subheadline: "Bespoke interior solutions crafted with precision and passion.",
        ctaLabel: "Explore Collections",
        ctaLink: "/products/corean",
        imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop"
      },
      featured: {
        visible: true,
        heading: "Featured Collections",
        subheading: "Handpicked pieces that define modern luxury",
        productIds: ["prod-1", "prod-5", "prod-9", "prod-13"]
      },
      stats: {
        visible: true,
        items: [
          { number: "200+", label: "Projects Completed" },
          { number: "50+", label: "Luxury Brands" },
          { number: "15+", label: "Years Experience" },
          { number: "98%", label: "Client Satisfaction" }
        ]
      },
      aboutTeaser: {
        visible: true,
        heading: "Our Studio Story",
        p1: "Founded with a vision to transform ordinary spaces into extraordinary experiences, InteriorCraft has been at the forefront of luxury interior design for over 15 years.",
        p2: "We believe that your space should reflect your personality — timeless, refined, and uniquely yours.",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
        btnLabel: "Learn More",
        btnLink: "/about"
      },
      testimonials: {
        visible: true,
        heading: "What Our Clients Say",
        items: [
          { name: "Sarah Mitchell", role: "Homeowner, Dubai", quote: "InteriorCraft transformed my villa beyond imagination. Every detail was meticulously crafted.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
          { name: "James Chen", role: "CEO, Luxe Properties", quote: "Their attention to detail and quality of materials is unmatched in the industry.", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
          { name: "Amira Hassan", role: "Interior Architect", quote: "Working with InteriorCraft on our hotel project was a seamless and inspiring experience.", rating: 5, avatar: "https://picsum.photos/seed/avatar3/100/100" }
        ]
      },
      brands: {
        visible: true,
        items: [
          { name: "Corian", logoUrl: "https://picsum.photos/seed/brand1/200/80" },
          { name: "Porcelanosa", logoUrl: "https://picsum.photos/seed/brand2/200/80" },
          { name: "Duravit", logoUrl: "https://picsum.photos/seed/brand3/200/80" },
          { name: "Hansgrohe", logoUrl: "https://picsum.photos/seed/brand4/200/80" },
          { name: "Vitra", logoUrl: "https://picsum.photos/seed/brand5/200/80" }
        ]
      },
      ctaBanner: {
        visible: true,
        heading: "Ready to Transform Your Space?",
        subtext: "Get in touch with our design experts and let's create something extraordinary together.",
        btnLabel: "Contact Us",
        btnLink: "/contact",
        bg: "#1C1C1C"
      }
    }
  },
  categories: [
    { id: "cat-1", name: "Corean, Bowl and Vanity", slug: "corean", icon: "🛁", description: "Premium Corean surfaces and designer vanity solutions for luxury bathrooms.", bannerUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80", visible: true, order: 1 },
    { id: "cat-2", name: "Fabricated Vanity", slug: "fabricated-vanity", icon: "🪞", description: "Custom fabricated vanity units crafted to your exact specifications.", bannerUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80", visible: true, order: 2 },
    { id: "cat-3", name: "3D Tiles", slug: "3d-tiles", icon: "⬛", description: "Architectural 3D tile designs that add depth and character to any space.", bannerUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80", visible: true, order: 3 },
    { id: "cat-4", name: "Solid Surface", slug: "solid-surface", icon: "◼", description: "Seamless solid surface solutions for countertops, walls, and more.", bannerUrl: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&q=80", visible: true, order: 4 }
  ],
  products: [
    // Corean
    { id: "prod-1", name: "Luna Oval Basin", slug: "luna-oval-basin", categoryId: "cat-1", tagline: "Sculptural elegance meets functional design", description: "The Luna Oval Basin is a masterpiece of Corean engineering. Its smooth curves and seamless construction create a focal point in any bathroom.", visible: true, featured: true, images: [{ url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80", isPrimary: true }], portfolioPhotos: [], specs: [{ key: "Material", value: "Hi-Macs Corean" }, { key: "Finish", value: "Matte White" }], dimensions: { width: 600, height: 150, depth: 420, unit: "mm", weight: "12kg", notes: "" }, meta: { title: "Luna Oval Basin", description: "" } },
    { id: "prod-2", name: "Aria Vessel Bowl", slug: "aria-vessel-bowl", categoryId: "cat-1", tagline: "Above-counter luxury", description: "Above-counter luxury in pure white Corean.", visible: true, featured: false, images: [{ url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80", isPrimary: true }], portfolioPhotos: [], specs: [], dimensions: { width: 400, height: 180, depth: 400, unit: "mm", weight: "8kg", notes: "" }, meta: { title: "Aria Vessel Bowl", description: "" } },
    { id: "prod-3", name: "Porto Undermount Basin", slug: "porto-undermount", categoryId: "cat-1", tagline: "Clean lines for a seamless countertop experience", description: "Designed for seamless integration, the Porto Undermount Basin disappears beneath your countertop, creating a sleek, uninterrupted surface. Perfect for contemporary and minimalist bathroom designs.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod3a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod3b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port3a/800/600", caption: "Penthouse apartment, Downtown Dubai" }], specs: [{ key: "Material", value: "Corean" }, { key: "Finish", value: "Matte" }, { key: "Color Options", value: "6 colors" }, { key: "Lead Time", value: "3 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 550, height: 200, depth: 380, unit: "mm", weight: "10kg", notes: "" }, meta: { title: "Porto Undermount Basin", description: "" } },
    { id: "prod-4", name: "Palazzo Vanity Unit", slug: "palazzo-vanity", categoryId: "cat-1", tagline: "Complete vanity solution with integrated basin", description: "The Palazzo Vanity Unit is a fully integrated solution featuring a seamless Corean sink and custom cabinet below. Available in a range of finishes to complement any bathroom style.", visible: true, featured: true, images: [{ url: "https://picsum.photos/seed/prod4a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod4b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port4a/800/600", caption: "Luxury villa, Jumeirah" }, { url: "https://picsum.photos/seed/port4b/800/600", caption: "Five-star hotel suite" }], specs: [{ key: "Material", value: "Corean + MDF" }, { key: "Finish", value: "Various" }, { key: "Color Options", value: "20+ colors" }, { key: "Lead Time", value: "6-8 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 1200, height: 850, depth: 500, unit: "mm", weight: "45kg", notes: "Custom sizes available" }, meta: { title: "Palazzo Vanity Unit", description: "" } },
    // Fabricated Vanity
    { id: "prod-5", name: "Nova Floating Vanity", slug: "nova-floating-vanity", categoryId: "cat-2", tagline: "Wall-mounted elegance", description: "The Nova Floating Vanity creates a sense of space with its wall-mounted design.", visible: true, featured: true, images: [{ url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", isPrimary: true }], portfolioPhotos: [], specs: [{ key: "Material", value: "Moisture-Resistant MDF" }], dimensions: { width: 900, height: 500, depth: 450, unit: "mm", weight: "32kg", notes: "" }, meta: { title: "Nova", description: "" } },
    { id: "prod-6", name: "Classico Double Vanity", slug: "classico-double-vanity", categoryId: "cat-2", tagline: "His and hers luxury in a single unit", description: "The Classico Double Vanity features two integrated sinks with ample storage below, perfect for master bathrooms where elegance and practicality must coexist.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod6a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod6b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port6a/800/600", caption: "Master bathroom renovation, Emirates Hills" }], specs: [{ key: "Material", value: "Solid Wood + Corean" }, { key: "Finish", value: "Oak Veneer" }, { key: "Color Options", value: "5 wood finishes" }, { key: "Lead Time", value: "8 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 1600, height: 850, depth: 500, unit: "mm", weight: "78kg", notes: "Requires professional installation" }, meta: { title: "Classico Double Vanity", description: "" } },
    { id: "prod-7", name: "Zen Minimal Vanity", slug: "zen-minimal-vanity", categoryId: "cat-2", tagline: "Japanese-inspired minimalism for modern spaces", description: "Inspired by Japanese minimalism, the Zen Vanity features clean lines, integrated handles, and a light natural wood finish that brings calm to any bathroom space.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod7a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod7b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port7a/800/600", caption: "Zen-style bathroom, Mirdif" }], specs: [{ key: "Material", value: "Bamboo + Marine Plywood" }, { key: "Finish", value: "Natural Bamboo" }, { key: "Color Options", value: "3 finishes" }, { key: "Lead Time", value: "4-5 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 800, height: 480, depth: 400, unit: "mm", weight: "28kg", notes: "" }, meta: { title: "Zen Minimal Vanity", description: "" } },
    { id: "prod-8", name: "Royal Marble Vanity", slug: "royal-marble-vanity", categoryId: "cat-2", tagline: "Marble-top vanity for ultimate luxury", description: "The Royal Marble Vanity combines custom fabricated cabinetry with a genuine marble countertop, creating an opulent bathroom centerpiece that makes a lasting impression.", visible: true, featured: true, images: [{ url: "https://picsum.photos/seed/prod8a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod8b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port8a/800/600", caption: "Royal suite, 5-star hotel Abu Dhabi" }], specs: [{ key: "Material", value: "Cabinet: MDF, Top: Calacatta Marble" }, { key: "Finish", value: "Polished Marble + Matt White Cabinet" }, { key: "Color Options", value: "Custom" }, { key: "Lead Time", value: "10-12 weeks" }, { key: "Origin", value: "Italy / UAE Fabricated" }], dimensions: { width: 1400, height: 900, depth: 550, unit: "mm", weight: "120kg", notes: "Marble may vary in veining pattern" }, meta: { title: "Royal Marble Vanity", description: "" } },
    // 3D Tiles
    { id: "prod-9", name: "Wave 3D Wall Tile", slug: "wave-3d-tile", categoryId: "cat-3", tagline: "Rhythmic waves", description: "Mesmerizing undulating surface that transforms as light moves across it.", visible: true, featured: true, images: [{ url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80", isPrimary: true }], portfolioPhotos: [], specs: [{ key: "Material", value: "Gypsum" }], dimensions: { width: 300, height: 25, depth: 300, unit: "mm", weight: "1.2kg", notes: "" }, meta: { title: "Wave 3D", description: "" } },
    { id: "prod-10", name: "Hexagon Mosaic 3D", slug: "hexagon-mosaic-3d", categoryId: "cat-3", tagline: "Geometric perfection in three dimensions", description: "Hexagonal 3D tiles that create a stunning honeycomb effect with dramatic shadow play. Perfect for spa walls, reception areas, and any space that demands architectural interest.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod10a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod10b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port10a/800/600", caption: "Spa reception, Jumeirah hotel" }], specs: [{ key: "Material", value: "Ceramic" }, { key: "Finish", value: "Matte" }, { key: "Color Options", value: "White, Grey, Black, Gold" }, { key: "Lead Time", value: "3-4 weeks" }, { key: "Origin", value: "Spain" }], dimensions: { width: 200, height: 30, depth: 230, unit: "mm", weight: "2.1kg per tile", notes: "" }, meta: { title: "Hexagon Mosaic 3D", description: "" } },
    { id: "prod-11", name: "Diamond Facet Tile", slug: "diamond-facet-tile", categoryId: "cat-3", tagline: "Crystal-inspired facets for dramatic interiors", description: "Diamond-shaped faceted tiles that catch light beautifully, creating a jewel-like effect on any surface. Ideal for luxury retail, hospitality, and high-end residential projects.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod11a/800/600", isPrimary: true }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port11a/800/600", caption: "Luxury lobby, DIFC tower" }], specs: [{ key: "Material", value: "Porcelain" }, { key: "Finish", value: "Gloss" }, { key: "Color Options", value: "White, Cream, Champagne" }, { key: "Lead Time", value: "4-5 weeks" }, { key: "Origin", value: "Italy" }], dimensions: { width: 250, height: 40, depth: 250, unit: "mm", weight: "1.8kg per tile", notes: "" }, meta: { title: "Diamond Facet Tile", description: "" } },
    { id: "prod-12", name: "Ripple Surface Panel", slug: "ripple-surface-panel", categoryId: "cat-3", tagline: "Large-format 3D panels for dramatic impact", description: "Large format rippled surface panels that make bold architectural statements in lobbies, offices, and residential spaces. Available in any RAL color.", visible: true, featured: true, images: [{ url: "https://picsum.photos/seed/prod12a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod12b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port12a/800/600", caption: "Corporate headquarters, Media City" }], specs: [{ key: "Material", value: "MDF + Lacquer" }, { key: "Finish", value: "High-Gloss Lacquer" }, { key: "Color Options", value: "RAL colors" }, { key: "Lead Time", value: "5-6 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 1200, height: 30, depth: 600, unit: "mm", weight: "4.5kg per panel", notes: "Custom sizes available" }, meta: { title: "Ripple Surface Panel", description: "" } },
    // Solid Surface
    { id: "prod-13", name: "Glacier Countertop", slug: "glacier-countertop", categoryId: "cat-4", tagline: "Pure seamless surface", description: "Premium solid surface material, offering a completely seamless appearance.", visible: true, featured: true, images: [{ url: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80", isPrimary: true }], portfolioPhotos: [], specs: [{ key: "Material", value: "Corian DuPont" }], dimensions: { width: 3000, height: 30, depth: 650, unit: "mm", weight: "Varies", notes: "" }, meta: { title: "Glacier", description: "" } },
    { id: "prod-14", name: "Onyx Reception Desk", slug: "onyx-reception-desk", categoryId: "cat-4", tagline: "Statement reception furniture in solid surface", description: "Custom solid surface reception desk with integrated LED lighting and seamless curves. A powerful first impression for any business.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod14a/800/600", isPrimary: true }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port14a/800/600", caption: "Hotel lobby, JBR" }], specs: [{ key: "Material", value: "Solid Surface" }, { key: "Finish", value: "Polished" }, { key: "Color Options", value: "Custom" }, { key: "Lead Time", value: "8-10 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 2400, height: 1100, depth: 800, unit: "mm", weight: "200kg", notes: "Requires professional installation" }, meta: { title: "Onyx Reception Desk", description: "" } },
    { id: "prod-15", name: "Flow Wall Cladding", slug: "flow-wall-cladding", categoryId: "cat-4", tagline: "Seamless wall panels with organic curves", description: "Thermoformed solid surface wall cladding that can be shaped into flowing organic forms. Creates stunning feature walls in residential, hospitality, and spa environments.", visible: true, featured: false, images: [{ url: "https://picsum.photos/seed/prod15a/800/600", isPrimary: true }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port15a/800/600", caption: "Spa treatment room, 5-star resort" }], specs: [{ key: "Material", value: "Thermoformable Solid Surface" }, { key: "Finish", value: "Satin" }, { key: "Color Options", value: "50+ colors" }, { key: "Lead Time", value: "6-8 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 1200, height: 3000, depth: 12, unit: "mm", weight: "8kg per sqm", notes: "Can be curved and thermoformed" }, meta: { title: "Flow Wall Cladding", description: "" } },
    { id: "prod-16", name: "Corian Shower Tray", slug: "corian-shower-tray", categoryId: "cat-4", tagline: "Slip-resistant luxury underfoot", description: "Bespoke solid surface shower trays that integrate seamlessly with your bathroom design. Anti-slip matte finish meets the highest safety and aesthetic standards.", visible: true, featured: true, images: [{ url: "https://picsum.photos/seed/prod16a/800/600", isPrimary: true }, { url: "https://picsum.photos/seed/prod16b/800/600", isPrimary: false }], portfolioPhotos: [{ url: "https://picsum.photos/seed/port16a/800/600", caption: "Wet room installation, Dubai Hills" }], specs: [{ key: "Material", value: "Corian Solid Surface" }, { key: "Finish", value: "Anti-slip Matte" }, { key: "Color Options", value: "20 colors" }, { key: "Lead Time", value: "3-4 weeks" }, { key: "Origin", value: "UAE Fabricated" }], dimensions: { width: 1200, height: 30, depth: 900, unit: "mm", weight: "18kg", notes: "Custom shapes available" }, meta: { title: "Corian Shower Tray", description: "" } }
  ],
  aboutPage: {
    hero: { visible: true, headline: "About InteriorCraft", subtext: "15 years of crafting luxury spaces across the Middle East and beyond.", imageUrl: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1600&q=80" },
    story: { visible: true, heading: "Our Studio Story", body: "InteriorCraft was born from a single belief: that great design has the power to transform lives. Founded in 2009 by a team of passionate designers and craftsmen, we set out to bring European-quality interior solutions to the UAE market.\n\nToday, we are proud to be one of the region's most trusted names in luxury interior furnishings.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
    process: [
      { id: "step-1", icon: "💬", title: "Consultation", description: "We begin with an in-depth consultation to understand your vision, needs, and lifestyle." },
      { id: "step-2", icon: "✏️", title: "Design", description: "Our designers create detailed proposals with 3D visualizations for your approval." },
      { id: "step-3", icon: "🔨", title: "Fabrication", description: "Expert craftsmen bring your design to life using the finest materials." },
      { id: "step-4", icon: "✅", title: "Installation", description: "Our team installs everything with precision and leaves your space immaculate." }
    ],
    team: [
      { id: "tm-1", name: "Alexander Reid", role: "Founder & Creative Director", bio: "With 20 years in luxury interiors, Alex founded InteriorCraft.", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", linkedIn: "" },
      { id: "tm-2", name: "Sofia Al Mansoori", role: "Head of Design", bio: "Sofia brings a unique blend of European training and Middle Eastern sensibility.", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", linkedIn: "" },
      { id: "tm-3", name: "Marcus Chen", role: "Technical Director", bio: "Marcus oversees all fabrication and installation, ensuring every piece meets our exacting standards.", photo: "https://picsum.photos/seed/team3/400/400", linkedIn: "" }
    ],
    values: [
      { id: "val-1", icon: "⭐", title: "Quality Without Compromise", description: "We use only the finest materials." },
      { id: "val-2", icon: "🎨", title: "Design Excellence", description: "Every piece is designed with aesthetics and functionality in mind." },
      { id: "val-3", icon: "🤝", title: "Client Partnership", description: "We build lasting relationships by treating every project as our own home." }
    ],
    awards: [
      { id: "aw-1", year: "2023", title: "Best Interior Supplier", organization: "Dubai Design Week" },
      { id: "aw-2", year: "2022", title: "Excellence in Craftsmanship Award", organization: "Gulf Property Awards" },
      { id: "aw-3", year: "2021", title: "Luxury Brand of the Year", organization: "Middle East Design Forum" }
    ]
  },
  contactPage: {
    phone: "+971 4 123 4567",
    email: "hello@interiorcraft.ae",
    whatsapp: "+971501234567",
    address: "InteriorCraft Showroom\nUnit 5, Design District\nDubai, UAE",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9697!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTUuMCJF!5e0!3m2!1sen!2sae!4v1234567890",
    officeHours: "Monday - Saturday: 9am - 7pm\nSunday: By Appointment",
    formHeading: "Get In Touch",
    formSubtext: "Tell us about your project and we'll get back to you within 24 hours.",
    productOptions: ["Corean & Bowl Vanity", "Fabricated Vanity", "3D Tiles", "Solid Surface", "Complete Bathroom Package", "Other"],
    successMessage: "Thank you for reaching out! Our team will contact you within 24 hours."
  },
  messages: [
    { id: "msg-1", name: "Ahmed Al Rashid", email: "ahmed@example.com", phone: "+971501111111", productInterest: "Fabricated Vanity", message: "I'm looking to renovate two bathrooms in my villa.", date: "2025-03-10T10:30:00Z", status: "new" },
    { id: "msg-2", name: "Jennifer Walsh", email: "jwalsh@luxurydev.com", phone: "+971502222222", productInterest: "Solid Surface", message: "We are developing a 5-star hotel in DIFC and need solid surface solutions.", date: "2025-03-09T14:20:00Z", status: "read" },
    { id: "msg-3", name: "Khalid Mohammed", email: "khalid@home.ae", phone: "+971503333333", productInterest: "3D Tiles", message: "Saw your 3D tiles at a friend's house. Would love to use them in my living room feature wall. What are the sizes available?", date: "2025-03-08T09:15:00Z", status: "new" },
    { id: "msg-4", name: "Maria Santos", email: "maria@design.studio", phone: "+971504444444", productInterest: "Corean & Bowl Vanity", message: "I'm an interior designer working on a high-end residential project. Looking for Corean basin options. Trade pricing available?", date: "2025-03-07T16:45:00Z", status: "archived" },
    { id: "msg-5", name: "Robert Thompson", email: "robert@t.com", phone: "+971505555555", productInterest: "Complete Bathroom Package", message: "Building a new villa with 4 bathrooms. Would like a complete bathroom package consultation.", date: "2025-03-06T11:00:00Z", status: "read" }
  ]
};
