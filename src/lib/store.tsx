import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Asset, type Collection, DEFAULT_COLLECTIONS } from "./data";

const KEY = "screenfast.v2";
export const FREE_ACCESS_EMAIL = "anuragf863@gmail.com";

export function isFreeAccessEmail(email: string) {
  return email.trim().toLowerCase() === FREE_ACCESS_EMAIL;
}

type Persisted = {
  assets: Asset[];
  collections: Collection[];
  user: { email: string; name: string } | null;
  paidEmail: string | null;
};

type Store = Persisted & {
  ready: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
  grantAccess: () => void;
  updateAsset: (id: string, patch: Partial<Asset>) => void;
  removeAssets: (ids: string[]) => void;
  addAssets: (files: { name: string; bytes: number; lastModified: number }[]) => Asset[];
  addCollection: (name: string) => void;
};

const Ctx = createContext<Store | null>(null);

function initial(): Persisted {
  return { assets: [], collections: DEFAULT_COLLECTIONS, user: null, paidEmail: null };
}

function kindFromName(name: string): Asset["kind"] {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["mp4", "mov", "webm", "prores"].includes(ext)) return "video";
  if (["glb", "fbx", "obj", "blend", "usdz"].includes(ext)) return "3d";
  if (["otf", "ttf", "woff", "woff2"].includes(ext)) return "font";
  if (["svg", "ai", "eps"].includes(ext)) return "vector";
  if (["wav", "mp3", "aiff", "flac"].includes(ext)) return "audio";
  return "image";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => initial());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Persisted & { paid?: boolean };
        setState({
          ...initial(),
          ...stored,
          paidEmail: stored.paidEmail ?? (stored.paid ? (stored.user?.email ?? null) : null),
        });
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setReady(true), 550);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const value = useMemo<Store>(
    () => ({
      ...state,
      ready,
      signIn: (email) => {
        const normalizedEmail = email.trim().toLowerCase();
        setState((s) => ({
          ...s,
          user: { email: normalizedEmail, name: normalizedEmail.split("@")[0] ?? "designer" },
        }));
      },
      signOut: () => setState((s) => ({ ...s, user: null })),
      grantAccess: () => setState((s) => ({ ...s, paidEmail: s.user?.email ?? s.paidEmail })),
      updateAsset: (id, patch) =>
        setState((s) => ({
          ...s,
          assets: s.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        })),
      removeAssets: (ids) =>
        setState((s) => ({ ...s, assets: s.assets.filter((a) => !ids.includes(a.id)) })),
      addAssets: (files) => {
        const created = files.map((f, i) => {
          const kind = kindFromName(f.name);
          return {
            id: `up_${Date.now().toString(36)}_${i}`,
            name: f.name.replace(/\.[^.]+$/, ""),
            kind,
            ext: f.name.split(".").pop()?.toLowerCase() ?? "bin",
            tags: [],
            color: null,
            collection: "unfiled",
            bytes: f.bytes,
            createdAt: new Date(f.lastModified).toISOString(),
            lastUsed: null,
            uses: 0,
            license: "unknown" as const,
            hash: null,
          } satisfies Asset;
        });
        setState((s) => ({ ...s, assets: [...created, ...s.assets] }));
        return created;
      },
      addCollection: (name) =>
        setState((s) => ({
          ...s,
          collections: [
            ...s.collections,
            { id: `c_${Date.now().toString(36)}`, name, icon: "Folder" },
          ],
        })),
    }),
    [state, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function useHotkey(combo: (e: KeyboardEvent) => boolean, handler: () => void) {
  const cb = useCallback(handler, [handler]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (combo(e)) {
        e.preventDefault();
        cb();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cb, combo]);
}
