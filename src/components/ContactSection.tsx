import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject || "No Subject",
          message: formData.message,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <h2 className="numbered-heading">Get In Touch</h2>

      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-lg mb-8">
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hello, I'll do my best to get back to
          you!
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="mailto:nadhirghassanwork@gmail.com"
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/nadhir24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/nadhir-ghassan24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-portfolio-lightest-slate block mb-1 text-sm"
              >
                Name*
              </label>
              <Input
                id="name"
                type="text"
                className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-portfolio-lightest-slate block mb-1 text-sm"
              >
                Email*
              </label>
              <Input
                id="email"
                type="email"
                className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="text-portfolio-lightest-slate block mb-1 text-sm"
            >
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate"
              placeholder="How can I help you?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-portfolio-lightest-slate block mb-1 text-sm"
            >
              Message*
            </label>
            <Textarea
              id="message"
              rows={5}
              className="bg-portfolio-lightest-navy border-portfolio-lightest-navy focus:border-portfolio-teal text-portfolio-lightest-slate resize-none"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="bg-transparent border border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal/10 transition-all duration-300 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}{" "}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
