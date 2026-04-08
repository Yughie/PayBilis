import { CalendarDays, MapPin, ReceiptText, UserCircle2 } from "lucide-react";
import type { SubscriptionValues } from "../../types";
import { useLanguage } from "../../lib/i18n";

type BillSummaryCardProps = {
  values: SubscriptionValues;
};

export default function BillSummaryCard({ values }: BillSummaryCardProps) {
  const { language, t } = useLanguage();
  const totalAmount = values.billers.reduce(
    (sum, biller) => sum + (Number(biller.estimatedAmount) || 0),
    0,
  );

  const rows = [
    { label: t.summary.subscriber, value: values.fullName, icon: UserCircle2 },
    { label: t.summary.address, value: values.houseAddress, icon: MapPin },
    {
      label: t.summary.billers,
      value: `${values.billers.length} ${t.summary.billersCountUnit}${language === "en" && values.billers.length !== 1 ? "s" : ""}`,
      icon: ReceiptText,
    },
    {
      label: t.summary.schedule,
      value: language === "fil" ? "Bawat biller" : "Per biller",
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="rounded-3xl border border-white/20 bg-slate-950 p-6 text-white shadow-glow ring-1 ring-white/10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
        {t.summary.eyebrow}
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">{t.summary.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{t.summary.description}</p>
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-2 text-right">
          <p className="text-xs text-slate-300">{t.summary.estimated}</p>
          <p className="text-lg font-semibold">
            {totalAmount.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PHP
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {rows.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-4"
          >
            <div className="mt-0.5 rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-slate-200">
          {t.summary.billerDetails}
        </p>
        {values.billers.map((biller, index) => (
          <div
            key={`${biller.billerName}-${index}`}
            className="rounded-2xl border border-white/20 bg-white/5 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {t.summary.billerLabel} {index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {biller.billerName || t.summary.pendingBiller}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {t.summary.account}: {biller.accountNumber || t.summary.pending}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {t.summary.accountName}: {biller.accountName || t.summary.pending}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {t.summary.amount}:{" "}
              {biller.estimatedAmount
                ? `${Number(biller.estimatedAmount).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PHP`
                : t.summary.pending}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {t.summary.collectionDate}:{" "}
              {biller.collectionDate || t.summary.pending}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <p className="text-sm font-semibold text-emerald-200">
          {t.summary.serviceStatus}
        </p>
        <p className="mt-1 text-sm text-slate-300">
          {t.summary.serviceStatusDescription}
        </p>
      </div>
    </aside>
  );
}
