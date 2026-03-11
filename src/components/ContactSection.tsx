import React, { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Error", description: "Fill all required fields.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Error", description: "Enter a valid email.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, title: form.subject || "No Subject", message: form.message, reply_to: form.email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast({ title: "Sent!", description: "Thank you — I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { href: "mailto:nadhirghassanwork@gmail.com", icon: <Mail size={20} />, label: "Email" },
    { href: "https://github.com/nadhir24", icon: <Github size={20} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/nadhir-ghassan24", icon: <Linkedin size={20} />, label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="sc-section">
      <h2 className="sc-section-title">Get in Touch</h2>

      <div style={{ maxWidth: "560px" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "2rem" }}>
          I'm currently looking for new opportunities. Whether you have a question or just want to say hello —
          I'll do my best to get back to you!
        </p>

        {/* Social links */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="sc-link"
              style={{
                width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                border: "1px solid var(--border-color)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "var(--text-muted)", background: "var(--bg-card)",
                backdropFilter: "blur(8px)",
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
            <div>
              <label htmlFor="name" style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.35rem" }}>Name *</label>
              <input id="name" className="sc-input" placeholder="Your name" value={form.name} onChange={set} required />
            </div>
            <div>
              <label htmlFor="email" style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.35rem" }}>Email *</label>
              <input id="email" type="email" className="sc-input" placeholder="your@email.com" value={form.email} onChange={set} required />
            </div>
          </div>
          <div>
            <label htmlFor="subject" style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.35rem" }}>Subject</label>
            <input id="subject" className="sc-input" placeholder="How can I help?" value={form.subject} onChange={set} />
          </div>
          <div>
            <label htmlFor="message" style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.35rem" }}>Message *</label>
            <textarea id="message" className="sc-input" rows={5} style={{ resize: "none" }} placeholder="Your message…" value={form.message} onChange={set} required />
          </div>
          <button
            type="submit"
            disabled={sending}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              padding: "0.75rem 2rem", borderRadius: "9999px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)", backdropFilter: "blur(8px)",
              color: "var(--text)", fontSize: "0.9rem", fontWeight: 500, fontFamily: "'Inter', sans-serif",
              cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.5 : 1,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {sending ? "Sending…" : "Send Message"} <Send size={14} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
