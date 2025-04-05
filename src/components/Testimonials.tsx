
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "Founder & CEO, TechVista",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "OBEDAI helped us identify critical gaps in our business model that we completely overlooked. The AI recommendations led to a 40% increase in customer acquisition within just 3 months.",
    rating: 5,
    delay: 0
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Co-founder, FinEdge Solutions",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "The product testing feature saved us months of development time. We pivoted our core offering based on the AI insights and secured our Series A funding shortly after.",
    rating: 5,
    delay: 0.2
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "CTO, GreenLoop",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "As a technical founder, I was skeptical about AI-driven business advice, but the platform's recommendations were surprisingly insightful. It's like having a seasoned business consultant at your fingertips.",
    rating: 4,
    delay: 0.4
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-background bg-hero-pattern">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="text-gradient">Innovative Startups</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See how startups are leveraging our AI platform to validate their ideas and accelerate growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              content={testimonial.content}
              rating={testimonial.rating}
              delay={testimonial.delay}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon-purple/10 border border-neon-purple/20">
            <span className="text-neon-purple font-semibold">4.9/5</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-neon-purple text-neon-purple" />
              ))}
            </div>
            <span className="text-sm text-foreground/70">from 200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  delay: number;
}

const TestimonialCard = ({ name, role, image, content, rating, delay }: TestimonialCardProps) => {
  return (
    <div 
      className="glass p-6 rounded-xl h-full flex flex-col opacity-0 animate-fade-in-up transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-foreground/70">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "fill-neon-purple text-neon-purple" : "text-foreground/30"} 
          />
        ))}
      </div>
      
      <blockquote className="text-foreground/80 italic flex-grow">
        "{content}"
      </blockquote>
    </div>
  );
};

export default Testimonials;
