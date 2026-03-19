import Link from "next/link";
import { MessageSquare, LayoutDashboard, Users, Settings, Zap } from "lucide-react";

const nav = [
  { href: "/", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/accounts", icon: Users, label: "Accounts" },
];

const agents = [
  { href: "/agents/se-leads", label: "SE Leads", initial: "V" },
  { href: "/agents/move-up", label: "Move Up", initial: "D" },
  { href: "/agents/ve", label: "Value Engineering", initial: "T" },
  { href: "/agents/account-services", label: "Acct Services", initial: "M" },
  { href: "/agents/enablement", label: "Enablement", initial: "S" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-tungsten-surface border-r border-tungsten-border">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-tungsten-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-tungsten-gold flex items-center justify-center">
            <Zap size={14} className="text-tungsten-dark" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">TUNGSTEN</div>
            <div className="text-[10px] text-tungsten-gold font-medium tracking-widest">AI OS</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-2 pt-4 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-tungsten-border hover:text-white transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Team agents */}
      <div className="px-4 pt-6 pb-2">
        <div className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Teams</div>
      </div>
      <nav className="px-2 space-y-0.5">
        {agents.map(({ href, label, initial }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-tungsten-border hover:text-white transition-colors"
          >
            <span className="w-5 h-5 rounded-full bg-tungsten-blue flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              {initial}
            </span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-2 pb-4 border-t border-tungsten-border pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-tungsten-border hover:text-white transition-colors"
        >
          <Settings size={16} />
          Settings
        </Link>
        <div className="px-3 pt-3">
          <div className="text-xs text-slate-500">Barry McErlean</div>
          <div className="text-[11px] text-slate-600">VP Strategic Engagements</div>
        </div>
      </div>
    </aside>
  );
}
