import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Lang } from "@/i18n/translations";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const langs: { code: Lang; label: string }[] = [
  { code: "ar", label: "عربي" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export const Header = () => {
  const { t, lang, setLang } = useI18n();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/products", label: t.nav.products },
    { to: "/services", label: t.nav.services },
    { to: "/tv-apps", label: t.nav.tvApps },
    { to: "/chatbot", label: t.nav.chatbot },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img src={logo} alt="Manar Electro" className="h-9 w-9" width={36} height={36} />
            <Zap className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-accent" />
          </div>
          <span className="font-bold text-lg text-gradient">{t.brand}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-smooth",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangOpen((o) => !o)}
              className="gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase">{lang}</span>
            </Button>
            {langOpen && (
              <div className="absolute end-0 mt-2 w-32 rounded-md bg-popover border border-border shadow-elegant overflow-hidden">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={cn(
                      "block w-full text-start px-3 py-2 text-sm hover:bg-secondary transition-smooth",
                      lang === l.code && "text-primary font-semibold"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <Button asChild variant="outline" size="sm" className="gap-1.5 hidden sm:inline-flex">
              <Link to="/admin"><Shield className="h-4 w-4" /> Admin</Link>
            </Button>
          )}

          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-smooth"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border/50 bg-card/80 backdrop-blur">
          <div className="container py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
