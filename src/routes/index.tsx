import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Boxes, Command, Fingerprint, Gauge, Layers, Palette, ScanSearch, ShieldCheck,
  Sparkles, Tags, Wifi,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";

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
        content: "Instant search across every design, video, 3D and font file you own. One $2 payment, unlimited forever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: ScanSearch, title: "Sub-10ms search", body: "A local inverted index over filenames, tags, notes, EXIF and embedded metadata. Results land before your finger leaves the key." },
  { icon: Fingerprint, title: "Duplicate radar", body: "Perceptual hashing flags near-identical renders, re-exports and client round-trips so you can reclaim gigabytes in one pass." },
  { icon: Palette, title: "Color-family filter", body: "Every asset is binned into a palette family at index time. Filter a 40k-file vault down to “teal + isometric” instantly." },
  { icon: Tags, title: "Auto-tag on import", body: "Filenames, folder ancestry and file type become structured tags the moment a file lands in the dropzone." },
  { icon: Gauge, title: "Vault insights", body: "See growth over time, storage by kind, reclaimable dead weight and your real working vocabulary of tags." },
  { icon: Command, title: "Keyboard-native", body: "⌘K jumps to any asset or action. Grid, list, filters, star, purge — all reachable without touching the mouse." },
];

function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] veil" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] grid-lines opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="size-4" strokeWidth={2} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Vaultgrid</span>
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#workflow" className="transition-colors hover:text-foreground">Workflow</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
        </nav>
        <Link
          to="/auth"
          className="rounded-lg border border-border bg-secondary px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-primary/50"
        >
          Open vault
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-14 text-center">
        <span className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-muted-foreground">
          <Wifi className="size-3.5 text-primary" />
          Runs locally · no cloud upload · one-time $2
        </span>
        <h1 className="rise mx-auto mt-7 max-w-4xl text-[clamp(2.6rem,6.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]" style={{ animationDelay: "60ms" }}>
          Every asset you own,
          <br />
          <span className="text-gradient-amber">findable in one keystroke.</span>
        </h1>
        <p className="rise mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground" style={{ animationDelay: "120ms" }}>
          Vaultgrid indexes your design elements, video masters, 3D props and typefaces where they already
          live — then gives you instant search, palette filters and duplicate detection over the whole thing.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "180ms" }}>
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Unlock for $2
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
          >
            See how it works
          </a>
        </div>

        <div className="rise relative mx-auto mt-16 max-w-5xl" style={{ animationDelay: "240ms" }}>
          <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-lift)]">
            <img
              src={heroImg}
              alt="Vaultgrid asset library preview with glass panels of design, 3D and video assets"
              width={1600}
              height={1104}
              className="w-full"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-24 rounded-full bg-primary/20 blur-3xl" />
        </div>
      </section>

      <section className="relative z-10 border-y border-border/60 bg-surface/40 py-4">
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 gap-10 whitespace-nowrap pr-10 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex gap-10">
                {["psd", "ai", "fig", "glb", "usdz", "blend", "prores", "r3d", "otf", "woff2", "wav", "aiff", "svg", "exr", "tiff", "c4d"].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold tracking-[-0.03em]">
          Built for libraries that outgrew the Finder.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
          Six features that no folder structure will ever give you.
        </p>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="rise hover-lift rounded-xl border border-border bg-surface p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <f.icon className="size-5 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] font-semibold tracking-[-0.03em]">
              Index once. Never hunt again.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              Point Vaultgrid at your drives, and it builds a structured index of everything — without moving,
              renaming or uploading a single file. Your originals stay exactly where your pipeline expects them.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                { n: "01", t: "Point at a folder", d: "Drives, NAS shares, project archives — all indexed in place." },
                { n: "02", t: "Let it tag", d: "Kind, palette family, dimensions, duration and filename tokens become filters." },
                { n: "03", t: "Search like a database", d: "Combine tag + color + kind + collection, then hit ⌘K to jump anywhere." },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="font-mono text-[12px] text-primary">{s.n}</span>
                  <div>
                    <p className="text-[14px] font-medium">{s.t}</p>
                    <p className="text-[13px] text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              { icon: Layers, k: "42,180", v: "files indexed in a typical studio vault" },
              { icon: Sparkles, k: "310 GB", v: "average dead weight reclaimed" },
              { icon: ScanSearch, k: "8 ms", v: "median query latency" },
              { icon: ShieldCheck, k: "0 bytes", v: "leaves your machine" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-border bg-background/60 p-4">
                <s.icon className="size-4 text-primary" strokeWidth={1.5} />
                <p className="mt-3 text-xl font-semibold tracking-tight">{s.k}</p>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-3xl px-6 pb-28 text-center">
        <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold tracking-[-0.03em]">
          One payment. Everything, forever.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
          No seats, no tiers, no monthly guilt. Pay two dollars once and the vault is yours without limits.
        </p>
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-primary/40 bg-surface p-8 text-left shadow-[var(--shadow-glow)]">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">$2</span>
            <span className="pb-2 text-sm text-muted-foreground">once · lifetime access</span>
          </div>
          <ul className="mt-6 space-y-2.5 text-[13px] text-muted-foreground">
            {[
              "Unlimited assets and collections",
              "Instant search, palette + kind filters",
              "Duplicate radar and reclaim reports",
              "Vault insights dashboard",
              "⌘K command palette and shortcuts",
              "All future updates included",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/auth"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get lifetime access
            <ArrowRight className="size-4" />
          </Link>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Secure checkout via Polar · instant unlock
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-[12px] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Vaultgrid — local-first asset management.</span>
          <span className="font-mono">built for people with too many files</span>
        </div>
      </footer>
    </main>
  );
}
