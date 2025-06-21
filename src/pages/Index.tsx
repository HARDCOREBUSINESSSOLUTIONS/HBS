
import HardcoreButton from "@/components/HardcoreButton";
import { Zap, BrainCircuit, ShieldCheck, Clock, DollarSign, Users, CheckCircle, Star, ArrowRight, Cog } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { value: "300%", label: "Revenue Increase" },
  { value: "24/7", label: "Automation" },
  { value: "50+", label: "Happy Clients" },
];

const solutions = [
  {
    icon: Zap,
    title: "AI-POWERED AUTOMATION",
    description: "We build and deploy autonomous agents that run your operations 24/7. No breaks, no excuses."
  },
  {
    icon: BrainCircuit,
    title: "STRATEGIC DOMINANCE",
    description: "Your competition is still in meetings. Our AI strategy puts you three steps ahead, always."
  },
  {
    icon: ShieldCheck,
    title: "BRAND WEAPONIZATION",
    description: "We craft aggressive, high-conversion brand identities that don't just speak—they conquer."
  },
  {
    icon: Clock,
    title: "INSTANT DEPLOYMENT",
    description: "From consultation to implementation in record time. Your efficiency upgrade starts immediately."
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: "Save 10+ Hours Weekly",
    description: "Automate repetitive tasks and focus on what matters most"
  },
  {
    icon: Users,
    title: "Scale Without Limits",
    description: "Our AI solutions grow with your business demands"
  },
  {
    icon: CheckCircle,
    title: "99.9% Uptime",
    description: "Reliable automation that never sleeps or takes breaks"
  }
];

const processSteps = [
  {
    step: "1",
    title: "ANALYZE",
    description: "We audit your current operations and identify bottlenecks"
  },
  {
    step: "2", 
    title: "AUTOMATE",
    description: "Deploy custom AI agents tailored to your specific needs"
  },
  {
    step: "3",
    title: "DOMINATE",
    description: "Watch your efficiency skyrocket while competitors struggle"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    content: "Hardcore transformed our operations completely. We're now processing 5x more clients with the same team.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez", 
    role: "Founder, AutoScale",
    content: "The AI automation saved us 40 hours per week. ROI was visible within the first month.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "COO, DataDrive",
    content: "Best investment we've made. Their agents handle everything while we focus on growth.",
    rating: 5
  }
];

const faqs = [
  {
    question: "How quickly can you implement automation?",
    answer: "Most implementations are live within 48-72 hours. We prioritize speed without compromising quality."
  },
  {
    question: "What if the AI agents need adjustments?",
    answer: "All our solutions include 30 days of free optimization and 24/7 monitoring to ensure peak performance."
  },
  {
    question: "How much can we expect to save?",
    answer: "Clients typically see 60-80% reduction in manual work and 200-400% ROI within the first quarter."
  }
];

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-deep-black opacity-50 z-10"></div>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-tighter animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Automate or
            <br />
            <span className="text-hardcore-pink">Get Left Behind</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            We weaponize AI to destroy inefficiency. Your business, supercharged. Tap in, or tap out.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/services">
              <HardcoreButton>
                <span>SEE THE ARSENAL</span> <Cog size={20} />
              </HardcoreButton>
            </Link>
            <Link to="/contact">
              <HardcoreButton className="bg-deep-black border-2 border-hardcore-pink text-hardcore-pink hover:bg-hardcore-pink hover:text-white">
                <span>FEED THE MACHINE</span> <span className="text-2xl">⚡</span>
              </HardcoreButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-cyber-indigo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="p-6">
                <div className="text-5xl font-heading text-hardcore-pink mb-2">{metric.value}</div>
                <div className="text-gray-300 text-lg uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Old Way vs New Way Comparison */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">OLD WAY VS NEW WAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border-2 border-red-500 rounded-lg bg-red-500/10">
              <h3 className="font-heading text-2xl text-red-400 mb-4">OLD WAY</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Manual processes eating your time</li>
                <li>• Human errors costing money</li>
                <li>• Limited scaling capacity</li>
                <li>• Competitors getting ahead</li>
              </ul>
            </div>
            <div className="p-8 border-2 border-hardcore-pink rounded-lg bg-hardcore-pink/10">
              <h3 className="font-heading text-2xl text-hardcore-pink mb-4">NEW WAY</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• AI agents handling everything</li>
                <li>• Zero human errors</li>
                <li>• Unlimited scaling potential</li>
                <li>• You dominating the market</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-cyber-indigo">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">OUR SOLUTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className="group p-8 border border-hardcore-pink/20 rounded-2xl bg-deep-black/30 backdrop-blur-sm transition-all duration-300 hover:border-hardcore-pink hover:bg-deep-black/50 hover:-translate-y-2"
              >
                <solution.icon size={36} className="text-hardcore-pink transition-all duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-2xl text-white mt-6">{solution.title}</h3>
                <p className="text-gray-400 mt-3">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">BENEFITS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center p-6">
                <benefit.icon size={48} className="text-hardcore-pink mx-auto mb-4" />
                <h3 className="font-heading text-xl text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-cyber-indigo">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-hardcore-pink rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading text-2xl text-white">{step.step}</span>
                </div>
                <h3 className="font-heading text-2xl text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">TESTIMONIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="p-6 border border-hardcore-pink/20 rounded-lg bg-cyber-indigo/30">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-hardcore-pink fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-hardcore-pink">
        <div className="container mx-auto text-center px-4">
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-4">READY TO DOMINATE?</h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">Stop leaving money on the table. It's time to upgrade your operations.</p>
          <Link to="/contact">
            <HardcoreButton className="bg-white text-hardcore-pink hover:bg-gray-100">
              <span>BOOK A DEMO</span> <ArrowRight size={20} />
            </HardcoreButton>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-white mb-16">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-hardcore-pink/20 rounded-lg p-6 bg-cyber-indigo/20">
                <h3 className="font-semibold text-white text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
