
import HardcoreButton from "@/components/HardcoreButton";
import { Zap, BrainCircuit, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

const services = [
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
          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <HardcoreButton>
              <span>LAUNCH THE AGENT</span> <span className="text-hardcore-pink">🔥</span>
            </HardcoreButton>
          </div>
        </div>
      </section>

      {/* Avatar Section Placeholder */}
      <section className="py-20 bg-deep-black text-center">
         <div className="container mx-auto">
            <div className="max-w-md mx-auto bg-cyber-indigo border border-hardcore-pink/20 rounded-xl p-8 shadow-2xl shadow-hardcore-pink/10">
                <Cpu size={48} className="mx-auto text-hardcore-pink animate-glow" />
                <h2 className="font-heading text-3xl text-white mt-4">AGENT ONLINE</h2>
                <p className="text-gray-400 mt-2">D-ID Avatar Player embeds here. Ready to brief you on your company's new potential.</p>
                 <p className="text-xs text-gray-500 mt-4 italic">To integrate, replace this div with your D-ID streaming code.</p>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-cyber-indigo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 border border-hardcore-pink/20 rounded-2xl bg-deep-black/30 backdrop-blur-sm transition-all duration-300 hover:border-hardcore-pink hover:bg-deep-black/50 hover:-translate-y-2"
                style={{ animation: `fade-in-up 0.5s ease-out ${0.2 * (index + 1)}s forwards`, opacity: 0 }}
              >
                <service.icon size={36} className="text-hardcore-pink transition-all duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-2xl text-white mt-6">{service.title}</h3>
                <p className="text-gray-400 mt-3">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Final CTA */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto text-center">
            <h2 className="font-heading text-5xl md:text-6xl text-white">READY TO DOMINATE?</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">Stop leaving money on the table. It's time to upgrade your operations.</p>
            <div className="mt-8">
              <HardcoreButton>
                  <span>BOOK A DEMO</span> <ArrowRight size={20} />
              </HardcoreButton>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
