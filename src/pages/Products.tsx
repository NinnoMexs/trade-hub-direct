import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/categories";
import productsData from "@/data/products.json";

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (minPrice && p.price[0] < parseFloat(minPrice)) return false;
      if (maxPrice && p.price[1] > parseFloat(maxPrice)) return false;
      if (minRating && p.rating < minRating) return false;
      return true;
    });
  }, [search, selectedCategory, minPrice, maxPrice, minRating]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="marketplace-container py-6">
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
          <div className="flex-1 flex rounded-lg border border-border overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products..."
              className="flex-1 px-4 py-2.5 bg-background text-foreground outline-none text-sm"
            />
            <button type="submit" className="gradient-primary px-4 text-primary-foreground">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-marketplace border border-border"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Filters */}
          <aside className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
            {/* Category */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedCategory(""); setPage(1); }}
                  className={`block w-full text-left text-sm py-1.5 px-2 rounded ${!selectedCategory ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedCategory(c.name); setPage(1); }}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded ${selectedCategory === c.name ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }} className="w-full px-2 py-1.5 border border-border rounded text-sm bg-background" />
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} className="w-full px-2 py-1.5 border border-border rounded text-sm bg-background" />
              </div>
            </div>

            {/* Rating */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Min. Rating</h3>
              <div className="space-y-1">
                {[0, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => { setMinRating(r); setPage(1); }}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded ${minRating === r ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {r === 0 ? "All" : `${r}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {paged.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
            {paged.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">No products match your filters.</div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
