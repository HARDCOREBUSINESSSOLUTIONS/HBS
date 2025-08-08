import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Hardcore Business Solutions";

    const desc = "Privacy policy for Hardcore Business Solutions: how we collect, use, and protect your data.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    // canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/privacy`);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Your privacy matters. This policy explains what data we collect, how we use it, and your rights.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Hardcore Business Solutions ("we", "us", "our") provides AI-powered automation and analytics.
              This Privacy Policy describes how we process personal data when you use our website and services.
            </p>
          </section>

          <section>
            <h2>2. Data We Collect</h2>
            <ul>
              <li>Account and contact information you provide (e.g., name, email).</li>
              <li>Usage data and device information (e.g., pages visited, IP address, browser type).</li>
              <li>Communication content when you contact support or interact with our agent.</li>
              <li>Cookies and similar technologies to enable essential functionality and improve performance.</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Data</h2>
            <ul>
              <li>Provide, maintain, and improve our services.</li>
              <li>Personalize experiences and measure performance.</li>
              <li>Communicate with you about updates, security, and support.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>
              We use essential cookies for authentication and functionality, and optional analytics cookies to understand
              usage. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement technical and organizational measures designed to protect your data. No method of
              transmission or storage is 100% secure; we continuously improve our security practices.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>
            <p>
              We may share data with service providers who help us operate our services (e.g., hosting, analytics). These
              providers are bound by confidentiality and data protection obligations.
            </p>
          </section>

          <section>
            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict processing of your
              personal data. To exercise these rights, contact us using the details below.
            </p>
          </section>

          <section>
            <h2>9. Children</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect changes to our practices or for legal, operational, or regulatory reasons.
              We will update the "Last updated" date below when changes occur.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              For privacy inquiries, contact us via the <Link to="/contact" className="text-primary underline">Contact</Link> page.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </article>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
