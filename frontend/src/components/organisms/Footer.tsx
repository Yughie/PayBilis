import { useLanguage } from "../../lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:px-8">
        <div className="space-y-2">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-slate-600">
          <p className="text-sm font-semibold text-slate-900">
            {t.footer.creatorTitle}
          </p>
          <p className="mt-2 leading-6">{t.footer.creatorDescription}</p>
        </div>
      </div>
    </footer>
  );
}
