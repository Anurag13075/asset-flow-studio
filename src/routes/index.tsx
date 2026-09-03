import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  Copy, 
  FileVideo,
  Fingerprint,
  Layers,
  Package,
  Palette,
  ScanSearch,
  Search,
  Sparkles,
  Tags,
  Type,
  Wand2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImg from "@/assets/newhero.png";

import searchImg from "@/assets/lp-search.jpg";
import dedupeImg from "@/assets/lp-dedupe.jpg";
import handoffImg from "@/assets/lp-handoff.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultgrid — Find any design file in milliseconds" },
      {
        name: "description",
        content:
          "Vaultgrid indexes every image, video, 3D, font and vector file you own. Instant search, duplicate radar, batch rename studio and client handoff kits. $2 once, yours forever.",
      },
      { property: "og:title", content: "Vaultgrid — Find any design file in milliseconds" },
      {
        property: "og:description",
        content:
          "Instant search, duplicate radar, rename studio and handoff kits for your whole asset library. One $2 payment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/* ────────────────────────────────────────────────────────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(24px)",
        transition: `opacity .7s var(--ease-out-quint) ${delay}ms, transform .7s var(--ease-out-quint) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Nav ──────────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
      <nav className="lp-pill pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 rounded-full px-4 py-2.5 sm:px-5">
        <Link to="/" className="flex items-center gap-2 pr-2">
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Boxes className="size-4" />
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground">
            Vaultgrid
          </span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 md:flex">
          {[
            ["Features", "#features"],
            ["Workflows", "#workflows"],
            ["Rename Studio", "#rename"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <Link
            to="/auth"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="group flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary md:hidden"
          >
            <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="lp-pill pointer-events-auto mx-auto mt-2 max-w-5xl rounded-3xl p-2 md:hidden">
          {[
            ["Features", "#features"],
            ["Workflows", "#workflows"],
            ["Rename Studio", "#rename"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="lp-sky relative overflow-hidden px-4 pb-16 pt-32 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <div className="lp-rise inline-flex items-center gap-2 rounded-full border border-[color:var(--card-ring)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          One $2 payment. No subscription, ever.
        </div>

        <h1 className="lp-rise mt-7 text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
          Find any file
          <br />
          before you finish
          <br />
          typing it
        </h1>

        <p className="lp-rise mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          Vaultgrid indexes every image, video, 3D model, font and vector you own — then makes the
          whole mess searchable, de-duplicated and ready to ship in seconds.
        </p>

        <div className="lp-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth"
            className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            Open your vault
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            className="rounded-full border border-[color:var(--card-ring)] bg-[color:var(--surface)] px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
          >
            See what it solves
          </a>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Runs locally in your browser · No uploads · No watermark
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl">
        <div className="lp-card overflow-hidden p-2">
          <img
            src={heroImg}
            alt="Design, video and 3D files organised in a floating Vaultgrid library"
            width={1600}
            height={1008}
            className="w-full rounded-[22px] object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-6 -bottom-6 h-16 rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {["Studios", "Freelancers", "Video editors", "Brand teams", "3D artists"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </section>
  );
}

/* ── Why section ──────────────────────────────────────────────── */

const WHY = [
  {
    img: searchImg,
    title: "Search that beats your memory",
    body: "Type a colour, a client, a file type or half a filename. Vaultgrid ranks matches across name, tags, kind and palette in under 40ms — no folders required.",
  },
  {
    img: dedupeImg,
    title: "Duplicate radar, always on",
    body: "hero-final, hero-final-v2, hero-final-REAL. Vaultgrid clusters near-identical files by name shape, kind and size, then shows you exactly what to delete.",
  },
  {
    img: handoffImg,
    title: "Client handoff in one click",
    body: "Pick the assets, get a clean delivery kit with names, formats, licence state and a copy-paste manifest. No more zipping the wrong export at 11pm.",
  },
];

function WhySection() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <Reveal>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.035em] text-foreground">
              Why
              <br />
              Vaultgrid?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted-foreground md:pb-3">
              Stop digging through Drive, Slack threads and three external SSDs. Vaultgrid turns a
              decade of scattered files into one calm, searchable library.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {WHY.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="lp-card h-full p-4">
                <div className="lp-media">
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-56 w-full object-cover"
                  />
                </div>
                <div className="px-3 pb-4 pt-6 text-center">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Rename Studio (the flagship feature) ─────────────────────── */

const SAMPLE = [
  { name: "Screenshot 2024-11-02 at 14.22.13", ext: "png", kind: "image" },
  { name: "final_v2_FINAL (copy)", ext: "png", kind: "image" },
  { name: "IMG_9931", ext: "jpg", kind: "image" },
  { name: "untitled-export-3", ext: "mp4", kind: "video" },
];

const PRESETS = [
  { id: "client", label: "Client delivery", pattern: "{client}-{kind}-{nn}" },
  { id: "date", label: "Dated archive", pattern: "{date}_{client}_{nn}" },
  { id: "web", label: "Web-safe slug", pattern: "{client}-{name}-{nn}" },
];

function applyPattern(pattern: string, i: number, base: string, kind: string, client: string) {
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 22);
  return pattern
    .replace(/\{client\}/g, client.trim().toLowerCase().replace(/\s+/g, "-") || "client")
    .replace(/\{kind\}/g, kind)
    .replace(/\{name\}/g, slug || "asset")
    .replace(/\{date\}/g, "2026-09")
    .replace(/\{nn\}/g, String(i + 1).padStart(2, "0"));
}

function RenameStudioSection() {
  const [preset, setPreset] = useState(PRESETS[0]!);
  const [client, setClient] = useState("northwind");

  return (
    <section id="rename" className="lp-sky relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The thing nobody else ships
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
            Rename Studio: fix 400 filenames
            <br className="hidden sm:block" /> in one keystroke
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Every studio loses hours to naming. Write a pattern once, preview every result live, and
            apply it across your whole selection — reversible, non-destructive, instant.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="lp-card mt-14 grid gap-0 overflow-hidden lg:grid-cols-[320px_1fr]">
            <div className="border-b border-[color:var(--card-ring)] p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Pattern preset
              </p>
              <div className="mt-4 space-y-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreset(p)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      preset.id === p.id
                        ? "border-primary/50 bg-secondary text-foreground"
                        : "border-[color:var(--card-ring)] text-muted-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <span>{p.label}</span>
                    {preset.id === p.id && <Check className="size-4 text-primary" />}
                  </button>
                ))}
              </div>

              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Client token
              </label>
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[color:var(--card-ring)] bg-[color:var(--surface-2)] px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/60"
                placeholder="client name"
              />

              <p className="mt-6 rounded-2xl bg-[color:var(--surface-2)] px-4 py-3 font-mono text-xs text-muted-foreground">
                {preset.pattern}
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Wand2 className="size-3.5 text-primary" /> Live preview
              </div>
              <div className="mt-4 space-y-2">
                {SAMPLE.map((f, i) => (
                  <div
                    key={f.name}
                    className="grid grid-cols-1 items-center gap-2 rounded-2xl border border-[color:var(--card-ring)] bg-[color:var(--surface-2)] px-4 py-3 sm:grid-cols-[1fr_auto_1fr]"
                  >
                    <span className="truncate font-mono text-xs text-muted-foreground line-through">
                      {f.name}.{f.ext}
                    </span>
                    <ArrowRight className="hidden size-3.5 text-primary sm:block" />
                    <span className="truncate font-mono text-xs font-medium text-foreground">
                      {applyPattern(preset.pattern, i, f.name, f.kind, client)}.{f.ext}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/auth"
                  className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Try it on your files <ArrowRight className="size-3.5" />
                </Link>
                <span className="text-xs text-muted-foreground">
                  Tokens: {"{client} {kind} {name} {date} {nn}"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Capability grid ──────────────────────────────────────────── */

const CAPS = [
  {
    icon: ScanSearch,
    title: "Instant fuzzy search",
    body: "Name, tag, extension, kind and dominant colour — all indexed, all ranked live as you type.",
  },
  {
    icon: Fingerprint,
    title: "Duplicate clustering",
    body: "Version-suffix aware. Groups copy, v2, final and alt into one cluster with a reclaim estimate.",
  },
  {
    icon: Tags,
    title: "Auto-tagging",
    body: "New uploads get kind, extension and palette tags on arrival, so nothing lands unlabelled.",
  },
  {
    icon: Palette,
    title: "Colour filtering",
    body: "Find the amber logo lockup without knowing its name. Filter the whole vault by palette.",
  },
  {
    icon: Package,
    title: "Handoff kits",
    body: "Bundle a selection into a delivery manifest with sizes, formats and licence status.",
  },
  {
    icon: Layers,
    title: "Vault insights",
    body: "See what's stale, what's unused, what's eating disk and what you keep re-downloading.",
  },
  {
    icon: Type,
    title: "Fonts & 3D, first class",
    body: "OTF, WOFF2, GLB, FBX, USDZ and ProRes are indexed like any other asset — not an afterthought.",
  },
  {
    icon: Copy,
    title: "⌘K everywhere",
    body: "One palette for search, view switching, theme and filters. Hands never leave the keyboard.",
  },
];

function CapabilityGrid() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
            Every messy corner of your
            <br className="hidden sm:block" /> library, handled
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 70}>
              <div className="lp-card h-full p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-primary">
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Workflows ────────────────────────────────────────────────── */

const WORKFLOWS = [
  {
    id: "studios",
    label: "Design studios",
    body: "Ten years of client work across four drives. Vaultgrid gives every project one searchable home and a duplicate report on day one.",
  },
  {
    id: "editors",
    label: "Video editors",
    body: "ProRes, LUTs, SFX and stock B-roll indexed together, so the right clip surfaces before the render finishes.",
  },
  {
    id: "brand",
    label: "Brand teams",
    body: "Licence state on every asset means nobody ships an expired stock photo to a billboard again.",
  },
  {
    id: "freelance",
    label: "Freelancers",
    body: "Handoff kits that make a one-person studio look like an agency — clean names, correct formats, one manifest.",
  },
  {
    id: "3d",
    label: "3D artists",
    body: "GLB, FBX and USDZ previews, tagged by project, with size insights that keep your working drive alive.",
  },
];

function WorkflowsSection() {
  const [active, setActive] = useState(WORKFLOWS[0]!);
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Numbers ──────────────────────────────────────────────────── */

function StatsSection() {
  const stats = [
    ["40ms", "median search across 100k assets"],
    ["6.4h", "average time saved per project"],
    ["31%", "of a typical vault is duplicates"],
    ["$2", "once — not per month"],
  ];
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([n, label], i) => (
          <Reveal key={n} delay={i * 70}>
            <div className="lp-card p-7">
              <p className="text-4xl font-bold tracking-tight text-foreground">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────── */

function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
            One payment. Whole vault.
          </h2>
          <p className="mt-5 text-[17px] text-muted-foreground">
            Vaultgrid costs less than a coffee, once. Every feature, every future update.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="lp-card mt-12 p-9 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Lifetime access
            </p>
            <p className="mt-4 text-6xl font-bold tracking-tight text-foreground">$2</p>
            <p className="mt-2 text-sm text-muted-foreground">one time · no subscription</p>
            <ul className="mx-auto mt-8 grid max-w-md gap-2.5 text-left text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Unlimited assets",
                "Rename Studio",
                "Duplicate radar",
                "Handoff kits",
                "Vault insights",
                "⌘K palette",
                "Light & dark themes",
                "All future updates",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/auth"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              Unlock Vaultgrid <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────── */

const FAQ = [
  [
    "Where do my files live?",
    "In your browser, on your machine. Vaultgrid indexes metadata locally — nothing is uploaded to a server.",
  ],
  [
    "What file types are supported?",
    "Images, vectors, video, audio, fonts and 3D. PNG, JPG, SVG, AI, MP4, MOV, ProRes, WAV, OTF, WOFF2, GLB, FBX, USDZ and more.",
  ],
  [
    "Is Rename Studio destructive?",
    "No. Renames apply to your Vaultgrid index and preview live before you commit, so you always see the result first.",
  ],
  ["Is $2 really the whole price?", "Yes. One payment, lifetime access, every future update included."],
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="lp-sky px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.035em] text-foreground">
            Questions, answered
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQ.map(([q, a], i) => (
            <Reveal key={q} delay={i * 60}>
              <div className="lp-card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-foreground">{q}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────────────────── */

function FinalCta() {
  return (
    <section className="px-4 pb-24 pt-10">
      <div className="lp-sky relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-[color:var(--card-ring)] px-6 py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground">
          Ready to stop
          <br />
          hunting for files?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[17px] text-muted-foreground">
          No credit card to look around. Your first search is under a minute away.
        </p>
        <Link
          to="/auth"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
        >
          Open your vault <ArrowRight className="size-4" />
        </Link>
        <div className="pointer-events-none mt-16 flex items-end justify-center gap-4 opacity-70">
          {[FileVideo, Palette, Boxes, Type, Layers].map((Icon, i) => (
            <span
              key={i}
              className="grid size-14 place-items-center rounded-3xl border border-[color:var(--card-ring)] bg-[color:var(--surface)] text-primary animate-float"
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              <Icon className="size-6" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */

const FOOTER = [
  ["Product", ["Instant search", "Rename Studio", "Duplicate radar", "Handoff kits"]],
  ["Asset types", ["Images", "Video", "Fonts", "3D models"]],
  ["Workflows", ["Design studios", "Video editors", "Brand teams", "Freelancers"]],
  ["Company", ["Pricing", "Changelog", "Privacy", "Terms"]],
] as const;

function Footer() {
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

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--card-ring)] py-7 text-xs text-muted-foreground">
          <p>© 2026 Vaultgrid. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/auth" className="hover:text-foreground">
              Sign in
            </Link>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center text-[18vw] font-bold leading-[0.72] tracking-[-0.05em] text-foreground/[0.045]"
      >
        vaultgrid
      </p>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <WhySection />
        <RenameStudioSection />
        <CapabilityGrid />
        <WorkflowsSection />
        <StatsSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
