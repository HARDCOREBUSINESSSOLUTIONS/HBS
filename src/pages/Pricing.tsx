import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Kickstart automation with core features.",
    features: [
      "Basic live agent",
      "Email support",
      "Community access",
    ],
    cta: { label: "Get started", to: "/contact" },
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "Scale with advanced analytics and integrations.",
    features: [
      "Advanced agent + analytics",
      "Priority support",
      "CRM sync",
    ],
    cta: { label: "Start Pro", to: "/contact" },
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Battle-tested automation tailored to your org.",
    features: [
      "Dedicated infra",
      "SSO & compliance",
      "Custom workflows",
    ],
    cta: { label: "Talk to sales", to: "/contact" },
    featured: false,
  },
];

const Pricing: React.FC = () => {
  useEffect(() => {
    document.title = "Pricing | Hardcore Business Solutions";

    const desc = "Transparent pricing for Hardcore Business Solutions. Choose Starter, Pro, or Enterprise.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/pricing`);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
          <p className="mt-2 text-muted-foreground">
            Simple plans that scale with your ambition.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative rounded-xl border border-border bg-card p-6 shadow ${tier.featured ? "ring-1 ring-primary" : ""}`}
            >
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <p className="mt-1 text-muted-foreground">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
              </div>

              <ul className="mt-6 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link to={tier.cta.to} aria-label={`${tier.name} plan - ${tier.cta.label}`}>
                  <Button className="w-full">{tier.cta.label}</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Pricing;
