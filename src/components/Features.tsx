
import React from 'react';
import { Lightbulb, Zap, CheckCircle, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const featureData = [
  {
    id: 1,
    title: "Product Tester",
    description: "Analyze every aspect of your startup's product for market readiness.",
    icon: CheckCircle,
    color: "neon-blue",
    delay: 0
  },
  {
    id: 2,
    title: "Business AI Brainstorming",
    description: "Refine your business idea with AI-powered insights.",
    icon: Lightbulb,
    color: "neon-purple",
    delay: 0.2
  },
  {
    id: 3,
    title: "Startup Validator",
    description: "Get an in-depth analysis of your startup's strengths & opportunities.",
    icon: Zap,
    color: "neon-pink",
    delay: 0.4
  },
  {
    id: 4,
    title: "Business Architecture Builder",
    description: "Map out your startup's structure for scalable growth.",
    icon: BarChart,
    color: "neon-orange",
    delay: 0.6
  }
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-[#0c0c14]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI-Powered <span className="text-gradient">Features</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our platform provides cutting-edge tools to validate, optimize, and scale your startup with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const FeatureCard = ({ title, description, icon: Icon, color, delay }: FeatureCardProps) => {
  return (
    <div 
      className="glass p-6 md:p-8 rounded-xl flex flex-col items-center md:items-start text-center md:text-left opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn(
        "w-14 h-14 mb-6 rounded-lg flex items-center justify-center",
        color === "neon-purple" && "bg-neon-purple/10 text-neon-purple",
        color === "neon-blue" && "bg-neon-blue/10 text-neon-blue",
        color === "neon-pink" && "bg-neon-pink/10 text-neon-pink",
        color === "neon-orange" && "bg-neon-orange/10 text-neon-orange"
      )}>
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export default Features;
