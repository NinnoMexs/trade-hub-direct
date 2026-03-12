import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number[];
  minOrder: number;
  supplier: string;
  rating: number;
  image: string;
  verified?: boolean;
}

const ProductCard = ({ id, name, price, minOrder, supplier, rating, image, verified }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-card rounded-lg border border-border overflow-hidden product-card-hover"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-lg font-bold text-primary">
          ${price[0].toFixed(2)} - ${price[1].toFixed(2)}
        </p>

        <p className="text-xs text-muted-foreground">
          Min. order: {minOrder} {minOrder === 1 ? "piece" : "pieces"}
        </p>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-warning text-warning" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{rating}</span>
        </div>

        <div className="flex items-center gap-1 pt-1">
          <span className="text-xs text-muted-foreground truncate">{supplier}</span>
          {verified && (
            <span className="flex-shrink-0 text-[10px] bg-info/10 text-info px-1.5 py-0.5 rounded font-medium">
              ✓ Verified
            </span>
          )}
        </div>

        <button className="w-full mt-2 btn-marketplace bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-sm py-2">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
