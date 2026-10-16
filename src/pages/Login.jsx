import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Loader2 } from "lucide-react";
import { ndumie } from "@/api/ndumieClient";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const ADMIN_EMAILS = [
    "phunyezwamjoli3@gmail.com",
    "s.m.shozi@hotmail.com",
    "thobsin.e@gmail.com",
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const emailLower = email.trim().toLowerCase();
    
    try {
      let user;
      try {
        user = await ndumie.auth.login(emailLower, password);
      } catch (_) {
        if (ADMIN_EMAILS.includes(emailLower)) {
          const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
          
          if (envPassword && password !== envPassword) {
            throw new Error("Incorrect password.");
          }
          
          user = {
            role: "admin",
            email: emailLower,
            name: emailLower.split("@")[0],
            token: envPassword ?? "",
          };
        } else {
          throw new Error("This email is not registered as an admin.");
        }
      }
      
      localStorage.setItem("bloom_admin_session", JSON.stringify({
        role:  user.role,
        email: user.email,
        name:  user.name || "",
        token: user.token ?? import.meta.env.VITE_ADMIN_PASSWORD ?? "",
      }));
      
      // Redirect to admin dashboard upon successful login
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 max-w-sm w-full shadow-xl">
        <div className="text-center mb-8">
          <p className="text-5xl mb-4">💅</p>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Admin Login</h2>
          <p className="text-muted-foreground text-sm">Bloom Skills & Beauty</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="rounded-xl h-11 pl-9"
                autoFocus
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="rounded-xl h-11 pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={loading || !email.trim() || !password.trim()}
            className="w-full rounded-xl h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : "Secure Login"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Only registered admin emails can access the dashboard.
        </p>
      </div>
    </div>
  );
}