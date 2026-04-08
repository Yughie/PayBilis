import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Facebook,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import logo from "../../../assets/PayBilis Logo.png";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import ServiceCard from "../molecules/ServiceCard";
import SubscriptionForm from "../organisms/SubscriptionForm";

const serviceCards = [
  {
    title: "Door-to-door convenience",
    description:
      "A guided billing subscription flow designed for households that prefer assisted payments and clear scheduling.",
    icon: Clock3,
  },
  {
    title: "Trust-first onboarding",
    description:
      "Built around address verification, account validation, and a clean review step before submission.",
    icon: ShieldCheck,
  },
  {
    title: "Fast recurring setup",
    description:
      "Supports one-time and monthly subscriptions with a simple stepper that keeps the process efficient.",
    icon: Zap,
  },
];

const contactChannels = [
  {
    title: "Facebook",
    description:
      "Send us a message on Facebook for the fastest response and follow-up.",
    value: "https://www.facebook.com/ymperez12/",
    href: "https://www.facebook.com/ymperez12/",
    icon: Facebook,
  },
  {
    title: "Phone",
    description: "Call or text us directly if you need immediate assistance.",
    value: "09381293241",
    href: "tel:09381293241",
    icon: Phone,
  },
];

export default function LandingPage() {
  const scrollToSubscriptionForm = () => {
    document
      .getElementById("subscription-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main id="top" className="bg-slate-50">
      <section className="relative overflow-hidden bg-hero-grid text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-brand-green blur-3xl" />
          <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-8 w-full rounded-[1.75rem] border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md sm:p-5">
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 p-2 shadow-md">
                    <img
                      src={logo}
                      alt="PayBilis logo"
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                      PayBilis
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      Reliable bill setup
                    </p>
                  </div>
                </div>
                <Badge className="w-fit bg-white/10 text-white sm:self-center">
                  Simple bill setup
                </Badge>
              </div>
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A simple way to set up bill payments.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              PayBilis helps households and small businesses set up recurring
              bill payments quickly, clearly, and with easy review before
              submission.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={scrollToSubscriptionForm}
              >
                Setup Subscription <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="border border-white/25 bg-white/5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/10"
                onClick={scrollToHowItWorks}
              >
                Explore How It Works
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                [
                  "Verified address",
                  "We confirm the service location before activation.",
                ],
                [
                  "Simple setup",
                  "Follow a short guided flow to add each biller.",
                ],
                [
                  "Final review",
                  "Check all details before the subscription is submitted.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/20 bg-white/8 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur"
                >
                  <p className="text-sm font-semibold text-emerald-300">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-slate-200">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -left-8 top-8 rounded-[2rem] bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-green/20 blur-3xl" />
              <div className="absolute left-0 bottom-0 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />

              <div className="relative grid gap-4">
                <div className="rounded-[1.5rem] border border-white/20 bg-slate-950/35 p-5 shadow-lg shadow-black/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">
                        PayBilis preview
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        Lower effort, lower travel cost.
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-200">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Door-to-door convenience",
                        value:
                          "No need to queue or travel far just to keep bills on track.",
                      },
                      {
                        label: "Fuel-saving service",
                        value:
                          "Less back-and-forth means lower transport and fuel expense.",
                      },
                      {
                        label: "Lower fee burden",
                        value:
                          "Designed to stay more affordable than many competing options.",
                      },
                      {
                        label: "Simple review",
                        value:
                          "Check every bill before sending so nothing gets missed.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/20 bg-white/7 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                      >
                        <p className="text-sm font-semibold text-emerald-200">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Convenience",
                      value: "Door-to-door support",
                      icon: CheckCircle2,
                    },
                    {
                      label: "Fuel savings",
                      value: "Fewer trips, less spend",
                      icon: ShieldCheck,
                    },
                    {
                      label: "Lower fees",
                      value: "Affordable recurring service",
                      icon: Clock3,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/20 bg-white/7 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                    >
                      <Icon className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                        {label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <Badge>How it works</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Made to be easy to follow.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The flow is broken into clear steps so users can enter their
            details, add billers, and choose collection dates without confusion.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <ServiceCard
            title="1. Enter your details"
            description="Add your name, contact number, and home address to begin."
            icon={BadgeCheck}
          />
          <ServiceCard
            title="2. Add bill information"
            description="Enter the biller name, account number, and account name."
            icon={BrainCircuit}
          />
          <ServiceCard
            title="3. Choose a schedule"
            description="Set the collection date, estimated amount, and payment frequency."
            icon={Zap}
          />
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2rem] border border-slate-300 bg-white p-6 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5 sm:p-8">
          <div className="max-w-2xl">
            <Badge>Contact</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Reach us on Facebook or by phone.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              For questions, updates, or support, Facebook is our primary
              communication channel. You can also call or text the number below.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {contactChannels.map(
              ({ title, description, value, href, icon: Icon }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-emerald-100 p-3 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
                        {title}
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-950">
                        {value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    </div>
                  </div>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <SubscriptionForm />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {serviceCards.map((card) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
