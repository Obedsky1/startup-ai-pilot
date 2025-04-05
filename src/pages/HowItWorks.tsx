
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  // Set darker background
  React.useEffect(() => {
    document.body.classList.add('bg-[#0a0a14]');
    return () => {
      document.body.classList.remove('bg-[#0a0a14]');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">How StartupAI</span> Works
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our AI-powered platform helps you validate, optimize, and scale your startup through data-driven insights and expert guidance.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="glass p-8 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="bg-neon-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-neon-purple font-bold text-xl">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Share Your Startup Details</h3>
                <p className="text-foreground/70 mb-6">
                  Tell us about your startup idea, target market, and current challenges. The more details you provide, the more tailored our analysis will be.
                </p>
                <div className="space-y-2">
                  <FeatureItem text="Simple onboarding process" />
                  <FeatureItem text="Secure data handling" />
                  <FeatureItem text="Quick 5-minute setup" />
                </div>
              </div>
              <div className="md:col-span-3">
                <img 
                  src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Startup team sharing details" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass p-8 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 md:order-1 order-2">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="AI analysis visualization" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
              <div className="md:col-span-2 md:order-2 order-1">
                <div className="bg-neon-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Analysis</h3>
                <p className="text-foreground/70 mb-6">
                  Our advanced AI system analyzes your startup against market trends, competitor data, and success patterns from thousands of startups.
                </p>
                <div className="space-y-2">
                  <FeatureItem text="Market trend analysis" />
                  <FeatureItem text="Competitor benchmarking" />
                  <FeatureItem text="Risk assessment" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass p-8 rounded-2xl mb-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="bg-neon-pink/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-neon-pink font-bold text-xl">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Get Actionable Insights</h3>
                <p className="text-foreground/70 mb-6">
                  Receive personalized recommendations, growth strategies, and validation insights that you can immediately implement in your business.
                </p>
                <div className="space-y-2">
                  <FeatureItem text="Strategic recommendations" />
                  <FeatureItem text="Implementation roadmap" />
                  <FeatureItem text="Resource optimization" />
                </div>
              </div>
              <div className="md:col-span-3">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Team reviewing insights" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/get-started">
                <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium px-8 py-6 rounded-full animate-glow">
                  Start Your Analysis Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Feature item component
const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center">
    <CheckCircle2 className="h-5 w-5 text-neon-purple mr-2 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

export default HowItWorks;
