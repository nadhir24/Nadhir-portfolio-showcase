import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/Layout";
import SmoothScroll from "./components/SmoothScroll";

// Route-level code splitting — each page loads on demand
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:id" element={<ProjectDetailPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <SmoothScroll>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div style={{ 
            minHeight: "100vh", 
            background: "var(--bg-initial, #F5F5F0)",
            position: "fixed",
            inset: 0,
            zIndex: 9999
          }} />
        }>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </SmoothScroll>
);

export default App;
