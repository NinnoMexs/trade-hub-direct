import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = items.reduce((sum, i) => sum + i.price[0] * i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="marketplace-container py-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/products" className="btn-marketplace gradient-primary text-primary-foreground px-8 py-2.5 rounded-lg">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="text-sm font-medium text-foreground hover:text-primary line-clamp-1">{item.name}</Link>
                    <p className="text-primary font-bold mt-1">${item.price[0].toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:bg-accent">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:bg-accent">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear Cart</button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 h-fit">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>TBD</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <button className="w-full btn-marketplace gradient-primary text-primary-foreground py-3 rounded-lg mt-4">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
