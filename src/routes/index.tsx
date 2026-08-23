import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Command,
  FileCode,
  FileImage,
  FileText,
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
} from "lucide-react";

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
    <div className="w-full max-w-2xl mx-auto mt-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] text-left shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Top command bar */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.08)] bg-[#1D1B15]">
        <Search className="size-4 text-[#A39F8F] shrink-0" />
        <div className="flex-1 font-mono text-sm text-[#F2EFE6] flex items-center gap-1 min-h-[20px]">
          <span
            className={`transition-opacity duration-200 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {current.query}
          </span>
          <span className="w-2 h-4 bg-[#E8A33D] inline-block animate-blink ml-0.5" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.08)] bg-[#16140F] font-mono text-[10px] text-[#A39F8F]">
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
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#24211A] ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="p-1.5 rounded border border-[rgba(255,255,255,0.08)] bg-[#16140F] text-[#A39F8F]">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 text-xs text-[#F2EFE6] truncate">
                  <HighlightedText text={res.name} match={res.match} />
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono text-[11px] text-[#A39F8F]">
                <span className="hidden sm:inline-block text-[11px] opacity-75">
                  {res.path}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#16140F] border border-[rgba(255,255,255,0.06)] text-[10px]">
                  {res.meta}
                </span>
                <CornerDownLeft className="size-3 text-[#A39F8F] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[rgba(255,255,255,0.08)] bg-[#16140F] font-mono text-[11px] text-[#A39F8F]">
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
    <main className="relative min-h-screen bg-[#16140F] text-[#F2EFE6] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-180 grid-lines opacity-40 mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md bg-[#E8A33D] text-[#16140F]">
            <Boxes className="size-4" strokeWidth={2.2} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#F2EFE6]">
            Vaultgrid
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-[#A39F8F] md:flex">
          <a href="#features" className="transition-colors hover:text-[#F2EFE6]">
            Features
          </a>
          <a href="#canvas" className="transition-colors hover:text-[#F2EFE6]">
            Live canvas
          </a>
          <a href="#workflow" className="transition-colors hover:text-[#F2EFE6]">
            Workflow
          </a>
          <a href="#pricing" className="transition-colors hover:text-[#F2EFE6]">
            Pricing
          </a>
        </nav>

        <Link
          to="/auth"
          className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] px-3.5 py-1.5 text-[13px] font-medium text-[#F2EFE6] transition-colors hover:border-[rgba(255,255,255,0.18)]"
        >
          Open vault
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 text-center">
        {/* Eyebrow label */}
        <div className="rise font-mono text-xs text-[#A39F8F] tracking-wide">
          local index · one-time $2
        </div>

        {/* Restrained Headline */}
        <h1
          className="rise mx-auto mt-5 max-w-2xl text-[34px] sm:text-[38px] lg:text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-[#F2EFE6]"
          style={{ animationDelay: "60ms" }}
        >
          Every asset you own, findable in one keystroke.
        </h1>

        {/* Subhead paragraph (max ~440px wide, centered) */}
        <p
          className="rise mx-auto mt-4 max-w-[440px] text-[14px] leading-relaxed text-[#A39F8F]"
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
            href="#canvas"
            className="text-[12px] text-[#A39F8F] transition-colors hover:text-[#F2EFE6] underline underline-offset-4"
          >
            Or explore the live canvas preview below
          </a>
        </div>

        {/* Signature Command Palette Demo Panel */}
        <div className="rise" style={{ animationDelay: "240ms" }}>
          <SearchDemoPanel />
        </div>
      </section>

      {/* File Types Marquee */}
      <section className="relative z-10 border-y border-[rgba(255,255,255,0.08)] bg-[#1D1B15] py-3.5">
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 gap-10 whitespace-nowrap pr-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[#A39F8F]">
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

      {/* Live Canvas Section */}
      <LiveCanvas />

      {/* Features Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#F2EFE6]">
          Built for libraries that outgrew the Finder.
        </h2>
        <p className="mt-3 max-w-lg text-[14px] text-[#A39F8F]">
          Six core capabilities designed for serious local media archives.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="rise hover-lift rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] p-5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <f.icon className="size-5 text-[#F2EFE6]" strokeWidth={1.5} />
              <h3 className="mt-4 text-[15px] font-medium tracking-tight text-[#F2EFE6]">
                {f.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A39F8F]">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] p-8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#F2EFE6]">
              Index once. Never hunt again.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#A39F8F]">
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
                  <span className="font-mono text-xs text-[#A39F8F]">{s.n}</span>
                  <div>
                    <p className="text-[14px] font-medium text-[#F2EFE6]">{s.t}</p>
                    <p className="text-[13px] text-[#A39F8F]">{s.d}</p>
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
                className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#16140F] p-4"
              >
                <s.icon className="size-4 text-[#F2EFE6]" strokeWidth={1.5} />
                <p className="mt-3 text-base font-medium tracking-tight text-[#F2EFE6]">
                  {s.k}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-[#A39F8F]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#F2EFE6]">
          One payment. Everything, forever.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] text-[#A39F8F]">
          No subscriptions, no cloud tiers. Pay two dollars once and unlock lifetime access to your local vault.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] p-8 text-left shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)]">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight text-[#F2EFE6]">$2</span>
            <span className="pb-1 text-xs font-mono text-[#A39F8F]">
              once · lifetime access
            </span>
          </div>

          <ul className="mt-6 space-y-2.5 text-[13px] text-[#A39F8F]">
            {[
              "Unlimited assets and local collections",
              "Instant sub-10ms search & filter system",
              "Duplicate radar and reclaim reports",
              "Vault insights & vocabulary analytics",
              "⌘K command palette and keyboard shortcuts",
              "All future updates included",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#A39F8F]" />
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
          <p className="mt-3 text-center text-[11px] font-mono text-[#A39F8F]">
            Secure checkout via Polar · instant unlock
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgba(255,255,255,0.08)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-[12px] text-[#A39F8F] sm:flex-row">
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A39F8F]">
            Live canvas / try it now
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#F2EFE6]">
            Your whole vault, in one working space.
          </h2>
        </div>
        <p className="max-w-xs text-right text-[13px] leading-relaxed text-[#A39F8F]">
          Import your own files and the canvas becomes a searchable working surface, without sending originals to a cloud.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1D1B15] shadow-[0_16px_36px_-16px_rgba(0,0,0,0.8)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[rgba(255,255,255,0.08)] bg-[#16140F] px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#F2EFE6]">
            <span className="size-2 rounded-full bg-[#E8A33D]" />
            Canvas 01
          </div>
          <div className="ml-auto flex items-center gap-2 text-[11px] font-mono text-[#A39F8F]">
            <ScanSearch className="size-3.5" />
            Ready for your files
          </div>
        </div>

        <div className="grid min-h-[380px] md:grid-cols-[1fr_240px]">
          <div className="relative overflow-hidden bg-[#16140F] grid-lines">
            <div className="absolute inset-8 grid place-items-center rounded-xl border border-dashed border-[rgba(255,255,255,0.12)] bg-[#1D1B15]/50">
              <div className="max-w-xs text-center">
                <ScanSearch className="mx-auto size-7 text-[#A39F8F]" />
                <p className="mt-3 text-sm font-medium text-[#F2EFE6]">
                  Your canvas starts with your files
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#A39F8F]">
                  Names, sizes, file types, and dates are read from each local import. Nothing is uploaded.
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded border border-[rgba(255,255,255,0.08)] bg-[#16140F] px-2.5 py-1 font-mono text-[10px] text-[#A39F8F]">
              Local workspace · waiting for import
            </div>
          </div>

          <aside className="border-t border-[rgba(255,255,255,0.08)] bg-[#1D1B15] p-5 md:border-l md:border-t-0">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#A39F8F]">
                Workspace preview
              </span>
              <ShieldCheck className="size-4 text-[#A39F8F]" />
            </div>
            <h3 className="mt-4 text-base font-medium text-[#F2EFE6]">
              Truthful metadata
            </h3>
            <p className="mt-1 text-xs text-[#A39F8F]">
              Only values read from your selected files
            </p>

            <div className="mt-6 space-y-3.5 border-t border-[rgba(255,255,255,0.08)] pt-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#A39F8F]">Source</span>
                <span className="text-[#F2EFE6]">Your device</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A39F8F]">Originals</span>
                <span className="text-[#F2EFE6]">Never uploaded</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A39F8F]">Access</span>
                <span className="text-[#F2EFE6]">Private to you</span>
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
