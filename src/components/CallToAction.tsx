
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-[80px]" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="glass border border-white/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-gradient">Transform</span> Your Startup?
              </h2>
              
              <p className="text-foreground/70 mb-8">
                Sign up now and take the first step toward data-driven startup success. No credit card required.
              </p>
              
              <ul className="space-y-3 mb-8">
                <BenefitItem text="Free startup validation report" />
                <BenefitItem text="Access to basic AI tools" />
                <BenefitItem text="14-day Pro trial included" />
              </ul>
              
              <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white px-6 py-6 rounded-xl gap-2 text-lg">
                Sign Up Now
                <ArrowRight size={18} />
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative z-10 glass p-2 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="StartupAI Dashboard Preview" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-purple/30 rounded-full filter blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BenefitItemProps {
  text: string;
}

const BenefitItem = ({ text }: BenefitItemProps) => (
  <li className="flex items-center">
    <CheckCircle className="h-5 w-5 text-neon-purple mr-3 flex-shrink-0" />
    <span className="text-foreground/80">{text}</span>
  </li>
);

export default CallToAction;
