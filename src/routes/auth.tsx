import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Boxes, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { ThemeToggle } from "@/components/ThemeToggle";
import textureImg from "@/assets/texture.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — screenfast" },
      { name: "description", content: "Access your screenfast asset vault. One account, one $2 lifetime unlock." },
      { property: "og:title", content: "Sign in — screenfast" },
      { property: "og:description", content: "Access your local-first asset vault." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, user } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      toast.error("Enter a valid email and a password of 6+ characters");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      signIn(email);
      toast.success(mode === "signup" ? "Vault created" : "Welcome back");
      navigate({ to: "/library" });
    }, 650);
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="relative flex items-center justify-center px-6 py-16">
        <div className="absolute right-6 top-6 z-10">
          <ThemeToggle />
        </div>
        <div className="pointer-events-none absolute inset-0 veil" />
        <div className="relative w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">screenfast</span>
          </Link>

          <h1 className="mt-10 text-3xl font-semibold tracking-[-0.03em]">
            {mode === "signup" ? "Create your vault" : "Welcome back"}
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            {mode === "signup"
              ? "Two dollars, once. Unlimited assets after that."
              : "Sign in to pick up where your library left off."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-3">
            <label className="block">
              <span className="text-[12px] text-muted-foreground">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="mt-1.5 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              />
            </label>
            <label className="block">
              <span className="text-[12px] text-muted-foreground">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : null}
              {mode === "signup" ? "Create vault" : "Sign in"}
              {!busy && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <button
            onClick={() => setMode((m) => (m === "signup" ? "signin" : "signup"))}
            className="mt-5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {mode === "signup" ? "Already have a vault? Sign in" : "New here? Create a vault"}
          </button>

          <p className="mt-8 text-[11px] leading-relaxed text-muted-foreground">
            Accounts are stored on this device while the backend is being wired up. Payment unlock runs
            through Polar.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-border lg:block">
        <img
          src={textureImg}
          alt=""
          width={1280}
          height={720}
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <blockquote className="max-w-md text-[22px] font-medium leading-snug tracking-[-0.02em]">
            Keep your originals where they are. screenfast gives the files you choose a searchable local index.
          </blockquote>
          <p className="mt-4 text-[13px] text-muted-foreground">Local-first asset management</p>
        </div>
      </div>
    </main>
  );
}


