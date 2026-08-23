import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { AlertTriangle, HardDrive, Layers, Sparkles } from "lucide-react";
import { COLOR_FAMILIES, colorHex, formatBytes, KINDS, type Asset } from "@/lib/data";
import { countDupes } from "./Sidebar";

export function Insights({ assets }: { assets: Asset[] }) {
  const totalBytes = assets.reduce((s, a) => s + a.bytes, 0);
  const unused = assets.filter((a) => a.uses === 0);
  const reclaimable = unused.reduce((s, a) => s + a.bytes, 0);

  const byKind = KINDS.map((k) => ({
    kind: k,
    count: assets.filter((a) => a.kind === k).length,
    size: assets.filter((a) => a.kind === k).reduce((s, a) => s + a.bytes, 0) / 1e9,
  }));

  const byColor = COLOR_FAMILIES.map((c) => ({
    name: c.label,
    value: assets.filter((a) => a.color === c.id).length,
    fill: c.hex,
  })).filter((c) => c.value > 0);

  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (11 - i));
    const label = d.toLocaleString("en", { month: "short" });
    const count = assets.filter((a) => {
      const t = new Date(a.createdAt);
      return t.getMonth() === d.getMonth() && t.getFullYear() === d.getFullYear();
    }).length;
    return { label, count };
  });

  const tagCounts = new Map<string, number>();
  assets.forEach((a) => a.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)));
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="space-y-4 pb-10">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Layers} label="Assets indexed" value={assets.length.toLocaleString()} sub="across all collections" />
        <Stat icon={HardDrive} label="Vault size" value={formatBytes(totalBytes)} sub="on this machine" />
        <Stat icon={Sparkles} label="Reclaimable" value={formatBytes(reclaimable)} sub={`${unused.length} never-used files`} accent />
        <Stat icon={AlertTriangle} label="Duplicate radar" value={String(countDupes(assets))} sub="near-identical files" />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Library growth" sub="assets added per month">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={months} margin={{ left: -20, right: 6, top: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-hairline)" }} />
              <Area type="monotone" dataKey="count" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Palette distribution" sub="dominant color family">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byColor} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={3} stroke="none">
                {byColor.map((c) => (
                  <Cell key={c.name} fill={c.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Storage by type" sub="gigabytes per asset kind">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byKind} margin={{ left: -20, right: 6, top: 8 }}>
              <XAxis dataKey="kind" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
              <Bar dataKey="size" radius={[6, 6, 0, 0]} fill="var(--color-chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Most used tags" sub="your working vocabulary">
          <ul className="space-y-2">
            {topTags.map(([tag, n]) => (
              <li key={tag} className="flex items-center gap-3 text-[13px]">
                <span className="w-32 shrink-0 truncate text-muted-foreground">{tag}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${(n / (topTags[0]?.[1] ?? 1)) * 100}%` }}
                  />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontSize: 12,
  color: "var(--color-popover-foreground)",
};

function Stat({
  icon: Icon, label, value, sub, accent,
}: { icon: typeof Layers; label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className="rise rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Icon className={`size-3.5 ${accent ? "text-primary" : ""}`} />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Panel({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="rise rounded-xl border border-border bg-surface p-4">
      <header className="mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-[12px] text-muted-foreground">{sub}</p>
      </header>
      {children}
    </section>
  );
}

export { colorHex };
