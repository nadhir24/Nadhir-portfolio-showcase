import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Send, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const isPresent = useIsPresent();

    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (!isPresent) {
            eventBus.emit("PAGE_TRANSITION_OUT", { type: "fold" });
        } else {
            eventBus.emit("PAGE_TRANSITION_IN", { type: "fade" });
        }
    }, [isPresent]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Entry Animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

        tl.fromTo(".sc-section-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
            .fromTo(".contact-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6")
            .fromTo(".social-magnet", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4")
            .fromTo(".form-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.2");

        // Magnetic Hover for Socials
        socialRefs.current.forEach((el) => {
            if (!el) return;
            const icon = el.querySelector("svg");

            el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.3,
                    ease: "power2.out"
                });
                if (icon) {
                    gsap.to(icon, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
                }
            });

            el.addEventListener("mouseleave", () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
                if (icon) {
                    gsap.to(icon, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
                }
            });
        });

    }, { scope: containerRef });

    const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast({ title: "Error", description: "Fill all required fields.", variant: "destructive" });
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
            toast({ title: "Error", description: "Failed to send.", variant: "destructive" });
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
        <motion.div
            ref={containerRef as any}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 10,
                maxWidth: "72rem",
                margin: "0 auto",
                padding: "7rem 2rem 4rem",
            }}
        >
            <h1 className="sc-section-title">Get in Touch</h1>

            <div style={{ maxWidth: "560px" }}>
                <p className="contact-desc" style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "2rem", opacity: 0 }}>
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hello —
                    I'll do my best to get back to you!
                </p>

                {/* Socials */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
                    {socials.map((s, idx) => (
                        <a
                            key={s.label}
                            ref={(el) => (socialRefs.current[idx] = el)}
                            href={s.href}
                            target={s.href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            className="social-magnet"
                            style={{
                                width: "3.2rem", height: "3.2rem", borderRadius: "50%",
                                border: "1px solid var(--border-color)", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                color: "var(--text-muted)", background: "var(--bg-card)",
                                backdropFilter: "blur(8px)",
                                textDecoration: "none",
                                opacity: 0
                            }}
                            onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "var(--text)", duration: 0.2 })}
                            onMouseLeave={(e) => gsap.to(e.currentTarget, { color: "var(--text-muted)", duration: 0.2 })}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className="form-item" style={{ opacity: 0 }}>
                            <label htmlFor="name" style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Name</label>
                            <input id="name" className="sc-input" placeholder="Your name" value={form.name} onChange={set} required />
                        </div>
                        <div className="form-item" style={{ opacity: 0 }}>
                            <label htmlFor="email" style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Email</label>
                            <input id="email" type="email" className="sc-input" placeholder="your@email.com" value={form.email} onChange={set} required />
                        </div>
                    </div>
                    <div className="form-item" style={{ opacity: 0 }}>
                        <label htmlFor="subject" style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Subject</label>
                        <input id="subject" className="sc-input" placeholder="How can I help?" value={form.subject} onChange={set} />
                    </div>
                    <div className="form-item" style={{ opacity: 0 }}>
                        <label htmlFor="message" style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Message</label>
                        <textarea id="message" className="sc-input" rows={5} style={{ resize: "none" }} placeholder="Your message…" value={form.message} onChange={set} required />
                    </div>
                    <button
                        type="submit"
                        disabled={sending}
                        className="form-item"
                        style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                            padding: "0.8rem 2rem", borderRadius: "9999px",
                            border: "1px solid var(--border-color)",
                            background: "var(--bg-card)", backdropFilter: "blur(8px)",
                            color: "var(--text)", fontSize: "0.95rem", fontWeight: 500, fontFamily: "'Inter', sans-serif",
                            cursor: sending ? "not-allowed" : "pointer",
                            alignSelf: "flex-start", marginTop: "1rem", opacity: 0
                        }}
                        onMouseEnter={(e) => { if (!sending) gsap.to(e.currentTarget, { opacity: 0.7, scale: 1.02, duration: 0.2 }); }}
                        onMouseLeave={(e) => { gsap.to(e.currentTarget, { opacity: sending ? 0.5 : 1, scale: 1, duration: 0.2 }); }}
                    >
                        {sending ? "Sending…" : "Send Message"} <Send size={15} />
                    </button>
                </form>
            </div>

            {/* Next Page Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <Link
                    to="/"
                    className="form-item sc-link"
                    style={{
                        display: "flex", alignItems: "center", gap: "1rem", color: "var(--text)", textDecoration: "none",
                        fontSize: "1.2rem", fontWeight: 600, opacity: 0
                    }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2 })}
                >
                    Back to Home <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ContactPage;
