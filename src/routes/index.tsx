import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  Command,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
  Fingerprint,
  Box,
  Gauge,
  HelpCircle,
  Layers,
  Palette,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Tags,
  Search,
  CornerDownLeft,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultgrid — Local-first asset manager for design studios" },
      {
        name: "description",
        content:
          "Index millions of design, video, 3D and font files on your own machine. Instant search, auto-tagging, duplicate radar and vault insights. $2 once, unlimited forever.",
      },
      { property: "og:title", content: "Vaultgrid — Local-first asset manager" },
      {
        property: "og:description",
        content:
          "Instant search across every design, video, 3D and font file you own. One $2 payment, unlimited forever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const DEMO_QUERIES = [
  {
    query: "blue logo",
    results: [
      {
        icon: FileImage,
        name: "brandmark_vector_blue.svg",
        match: "blue",
        path: "/Brand Assets/Logos/2025",
        meta: "12 KB",
      },
      {
        icon: FileImage,
        name: "app_icon_dark_blue.png",
        match: "blue",
        path: "/Design System/Icons",
        meta: "240 KB",
      },
      {
        icon: Layers,
        name: "hero_banner_blue_v3.psd",
        match: "blue",
        path: "/Marketing/Campaigns/Q1",
        meta: "84.2 MB",
      },
    ],
  },
  {
    query: "product demo 4k",
    results: [
      {
        icon: FileVideo,
        name: "product_demo_4k_master.mp4",
        match: "product demo 4k",
        path: "/Exports/Video/2025",
        meta: "1.4 GB",
      },
      {
        icon: FileVideo,
        name: "saas_product_demo_4k_cut.mov",
        match: "product demo 4k",
        path: "/Raw Footage/Selects",
        meta: "3.8 GB",
      },
      {
        icon: FileVideo,
        name: "product_demo_4k_teaser.webm",
        match: "product demo 4k",
        path: "/Social/Teasers",
        meta: "142 MB",
      },
    ],
  },
  {
    query: "chair turntable",
    results: [
      {
        icon: Box,
        name: "lounge_chair_turntable.glb",
        match: "chair turntable",
        path: "/3D Models/Furniture",
        meta: "18.4 MB",
      },
      {
        icon: Box,
        name: "eames_chair_turntable_rig.blend",
        match: "chair turntable",
        path: "/Blender/Scenes/Studio",
        meta: "126 MB",
      },
      {
        icon: Box,
        name: "chair_turntable_render_01.usdz",
        match: "chair turntable",
        path: "/AR/Catalog",
        meta: "8.1 MB",
      },
    ],
  },
];

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Sub-10ms search",
    body: "A local inverted index over filenames, tags, notes, EXIF and embedded metadata. Results land before your finger leaves the key.",
  },
  {
    icon: Fingerprint,
    title: "Duplicate radar",
    body: "Review files with matching names and related metadata before you remove an unnecessary copy.",
  },
  {
    icon: Palette,
    title: "Color-family filter",
    body: "Every asset is binned into a palette family at index time. Filter a 40k-file vault down to “teal + isometric” instantly.",
  },
  {
    icon: Tags,
    title: "Auto-tag on import",
    body: "Filenames, folder ancestry and file type become structured tags the moment a file lands in the dropzone.",
  },
  {
    icon: Gauge,
    title: "Vault insights",
    body: "See growth over time, storage by kind, reclaimable dead weight and your real working vocabulary of tags.",
  },
  {
    icon: Command,
    title: "Keyboard-native",
    body: "⌘K jumps to any asset or action. Grid, list, filters, star, purge — all reachable without touching the mouse.",
  },
];

