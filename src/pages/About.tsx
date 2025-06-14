
import React from 'react';

const About = () => (
  <div className="container mx-auto max-w-4xl py-20 text-gray-300">
    <h1 className="font-heading text-5xl text-white text-center mb-12">Hardcore Intelligence Control System</h1>

    <div className="space-y-12">
      <section>
        <h2 className="font-heading text-3xl text-hardcore-pink mb-4">About Us</h2>
        <p className="text-lg leading-relaxed">
          Welcome to the bleeding edge of AI. <strong>Hardcore Enterprise</strong> has always operated where others fear to go — at the front line of innovation, automation, and real-world AI deployment. We're now unifying everything into one centralized command system.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          The <strong>Hardcore Intelligence Control System</strong> is your ultimate AI augmentation engine — designed to control chaos, extract actionable intelligence, and give you unmatched operational clarity in record time.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-3xl text-hardcore-pink mb-6">System Features</h2>
        <ul className="space-y-6">
          <li className="flex items-start">
            <span className="text-2xl mr-4">🔥</span>
            <div>
              <h3 className="font-bold text-white text-xl">Multi-Agent Architecture</h3>
              <p>7+ Specialized AI agents work in sync to extract, analyze, and deliver solutions tailored to user intent.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">🌐</span>
            <div>
              <h3 className="font-bold text-white text-xl">Website Data Scraping (With Consent)</h3>
              <p>If permitted, our agents will scrape your website and auto-generate structured business insight.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">🧠</span>
            <div>
              <h3 className="font-bold text-white text-xl">Intent + Keyword Extraction</h3>
              <p>Short questions convert into detailed prompts. We extract goals, problems, and opportunities in seconds.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">⚙️</span>
            <div>
              <h3 className="font-bold text-white text-xl">Workflow Generation</h3>
              <p>Pipe scraped and structured data directly into automation platforms (n8n, Zapier, Make, etc.).</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">📊</span>
            <div>
              <h3 className="font-bold text-white text-xl">Dynamic Output Plans</h3>
              <p>We generate multiple strategy versions—current-state optimization or entirely new builds.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">🔁</span>
            <div>
              <h3 className="font-bold text-white text-xl">Feedback-Based Refinement</h3>
              <p>Your inputs continuously optimize the AI pipeline and content delivery.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">📲</span>
            <div>
              <h3 className="font-bold text-white text-xl">User Data Integration</h3>
              <p>Name, email, SMS-compatible phone number collected securely to trigger full customized pipelines.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4">🧱</span>
            <div>
              <h3 className="font-bold text-white text-xl">Hardcore Unified Stack</h3>
              <p>Built on OpenAI Agent SDK, Supabase, Whisper, D-ID, and powered by real-time cloud infrastructure.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="text-center pt-8">
        <h2 className="font-heading text-3xl text-hardcore-pink mb-4">Why Hardcore?</h2>
        <p className="text-xl italic">
          We don’t follow trends. We build the future.
        </p>
        <p className="mt-2 text-xl font-bold text-white">
          Hardcore Enterprise isn’t just a brand — it’s a war cry for high-performance AI systems that get shit done.
        </p>
      </section>
    </div>
  </div>
);

export default About;
