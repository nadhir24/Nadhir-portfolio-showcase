# 🔥 PLAN REDESIGN V2 — Portfolio Nadhir Ghassan

> **Direction**: Blend nareshkhatri (3D interactive Spline) + rauno (ultra-minimal layout) + dennissnellenberg (smooth GSAP transitions)
> **Approach**: Redesign total dari scratch
> **Priority**: Balance recruiter content + frontend skill showcase

---

## Filosofi Design

**"Minimal surface, maximum depth."**

- Permukaan: ultra-clean seperti rauno.me — banyak whitespace, typography-driven
- Depth: 3D Spline element sebagai hero centerpiece — interactive, memorable
- Motion: GSAP-driven page transitions ala dennissnellenberg — smooth, intentional
- Content: setiap halaman punya substance — bukan cuma animasi kosong

### Design Tokens Baru
- **Light mode default** (seperti rauno) — warm off-white `#F5F5F0` (sudah ada)
- **Dark mode** — deep black `#0E0E0E` (sudah ada)
- **Accent**: minimal — satu warna saja untuk highlight (teal `#64FFDA` atau custom)
- **Typography**: satu display font yang punya karakter (bukan system-ui)
- **Spacing**: generous whitespace, content breathes

---

## FASE 0 — SETUP & DEPENDENCIES (30 menit)

### 0.1 Install Spline
```bash
npm install @splinetool/react-spline
```
- Package: `@splinetool/react-spline` (React wrapper)
- Runtime: `@splinetool/runtime` (auto-installed as peer dep)
- Bundle impact: ~200-300KB gzipped (lazy loaded, jadi tidak block initial paint)

### 0.2 Design 3D Scene di Spline.design
- [ ] Buat akun di https://spline.design (gratis)
- [ ] Design 3D object untuk hero — opsi:
  - **Floating laptop** yang menampilkan code/website
  - **Abstract geometric shape** yang rotate on scroll
  - **Interactive globe/sphere** yang react ke mouse
  - **Keyboard** ala nareshkhatri (paling complex)
- [ ] Export sebagai `.splinecode` URL (hosted di Spline CDN)
- [ ] Test di mobile browser — pastikan WebGL support

### 0.3 Typography Upgrade
- [ ] Pilih display font: **Satoshi**, **Cabinet Grotesk**, atau **Clash Display** (dari fontshare.com — gratis)
- [ ] Load via `@font-face` atau Google Fonts
- [ ] Update tailwind.config.ts fontFamily

### QA Fase 0
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | Spline installed | `npm ls @splinetool/react-spline` | Package listed, no errors |
| 2 | 3D scene URL | Browser | Spline scene loads di spline.design preview |
| 3 | Font loaded | Browser DevTools | Display font terlihat di headings |

---

## FASE 1 — HERO PAGE REDESIGN (3-4 jam)

### 1.1 Layout Hero (rauno-inspired minimal)
```
┌─────────────────────────────────────────────────┐
│                                                   │
│              [3D Spline Object]                    │
│              (interactive, responds to mouse)      │
│                                                   │
│                                                   │
│              NADHIR GHASSAN                        │
│              Fullstack Developer                   │
│                                                   │
│         see my work    ·    get in touch           │
│                                                   │
│  ─── marquee: React · Next.js · Nest.js ───────  │
└─────────────────────────────────────────────────┘
```

### 1.2 Spline Integration
- [ ] Buat `src/components/SplineHero.tsx`:
  ```tsx
  const Spline = React.lazy(() => import('@splinetool/react-spline'));
  
  function shouldLoadSpline(): boolean {
    if (typeof window === 'undefined') return false;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 2;
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
    return !isMobile && !isLowEnd;
  }
  ```
- [ ] Desktop: render Spline 3D scene dengan lazy loading + Suspense fallback
- [ ] Mobile/low-end: render static fallback (gradient + CSS 3D transform shape, atau static image)
- [ ] Loading state: skeleton/shimmer while Spline loads
- [ ] `renderOnDemand={true}` (default) — hanya render saat visible, hemat GPU

