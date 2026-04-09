import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowRight,
  CheckCircle2,
  CircleCheckBig,
  ClipboardList,
  HandCoins,
  House,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import logo from "../../../assets/PayBilis Logo.png";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import FormField from "../molecules/FormField";
import BillSummaryCard from "./BillSummaryCard";
import type { SubscriptionValues } from "../../types";
import { createSubscription } from "../../lib/api";
import { getFrequencyLabel, useLanguage } from "../../lib/i18n";

const defaultValues: SubscriptionValues = {
  fullName: "",
  contactNumber: "",
  houseAddress: "",
  frequency: "Monthly Subscription",
  billers: [
    {
      billerName: "",
      accountNumber: "",
      accountName: "",
      estimatedAmount: "",
      collectionDate: "",
    },
  ],
};

const steps = [
  {
    title: "Personal",
    icon: House,
    fields: ["fullName", "contactNumber", "houseAddress"] as const,
  },
  { title: "Account", icon: ClipboardList, fields: [] as const },
  { title: "Schedule", icon: HandCoins, fields: ["frequency"] as const },
  { title: "Review", icon: CircleCheckBig, fields: [] as const },
];

export default function SubscriptionForm() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const FACEBOOK_PAGE_URL =
    "https://www.facebook.com/profile.php?id=61574253067228";

  const {
    control,
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionValues>({
    defaultValues,
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "billers",
  });

  const values = watch();

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const onNext = async () => {
    const stepFields = steps[step].fields;
    if (step === 1) {
      const billerFields = fields.flatMap((_, index) => [
        `billers.${index}.billerName`,
        `billers.${index}.accountNumber`,
        `billers.${index}.accountName`,
        `billers.${index}.estimatedAmount`,
        `billers.${index}.collectionDate`,
      ]);
      const valid = await trigger(billerFields as any);
      if (!valid) return;
    } else if (stepFields.length) {
      const valid = await trigger(stepFields);
      if (!valid) return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const onBack = () => setStep((current) => Math.max(current - 1, 0));

  const onSubmit = handleSubmit(async (formValues) => {
    setSubmitError(null);
    try {
      await createSubscription(formValues);
      reset(defaultValues);
      setStep(0);
      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit subscription.";
      setSubmitError(message);
    }
  });

  const addBiller = () => {
    append({
      billerName: "",
      accountNumber: "",
      accountName: "",
      estimatedAmount: "",
      collectionDate: "",
    });
  };

  const closeConfirmationModal = () => {
    setSubmitted(false);
  };

  return (
    <section
      id="subscription-form"
      className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.25fr_0.9fr] lg:px-8"
    >
      <div className="rounded-[2rem] border border-slate-300 bg-white p-6 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
              {t.form.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              {t.form.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-brand-blue">
            <ShieldCheck className="h-4 w-4" />
            {t.form.allFieldsRequired}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
            <span>
              {t.form.stepLabel} {step + 1} of {steps.length}
            </span>
            <span>
              {Math.round(progress)}% {t.form.completeLabel}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const active = index <= step;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-3 ring-1 ${active ? "border-brand-green bg-emerald-50 ring-emerald-200/60" : "border-slate-300 bg-slate-50 ring-slate-900/5"}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`h-4 w-4 ${active ? "text-brand-green" : "text-slate-400"}`}
                    />
                    <p className="text-sm font-medium text-slate-700">
                      {t.form.steps[index].title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6">
            {step === 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label={t.form.personal.fullName}
                  error={errors.fullName?.message}
                >
                  <Input
                    placeholder={t.form.personal.fullNamePlaceholder}
                    {...register("fullName", {
                      required: t.form.personal.fullNameError,
                    })}
                    error={errors.fullName?.message}
                  />
                </FormField>
                <FormField
                  label={t.form.personal.contactNumber}
                  error={errors.contactNumber?.message}
                >
                  <Input
                    placeholder={t.form.personal.contactNumberPlaceholder}
                    {...register("contactNumber", {
                      required: t.form.personal.contactNumberError,
                    })}
                    error={errors.contactNumber?.message}
                  />
                </FormField>
                <div className="md:col-span-2">
                  <FormField
                    label={t.form.personal.houseAddress}
                    error={errors.houseAddress?.message}
                    hint={t.form.personal.houseAddressHint}
                  >
                    <Input
                      placeholder={t.form.personal.houseAddressPlaceholder}
                      {...register("houseAddress", {
                        required: t.form.personal.houseAddressError,
                      })}
                      error={errors.houseAddress?.message}
                    />
                  </FormField>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                {fields.map((field, index) => {
                  const billerErrors = errors.billers?.[index];

                  return (
                    <div
                      key={field.id}
                      className="rounded-3xl border border-slate-300 bg-slate-50 p-5 ring-1 ring-slate-900/5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {t.form.billers.title} {index + 1}
                          </p>
                          <p className="text-xs text-slate-500">
                            {t.form.billers.description}
                          </p>
                        </div>
                        {fields.length > 1 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            {t.form.billers.remove}
                          </Button>
                        ) : null}
                      </div>

                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <FormField
                          label={t.form.billers.billerName}
                          error={billerErrors?.billerName?.message}
                          hint={t.form.billers.billerNameHint}
                        >
                          <Input
                            placeholder={t.form.billers.billerNamePlaceholder}
                            {...register(
                              `billers.${index}.billerName` as const,
                              { required: t.form.billers.billerNameError },
                            )}
                            error={billerErrors?.billerName?.message}
                          />
                        </FormField>
                        <FormField
                          label={t.form.billers.accountNumber}
                          error={billerErrors?.accountNumber?.message}
                        >
                          <Input
                            placeholder={
                              t.form.billers.accountNumberPlaceholder
                            }
                            {...register(
                              `billers.${index}.accountNumber` as const,
                              { required: t.form.billers.accountNumberError },
                            )}
                            error={billerErrors?.accountNumber?.message}
                          />
                        </FormField>
                        <FormField
                          label={t.form.billers.accountName}
                          error={billerErrors?.accountName?.message}
                        >
                          <Input
                            placeholder={t.form.billers.accountNamePlaceholder}
                            {...register(
                              `billers.${index}.accountName` as const,
                              { required: t.form.billers.accountNameError },
                            )}
                            error={billerErrors?.accountName?.message}
                          />
                        </FormField>
                        <FormField
                          label={t.form.billers.estimatedAmount}
                          error={billerErrors?.estimatedAmount?.message}
                        >
                          <Input
                            type="number"
                            placeholder={
                              t.form.billers.estimatedAmountPlaceholder
                            }
                            {...register(
                              `billers.${index}.estimatedAmount` as const,
                              { required: t.form.billers.estimatedAmountError },
                            )}
                            error={billerErrors?.estimatedAmount?.message}
                          />
                        </FormField>
                        <FormField
                          label={t.form.billers.collectionDate}
                          error={billerErrors?.collectionDate?.message}
                          hint={t.form.billers.collectionDateHint}
                        >
                          <select
                            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-900/5 transition focus:border-brand-green focus:ring-4 focus:ring-brand-green/20"
                            {...register(
                              `billers.${index}.collectionDate` as const,
                              { required: t.form.billers.collectionDateError },
                            )}
                          >
                            <option value="">
                              {t.form.billers.collectionDatePlaceholder}
                            </option>
                            {t.form.billers.collectionDateOptions.map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>
                        </FormField>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-start">
                  <Button type="button" variant="secondary" onClick={addBiller}>
                    {t.form.addBiller}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>{t.form.frequency}</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {t.form.frequencyOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ring-1 transition ${values.frequency === option.value ? "border-brand-green bg-emerald-50 ring-emerald-200/60" : "border-slate-300 bg-white ring-slate-900/5"}`}
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {option.label}
                        </span>
                        <input
                          type="radio"
                          value={option.value}
                          className="h-4 w-4 text-brand-green"
                          {...register("frequency", { required: true })}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-3xl border border-slate-300 bg-slate-50 p-6 ring-1 ring-slate-900/5">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-emerald-100 p-2 text-brand-green">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t.form.review.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t.form.review.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    [t.form.review.details[0], values.fullName],
                    [t.form.review.details[1], values.contactNumber],
                    [t.form.review.details[2], values.houseAddress],
                    [t.form.review.details[3], `${values.billers.length}`],
                    [
                      t.form.review.details[4],
                      getFrequencyLabel(language, values.frequency),
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {value || t.form.pending}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submitError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {submitError}
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={step === 0}
              >
                {t.form.back}
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={onNext}>
                  {t.form.continue}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => void onSubmit()}
                  disabled={isSubmitting}
                >
                  {t.form.submit}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t.form.submittedTitle}
            onClick={closeConfirmationModal}
          >
            <div
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-200/80 bg-white shadow-2xl ring-1 ring-slate-900/5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-emerald-500 to-brand-green" />
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <img
                          src={logo}
                          alt="PayBilis logo"
                          className="h-30 w-50 rounded-2xl bg-white object-contain p-2 ring-1 ring-slate-200"
                        />
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                        {t.form.submittedTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {t.form.submittedDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Stay updated
                  </p>
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-brand-blue ring-1 ring-slate-200 transition hover:text-brand-green hover:ring-brand-green/40"
                  >
                    Facebook: PayBilis
                  </a>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={closeConfirmationModal}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => window.open(FACEBOOK_PAGE_URL, "_blank")}
                  >
                    Open Facebook Page
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="summary" className="space-y-6">
        <BillSummaryCard values={values} />
        <div className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
            {t.form.trustedControls}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {t.form.trustedControlItems.map((item, index) => {
              const icons = [ShieldCheck, Sparkles, CircleCheckBig] as const;
              const Icon = icons[index];

              return (
                <li key={item} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 text-brand-green" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
