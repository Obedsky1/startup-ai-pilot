
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Brain, SendIcon, Sparkles, ArrowLeft, Zap, Star, RefreshCw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';

// Form validation schema
const chatSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

type ChatSchema = z.infer<typeof chatSchema>;

// Message type
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Form data type
type StartupFormData = {
  name?: string;
  email?: string;
  companyName?: string;
  industry?: string;
  description?: string;
  stage?: string;
  challenges?: string;
};

const BrainstormForum = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [formData, setFormData] = useState<StartupFormData | null>(null);

  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  // Extract form data from location state
  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      
      // Create initial welcome message based on the form data
      const initialMessage = createWelcomeMessage(location.state.formData);
      setMessages([{
        role: 'assistant',
        content: initialMessage
      }]);
    } else {
      // Default welcome message if no form data
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your startup brainstorming assistant. I can help you refine your business idea, validate your concept, and develop strategies for growth. What would you like to brainstorm today?'
      }]);
    }
  }, [location.state]);

  // Create personalized welcome message
  const createWelcomeMessage = (data: StartupFormData): string => {
    if (!data || !data.name || !data.companyName) {
      return 'Hello! I\'m your startup brainstorming assistant. I can help you refine your business idea, validate your concept, and develop strategies for growth. What would you like to brainstorm today?';
    }

    return `Welcome ${data.name}! I'm your dedicated AI assistant for ${data.companyName}. ` +
      `I see you're in the ${data.industry || 'startup'} industry at the ${data.stage || 'early'} stage. ` +
      `Based on your description, I understand your focus is on: "${data.description?.substring(0, 100)}${data.description && data.description.length > 100 ? '...' : ''}". ` +
      `${data.challenges ? `I'm here to help with challenges like: "${data.challenges.substring(0, 100)}${data.challenges.length > 100 ? '...' : ''}"` : 'I\'m here to help you refine your concept and develop growth strategies.'} ` +
      `What specific aspect of your startup would you like to brainstorm today?`;
  };

  // Set darker background
  React.useEffect(() => {
    document.body.classList.add('bg-[#0a0a14]');
    return () => {
      document.body.classList.remove('bg-[#0a0a14]');
    };
  }, []);

  // Scroll to bottom when messages update
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleApiKeySubmit = () => {
    if (apiKey.length > 10) {
      setShowApiKeyInput(false);
      toast({
        title: "API Key Accepted",
        description: "You can now chat with the AI assistant",
        duration: 3000
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key with at least 10 characters",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const onSubmit = async (data: ChatSchema) => {
    if (!apiKey && showApiKeyInput) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key first",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    const userMessage = {
      role: 'user' as const,
      content: data.message
    };

    setIsLoading(true);
    setMessages(prev => [...prev, userMessage]);
    form.reset();

    try {
      // This would normally call the Gemini API with form data context
      const response = await fetchGeminiResponse(userMessage.content, apiKey, formData);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.'
      }]);
      
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate Gemini API call with form data context
  const fetchGeminiResponse = async (message: string, apiKey: string, formData: StartupFormData | null): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would call the Gemini API with your API key
    // Including the context from the form data
    
    const contextBasedResponses = formData ? [
      `Based on your ${formData.industry} startup at the ${formData.stage} stage, I'd recommend focusing on market validation first. For "${formData.companyName}", consider running small-scale experiments to test your core assumptions about the target audience and their pain points.`,
      `For ${formData.companyName} in the ${formData.industry} space, your question about ${message.split(' ').slice(0, 3).join(' ')} is interesting. Given that you're in the ${formData.stage} stage, I'd suggest prioritizing customer discovery interviews to refine your value proposition.`,
      `Looking at your startup ${formData.companyName} and the challenges you mentioned ("${formData.challenges?.substring(0, 50)}..."), I think your approach to ${message.split(' ').slice(0, 2).join(' ')} could be enhanced by focusing on a more targeted customer segment initially.`,
      `I've analyzed your description of ${formData.companyName}. For your query about ${message.split(' ').slice(0, 3).join(' ')}, I'd recommend considering the competitive landscape in ${formData.industry} more carefully. Have you conducted a thorough competitor analysis?`,
      `Given that ${formData.companyName} is in the ${formData.stage} stage, your question on ${message.split(' ').slice(0, 3).join(' ')} is timely. I suggest creating a minimum viable product focusing specifically on solving the core problem you described: "${formData.description?.substring(0, 50)}..."`
    ] : [];
    
    const genericResponses = [
      `That's an interesting idea about ${message.split(' ').slice(0, 3).join(' ')}... Let me expand on that. Have you considered focusing on a specific target market first? Starting with a niche audience can help refine your value proposition before scaling to broader markets.`,
      `Your thoughts on ${message.split(' ').slice(0, 2).join(' ')} have potential. To strengthen this concept, consider conducting a competitor analysis to identify gaps in the market. What unique value could your startup offer that others don't?`,
      `I see where you're going with ${message.split(' ').slice(0, 3).join(' ')}. One approach would be to create a minimum viable product (MVP) focusing on the core feature that solves your customers' most pressing pain point. This would allow you to gather feedback quickly and iterate.`,
      `Regarding ${message.split(' ').slice(0, 2).join(' ')}, have you thought about your go-to-market strategy? Consider partnerships with established players in adjacent markets as a way to gain initial traction and credibility.`,
      `For your idea on ${message.split(' ').slice(0, 3).join(' ')}, I'd recommend running some small-scale experiments to validate key assumptions. What's the riskiest assumption in your business model that, if proven wrong, would cause the whole concept to fail?`
    ];
    
    const allResponses = formData ? [...contextBasedResponses, ...genericResponses] : genericResponses;
    
    return allResponses[Math.floor(Math.random() * allResponses.length)];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/get-started" className="text-neon-purple hover:text-neon-purple/80 inline-flex items-center mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Get Started
          </Link>
          
          <div className="glass p-6 rounded-2xl mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-neon-purple/20 p-3 rounded-full">
                <Brain className="h-7 w-7 text-neon-purple" />
              </div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-gradient">AI Startup Advisor</span>
                <div className="bg-neon-blue/20 text-neon-blue text-xs px-2 py-1 rounded-full">Beta</div>
              </h1>
            </div>
            
            {formData && (
              <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-neon-blue" />
                  Startup Context
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-foreground/70">
                  <div><span className="font-medium text-foreground/90">Company:</span> {formData.companyName}</div>
                  <div><span className="font-medium text-foreground/90">Industry:</span> {formData.industry}</div>
                  <div><span className="font-medium text-foreground/90">Stage:</span> {formData.stage}</div>
                  <div><span className="font-medium text-foreground/90">Contact:</span> {formData.email}</div>
                </div>
              </div>
            )}

            {showApiKeyInput && (
              <div className="bg-background/50 rounded-lg p-4 mb-6 animate-fade-in-up border border-white/10">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-neon-purple" />
                  Enter your AI API Key
                </h3>
                <p className="text-xs text-foreground/60 mb-3">
                  For this demo, any text with at least 10 characters will work. In a production environment, you would need a valid Gemini API key.
                </p>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    placeholder="Enter your Gemini API key" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    className="flex-grow bg-background/80 border-white/10"
                  />
                  <Button onClick={handleApiKeySubmit} className="bg-neon-purple hover:bg-neon-purple/90 px-4">
                    Submit
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-[#0c0c18]/80 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto border border-white/5">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user' 
                          ? 'bg-neon-purple text-white' 
                          : 'bg-[#1e1e2d] text-gray-200 border border-white/5'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center mb-2 text-xs text-foreground/50">
                          <Star className="h-3 w-3 mr-1 text-neon-blue" />
                          AI Assistant
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1e1e2d] text-gray-200 max-w-[80%] rounded-lg p-3 border border-white/5">
                      <div className="flex items-center mb-2 text-xs text-foreground/50">
                        <RefreshCw className="h-3 w-3 mr-1 text-neon-blue animate-spin" />
                        AI Assistant
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-purple/50 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-neon-purple/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-neon-purple/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          <Textarea 
                            placeholder="Ask about product-market fit, customer acquisition, pricing strategies..."
                            className="min-h-[60px] bg-[#0c0c18]/80 border-white/10 resize-none"
                            {...field} 
                          />
                          <Button 
                            type="submit" 
                            className="bg-neon-purple hover:bg-neon-purple/90 text-white self-end h-[60px] px-4"
                            disabled={isLoading || (showApiKeyInput && !apiKey)}
                          >
                            <SendIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            
            <div className="mt-4 text-xs text-foreground/50 text-center">
              <div className="space-x-1">
                <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded-full text-xs">AI-Powered</span>
                <span className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full text-xs">Startup-Focused</span>
                <span className="bg-neon-pink/20 text-neon-pink px-2 py-1 rounded-full text-xs">Strategic</span>
              </div>
              <p className="mt-2">
                Your conversation with the AI assistant will not be saved after you leave this page.
                <br />
                For a more personalized experience, consider upgrading to our premium plan.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrainstormForum;