### 1.3 GSAP Hero Animation (dennissnellenberg-style)
- [ ] Text reveal: clipPath mask dari bawah ke atas (bukan fade-in)
- [ ] Stagger timing: 0.15s between lines
- [ ] Spline object: fade in setelah text reveal selesai
- [ ] Marquee: slide up dari bawah terakhir
- [ ] Easing: `expo.out` untuk semua (signature dennissnellenberg feel)

### QA Fase 1
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | Spline loads desktop | Chrome Desktop | 3D object visible, interactive (mouse hover/drag) |
| 2 | Mobile fallback | Chrome 375px | Static fallback shown, NO Spline loaded (check Network tab) |
| 3 | Low-end fallback | Throttle CPU 4x | Static fallback shown |
| 4 | Hero animation | Browser refresh | Text reveals smooth, no janky, < 2s total |
| 5 | Performance | Lighthouse Desktop | FCP < 2s (Spline lazy loaded, tidak block) |

---

## FASE 2 — PAGE TRANSITIONS (dennissnellenberg-style) (2-3 jam)

### 2.1 Smooth Page Transitions
- [ ] Keep Framer Motion `AnimatePresence` untuk route transitions
- [ ] Upgrade transition style:
  - **Exit**: content slides up + fades out (y: -30, opacity: 0, duration: 0.4s)
  - **Enter**: content slides up from below + fades in (y: 30 → 0, opacity: 0 → 1, duration: 0.6s)
  - **Stagger**: child elements stagger in (0.1s delay each)
- [ ] Page transition overlay: full-screen color wipe (optional, dennissnellenberg-style)
- [ ] Keep Lenis smooth scroll tapi **disable di mobile** (native scroll lebih smooth di mobile)

### 2.2 Navigation Transitions
- [ ] Navbar links: hover effect dengan underline yang animate dari kiri ke kanan
- [ ] Active page indicator: subtle dot atau underline
- [ ] Page title transition: old title slides out, new slides in

### QA Fase 2
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | Page transition | Browser | Klik nav link → smooth exit → smooth enter. Tidak ada flash/jump |
| 2 | Back button | Browser | Browser back → transition tetap smooth |
| 3 | Mobile scroll | Mobile 375px | Native scroll (Lenis disabled), smooth tanpa lag |

---

## FASE 3 — ABOUT PAGE (rauno-inspired bento) (2-3 jam)

### 3.1 Layout
```
┌──────────────────────────────────────────────┐
│  About                                        │
│                                                │
│  ┌─────────┬──────────┬─────────┐             │
│  │  Photo  │ Bio      │ Status  │             │
│  │  (real) │ (2-3     │ Open to │             │
│  │         │ sentences)│ Work   │             │
│  ├─────────┼──────────┼─────────┤             │
│  │ Stack   │ Currently│ Resume  │             │
│  │ pills   │ Building │ ↓ PDF   │             │
│  └─────────┴──────────┴─────────┘             │
│                                                │
│  ← Home              Selected Works →          │
└──────────────────────────────────────────────┘
```

### 3.2 Key Changes
- [ ] **GANTI STOCK PHOTO** — pakai foto asli atau avatar custom. BUKAN unsplash
- [ ] Bento grid cells: glasmorphism cards (keep `sc-card` style)
- [ ] GSAP scroll-triggered reveal per cell (stagger)
- [ ] Skills: interactive pills yang hover-able
- [ ] "Currently Building" cell: link ke Deenha/Ranocake dengan live indicator

### QA Fase 3
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | No stock photo | Browser | Foto BUKAN dari unsplash.com |
| 2 | Bento responsive | 375px | Single column stack |
| 3 | Resume download | Click | PDF opens in new tab |

---

## FASE 4 — WORK/PROJECTS PAGE (2-3 jam)

