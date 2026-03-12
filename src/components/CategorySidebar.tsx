import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

const CategorySidebar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <h3 className="gradient-primary text-primary-foreground text-sm font-semibold px-4 py-3">
          Categories
        </h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.name}
              onMouseEnter={() => setHovered(cat.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>
                  {cat.icon} {cat.name}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mega dropdown */}
      {hovered && (
        <div
          className="absolute left-full top-0 ml-1 w-64 bg-card border border-border rounded-lg shadow-xl p-4 z-10 animate-fade-in"
          onMouseEnter={() => setHovered(hovered)}
          onMouseLeave={() => setHovered(null)}
        >
          <h4 className="font-semibold text-foreground mb-3">{hovered}</h4>
          <div className="space-y-1">
            {categories
              .find((c) => c.name === hovered)
              ?.subcategories.map((sub) => (
                <Link
                  key={sub}
                  to={`/products?category=${encodeURIComponent(hovered)}&sub=${encodeURIComponent(sub)}`}
                  className="block text-sm text-muted-foreground hover:text-primary py-1.5 transition-colors"
                >
                  {sub}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;
