
import React, { useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="section-padding bg-[#0c0c14]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Choose the plan that works for your startup's stage and needs.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!isAnnual ? 'text-foreground' : 'text-foreground/60'}`}>Monthly</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-neon-purple" 
            />
            <span className={`ml-3 ${isAnnual ? 'text-foreground' : 'text-foreground/60'}`}>
              Annual <span className="bg-neon-purple/20 text-neon-purple text-xs px-2 py-1 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="glass p-6 rounded-xl flex flex-col h-full opacity-0 animate-fade-in-up">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-foreground/60">Start your startup journey</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-foreground/60">/month</span>
            </div>
            
            <Button variant="outline" className="mb-8">Get Started</Button>
            
            <ul className="space-y-4 mt-auto">
              <PricingFeature text="Basic startup validation" included />
              <PricingFeature text="1 product test per month" included />
              <PricingFeature text="Limited AI brainstorming" included />
              <PricingFeature text="Email support" included />
              <PricingFeature text="Advanced analytics" />
              <PricingFeature text="Business architecture builder" />
            </ul>
          </div>
          
          {/* Pro Plan */}
          <div className="relative glass border-neon-purple p-6 rounded-xl flex flex-col h-full opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-sm font-medium py-1 px-3 rounded-full">
              Most Popular
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-foreground/60">For growing startups</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">${isAnnual ? '39' : '49'}</span>
              <span className="text-foreground/60">/month</span>
              {isAnnual && <span className="text-xs ml-2 text-neon-purple">billed annually</span>}
            </div>
            
            <Button className="mb-8 bg-neon-purple hover:bg-neon-purple/90">Upgrade Now</Button>
            
            <ul className="space-y-4 mt-auto">
              <PricingFeature text="Advanced startup validation" included />
              <PricingFeature text="5 product tests per month" included />
              <PricingFeature text="Full AI brainstorming" included />
              <PricingFeature text="Priority email support" included />
              <PricingFeature text="Advanced analytics" included />
              <PricingFeature text="Business architecture builder" included />
              <PricingFeature text="Competitor analysis" />
            </ul>
          </div>
          
          {/* Enterprise Plan */}
          <div className="glass p-6 rounded-xl flex flex-col h-full opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-foreground/60">For established startups</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">${isAnnual ? '99' : '129'}</span>
              <span className="text-foreground/60">/month</span>
              {isAnnual && <span className="text-xs ml-2 text-neon-purple">billed annually</span>}
            </div>
            
            <Button variant="outline" className="mb-8">Contact Us</Button>
            
            <ul className="space-y-4 mt-auto">
              <PricingFeature text="All Pro features" included />
              <PricingFeature text="Unlimited product tests" included />
              <PricingFeature text="Custom AI training" included />
              <PricingFeature text="Dedicated support" included />
              <PricingFeature text="API access" included />
              <PricingFeature text="Competitor analysis" included />
              <PricingFeature text="Custom reporting" included />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingFeatureProps {
  text: string;
  included?: boolean;
  info?: string;
}

const PricingFeature = ({ text, included = false, info }: PricingFeatureProps) => (
  <li className="flex items-center">
    {included ? (
      <Check className="h-5 w-5 text-neon-purple mr-2 flex-shrink-0" />
    ) : (
      <Check className="h-5 w-5 text-foreground/20 mr-2 flex-shrink-0" />
    )}
    <span className={included ? 'text-foreground/80' : 'text-foreground/40'}>
      {text}
    </span>
    
    {info && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-foreground/50 ml-2" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-80">{info}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </li>
);

export default Pricing;
