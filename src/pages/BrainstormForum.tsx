
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Brain, SendIcon, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

const BrainstormForum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your startup brainstorming assistant. I can help you refine your business idea, validate your concept, and develop strategies for growth. What would you like to brainstorm today?'
    }
  ]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

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
    } else {
      alert('Please enter a valid API key');
    }
  };

  const onSubmit = async (data: ChatSchema) => {
    if (!apiKey && showApiKeyInput) {
      alert('Please enter your API key first');
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
      // This would normally call the Gemini API
      const response = await fetchGeminiResponse(userMessage.content, apiKey);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate Gemini API call
  const fetchGeminiResponse = async (message: string, apiKey: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would call the Gemini API with your API key
    // For now, just return a mock response based on the user's input
    const brainstormResponses = [
      `That's an interesting idea about ${message.split(' ').slice(0, 3).join(' ')}... Let me expand on that. Have you considered focusing on a specific target market first? Starting with a niche audience can help refine your value proposition before scaling to broader markets.`,
      `Your thoughts on ${message.split(' ').slice(0, 2).join(' ')} have potential. To strengthen this concept, consider conducting a competitor analysis to identify gaps in the market. What unique value could your startup offer that others don't?`,
      `I see where you're going with ${message.split(' ').slice(0, 3).join(' ')}. One approach would be to create a minimum viable product (MVP) focusing on the core feature that solves your customers' most pressing pain point. This would allow you to gather feedback quickly and iterate.`,
      `Regarding ${message.split(' ').slice(0, 2).join(' ')}, have you thought about your go-to-market strategy? Consider partnerships with established players in adjacent markets as a way to gain initial traction and credibility.`,
      `For your idea on ${message.split(' ').slice(0, 3).join(' ')}, I'd recommend running some small-scale experiments to validate key assumptions. What's the riskiest assumption in your business model that, if proven wrong, would cause the whole concept to fail?`
    ];
    
    return brainstormResponses[Math.floor(Math.random() * brainstormResponses.length)];
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
              <div className="bg-neon-purple/20 p-2 rounded-full">
                <Brain className="h-6 w-6 text-neon-purple" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-gradient">Startup Brainstorm Forum</span>
              </h1>
            </div>
            
            <p className="text-foreground/70 mb-6">
              Collaborate with our AI assistant to brainstorm ideas, validate concepts, and develop strategies for your startup. The more details you provide, the more targeted our brainstorming session can be.
            </p>

            {showApiKeyInput && (
              <div className="bg-background/50 rounded-lg p-4 mb-6 animate-fade-in-up">
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
                    className="flex-grow"
                  />
                  <Button onClick={handleApiKeySubmit} className="bg-neon-purple hover:bg-neon-purple/90">
                    Submit
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-background/30 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
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
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 max-w-[80%] rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
                            placeholder="Type your message..." 
                            className="min-h-[60px] bg-background/50"
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
              Your conversation with the AI assistant will not be saved after you leave this page.
              <br />
              For a more personalized experience, consider upgrading to our premium plan.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrainstormForum;