function HighlightedText({ text, match }: { text: string; match: string }) {
  if (!match) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${match})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === match.toLowerCase() ? (
          <span key={i} className="text-[#4FBFA0] font-medium bg-[#4FBFA0]/10 px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function SearchDemoPanel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % DEMO_QUERIES.length);
        setFade(true);
      }, 200);
    }, 2400);

    return () => clearInterval(timer);
  }, [paused]);

  const current = DEMO_QUERIES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full max-w-2xl mx-auto mt-10 rounded-xl border border-border bg-surface text-left shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-primary/40"
    >
      {/* Quick query switcher pills */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background/50 overflow-x-auto text-xs">
        <span className="font-mono text-[11px] text-muted-foreground shrink-0 mr-1">
          Try queries:
        </span>
        {DEMO_QUERIES.map((q, idx) => (
          <button
            key={q.query}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setIndex(idx);
                setFade(true);
              }, 150);
            }}
            className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all whitespace-nowrap ${
              index === idx
                ? "bg-secondary text-foreground font-medium border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            "{q.query}"
          </button>
        ))}
      </div>

      {/* Top command bar */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface">
        <Search className="size-4 text-muted-foreground shrink-0" />
        <div className="flex-1 font-mono text-sm text-foreground flex items-center gap-1 min-h-[20px]">
          <span
            className={`transition-opacity duration-200 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {current.query}
          </span>
          <span className="w-2 h-4 bg-[#E8A33D] inline-block animate-blink ml-0.5" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-muted-foreground">
          <span>⌘K</span>
        </div>
      </div>

      {/* Results list */}
      <div className="p-2 space-y-1 min-h-[160px]">
        {current.results.map((res, i) => {
          const Icon = res.icon;
          return (
            <div
              key={`${current.query}-${i}`}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-secondary cursor-pointer ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="p-1.5 rounded border border-border bg-background text-muted-foreground group-hover:text-foreground transition-colors">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 text-xs text-foreground truncate font-medium">
                  <HighlightedText text={res.name} match={res.match} />
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono text-[11px] text-muted-foreground">
                <span className="hidden sm:inline-block text-[11px] opacity-75">
                  {res.path}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">
                  {res.meta}
                </span>
                <CornerDownLeft className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-background font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#4FBFA0] animate-pulse" />
          <span>{current.results.length} matching assets indexed locally</span>
        </div>
        <span className="text-[#4FBFA0] font-semibold">sub-10ms match</span>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-180 grid-lines opacity-40 mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="size-4" strokeWidth={2.2} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Vaultgrid
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#canvas" className="transition-colors hover:text-foreground">
            Live canvas
          </a>
          <a href="#workflow" className="transition-colors hover:text-foreground">
            Workflow
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/auth"
            className="rounded-lg border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary/50"
          >
            Open vault
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 text-center">
        {/* Eyebrow label & release badge */}
        <div className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
          <span className="size-2 rounded-full bg-[#E8A33D] animate-pulse" />
          <span>Vaultgrid v2.4 Release</span>
          <span className="text-border">•</span>
          <span className="text-foreground font-medium">Local-first index · $2 once</span>
        </div>

        {/* Restrained Headline */}
        <h1
          className="rise mx-auto mt-6 max-w-3xl text-[36px] sm:text-[44px] lg:text-[48px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground"
          style={{ animationDelay: "60ms" }}
        >
          Every asset you own, findable in one keystroke.
        </h1>

        {/* Subhead paragraph */}
        <p
          className="rise mx-auto mt-5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "120ms" }}
        >
          Vaultgrid indexes your design elements, video masters, 3D props and
          typefaces right where they live on your drive. Zero cloud lag, zero privacy compromises.
        </p>

        {/* Primary CTA button & shortcuts */}
        <div
          className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "180ms" }}
        >
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-[#E8A33D] px-6 py-3 text-xs font-semibold text-[#16140F] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_-4px_rgba(232,163,61,0.4)]"
          >
            Unlock lifetime access for $2
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="#app-showcase"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ScanSearch className="size-3.5 text-muted-foreground" />
            View Library Interface
          </a>
        </div>

        {/* Quick Feature Stats Bar */}
        <div
          className="rise mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-border/60 text-left font-mono text-[11px]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="p-3 rounded-lg border border-border/50 bg-surface/40">
            <div className="text-foreground font-semibold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#4FBFA0]" /> &lt; 10ms
            </div>
            <div className="text-muted-foreground mt-0.5 text-[10px]">Instant search latency</div>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-surface/40">
            <div className="text-foreground font-semibold flex items-center gap-1.5">
              <ShieldCheck className="size-3 text-[#E8A33D]" /> 100% Local
            </div>
            <div className="text-muted-foreground mt-0.5 text-[10px]">No cloud uploads</div>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-surface/40">
            <div className="text-foreground font-semibold">$2 Once</div>
            <div className="text-muted-foreground mt-0.5 text-[10px]">No monthly fees</div>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-surface/40">
            <div className="text-foreground font-semibold">16+ Formats</div>
            <div className="text-muted-foreground mt-0.5 text-[10px]">PSD, GLB, MOV, OTF...</div>
          </div>
        </div>

        {/* Signature Command Palette Demo Panel */}
        <div className="rise" style={{ animationDelay: "260ms" }}>
          <SearchDemoPanel />
        </div>
      </section>

      {/* File Types Marquee */}
      <section className="relative z-10 border-y border-border bg-surface py-3.5">
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 gap-10 whitespace-nowrap pr-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex gap-10">
                {[
                  "psd",
                  "ai",
                  "fig",
                  "glb",
                  "usdz",
                  "blend",
                  "prores",
                  "r3d",
                  "otf",
                  "woff2",
                  "wav",
                  "aiff",
                  "svg",
                  "exr",
                  "tiff",
                  "c4d",
                ].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* App Interface Showcase Section */}
      <AppInterfaceShowcase />

      {/* Format Explorer Section */}
      <FormatExplorer />

      {/* Duplicate Radar Section */}
      <DuplicateRadarSection />

      {/* Live Canvas Section */}
      <LiveCanvas />

      {/* Features Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
          Built for libraries that outgrew the Finder.
        </h2>
        <p className="mt-3 max-w-lg text-[14px] text-muted-foreground">
          Six core capabilities designed for serious local media archives.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="rise hover-lift rounded-xl border border-border bg-surface p-5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <f.icon className="size-5 text-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-[15px] font-medium tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Workflow Section */}
      <section id="workflow" className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
              Index once. Never hunt again.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              Point Vaultgrid at your local drives or external archives, and it builds a structured index of everything without moving or uploading a single file.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  n: "01",
                  t: "Point at a folder",
                  d: "Drives, NAS shares, project archives — all indexed in place.",
                },
                {
                  n: "02",
                  t: "Let it tag",
                  d: "Kind, palette family, dimensions, and filename tokens become structured metadata.",
                },
                {
                  n: "03",
                  t: "Search like a database",
                  d: "Combine tag + color + kind + collection, then hit ⌘K to jump anywhere.",
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                  <div>
                    <p className="text-[14px] font-medium text-foreground">{s.t}</p>
                    <p className="text-[13px] text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              { icon: Layers, k: "Your files", v: "indexed in place from local folders" },
              { icon: Sparkles, k: "Your metadata", v: "kept strictly on this machine" },
              { icon: ScanSearch, k: "Your search", v: "filtered by name, type and tags" },
              { icon: ShieldCheck, k: "Private by design", v: "originals never uploaded" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-border bg-background p-4"
              >
                <s.icon className="size-4 text-foreground" strokeWidth={1.5} />
                <p className="mt-3 text-base font-medium tracking-tight text-foreground">
                  {s.k}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground mb-3">
          <Zap className="size-3.5 text-[#E8A33D]" />
          <span>Simple Transparent Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
          One payment. Everything, forever.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] text-muted-foreground leading-relaxed">
          No monthly subscriptions, no seat tiers. Pay two dollars once and unlock full lifetime access to your local media archive.
        </p>

        <div className="relative mx-auto mt-8 max-w-md rounded-2xl border border-[#E8A33D]/40 bg-surface p-8 text-left shadow-[0_20px_40px_-15px_rgba(232,163,61,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#E8A33D] text-[#16140F] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
            Best Value
          </div>

          <div className="flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight text-foreground">$2</span>
            <span className="pb-1 text-xs font-mono text-muted-foreground">
              USD · pay once, own forever
            </span>
          </div>

          <ul className="mt-6 space-y-3 text-[13px] text-muted-foreground">
            {[
              "Unlimited asset indexing & local collections",
              "Sub-10ms instant command search system",
              "Duplicate radar & storage reclaim optimizer",
              "Vault insights & working vocabulary analytics",
              "⌘K command palette with full keyboard navigation",
              "100% private local browser storage",
              "All future software updates included",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="size-4 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center shrink-0">
                  <Check className="size-2.5" strokeWidth={3} />
                </div>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/auth"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#E8A33D] px-5 py-3 text-xs font-semibold text-[#16140F] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_-4px_rgba(232,163,61,0.4)]"
          >
            Get lifetime access for $2
            <ArrowRight className="size-3.5" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-muted-foreground">
            <ShieldCheck className="size-3.5 text-[#4FBFA0]" />
            <span>Secure checkout via Polar · 100% money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-[12px] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Vaultgrid — local-first asset management.</span>
          <span className="font-mono">built for people with too many files</span>
        </div>
      </footer>
    </main>
  );
}

function FormatExplorer() {
  const [activeTab, setActiveTab] = useState("3d");

  const CATEGORIES = [
    {
      id: "3d",
      label: "3D Props & Rigs",
      icon: Box,
      exts: ["glb", "usdz", "blend", "c4d", "obj", "fbx"],
      sampleAssets: [
        { name: "lounge_chair_turntable.glb", size: "18.4 MB", tags: ["furniture", "pbr", "isometric"] },
        { name: "eames_chair_turntable_rig.blend", size: "126 MB", tags: ["rigged", "studio", "lighting"] },
        { name: "hdr_studio_lighting_4k.exr", size: "32.1 MB", tags: ["environment", "hdri"] },
      ],
    },
    {
      id: "video",
      label: "Video & Motion Reels",
      icon: FileVideo,
      exts: ["mp4", "mov", "prores", "r3d", "webm"],
      sampleAssets: [
        { name: "product_demo_4k_master.mp4", size: "1.4 GB", tags: ["master", "4k", "prores"] },
        { name: "brand_ident_motion_loop.mov", size: "245 MB", tags: ["alpha", "60fps", "loop"] },
        { name: "kinetic_type_overlay.webm", size: "48 MB", tags: ["transparent", "overlay"] },
      ],
    },
    {
      id: "fonts",
      label: "Typefaces & Glyphs",
      icon: FileText,
      exts: ["otf", "ttf", "woff2", "variable"],
      sampleAssets: [
        { name: "InterTight-VariableFont.woff2", size: "140 KB", tags: ["sans", "variable", "ui"] },
        { name: "JetBrainsMono-Bold.otf", size: "310 KB", tags: ["mono", "code", "ligatures"] },
        { name: "Syne Display-ExtraBold.ttf", size: "280 KB", tags: ["display", "headline"] },
      ],
    },
    {
      id: "brand",
      label: "Design Vectors & PSDs",
      icon: Layers,
      exts: ["psd", "ai", "fig", "svg", "eps"],
      sampleAssets: [
        { name: "brandmark_vector_blue.svg", size: "12 KB", tags: ["logo", "vector", "rgb"] },
        { name: "hero_banner_blue_v3.psd", size: "84.2 MB", tags: ["photoshop", "layers", "q1"] },
        { name: "design_system_tokens.fig", size: "4.8 MB", tags: ["figma", "components"] },
      ],
    },
  ];

  const currentCat = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8A33D]">
            Multi-Format Indexing
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Native indexers for every media type
          </h2>
        </div>
        <p className="max-w-md text-[13px] text-muted-foreground leading-relaxed">
          Vaultgrid doesn't treat your files like generic blobs. Each file extension triggers format-aware metadata extraction directly on disk.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-lg">
        {/* Category Tabs */}
        <div className="flex flex-wrap border-b border-border bg-background/60 p-2 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  active
                    ? "bg-surface text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className={`size-4 ${active ? "text-[#E8A33D]" : ""}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="p-6 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-4 text-left">
            <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
              <span>{currentCat.label}</span>
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Deep inspection reads color profiles, vertex counts, frame rates, and font weights automatically upon dropping into your vault.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[11px] text-muted-foreground block mb-2">
                Supported Extensions:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {currentCat.exts.map((ext) => (
                  <span
                    key={ext}
                    className="px-2 py-0.5 rounded border border-border bg-background text-foreground"
                  >
                    .{ext}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            {currentCat.sampleAssets.map((asset, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-border bg-background/80 hover:border-border/80 transition-all text-left gap-2"
              >
                <div className="min-w-0">
                  <div className="font-mono text-xs font-medium text-foreground truncate">
                    {asset.name}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {asset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground shrink-0 sm:text-right">
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] text-foreground">
                    {asset.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const COMPARISONS = [
    {
      feature: "Search Latency",
      vaultgrid: "sub-10ms instant local inverted index",
      cloudDam: "1,200ms+ network API round-trip",
    },
    {
      feature: "Privacy & Data Ownership",
      vaultgrid: "100% stored on local drive / private NAS",
      cloudDam: "Originals uploaded to cloud servers",
    },
    {
      feature: "Pricing Model",
      vaultgrid: "One-time $2 lifetime access",
      cloudDam: "$15–$50 per user per month",
    },
    {
      feature: "Offline Access",
      vaultgrid: "Full indexing & search without internet",
      cloudDam: "Broken when offline or on poor Wi-Fi",
    },
    {
      feature: "File Size Limits",
      vaultgrid: "Unlimited (up to your drive capacity)",
      cloudDam: "Strict tier caps & GB overage fees",
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#E8A33D]">
          Engineered Differently
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Vaultgrid vs. Cloud Asset Managers
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xl text-left font-sans">
        <div className="grid grid-cols-12 border-b border-border bg-background/80 p-4 text-xs font-mono font-medium text-muted-foreground">
          <div className="col-span-4 sm:col-span-4">Capability</div>
          <div className="col-span-4 sm:col-span-4 text-foreground font-semibold flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#E8A33D]" /> Vaultgrid
          </div>
          <div className="col-span-4 sm:col-span-4 text-muted-foreground">Traditional Cloud DAM</div>
        </div>

        <div className="divide-y divide-border/60">
          {COMPARISONS.map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-4 text-xs items-center hover:bg-secondary/40 transition-colors">
              <div className="col-span-4 font-medium text-foreground pr-2">{row.feature}</div>
              <div className="col-span-4 font-mono text-emerald-400 font-medium pr-2 flex items-center gap-1.5">
                <Check className="size-3.5 text-[#E8A33D] shrink-0" />
                <span>{row.vaultgrid}</span>
              </div>
              <div className="col-span-4 font-mono text-muted-foreground">{row.cloudDam}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const FAQS = [
    {
      q: "Does Vaultgrid copy or move my original files?",
      a: "No. Vaultgrid indexes files in-place exactly where they live on your local hard drive, SSD, or NAS shares. Your existing folder hierarchy and file locations are completely preserved.",
    },
    {
      q: "What does $2 lifetime access mean?",
      a: "You pay a single $2 payment via Polar to unlock unlimited asset indexing, collections, command palette search, and all future software updates with no recurring subscription.",
    },
    {
      q: "Is my asset metadata sent to any server?",
      a: "Never. All search indices, tags, EXIF details, and thumbnail catalogs are stored locally in your browser's IndexedDB / local storage engine.",
    },
    {
      q: "What file formats does Vaultgrid support?",
      a: "Vaultgrid supports 16+ common design, motion, and 3D formats including PSD, AI, FIG, GLB, USDZ, BLEND, MP4, MOV, OTF, TTF, WOFF2, WAV, AIFF, SVG, EXR, and C4D.",
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-left">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface font-mono text-[11px] text-muted-foreground">
          <HelpCircle className="size-3.5 text-[#E8A33D]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Everything you need to know
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-[#E8A33D]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground border-t border-border/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DuplicateRadarSection() {
  const [resolved, setResolved] = useState(false);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 shadow-xl overflow-hidden relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background font-mono text-[11px] text-muted-foreground mb-4">
              <Fingerprint className="size-3.5 text-[#E8A33D]" />
              <span>Smart Storage Optimizer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Reclaim gigabytes with Duplicate Radar
            </h2>
            <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
              Design projects quickly create duplicate assets across client folders. Vaultgrid flags identical filenames and related metadata without altering your original files.
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#E8A33D]" />
                <span>Identifies identical file hashes & token variations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#4FBFA0]" />
                <span>Safely reviews duplicate paths before action</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-border bg-background p-4 text-left shadow-inner">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3 font-mono text-xs">
                <span className="text-foreground font-medium flex items-center gap-2">
                  <Fingerprint className="size-4 text-[#E8A33D]" />
                  Radar Alert: 2 duplicates found
                </span>
                <span className="text-muted-foreground">Potential saving: 126 MB</span>
              </div>

              {!resolved ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-border bg-surface flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-foreground font-medium">
                        hero_banner_blue_v3.psd
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        /Marketing/Campaigns/Q1 (84.2 MB)
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Keep original
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-border bg-surface/50 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-foreground font-medium">
                        hero_banner_blue_v3 (1).psd
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        /Downloads/Archive (84.2 MB)
                      </div>
                    </div>
                    <button
                      onClick={() => setResolved(true)}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30 transition-colors"
                    >
                      Purge duplicate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center space-y-3">
                  <div className="size-10 rounded-full bg-[#4FBFA0]/20 text-[#4FBFA0] mx-auto flex items-center justify-center">
                    <Check className="size-5" strokeWidth={2.5} />
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Duplicate purged! 84.2 MB reclaimed.
                  </div>
                  <button
                    onClick={() => setResolved(false)}
                    className="text-xs font-mono text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Reset simulation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppInterfaceShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const HOTSPOTS = [
    {
      id: 0,
      title: "Smart Collections Sidebar",
      desc: "Organize files into dynamic collections like Brand Kit, Product Shots, 3D Props, and Sound Design.",
      x: "10%",
      y: "35%",
    },
    {
      id: 1,
      title: "Instant File Dropzone",
      desc: "Drag-and-drop PSD, GLB, MOV, OTF, or WAV files to immediately extract EXIF and embedded metadata.",
      x: "50%",
      y: "32%",
    },
    {
      id: 2,
      title: "Command & Search Bar",
      desc: "Sub-10ms inverted search query with ⌘K keyboard shortcut and instant file format filtering.",
      x: "82%",
      y: "8%",
    },
    {
      id: 3,
      title: "Audio & Media Previews",
      desc: "Real-time visual waveforms, 3D glTF viewport controls, and quick-tagging inspectors.",
      x: "30%",
      y: "65%",
    },
  ];

  return (
    <section id="app-showcase" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <Sparkles className="size-3 text-[#E8A33D]" />
          <span>Real Desktop Experience</span>
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
          Built for speed. Designed for focus.
        </h2>
        <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
          Explore the Vaultgrid workspace interface. Engineered specifically to give creators complete control over their local asset archive.
        </p>
      </div>

      {/* Main Desktop Window Display */}
      <div className="relative rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Window Top Controls Bar */}
        <div className="flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/80 inline-block" />
            <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">Vaultgrid — Workspace Library</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="hidden sm:inline-block">Vault size: 2.1 MB</span>
            <span className="px-2 py-0.5 rounded bg-surface border border-border text-[10px]">v2.4.0</span>
          </div>
        </div>

        {/* Real App Screenshot Preview Container with Hotspot Overlays */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#16140F]">
          <img
            src="/library-app-screenshot.png"
            alt="Vaultgrid Library Workspace Screenshot"
            className="w-full h-full object-cover object-top"
          />

          {/* Interactive Hotspot Overlay Pins */}
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(spot.id)}
              style={{ left: spot.x, top: spot.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group size-7 rounded-full border flex items-center justify-center transition-all ${
                activeHotspot === spot.id
                  ? "border-[#E8A33D] bg-[#E8A33D] text-[#16140F] scale-110 shadow-[0_0_15px_rgba(232,163,61,0.6)]"
                  : "border-border bg-background/90 text-foreground hover:border-[#E8A33D]"
              }`}
            >
              <span className="font-mono text-xs font-bold">{spot.id + 1}</span>
            </button>
          ))}
        </div>

        {/* Hotspot Description Cards Bar */}
        <div className="grid sm:grid-cols-4 border-t border-border bg-surface p-4 gap-4 text-left">
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              onClick={() => setActiveHotspot(spot.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activeHotspot === spot.id
                  ? "border-[#E8A33D]/50 bg-secondary shadow-sm"
                  : "border-border/60 bg-background/50 hover:border-border"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#E8A33D]/20 text-[#E8A33D] font-bold">
                  0{spot.id + 1}
                </span>
                <span className="text-xs font-semibold text-foreground truncate">{spot.title}</span>
              </div>
              <p className="mt-2 text-[12px] text-muted-foreground leading-snug">{spot.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveCanvas() {
  return (
    <section id="canvas" className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Live canvas / try it now
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
            Your whole vault, in one working space.
          </h2>
        </div>
        <p className="max-w-xs text-right text-[13px] leading-relaxed text-muted-foreground">
          Import your own files and the canvas becomes a searchable working surface, without sending originals to a cloud.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-foreground">
            <span className="size-2 rounded-full bg-[#E8A33D]" />
            Canvas 01
          </div>
          <div className="ml-auto flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <ScanSearch className="size-3.5" />
            Ready for your files
          </div>
        </div>

        <div className="grid min-h-[380px] md:grid-cols-[1fr_240px]">
          <div className="relative overflow-hidden bg-background grid-lines">
            <div className="absolute inset-8 grid place-items-center rounded-xl border border-dashed border-border bg-surface/50">
              <div className="max-w-xs text-center">
                <ScanSearch className="mx-auto size-7 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Your canvas starts with your files
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Names, sizes, file types, and dates are read from each local import. Nothing is uploaded.
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              Local workspace · waiting for import
            </div>
          </div>

          <aside className="border-t border-border bg-surface p-5 md:border-l md:border-t-0">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Workspace preview
              </span>
              <ShieldCheck className="size-4 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">
              Truthful metadata
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Only values read from your selected files
            </p>

            <div className="mt-6 space-y-3.5 border-t border-border pt-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="text-foreground">Your device</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Originals</span>
                <span className="text-foreground">Never uploaded</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Access</span>
                <span className="text-foreground">Private to you</span>
              </div>
            </div>

            <Link
              to="/auth"
              className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-[#E8A33D] px-3 py-2 text-xs font-semibold text-[#16140F] transition-transform hover:-translate-y-0.5"
            >
              Unlock full canvas
              <ArrowRight className="size-3.5" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