### 4.1 Layout (dennissnellenberg list + rauno minimal)
- [ ] Keep current list layout (sudah bagus) tapi tambahkan:
  - Thumbnail visible tanpa hover (small, di kiri setiap row)
  - Category tag di kanan
  - Hover: floating card tetap ada (sudah implemented, bagus)
- [ ] Mobile: thumbnail visible by default (karena tidak ada hover)

### 4.2 Project Detail Page
- [ ] Keep current layout (sudah solid)
- [ ] Fix responsive: `gridTemplateColumns: "1fr 2fr"` → responsive breakpoint
- [ ] Tambah tech stack badges
- [ ] Tambah "What I Learned" atau "Challenges" section

### 4.3 Fix Project Data
- [ ] 62teknologi & Hotel Realta: ganti stock photos (user bilang mau benerin sendiri — reminder)
- [ ] Deenha: pastikan screenshots sudah proper

### QA Fase 4
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | Thumbnails visible | Browser | Setiap project row punya small thumbnail |
| 2 | Mobile thumbnails | 375px | Thumbnails visible tanpa hover |
| 3 | Detail responsive | 375px | Grid stack vertikal, text readable |

---

## FASE 5 — PERFORMANCE FIX (KRITIS) (2-3 jam)

### 5.1 Fix Blob Performance
- [ ] **Mobile**: disable animated blobs entirely ATAU reduce ke 1 blob dengan `blur(60px)` instead of `blur(130px)`
- [ ] **Desktop**: reduce dari 4 blobs ke 2, reduce blur dari 130px ke 80px
- [ ] Tambahkan `will-change: transform` dan `contain: layout style paint` pada blob container
- [ ] Gunakan `@media (prefers-reduced-motion: reduce)` untuk disable semua animasi

### 5.2 Fix Lenis on Mobile
- [ ] Disable Lenis smooth scroll di mobile (< 768px)
- [ ] Native scroll di mobile = lebih smooth + hemat battery
- [ ] Pattern:
  ```tsx
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return; // Skip Lenis on mobile
    const lenis = new Lenis({ ... });
    // ...
  }, []);
  ```

### 5.3 Fix Custom Cursor
- [ ] Hapus `* { cursor: none !important; }` — ini breaks accessibility
- [ ] Ganti dengan: hanya hide cursor di desktop, dan JANGAN hide di form inputs
- [ ] Pattern: `body { cursor: none; } input, textarea, select, a, button { cursor: pointer; }`

### 5.4 Spline Mobile Guard
- [ ] `shouldLoadSpline()` check: WebGL support + viewport + hardwareConcurrency
- [ ] Mobile: static image/CSS fallback (ZERO Spline code loaded)
- [ ] Lazy load Spline dengan `React.lazy()` + `Suspense`

### 5.5 Image Optimization
- [ ] Lazy load semua images di bawah fold (`loading="lazy"`)
- [ ] Gunakan WebP format untuk project screenshots (sudah ada beberapa .webp)
- [ ] Add `width` dan `height` attributes untuk prevent CLS

### QA Fase 5
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | Mobile scroll smooth | Real phone | Scroll smooth, tidak lag, tidak janky |
| 2 | Mobile blobs | Real phone | Blobs reduced/disabled, tidak ada frame drop |
| 3 | Cursor accessibility | Desktop | Native cursor visible di form inputs |
| 4 | Spline not loaded mobile | Chrome 375px Network tab | Tidak ada splinecode request |
| 5 | Lighthouse mobile | Lighthouse Mobile | Performance > 70 |
| 6 | Lighthouse desktop | Lighthouse Desktop | Performance > 85 |

---

## FASE 6 — ACCESSIBILITY & SEO (1-2 jam)

### 6.1 Accessibility
- [ ] Fix `cursor: none !important` (Fase 5)
- [ ] Add skip-to-content link
- [ ] Custom focus-visible states
- [ ] `prefers-reduced-motion` → disable all animations
- [ ] ARIA labels pada Spline container (`aria-hidden="true"` karena decorative)
- [ ] Semantic HTML: `<main>`, `<nav>`, `<footer>` landmarks

