import { Link } from "react-router-dom";
import { ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

const features = [
  { icon: Shield, title: "Trade Assurance", desc: "Secure payments & guaranteed quality" },
  { icon: Globe, title: "Global Reach", desc: "200+ countries, 10M+ suppliers" },
  { icon: TrendingUp, title: "Smart Sourcing", desc: "AI-powered product matching" },
];

const Index = () => {
  const trending = productsData.slice(0, 8);
  const hotDeals = productsData.filter((p) => p.price[0] < 20).slice(0, 4);
  const newArrivals = productsData.slice(-4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero + Category sidebar */}
      <section className="marketplace-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <CategorySidebar />
          </div>

          {/* Hero */}
          <div className="gradient-secondary rounded-xl p-8 md:p-12 flex flex-col justify-center min-h-[340px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,hsl(24,100%,50%),transparent_60%)]" />
            <div className="relative z-10">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">
                Source Products <br />
                <span className="text-gradient-primary">From Global Suppliers</span>
              </h1>
              <p className="text-secondary-foreground/70 text-lg mb-6 max-w-lg">
                Connect with verified manufacturers and wholesalers worldwide. Trade with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-marketplace gradient-primary text-primary-foreground text-base px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Browse Products <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/signup" className="btn-marketplace border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 rounded-lg">
                  Become a Supplier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="marketplace-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="marketplace-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Trending Products</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="marketplace-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">🔥 Hot Deals</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotDeals.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="marketplace-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">New Arrivals</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
