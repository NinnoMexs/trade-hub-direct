import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Required";
    if (!form.email) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length === 0) toast.success("Account created! (Demo)");
  };

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-card rounded-xl border border-border shadow-lg p-8">
          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Join millions of buyers and suppliers</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name", icon: User, placeholder: "Full Name", type: "text" },
              { key: "company", icon: Building, placeholder: "Company Name (optional)", type: "text" },
              { key: "email", icon: Mail, placeholder: "Email address", type: "email" },
            ].map(({ key, icon: Icon, placeholder, type }) => (
              <div key={key}>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={type} value={(form as any)[key]} onChange={update(key)} placeholder={placeholder} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm" />
                </div>
                {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={update("password")} placeholder="Password" className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full btn-marketplace gradient-primary text-primary-foreground py-2.5 rounded-lg">Create Account</button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
