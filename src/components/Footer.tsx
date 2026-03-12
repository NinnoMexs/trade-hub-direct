import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground/70 mt-16">
    <div className="marketplace-container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
          Trade<span className="text-primary">Hub</span>
        </h4>
        <p className="text-sm leading-relaxed">The leading B2B marketplace connecting global buyers with verified suppliers.</p>
      </div>
      {[
        { title: "Company", links: [["About Us", "#"], ["Careers", "#"], ["Press", "#"]] },
        { title: "Support", links: [["Help Center", "#"], ["Trade Assurance", "#"], ["Contact", "#"]] },
        { title: "Quick Links", links: [["Products", "/products"], ["Suppliers", "/suppliers"], ["Sign Up", "/signup"]] },
      ].map((col) => (
        <div key={col.title}>
          <h5 className="font-semibold text-primary-foreground mb-4">{col.title}</h5>
          <ul className="space-y-2 text-sm">
            {col.links.map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="hover:text-primary transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-secondary-foreground/10 py-4">
      <div className="marketplace-container text-center text-xs text-secondary-foreground/50">
        © 2026 TradeHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
