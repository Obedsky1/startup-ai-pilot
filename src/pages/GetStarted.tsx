
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, SendIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  industry: z.string().min(2, { message: "Please specify your industry" }),
  description: z.string().min(10, { message: "Please provide a brief description of your startup (min 10 characters)" }),
  stage: z.string().min(1, { message: "Please select your startup stage" }),
  challenges: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const GetStarted = () => {
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      industry: "",
      description: "",
      stage: "",
      challenges: "",
    },
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the data for FormSubmit
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      // Send form data
      await fetch("https://formsubmit.co/justoneguylikethat@gmail.com", {
        method: "POST",
        body: formData,
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-neon-purple hover:text-neon-purple/80 inline-flex items-center mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          
          <div className="glass p-8 rounded-2xl animate-fade-in-up">
            {!isSubmitted ? (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">
                    <span className="text-gradient">Get Started</span> with Your AI-Powered Startup Journey
                  </h1>
                  <p className="text-foreground/70">
                    Tell us about your startup, and we'll help you validate, optimize, and scale with AI-driven insights.
                  </p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-neon-purple" />
                        Personal Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Startup Information */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-neon-purple" />
                        Startup Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Startup Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. FinTech, Healthcare, E-commerce" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Startup Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your startup idea, product, or service in a few sentences..." 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Tell us what problem you're solving and how your solution works.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Stage</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Idea, MVP, Pre-seed, Seed, Series A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="challenges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Challenges (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What challenges are you facing with your startup?" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Share the main obstacles you're encountering in your startup journey.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium px-8 py-6 w-full rounded-full animate-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <SendIcon className="mr-2 h-4 w-4" />
                          Submit and Get Started
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Thank You for Your Submission!</h2>
                <p className="text-foreground/70 max-w-md mx-auto mb-8">
                  We've received your startup details and will be analyzing them right away. You'll receive an email with your AI-powered insights shortly.
                </p>
                <Link to="/">
                  <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium px-8 py-4 rounded-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
