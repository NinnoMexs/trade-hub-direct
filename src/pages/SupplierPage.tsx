import { useParams, Link } from "react-router-dom";
import { Shield, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

const SupplierPage = () => {
  const { id } = useParams();
  const supplierId = Number(id);
  const supplierProducts = productsData.filter((p) => p.supplierId === supplierId);
  const supplier = supplierProducts[0];

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="marketplace-container py-20 text-center">
          <p className="text-muted-foreground">Supplier not found.</p>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">← Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Supplier header */}
      <div className="gradient-secondary">
        <div className="marketplace-container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {supplier.supplier.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-primary-foreground">{supplier.supplier}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-secondary-foreground/70">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8+ years in business</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> China</span>
                {supplier.verified && (
                  <span className="flex items-center gap-1 text-info"><Shield className="w-4 h-4" /> Verified Supplier</span>
                )}
              </div>
            </div>
            <button className="btn-marketplace gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg">
              Contact Supplier
            </button>
          </div>
        </div>
      </div>

      <div className="marketplace-container py-8">
        {/* Description */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-3">About the Company</h2>
          <p className="text-muted-foreground leading-relaxed">
            {supplier.supplier} is a leading manufacturer and exporter specializing in {supplier.category.toLowerCase()} products.
            With over 8 years of experience, we serve customers across 50+ countries with high quality products and competitive pricing.
          </p>
        </div>

        {/* Products */}
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Products ({supplierProducts.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {supplierProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        {/* Contact form */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 max-w-xl">
          <h2 className="font-semibold text-foreground mb-4">Contact This Supplier</h2>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your Name" className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm" />
            <input placeholder="Email" type="email" className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm" />
            <textarea placeholder="Message" rows={4} className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm resize-none" />
            <button type="submit" className="btn-marketplace gradient-primary text-primary-foreground px-8 py-2.5 rounded-lg">Send Inquiry</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierPage;
