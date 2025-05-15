
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <h2 className="numbered-heading">Get In Touch</h2>
      
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-lg mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hello, 
          I'll do my best to get back to you!
        </p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a 
            href="mailto:nadhir.example@gmail.com" 
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        
        <form className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-portfolio-lightest-slate block mb-1 text-sm">
                Name
              </label>
              <Input 
                id="name" 
                type="text" 
                className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-portfolio-lightest-slate block mb-1 text-sm">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="text-portfolio-lightest-slate block mb-1 text-sm">
              Subject
            </label>
            <Input 
              id="subject" 
              type="text" 
              className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
              placeholder="How can I help you?"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="text-portfolio-lightest-slate block mb-1 text-sm">
              Message
            </label>
            <Textarea
              id="message"
              rows={5}
              className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate resize-none"
              placeholder="Your message here..."
            />
          </div>
          
          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-transparent border border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal/10 transition-all duration-300 flex items-center gap-2"
            >
              Send Message <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
