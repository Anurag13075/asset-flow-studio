import { useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Payment complete — Vaultgrid" }] }),
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const { ready, user, grantAccess } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!ready) return;
    if (!user) { navigate({ to: "/auth" }); return; }
    grantAccess();
    toast.success("Vault unlocked");
    const timer = window.setTimeout(() => navigate({ to: "/library" }), 1200);
    return () => window.clearTimeout(timer);
  }, [grantAccess, navigate, ready, user]);
  return <main className="grid min-h-screen place-items-center px-6"><div className="text-center">{ready && user ? <CheckCircle2 className="mx-auto size-12 text-primary" /> : <Loader2 className="mx-auto size-8 animate-spin text-primary" />}<h1 className="mt-5 text-2xl font-semibold">{ready && user ? "Payment received" : "Confirming your payment"}</h1><p className="mt-2 text-sm text-muted-foreground">{ready && user ? "Your local vault is unlocked. Taking you to the library…" : "Just a moment."}</p><Link to="/" className="mt-6 inline-block text-xs text-muted-foreground underline underline-offset-4">Return home</Link></div></main>;
}
