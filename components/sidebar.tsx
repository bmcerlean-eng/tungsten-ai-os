"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MessageSquare, LayoutDashboard, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/accounts", icon: Users, label: "Accounts" },
];

const agents = [
  { href: "/agents/se-leads", label: "Strategic Engagements", initial: "V" },
  { href: "/agents/move-up", label: "Move Up", initial: "D" },
  { href: "/agents/value-engineering", label: "Value Engineering", initial: "T" },
  { href: "/agents/account-services", label: "Strategic Account Services", initial: "M" },
  { href: "/agents/enablement", label: "Enablement", initial: "S" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col bg-white border-r border-tungsten-border">
      {/* Logo — clickable, returns to home */}
      <Link href="/" className="px-5 py-4 border-b border-tungsten-border flex items-center gap-3 hover:bg-tungsten-surface transition-colors group">
        <Image
          src="/tungsten-logo-blue.jpg"
          alt="Tungsten Automation"
          width={120}
          height={32}
          className="object-contain"
          priority
        />
      </Link>

      {/* Main nav */}
      <nav className="px-3 pt-4 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-tungsten-navy text-white"
                  : "text-gray-600 hover:bg-tungsten-surface hover:text-tungsten-navy"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Team agents */}
      <div className="px-4 pt-6 pb-2">
        <div className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Teams</div>
      </div>
      <nav className="px-3 space-y-0.5">
        {agents.map(({ href, label, initial }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-tungsten-navy text-white"
                  : "text-gray-600 hover:bg-tungsten-surface hover:text-tungsten-navy"
              )}
            >
              <span className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                active ? "bg-white/20 text-white" : "bg-tungsten-navy text-white"
              )}>
                {initial}
              </span>
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-3 pb-4 border-t border-tungsten-border pt-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-tungsten-navy text-white"
              : "text-gray-500 hover:bg-tungsten-surface hover:text-tungsten-navy"
          )}
        >
          <Settings size={16} />
          Settings
        </Link>
        <div className="px-3 pt-3">
          <div className="text-xs font-medium text-gray-700">Barry McErlean</div>
          <div className="text-[11px] text-gray-400">VP Strategic Engagements</div>
        </div>
      </div>
    </aside>
  );
}
