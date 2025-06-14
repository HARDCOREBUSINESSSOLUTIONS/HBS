
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  </div>
);
export default Services;
