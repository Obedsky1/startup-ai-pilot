
import React from 'react';
import { 
  FileInput, 
  BarChart3, 
  Lightbulb, 
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: "Enter your startup details",
    description: "Share your vision, industry, and business model. The more details you provide, the more personalized insights you'll receive.",
    icon: FileInput,
    delay: 0
  },
  {
    id: 2,
    title: "AI analyzes and validates your business",
    description: "Our advanced AI examines market trends, competition, and growth potential to provide a comprehensive analysis of your startup's viability.",
    icon: BarChart3,
    delay: 0.2
  },
  {
    id: 3,
    title: "Receive actionable insights & recommendations",
    description: "Get detailed feedback on your business model, potential pivots, and optimization strategies tailored specifically to your startup.",
    icon: Lightbulb,
    delay: 0.4
  },
  {
    id: 4,
    title: "Optimize your strategy and scale with confidence",
    description: "Implement AI-driven recommendations to refine your approach, attract investors, and accelerate your startup's growth trajectory.",
    icon: ArrowUpRight,
    delay: 0.6
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-[#0c0c14]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our streamlined process transforms your startup idea into a validated, market-ready business through AI-powered analysis and strategic recommendations.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-neon-purple/0 via-neon-purple/30 to-neon-purple/0 transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${step.delay}s` }}
              >
                <div className="glass p-6 rounded-xl h-full transition-transform duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-neon-purple/10 rounded-full flex items-center justify-center mb-5 relative">
                      <step.icon className="text-neon-purple" size={24} />
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-neon-purple flex items-center justify-center text-xs font-bold text-white">
                        {step.id}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                    <p className="text-foreground/70 text-center">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/get-started">
            <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white px-8 py-6 rounded-full animate-glow">
              Start Your Analysis Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
