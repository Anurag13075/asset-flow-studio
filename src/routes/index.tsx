import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArchiveRestore,
  Boxes,
  BrainCircuit,
  Check,
  ChevronDown,
  ClipboardCheck,
  Command,
  DatabaseZap,
  FileImage,
  FileText,
  FileVideo,
  FileWarning,
  Fingerprint,
  Box,
  Gauge,
  GitBranch,
  HardDrive,
  HelpCircle,
  Layers,
  ListChecks,
  Palette,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tags,
  Search,
  CornerDownLeft,
  WandSparkles,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultgrid - Local-first asset manager for design studios" },
      {
        name: "description",
        content:
          "Index millions of design, video, 3D and font files on your own machine. Instant search, auto-tagging, duplicate radar and vault insights. $2 once, unlimited forever.",
      },
      { property: "og:title", content: "Vaultgrid - Local-first asset manager" },
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
    icon: BrainCircuit,
    title: "Asset Rescue Autopilot",
    body: "Build a local dependency graph that finds missing fonts, offline footage, nested textures and handoff risks before a client opens the project.",
  },
  {
    icon: ShieldAlert,
    title: "License risk firewall",
    body: "Catch commercial-use gaps, unknown licenses and client handoff conflicts across a whole collection before export.",
  },
  {
    icon: Sparkles,
    title: "AI context packs",
    body: "Turn a collection into a prompt-ready brief with asset roles, style tokens, license notes, and negative constraints for any AI tool.",
  },
  {
    icon: GitBranch,
    title: "Visual lineage time machine",
    body: "Trace every export back to the exact source files, fonts, textures, versions, and decisions that created it.",
  },
  {
    icon: Fingerprint,
    title: "Duplicate radar",
    body: "Review files with matching names and related metadata before you remove an unnecessary copy.",
  },
  {
    icon: Palette,
    title: "Color-family filter",
    body: 'Every asset is binned into a palette family at index time. Filter a 40k-file vault down to "teal + isometric" instantly.',
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
    body: "Cmd+K jumps to any asset or action. Grid, list, filters, star, purge - all reachable without touching the mouse.",
  },
];

