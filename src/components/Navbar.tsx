import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Categories", href: "/products" },
  { label: "Trade Assurance", href: "#" },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary shadow-lg">
      {/* Top bar */}
      <div className="marketplace-container flex items-center justify-between py-3 gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="font-display text-2xl font-bold text-primary-foreground">
            Trade<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-6">
          <div className="flex w-full rounded-md overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, suppliers..."
              className="flex-1 px-4 py-2.5 text-sm bg-background text-foreground outline-none"
            />
            <button type="submit" className="gradient-primary px-6 text-primary-foreground hover:opacity-90 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-flex text-sm text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="hidden sm:inline-flex btn-marketplace gradient-primary text-primary-foreground text-sm">
            Join Free
          </Link>
          <Link to="/cart" className="relative p-2 text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-secondary-foreground/80">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Nav links - desktop */}
      <nav className="hidden md:block bg-secondary/80 border-t border-secondary-foreground/10">
        <div className="marketplace-container flex items-center gap-6 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
            >
              {link.label}
              <ChevronDown className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary-foreground/10 animate-fade-in">
          <div className="marketplace-container py-4 space-y-3">
            <form onSubmit={handleSearch} className="flex rounded-md overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2.5 text-sm bg-background text-foreground outline-none"
              />
              <button type="submit" className="gradient-primary px-4 text-primary-foreground">
                <Search className="w-5 h-5" />
              </button>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-secondary-foreground/80 hover:text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 border border-secondary-foreground/20 rounded-md text-secondary-foreground/80">Sign In</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 gradient-primary text-primary-foreground rounded-md">Join Free</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
