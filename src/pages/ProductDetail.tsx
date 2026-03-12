import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, MessageSquare, Truck, Shield, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import productsData from "@/data/products.json";
import { toast } from "sonner";

const tabs = ["Description", "Specifications", "Reviews"];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const [activeTab, setActiveTab] = useState("Description");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="marketplace-container py-20 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, minOrder: product.minOrder });
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="marketplace-container py-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-8">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold text-foreground">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">${product.price[0].toFixed(2)} - ${product.price[1].toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">Min. order: {product.minOrder} {product.minOrder === 1 ? "piece" : "pieces"}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4" /> Shipping: Estimated 7-15 business days
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" /> Trade Assurance: Buyer protection included
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleAddToCart} className="flex-1 btn-marketplace gradient-primary text-primary-foreground py-3 rounded-lg">
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </button>
              <button className="flex-1 btn-marketplace border border-primary text-primary hover:bg-primary/5 py-3 rounded-lg">
                <MessageSquare className="w-4 h-4 mr-2" /> Request Quote
              </button>
            </div>
          </div>

          {/* Supplier card */}
          <div className="bg-card border border-border rounded-lg p-5 h-fit space-y-4">
            <h3 className="font-semibold text-foreground">{product.supplier}</h3>
            {product.verified && (
              <span className="inline-block text-xs bg-info/10 text-info px-2 py-1 rounded font-medium">✓ Verified Supplier</span>
            )}
            <p className="text-sm text-muted-foreground">{product.category} specialist</p>
            <Link
              to={`/supplier/${product.supplierId}`}
              className="block w-full btn-marketplace border border-border text-foreground hover:bg-accent text-sm py-2 rounded-lg text-center"
            >
              View Supplier Profile
            </Link>
            <button className="block w-full btn-marketplace gradient-primary text-primary-foreground text-sm py-2 rounded-lg">
              Contact Supplier
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b border-border gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === "Description" && <p className="text-foreground leading-relaxed">{product.description}</p>}
            {activeTab === "Specifications" && (
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex border-b border-border py-2">
                    <span className="w-40 text-sm font-medium text-foreground">{key}</span>
                    <span className="text-sm text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "Reviews" && <p className="text-muted-foreground">Reviews coming soon. ({product.reviews} reviews available)</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