const BEST_FEATURES = [
  {
    icon: BrainCircuit,
    label: "Flagship",
    title: "Asset Rescue Autopilot",
    body: "Preflight old project folders, rebuild linked media, catch missing fonts, and package a clean client handoff.",
    metric: "9/9 links recovered",
    href: "#rescue",
  },
  {
    icon: ShieldAlert,
    label: "Risk guard",
    title: "License Firewall",
    body: "Block risky exports by checking commercial rights, font seats, music usage, and proof notes in one audit.",
    metric: "2 risks blocked",
    href: "#license-firewall",
  },
  {
    icon: Fingerprint,
    label: "Storage win",
    title: "Duplicate Radar",
    body: "Find duplicate names, related revisions, and safe reclaim opportunities before files pile up across client folders.",
    metric: "84.2 MB reclaimed",
    href: "#duplicate-radar",
  },
  {
    icon: Sparkles,
    label: "AI workflow",
    title: "AI Context Packs",
    body: "Send a model the right creative context without uploading originals or rewriting the brief from memory.",
    metric: "14 tokens mapped",
    href: "#ai-context-packs",
  },
  {
    icon: GitBranch,
    label: "Undo chaos",
    title: "Visual Lineage Time Machine",
    body: "Know which source, edit, font, texture, and approval produced the final file your client wants changed.",
    metric: "31 decisions traced",
    href: "#lineage-time-machine",
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

function BestFeatureHighlights() {
  return (
    <section id="highlights" className="relative z-10 mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-2xl border border-primary/25 bg-surface p-2 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)]">
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
        {BEST_FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          const isFlagship = index === 0;

          return (
            <a
              key={feature.title}
              href={feature.href}
              className={`group relative min-h-[250px] rounded-xl border border-border p-5 text-left transition-colors hover:bg-secondary/50 ${
                isFlagship ? "bg-background/65 xl:col-span-1" : "bg-surface"
              }`}
            >
              {isFlagship && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" />
              )}

              <div className="flex items-center justify-between gap-4">
                <div
                  className={`grid size-10 place-items-center rounded-xl border ${
                    isFlagship
                      ? "border-primary/35 bg-primary/15 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <span
                  className={`rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                    isFlagship
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {feature.label}
                </span>
              </div>

              <h2
                className={`mt-6 max-w-sm font-medium leading-tight tracking-tight text-foreground ${
                  isFlagship ? "text-2xl sm:text-3xl" : "text-xl"
                }`}
              >
                {feature.title}
              </h2>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                {feature.body}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-4">
                <span className="font-mono text-[11px] text-foreground">{feature.metric}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  View demo
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          );
        })}
        </div>
      </div>
    </section>
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
          <span>Cmd+K</span>
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

function AssetRescueAutopilot() {
  const [scanState, setScanState] = useState<"scan" | "fixed">("scan");

  const checks = [
    {
      icon: FileWarning,
      label: "Missing source footage",
      file: "product_launch_cut.aep",
      detail: "3 linked MOV files found in old drive mirror",
      status: scanState === "fixed" ? "Recovered" : "Needs rescue",
    },
    {
      icon: FileText,
      label: "Client font mismatch",
      file: "NeueGrotesk_Display.otf",
      detail: "Commercial license found in Brand Kit folder",
      status: scanState === "fixed" ? "Attached" : "License needed",
    },
    {
      icon: Box,
      label: "Nested 3D textures",
      file: "lounge_chair_turntable.glb",
      detail: "PBR maps packaged from /3D Models/Furniture",
      status: scanState === "fixed" ? "Packed" : "2 textures loose",
    },
  ];

  const manifestRows = [
    ["Project", "42 files"],
    ["Recovered links", scanState === "fixed" ? "9 of 9" : "6 of 9"],
    ["License proof", scanState === "fixed" ? "Ready" : "2 gaps"],
    ["Client zip", scanState === "fixed" ? "Clean handoff" : "Blocked"],
  ];

  return (
    <section id="rescue" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[11px] text-foreground">
            <BrainCircuit className="size-3.5 text-primary" />
            <span>Flagship feature</span>
          </div>
          <h2 className="mt-5 max-w-xl text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            Asset Rescue Autopilot turns messy project handoffs into clean,
            billable delivery packs.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Creative teams lose hours reopening old projects, hunting missing
            linked files, checking font rights, and rebuilding client folders.
            Vaultgrid preflights the entire local vault, rebuilds dependencies,
            and produces a manifest your client can trust.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { icon: GitBranch, label: "Dependency graph", value: "Every linked file" },
              { icon: ArchiveRestore, label: "Rescue pack", value: "Recovered paths" },
              { icon: ClipboardCheck, label: "Proof manifest", value: "License + usage" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-surface p-4">
                <item.icon className="size-4 text-primary" />
                <p className="mt-3 text-[13px] font-medium text-foreground">{item.label}</p>
                <p className="mt-1 text-[11px] font-mono text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/25 bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background/80 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <DatabaseZap className="size-4 text-primary" />
              Rescue preflight
            </div>
            <div className="ml-auto rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground">
              local scan only
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-[1fr_210px]">
            <div className="p-4">
              <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-background p-4">
                <div className="absolute inset-x-0 top-0 h-px bg-primary/70" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Active project
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Client_Relaunch_Master Folder
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface px-3 py-2 text-right">
                    <p className="font-mono text-[10px] text-muted-foreground">handoff score</p>
                    <p className={`text-lg font-semibold ${scanState === "fixed" ? "text-[#4FBFA0]" : "text-primary"}`}>
                      {scanState === "fixed" ? "98%" : "61%"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full bg-primary transition-all duration-500 ${
                      scanState === "fixed" ? "w-[98%]" : "w-[61%]"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {checks.map((check) => (
                  <div key={check.label} className="rounded-xl border border-border bg-background/70 p-3">
                    <div className="flex items-start gap-3">
                      <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface text-muted-foreground">
                        <check.icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-medium text-foreground">{check.label}</p>
                          <span
                            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${
                              scanState === "fixed"
                                ? "border-[#4FBFA0]/30 bg-[#4FBFA0]/10 text-[#4FBFA0]"
                                : "border-primary/30 bg-primary/10 text-primary"
                            }`}
                          >
                            {check.status}
                          </span>
                        </div>
                        <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
                          {check.file}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                          {check.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-border bg-background p-4 md:border-l md:border-t-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Delivery manifest
              </p>
              <div className="mt-4 space-y-3">
                {manifestRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-border/60 pb-2">
                    <span className="text-[11px] text-muted-foreground">{label}</span>
                    <span className="font-mono text-[11px] text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setScanState(scanState === "fixed" ? "scan" : "fixed")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <WandSparkles className="size-3.5" />
                {scanState === "fixed" ? "Reset preflight" : "Build rescue pack"}
              </button>
              <p className="mt-3 text-center font-mono text-[10px] leading-relaxed text-muted-foreground">
                No originals move until you approve the export.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function LicenseFirewallSection() {
  const [approved, setApproved] = useState(false);

  const rows = [
    ["Hero render", "commercial", "Approved"],
    ["Mono display font", approved ? "client covered" : "personal only", approved ? "Cleared" : "Blocked"],
    ["Music bed", "unknown", approved ? "Replaced" : "Needs source"],
    ["3D chair model", "cc0", "Approved"],
  ];

  return (
    <section id="license-firewall" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 md:grid-cols-[0.85fr_1.15fr] md:p-10">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <ShieldAlert className="size-3.5 text-primary" />
            <span>Commercial risk firewall</span>
          </div>
          <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Know which assets can legally ship before the final export.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Vaultgrid checks license tags, client collections, and usage notes
            together, then blocks risky handoffs until the missing proof is
            replaced or attached.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="rounded-md border border-border bg-background px-2 py-1">client work</span>
            <span className="rounded-md border border-border bg-background px-2 py-1">paid ads</span>
            <span className="rounded-md border border-border bg-background px-2 py-1">font seats</span>
            <span className="rounded-md border border-border bg-background px-2 py-1">music usage</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <ListChecks className="size-4 text-primary" />
              Campaign export audit
            </div>
            <span className={`rounded-md px-2 py-1 font-mono text-[10px] ${
              approved ? "bg-[#4FBFA0]/10 text-[#4FBFA0]" : "bg-destructive/10 text-destructive"
            }`}>
              {approved ? "ready to ship" : "2 risks found"}
            </span>
          </div>
          <div className="divide-y divide-border/60">
            {rows.map(([name, license, status]) => {
              const risky = status === "Blocked" || status === "Needs source";
              return (
                <div key={name} className="grid grid-cols-12 gap-3 px-4 py-3 text-xs">
                  <div className="col-span-5 font-medium text-foreground">{name}</div>
                  <div className="col-span-4 font-mono text-muted-foreground">{license}</div>
                  <div className={`col-span-3 flex items-center justify-end gap-1.5 font-mono ${
                    risky ? "text-destructive" : "text-[#4FBFA0]"
                  }`}>
                    {risky ? <AlertTriangle className="size-3" /> : <Check className="size-3" />}
                    <span>{status}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-border bg-surface p-4">
            <button
              onClick={() => setApproved(!approved)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <HardDrive className="size-3.5 text-primary" />
              {approved ? "Show original risks" : "Attach proof and replace risky assets"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiContextPacksSection() {
  const [mode, setMode] = useState<"ad" | "product" | "brand">("ad");

  const packs = {
    ad: {
      title: "Paid social launch",
      output: "Prompt pack for Meta, Midjourney, Runway, and editor handoff",
      assets: ["hero_banner_blue_v3.psd", "product_demo_4k_master.mp4", "InterTight-Variable.woff2"],
      tokens: ["blue glass UI", "warm key light", "fast product cuts", "no stock-photo hands"],
      proof: "Commercial license attached for 8 of 8 export assets",
    },
    product: {
      title: "3D catalog refresh",
      output: "Prompt pack for render variation, texture cleanup, and AR thumbnails",
      assets: ["lounge_chair_turntable.glb", "walnut_pbr_albedo.exr", "studio_lighting_4k.hdr"],
      tokens: ["walnut texture", "softbox reflection", "matte metal feet", "no geometry edits"],
      proof: "Original mesh, PBR maps, and HDRI traced from local project folders",
    },
    brand: {
      title: "Brand system expansion",
      output: "Prompt pack for logo variants, icon sets, and web section art",
      assets: ["brandmark_vector_blue.svg", "design_system_tokens.fig", "app_icon_dark_blue.png"],
      tokens: ["teal accent only", "tight grid spacing", "rounded 8px UI", "no purple gradients"],
      proof: "Brand constraints and source vectors included without uploading originals",
    },
  };

  const current = packs[mode];

  return (
    <section id="ai-context-packs" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>New premium workflow</span>
          </div>
          <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            AI Context Packs make every model understand your project on the first try.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Designers waste paid AI generations because the model never sees the
            real brand kit, source files, usage rights, or forbidden styles.
            Vaultgrid turns a local collection into a structured context pack
            with source assets, style tokens, license proof, and negative prompts.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["Context", "Asset roles + style DNA"],
              ["Rights", "License-safe prompts"],
              ["Handoff", "Ready for AI tools"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-border bg-background p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-2 text-[13px] font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background text-left">
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface p-3">
            {[
              ["ad", "Ad launch"],
              ["product", "3D catalog"],
              ["brand", "Brand system"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setMode(id as typeof mode)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  mode === id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-0 md:grid-cols-[1fr_230px]">
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Generated context pack
              </p>
              <h3 className="mt-2 text-xl font-medium text-foreground">{current.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{current.output}</p>

              <div className="mt-5 space-y-2">
                {current.assets.map((asset, index) => (
                  <div key={asset} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
                    <div className="grid size-7 place-items-center rounded-md bg-background text-muted-foreground">
                      {index === 1 ? <FileVideo className="size-3.5" /> : <FileText className="size-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-[11px] text-foreground">{asset}</p>
                      <p className="text-[10px] text-muted-foreground">role mapped from filename, tags, and collection</p>
                    </div>
                    <Check className="size-3.5 text-[#4FBFA0]" />
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-border bg-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Prompt constraints</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.tokens.map((token) => (
                    <span key={token} className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-foreground">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-border bg-surface p-5 md:border-l md:border-t-0">
              <ClipboardCheck className="size-5 text-primary" />
              <p className="mt-4 text-sm font-medium text-foreground">Ready to paste</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{current.proof}</p>
              <div className="mt-5 rounded-lg border border-[#4FBFA0]/30 bg-[#4FBFA0]/10 p-3 font-mono text-[11px] text-[#4FBFA0]">
                Context quality: 96%
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground">
                Export context pack
                <ArrowRight className="size-3.5" />
              </button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function LineageTimeMachineSection() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      label: "Source capture",
      title: "Raw footage + brand kit indexed",
      detail: "Imported MOV masters, vectors, fonts, and source PSDs from the launch drive.",
    },
    {
      label: "Edit decisions",
      title: "Campaign cut assembled",
      detail: "Tracked the exact logo, font, LUT, music bed, and render preset used in the edit.",
    },
    {
      label: "Client delivery",
      title: "Final export approved",
      detail: "Generated social crops, proof manifest, and client-safe package from approved dependencies.",
    },
    {
      label: "Future change",
      title: "Revision source restored",
      detail: "Find the exact files needed when the client asks for a new size six months later.",
    },
  ];

  const active = steps[activeStep];

  return (
    <section id="lineage-time-machine" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border p-8 md:p-10 lg:border-b-0 lg:border-r">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
              <GitBranch className="size-3.5 text-primary" />
              <span>Revision intelligence</span>
            </div>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Visual Lineage Time Machine ends the "which final was final?" problem.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              Client work gets expensive when nobody knows which source file,
              render preset, font, or exported revision produced the approved
              version. Vaultgrid records the chain so any future change starts
              from the right dependencies.
            </p>

            <div className="mt-7 space-y-3">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(index)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    activeStep === index
                      ? "border-primary/40 bg-primary/10"
                      : "border-border bg-background hover:bg-secondary/60"
                  }`}
                >
                  <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-md font-mono text-[10px] ${
                    activeStep === index ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"
                  }`}>
                    0{index + 1}
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-foreground">{step.label}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{step.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-background p-5 md:p-8">
            <div className="rounded-xl border border-border bg-surface p-5 text-left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Selected timeline state</p>
                  <h3 className="mt-2 text-xl font-medium text-foreground">{active.title}</h3>
                </div>
                <span className="rounded-md border border-[#4FBFA0]/30 bg-[#4FBFA0]/10 px-2 py-1 font-mono text-[10px] text-[#4FBFA0]">
                  restorable
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Source files", activeStep + 8],
                  ["Linked decisions", activeStep * 7 + 17],
                  ["License records", activeStep + 4],
                  ["Export targets", activeStep * 2 + 3],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-background p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <DatabaseZap className="size-4 text-primary" />
                  Exact restore set
                </div>
                <div className="mt-4 space-y-2 font-mono text-[11px]">
                  {["launch_master_v12.prproj", "brandmark_vector_blue.svg", "NeueGrotesk_Display.otf", "social_9x16_export_recipe.json"].map((file) => (
                    <div key={file} className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
                      <span className="truncate text-muted-foreground">{file}</span>
                      <span className="text-foreground">found</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40">
                Restore this working state
                <ArchiveRestore className="size-3.5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VaultCommandCenter() {
  const [project, setProject] = useState<"launch" | "brand" | "catalog">("launch");
  const [scanned, setScanned] = useState(false);

  const projects = {
    launch: {
      name: "Client_Relaunch_Master",
      type: "Campaign handoff",
      score: scanned ? "98" : "61",
      files: "142",
      risks: scanned ? "0" : "4",
      recovered: scanned ? "9 / 9" : "6 / 9",
      actions: scanned
        ? ["9 linked files recovered", "Commercial font proof attached", "Clean delivery manifest generated"]
        : ["3 missing linked media files", "Font license proof is incomplete", "4 duplicate exports can be removed"],
    },
    brand: {
      name: "Northstar_Brand_System",
      type: "Brand library audit",
      score: scanned ? "100" : "76",
      files: "386",
      risks: scanned ? "0" : "2",
      recovered: scanned ? "24 / 24" : "22 / 24",
      actions: scanned
        ? ["24 source vectors mapped", "Usage rules attached to 100% of marks", "AI context pack ready"]
        : ["2 logo variants lack source vectors", "3 font seats need verification", "Brand rules are split across folders"],
    },
    catalog: {
      name: "Spring_3D_Catalog",
      type: "3D production review",
      score: scanned ? "94" : "68",
      files: "1,204",
      risks: scanned ? "1" : "8",
      recovered: scanned ? "38 / 38" : "31 / 38",
      actions: scanned
        ? ["38 texture dependencies packaged", "1 HDRI needs license review", "Web and AR exports grouped"]
        : ["7 PBR texture links are loose", "1 HDRI has unknown usage rights", "Duplicate geometry is using 14.8 GB"],
    },
  };

  const current = projects[project];

  return (
    <section id="command-center" className="relative z-10 mx-auto max-w-6xl px-6 pb-12">
      <div className="overflow-hidden rounded-2xl border border-primary/35 bg-surface shadow-[0_28px_80px_-32px_rgba(232,163,61,0.38)]">
        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-border bg-background p-7 md:p-9 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground">
                <Zap className="size-3.5 text-primary" />
                Command center
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">01 / 03</span>
            </div>
            <h2 className="mt-6 max-w-md text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
              Know what is safe to ship before anyone asks.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              One local scan turns a messy project folder into a decision-ready brief: dependencies, rights, duplicates, and the exact next actions for your team.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {(["launch", "brand", "catalog"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => { setProject(id); setScanned(false); }}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${project === id ? "border-primary/50 bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"}`}
                >
                  {id === "launch" ? "Campaign" : id === "brand" ? "Brand kit" : "3D catalog"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setScanned(!scanned)}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <ScanSearch className="size-4" />
              {scanned ? "Review original scan" : "Run local health scan"}
            </button>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">Nothing uploads. Nothing moves without approval.</p>
          </div>

          <div className="p-4 md:p-6">
            <div className="rounded-xl border border-border bg-background text-left">
              <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
                <div className="grid size-8 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary"><DatabaseZap className="size-4" /></div>
                <div>
                  <p className="text-xs font-medium text-foreground">{current.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{current.type} / local index</p>
                </div>
                <span className={`ml-auto rounded-md border px-2 py-1 font-mono text-[10px] ${scanned ? "border-[#4FBFA0]/30 bg-[#4FBFA0]/10 text-[#4FBFA0]" : "border-primary/30 bg-primary/10 text-primary"}`}>
                  {scanned ? "ready to deliver" : "attention needed"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-px border-b border-border bg-border">
                {[["Health score", `${current.score}%`], ["Indexed files", current.files], ["Open risks", current.risks]].map(([label, value]) => (
                  <div key={label} className="bg-surface p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className={`mt-2 text-2xl font-semibold ${label === "Open risks" && !scanned ? "text-destructive" : "text-foreground"}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-5 p-5 md:grid-cols-[1fr_170px]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-foreground">Recommended next actions</p>
                    <span className="font-mono text-[10px] text-muted-foreground">priority sorted</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {current.actions.map((action, index) => (
                      <div key={action} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5">
                        <span className={`grid size-5 shrink-0 place-items-center rounded-full ${scanned ? "bg-[#4FBFA0]/15 text-[#4FBFA0]" : "bg-primary/15 text-primary"}`}>
                          {scanned ? <Check className="size-3" /> : <span className="font-mono text-[10px]">{index + 1}</span>}
                        </span>
                        <span className="text-[11px] text-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Delivery confidence</p>
                  <div className="mt-5 grid place-items-center">
                    <div className="grid size-28 place-items-center rounded-full border-[7px] border-primary/20" style={{ borderTopColor: scanned ? "#4FBFA0" : "#E8A33D", borderRightColor: scanned ? "#4FBFA0" : "#E8A33D" }}>
                      <span className="text-2xl font-semibold text-foreground">{current.score}%</span>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2 font-mono text-[10px] text-muted-foreground">
                    <div className="flex justify-between"><span>Links recovered</span><span className="text-foreground">{current.recovered}</span></div>
                    <div className="flex justify-between"><span>Privacy mode</span><span className="text-[#4FBFA0]">local only</span></div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          <a href="#highlights" className="transition-colors hover:text-foreground">
            Best features
          </a>
          <a href="#command-center" className="transition-colors hover:text-foreground">
            Command center
          </a>
          <a href="#rescue" className="transition-colors hover:text-foreground">
            Flagship
          </a>
          <a href="#ai-context-packs" className="transition-colors hover:text-foreground">
            AI packs
          </a>
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
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">Local-first index / $2 once</span>
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

        <a
          href="https://startupbase.io/products/vaultgrod?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-light"
          target="_blank"
          rel="noopener noreferrer"
          className="rise mt-5 inline-flex rounded-lg border border-border bg-surface/70 p-2 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.55)] transition-colors hover:border-primary/40"
          style={{ animationDelay: "200ms" }}
        >
          <img
            src="https://statics.startupbase.io/site/badges/launched-on-sb.svg"
            alt="Launched on StartupBase"
            height={55}
            className="h-[55px] w-auto"
          />
        </a>

        <a
          href="https://turbo0.com/item/vaultgrid"
          target="_blank"
          rel="noopener noreferrer"
          className="rise mt-3 inline-flex rounded-lg border border-border bg-surface/70 p-2 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.55)] transition-colors hover:border-primary/40"
          style={{ animationDelay: "220ms" }}
        >
          <img
            src="https://img.turbo0.com/badge-listed-light.svg"
            alt="Listed on Turbo0"
            height={54}
            className="h-[54px] w-auto"
          />
        </a>

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
            <div className="text-foreground font-semibold flex items-center gap-1.5">
              <BrainCircuit className="size-3 text-[#E8A33D]" /> Rescue Packs
            </div>
            <div className="text-muted-foreground mt-0.5 text-[10px]">Missing links + licenses</div>
          </div>
        </div>

        {/* Signature Command Palette Demo Panel */}
        <div className="rise" style={{ animationDelay: "260ms" }}>
          <SearchDemoPanel />
        </div>
      </section>

      <VaultCommandCenter />

      {/* Best Feature Highlights */}
      <BestFeatureHighlights />

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

      {/* Flagship Feature Section */}
      <AssetRescueAutopilot />

      {/* App Interface Showcase Section */}
      <AppInterfaceShowcase />

      {/* AI Context Packs Section */}
      <AiContextPacksSection />

      {/* Visual Lineage Time Machine Section */}
      <LineageTimeMachineSection />

      {/* Format Explorer Section */}
      <FormatExplorer />

      {/* Duplicate Radar Section */}
      <DuplicateRadarSection />

      {/* License Firewall Section */}
      <LicenseFirewallSection />

      {/* Live Canvas Section */}
      <LiveCanvas />

      {/* Features Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
          Built for libraries that outgrew the Finder.
        </h2>
        <p className="mt-3 max-w-lg text-[14px] text-muted-foreground">
          Ten core capabilities designed for serious local media archives.
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
                  d: "Drives, NAS shares, project archives - all indexed in place.",
                },
                {
                  n: "02",
                  t: "Let it tag",
                  d: "Kind, palette family, dimensions, and filename tokens become structured metadata.",
                },
                {
                  n: "03",
                  t: "Search like a database",
                  d: "Combine tag + color + kind + collection, then hit Cmd+K to jump anywhere.",
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
              USD / pay once, own forever
            </span>
          </div>

          <ul className="mt-6 space-y-3 text-[13px] text-muted-foreground">
            {[
              "Unlimited asset indexing & local collections",
              "Sub-10ms instant command search system",
              "AI context packs for model-ready creative briefs",
              "Visual lineage time machine for restoring exact source states",
              "Duplicate radar & storage reclaim optimizer",
              "Vault insights & working vocabulary analytics",
              "Cmd+K command palette with full keyboard navigation",
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
            <span>Secure checkout via Polar / 100% money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-[12px] text-muted-foreground sm:flex-row">
          <span>(c) {new Date().getFullYear()} Vaultgrid - local-first asset management.</span>
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
    <section id="duplicate-radar" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
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
      cloudDam: "$15-$50 per user per month",
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
      desc: "Sub-10ms inverted search query with Cmd+K keyboard shortcut and instant file format filtering.",
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
            <span className="ml-3 font-mono text-xs text-muted-foreground">Vaultgrid - Workspace Library</span>
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
              Local workspace / waiting for import
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