### 6.2 SEO
- [ ] Fix OG image: SVG → PNG (social platforms tidak support SVG)
- [ ] Per-page `<title>` dan meta description (pakai react-helmet atau manual)
- [ ] JSON-LD Person schema
- [ ] Sitemap

### 6.3 Footer
- [ ] Tambah footer component: social links, copyright, back-to-top
- [ ] Consistent di semua pages

### QA Fase 6
| # | Task | Tool | Expected Result |
|---|------|------|-----------------|
| 1 | OG image | Facebook Debugger | Preview image muncul (PNG, bukan blank) |
| 2 | Skip-to-content | Tab key | Link muncul, skip ke main content |
| 3 | Reduced motion | OS setting | Semua animasi disabled |
| 4 | Footer | Browser | Footer visible di semua pages |

---

## YANG TIDAK DISENTUH

| Item | Alasan |
|------|--------|
| 62teknologi screenshot | User benerin sendiri |
| Hotel Realta screenshot | User benerin sendiri |
| EmailJS integration | Sudah berfungsi |
| React Router structure | Sudah bagus (multi-page + lazy loading) |
| Framer Motion AnimatePresence | Keep untuk route transitions |

---

## STACK KEPUTUSAN

| Keputusan | Pilihan | Alasan |
|-----------|---------|--------|
| 3D Engine | **Spline** (`@splinetool/react-spline`) | Interactive, lazy loadable, free tier, no Three.js boilerplate |
| Mobile 3D | **Disabled** (static fallback) | Spline terlalu berat di mobile GPU |
| Scroll library | **Lenis** (desktop only) | Sudah ada, disable di mobile |
| Animation | **GSAP** (primary) + **Framer Motion** (route transitions) | Keep existing split |
| Typography | **Satoshi / Cabinet Grotesk** | Modern, geometric, free |
| Cursor | **Keep custom** tapi fix accessibility | Sudah implemented, just needs fix |

---

## ESTIMASI WAKTU

| Fase | Effort | Prioritas |
|------|--------|-----------|
| Fase 0 — Setup & Dependencies | 30 menit | 🔴 HARUS |
| Fase 1 — Hero + Spline 3D | 3-4 jam | 🔴 HARUS |
| Fase 2 — Page Transitions | 2-3 jam | 🟡 PENTING |
| Fase 3 — About Page Bento | 2-3 jam | 🟡 PENTING |
| Fase 4 — Work/Projects Page | 2-3 jam | 🟡 PENTING |
| Fase 5 — Performance Fix | 2-3 jam | 🔴 HARUS |
| Fase 6 — A11y & SEO | 1-2 jam | 🟢 BAGUS |
| **TOTAL** | **~14-20 jam** | |

---

## URUTAN EKSEKUSI

```
Fase 0 (setup) → Fase 5 (performance fix DULU) → Fase 1 (hero + Spline)
  → Fase 2 (transitions) → Fase 3 (about) → Fase 4 (work) → Fase 6 (a11y/SEO)
```

**Kenapa performance dulu?**
- Fix mobile lag SEBELUM tambah Spline (yang lebih berat)
- Baseline performance harus bagus dulu, baru layer 3D di atas
- Kalau Spline bikin lag, kita tahu itu Spline bukan blob/Lenis

---

## FINAL ACCEPTANCE TEST

```bash
npm run build    # Exit code 0
```

**Manual:**
1. Desktop Chrome 1920x1080 — semua page smooth, Spline interactive
2. Mobile Chrome 375x812 — smooth scroll, no Spline, no lag
3. Lighthouse Desktop: Performance > 85, Accessibility > 90
4. Lighthouse Mobile: Performance > 70, Accessibility > 90
5. Share link di WhatsApp/LinkedIn — OG image muncul (PNG)
6. Tab through entire site — focus visible, skip-to-content works
7. `prefers-reduced-motion` ON — no animations

---

*Plan berdasarkan riset Spline docs, GitHub implementation patterns, dan analisis codebase existing.*
