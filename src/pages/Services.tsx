import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HardcoreButton from "@/components/HardcoreButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  {
    keyword: "Adapt to AI",
    meaning: "Training users to incorporate AI tools in their daily grind.",
    useCase: "AI onboarding for biz owners: ChatGPT, Zapier, Make.com, Claude.",
  },
  {
    keyword: "Productivity",
    meaning: "Maximize output with fewer resources.",
    useCase: "Time-blocking, automated task reminders, SOP execution via AI.",
  },
  {
    keyword: "High Impact Value",
    meaning: "Tangible results, ROI, and output.",
    useCase: "AI-generated performance reports, time-saved stats, and money-saved reports.",
  },
  {
    keyword: "Analyze and Execute",
    meaning: "A powerful diagnostic and execution engine.",
    useCase: "Upload a business process, get an automation map, and implement with one click.",
  },
  {
    keyword: "Modern Day Tech",
    meaning: "Leveraging tools like Zapier, voice agents, and chatbots.",
    useCase: "Integrate with Stripe, CRMs, Slack, Airtable, and more.",
  },
  {
    keyword: "Flows / Process / Steps",
    meaning: "Workflow templates for every business need.",
    useCase: "Use pre-built flows like “AI Daily Kickstart,” “Lead Funnel Builder,” and “Content Machine.”",
  },
  {
    keyword: "Streamline Everyday Tasks",
    meaning: "Remove manual drudgery from your workday.",
    useCase: "Automate emails, client onboarding, sales tracking, and other repetitive tasks.",
  },
  {
    keyword: "Identify at the Beginning of the Day",
    meaning: "A daily kick-off checklist driven by AI.",
    useCase: "“Hey boss, here's your agenda. 3 tasks are automated, 2 need your input.”",
  },
  {
    keyword: "Fundamentals",
    meaning: "Core tools and logic training to empower your team.",
    useCase: "Learn Automation 101, how bots communicate, API basics, and voice agent setup.",
  },
];

const subAgents = [
  {
    agent: "Keyword Intel (keyword_intel)",
    configDir: "packages/agent_configs/keyword_intel/",
    personaFile: "persona.md",
    functionSchema: "functions.json • extract_keywords",
    extraTools: "file_search",
  },
  {
    agent: "Automation Mapper (automation_mapper)",
    configDir: "packages/agent_configs/automation_mapper/",
    personaFile: "persona.md",
    functionSchema: "functions.json • generate_workflow_map",
    extraTools: "code_interpreter",
  },
  {
    agent: "Interface Architect (interface_architect)",
    configDir: ".../interface_architect/",
    personaFile: "persona.md",
    functionSchema: "functions.json • design_avatar_flow",
    extraTools: "image_generator",
  },
  {
    agent: "LLM Strategist (llm_strategist)",
    configDir: ".../llm_strategist/",
    personaFile: "persona.md",
    functionSchema: "functions.json • select_models",
    extraTools: "browser",
  },
  {
    agent: "Retrieval Agent (retrieval_agent)",
    configDir: ".../retrieval_agent/",
    personaFile: "persona.md",
    functionSchema: "functions.json • rag_query",
    extraTools: "retrieval",
  },
  {
    agent: "Report Generator (report_generator)",
    configDir: ".../report_generator/",
    personaFile: "persona.md",
    functionSchema: "functions.json • create_agent_stack_report • generate_pdf_dashboard",
    extraTools: "code_interpreter",
  },
  {
    agent: "Image Forge (image_forge)",
    configDir: ".../image_forge/",
    personaFile: "persona.md",
    functionSchema: "functions.json • render_arch_diagram",
    extraTools: "image_generator",
  },
];

const Services = () => (
  <div className="container mx-auto py-20">
    <div className="text-center">
      <h1 className="font-heading text-5xl text-white">SERVICES</h1>
      <p className="mt-4 text-lg text-gray-300">Our arsenal of AI weapons, broken down.</p>
    </div>
    <div className="mt-12 overflow-x-auto">
      <Table className="min-w-full border border-cyber-indigo/20 bg-deep-black/30">
        <TableCaption className="mt-6 text-gray-400">A look under the hood at how we weaponize AI for your business.</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-cyber-indigo/20 hover:bg-cyber-indigo/10">
            <TableHead className="w-[220px] font-heading text-base text-hardcore-pink uppercase tracking-wider">Core Concept</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">What It Means For You</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">Real-World Execution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.keyword} className="border-b border-cyber-indigo/20 last:border-b-0 hover:bg-cyber-indigo/10">
              <TableCell className="align-top font-bold text-white">{feature.keyword}</TableCell>
              <TableCell className="align-top text-gray-300">{feature.meaning}</TableCell>
              <TableCell className="align-top text-gray-300">{feature.useCase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="mt-20 text-center">
        <h2 className="font-heading text-4xl text-white">Sub-Agent Blueprint</h2>
        <p className="mt-4 text-lg text-gray-300">Specialized agents and their operational parameters.</p>
    </div>
    <div className="mt-12 overflow-x-auto">
      <Table className="min-w-full border border-cyber-indigo/20 bg-deep-black/30">
        <TableCaption className="mt-6 text-gray-400">Each agent inherits the master tone but narrows its focus to its domain.</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-cyber-indigo/20 hover:bg-cyber-indigo/10">
            <TableHead className="w-[250px] font-heading text-base text-hardcore-pink uppercase tracking-wider">Sub-Agent (slug)</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">Config Dir</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">Persona File</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">Function Schema(s)</TableHead>
            <TableHead className="font-heading text-base text-hardcore-pink uppercase tracking-wider">Extra Tools</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subAgents.map((agent) => (
            <TableRow key={agent.agent} className="border-b border-cyber-indigo/20 last:border-b-0 hover:bg-cyber-indigo/10">
              <TableCell className="align-top font-bold text-white">{agent.agent}</TableCell>
              <TableCell className="align-top font-mono text-sm text-gray-400">{agent.configDir}</TableCell>
              <TableCell className="align-top font-mono text-sm text-gray-400">{agent.personaFile}</TableCell>
              <TableCell className="align-top text-gray-300">{agent.functionSchema}</TableCell>
              <TableCell className="align-top text-gray-300">{agent.extraTools}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Feed the Machine CTA Section */}
    <div className="mt-24 text-center bg-gradient-to-r from-hardcore-pink/10 to-cyber-indigo/20 rounded-2xl p-12 border border-hardcore-pink/20">
      <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">READY TO UNLEASH THE BEAST?</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        You've seen the weapons. You know what we're capable of. Now it's time to point this firepower at your competition and watch them crumble.
      </p>
      <Link to="/contact">
        <HardcoreButton className="text-xl px-12 py-6">
          <span>FEED THE MACHINE</span> <ArrowRight size={24} />
        </HardcoreButton>
      </Link>
    </div>
  </div>
);

export default Services;
