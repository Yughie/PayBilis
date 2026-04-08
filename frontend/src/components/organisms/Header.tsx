import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import logo from "../../../assets/PayBilis Logo.png";
import NavItem from "../molecules/NavItem";
import Button from "../atoms/Button";
import { useLanguage } from "../../lib/i18n";

export default function Header() {
  const { t, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSubscriptionForm = () => {
    document
      .getElementById("subscription-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-300/80 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="PayBilis logo"
            className="h-12 w-auto object-contain"
          />
          <div>
            <p className="text-sm font-semibold text-brand-blue">PayBilis</p>
            <p className="text-xs text-slate-500">{t.header.subtitle}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavItem href="#how-it-works">{t.header.howItWorks}</NavItem>
          <NavItem href="#subscription-form">
            {t.header.setupSubscription}
          </NavItem>
          <NavItem href="#summary">{t.header.summary}</NavItem>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-brand-green">
            <ShieldCheck className="h-4 w-4" />
            {t.header.verifiedOnboarding}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={toggleLanguage}
          >
            {t.header.switchTo}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={scrollToSubscriptionForm}
          >
            {t.header.getStarted}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 ring-1 ring-slate-900/5 lg:hidden"
          aria-label={t.header.openMenuLabel}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl lg:hidden sm:px-6"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            <NavItem href="#how-it-works" active>
              {t.header.howItWorks}
            </NavItem>
            <NavItem href="#subscription-form">
              {t.header.setupSubscription}
            </NavItem>
            <NavItem href="#summary">{t.header.summary}</NavItem>
          </nav>

          <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
            >
              {t.header.switchTo}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                scrollToSubscriptionForm();
                setMobileMenuOpen(false);
              }}
            >
              {t.header.getStarted}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
