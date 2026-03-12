import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

const CategorySidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative z-20">
      <div className="bg-card border border-border rounded-lg">
        <h3 className="gradient-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-t-lg">
          Categories
        </h3>
        <ul>
          {categories.map((cat, index) => (
            <li
              key={cat.name}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${index === categories.length - 1 ? "rounded-b-lg" : ""}`}
              >
                <span>
                  {cat.icon} {cat.name}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              {/* Mega dropdown - positioned relative to hovered item */}
              {hoveredIndex === index && (
                <div
                  className="absolute left-full top-0 ml-1 w-64 bg-card border border-border rounded-lg shadow-xl p-4 z-50 animate-fade-in"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h4 className="font-semibold text-foreground mb-3">{cat.name}</h4>
                  <div className="space-y-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/products?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                        className="block text-sm text-muted-foreground hover:text-primary py-1.5 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
