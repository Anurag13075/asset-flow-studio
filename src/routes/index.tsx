import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Command,
  FileImage,
  FileVideo,
  Fingerprint,
  Box,
  Gauge,
  Layers,
  Palette,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Tags,
  Search,
  CornerDownLeft,
  Package,
  ShieldAlert,
  HardDrive,
  FileText,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultgrid — Local-first asset manager for design studios" },
      {
        name: "description",
        content:
          "Index millions of design, video, 3D and font files on your own machine. Client delivery packaging, font conflict radar, drive awareness & contact sheet export. $2 once, unlimited forever.",
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

const PRO_SUITE_SHOWCASE = [
  {
    icon: Package,
    badge: "1-Click Packaging",
    title: "1. Client delivery packaging",
    subtitle: "No more broken PSD smart objects or missing fonts",
    description: "Vaultgrid traverses the asset dependency graph, resolves every linked file, collapses all file paths to relative, and bundles them into a clean .zip package.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-muted-foreground border-b border-border/60 pb-2">
          <span>hero_poster.psd</span>
          <span className="text-primary font-semibold">1-Click ZIP</span>
        </div>
        <div className="space-y-1 text-[11px] text-muted-foreground">
          <div className="flex justify-between text-emerald-400">
            <span> ├── brandmark_v2.svg</span>
            <span>(relative path)</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span> ├── InterTight-Medium.otf</span>
            <span>(font link)</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span> └── studio_render_4k.png</span>
            <span>(texture ref)</span>
          </div>
        </div>
        <div className="pt-2 text-center text-[11px] text-[#E8A33D] font-semibold border-t border-border/40">
          ✓ Exported hero_poster_delivery.zip
        </div>
      </div>
    ),
  },
  {
    icon: ShieldAlert,
    badge: "Legal Compliance",
    title: "2. License & usage tracking",
    subtitle: "Never ship an asset with an unlicensed or personal tag",
    description: "Tag fonts and stock assets with license types, expiry dates, and attribution requirements. Receive immediate warnings before delivering non-commercial assets.",
    preview: (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
          <span className="flex items-center gap-1.5"><ShieldAlert className="size-4 text-amber-400" /> Commercial Guard Alert</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20">EXPIRED</span>
        </div>
        <div className="text-xs text-foreground font-medium">tokyo_street_portrait.jpg</div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Tagged as <span className="text-amber-300 font-mono">Personal / Non-Commercial</span>. Expiry: 2024-05-01. Extended client rights required before export.
        </p>
      </div>
    ),
  },
  {
    icon: Layers,
    badge: "Typographic Radar",
    title: "3. Font conflict detector",
    subtitle: "Catch text reflow bugs before your client opens the file",
    description: "Detects when multiple versions of the same font family from different foundries or with differing metrics hashes are installed on your machine.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 space-y-2 text-xs">
        <div className="flex justify-between items-center text-foreground font-medium">
          <span>Family: Inter Tight</span>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">2 Conflicts</span>
        </div>
        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="p-2 rounded border border-border bg-surface flex justify-between">
            <span>InterTight-Medium.otf</span>
            <span className="text-muted-foreground">Monotype (v2.004)</span>
          </div>
          <div className="p-2 rounded border border-amber-500/30 bg-amber-500/5 flex justify-between text-amber-200">
            <span>InterTight-Medium.ttf</span>
            <span className="text-amber-300">Google Fonts (v4.000)</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Box,
    badge: "Deep Metadata",
    title: "4. Real embedded metadata search",
    subtitle: "Layer count, GLB vertices, WAV sample rates, EXIF",
    description: "No AI fluff. Vaultgrid extracts layer counts from PSDs, vertex counts from 3D GLBs, sample rates from audio WAVs, and camera profiles right from file headers.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
        <div className="p-2 rounded border border-border bg-surface">
          <div className="text-muted-foreground text-[10px]">PSD LAYERS</div>
          <div className="text-foreground font-semibold mt-0.5">48 layers</div>
        </div>
        <div className="p-2 rounded border border-border bg-surface">
          <div className="text-muted-foreground text-[10px]">3D MESH VERTICES</div>
          <div className="text-foreground font-semibold mt-0.5">142,800 verts</div>
        </div>
        <div className="p-2 rounded border border-border bg-surface">
          <div className="text-muted-foreground text-[10px]">AUDIO SAMPLE RATE</div>
          <div className="text-foreground font-semibold mt-0.5">96 kHz / 24-bit</div>
        </div>
        <div className="p-2 rounded border border-border bg-surface">
          <div className="text-muted-foreground text-[10px]">EXIF CAMERA</div>
          <div className="text-foreground font-semibold mt-0.5">Sony α7R V</div>
        </div>
      </div>
    ),
  },
  {
    icon: HardDrive,
    badge: "Local First",
    title: "5. Drive-aware storage tracking",
    subtitle: "Know which external drive holds each asset",
    description: "When an external archive drive is unplugged, Vaultgrid alerts you with '12 assets offline, reconnect LaCie Studio' instead of rendering mysterious broken thumbnails.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium text-amber-300">
            <HardDrive className="size-4 text-amber-400 animate-pulse" /> LaCie Studio 4TB
          </span>
          <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">OFFLINE</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          14 archived video masters offline. Reconnect drive <span className="font-mono text-foreground">/Volumes/LaCie_Studio</span> to access originals.
        </p>
      </div>
    ),
  },
  {
    icon: FileText,
    badge: "Deterministic PDF",
    title: "6. Contact sheet export",
    subtitle: "1-Click PDF generation for client review",
    description: "Generate clean, deterministic PDF handoff contact sheets complete with thumbnails, pixel dimensions, file size, and license specs with one click.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 space-y-2 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="font-semibold text-foreground">Vaultgrid_Contact_Sheet.pdf</span>
          <span className="text-[10px] font-mono text-primary">A4 Printable</span>
        </div>
        <div className="p-2.5 rounded border border-border bg-surface flex items-center gap-3">
          <div className="size-8 rounded bg-secondary grid place-items-center font-mono font-bold text-muted-foreground text-[10px]">PDF</div>
          <div className="text-[11px]">
            <div className="font-medium text-foreground">Client Review Handoff</div>
            <div className="text-muted-foreground font-mono">24 assets · specs & license included</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: RotateCcw,
    badge: "Versioned Safety",
    title: "7. Undo-safe vault operations",
    subtitle: "Local versioned trash protects against accidental deletes",
    description: "Every deletion inside Vaultgrid moves to a local versioned trash bin with instant single-click undo recovery. No raw OS deletes to ruin your day.",
    preview: (
      <div className="rounded-xl border border-border bg-background p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <RotateCcw className="size-4 text-primary" />
          <div>
            <div className="font-medium text-foreground">hero_campaign_v2.psd</div>
            <div className="text-[11px] text-muted-foreground">Moved to versioned trash</div>
          </div>
        </div>
        <button className="px-2.5 py-1 rounded bg-primary text-primary-foreground text-[11px] font-medium">
          Undo Delete
        </button>
      </div>
    ),
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

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % DEMO_QUERIES.length);
        setFade(true);
      }, 200);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const current = DEMO_QUERIES[index];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 rounded-xl border border-border bg-surface text-left shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)] overflow-hidden">
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
      <div className="p-2 space-y-1">
        {current.results.map((res, i) => {
          const Icon = res.icon;
          return (
            <div
              key={`${current.query}-${i}`}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-secondary ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="p-1.5 rounded border border-border bg-background text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 text-xs text-foreground truncate">
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
          <span className="size-1.5 rounded-full bg-[#4FBFA0]" />
          <span>3 matching assets indexed locally</span>
        </div>
        <span>sub-10ms match</span>
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
          <a href="#showcase" className="transition-colors hover:text-foreground">
            Pro Suite Showcase
          </a>
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#canvas" className="transition-colors hover:text-foreground">
            Live canvas
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
        {/* Eyebrow label */}
        <div className="rise font-mono text-xs text-muted-foreground tracking-wide">
          local index · one-time $2
        </div>

        {/* Restrained Headline */}
        <h1
          className="rise mx-auto mt-5 max-w-2xl text-[34px] sm:text-[38px] lg:text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-foreground"
          style={{ animationDelay: "60ms" }}
        >
          Every asset you own, findable in one keystroke.
        </h1>

        {/* Subhead paragraph (max ~440px wide, centered) */}
        <p
          className="rise mx-auto mt-4 max-w-[440px] text-[14px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "120ms" }}
        >
          Vaultgrid indexes your design elements, video masters, 3D props and
          typefaces right where they live on your drive.
        </p>

        {/* Primary CTA button only */}
        <div
          className="rise mt-7 flex flex-col items-center justify-center gap-3"
          style={{ animationDelay: "180ms" }}
        >
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#E8A33D] px-5 py-2.5 text-xs font-semibold text-[#16140F] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Unlock for $2
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="#showcase"
            className="text-[12px] text-muted-foreground transition-colors hover:text-foreground underline underline-offset-4"
          >
            Or explore the new Pro Suite Showcase below
          </a>
        </div>

        {/* Signature Command Palette Demo Panel */}
        <div className="rise" style={{ animationDelay: "240ms" }}>
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

      {/* PRO SUITE SHOWCASE SECTION */}
      <section id="showcase" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-b border-border">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8A33D] font-semibold">
            Freelancer & Studio Workflow Suite
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Solves the single biggest pain points in asset management.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Built specifically for creative freelancers and agencies handling multi-file client deliveries, font licenses, physical external drives, and deep metadata.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRO_SUITE_SHOWCASE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rise hover-lift flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-xl border border-border bg-background text-foreground">
                      <Icon className="size-5 text-[#E8A33D]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-background text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-[#E8A33D] font-medium mt-0.5">{item.subtitle}</p>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/60">
                  {item.preview}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Canvas Section */}
      <LiveCanvas />

      {/* Features Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
          Built for libraries that outgrew the Finder.
        </h2>
        <p className="mt-3 max-w-lg text-[14px] text-muted-foreground">
          Core capabilities designed for serious local media archives.
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

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
          One payment. Everything, forever.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] text-muted-foreground">
          No subscriptions, no cloud tiers. Pay two dollars once and unlock lifetime access to your local vault.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-surface p-8 text-left shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)]">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight text-foreground">$2</span>
            <span className="pb-1 text-xs font-mono text-muted-foreground">
              once · lifetime access
            </span>
          </div>

          <ul className="mt-6 space-y-2.5 text-[13px] text-muted-foreground">
            {[
              "Client delivery packaging & 1-click ZIP exporter",
              "License & usage tracking with commercial clearance radar",
              "Font conflict detector for metrics & foundries",
              "Real embedded metadata search (PSD, GLB, WAV, EXIF)",
              "Drive-aware storage tracking (External volume offline alerts)",
              "Deterministic contact sheet PDF exporter",
              "Undo-safe versioned trash bin",
              "All future updates included",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#E8A33D]" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            to="/auth"
            className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-[#E8A33D] px-5 py-2.5 text-xs font-semibold text-[#16140F] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get lifetime access
            <ArrowRight className="size-3.5" />
          </Link>
          <p className="mt-3 text-center text-[11px] font-mono text-muted-foreground">
            Secure checkout via Polar · instant unlock
          </p>
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
