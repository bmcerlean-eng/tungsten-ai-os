import DeckGeneratorForm from "@/components/deck-generator-form";
import { Presentation, Video, FileText, LayoutDashboard } from "lucide-react";

export default function AccountServicesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Strategic Account Services</h1>
        <p className="text-sm text-gray-400 mt-1">Mark DeBartolo · Director, Content & Highspot · GKO · Digital Rooms</p>
      </div>

      {/* Live deck generator */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Presentation size={15} className="text-tungsten-gold" />
          <h2 className="text-sm font-semibold text-tungsten-navy uppercase tracking-wide">Account Briefing Deck Generator</h2>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Live</span>
        </div>
        <DeckGeneratorForm />
      </div>

      {/* Phase 2 capabilities */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <LayoutDashboard size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Phase 2 Capabilities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Presentation,
              title: "Custom Deck Builder",
              desc: "Meeting objective + account context → Claude drafts structured slide content using the 2026 Tungsten brand template with case studies and competitive positioning.",
            },
            {
              icon: LayoutDashboard,
              title: "Digital Room Brief",
              desc: "Recommends content assets from Seismic based on account industry and product mix for a tailored Digital Room experience.",
            },
            {
              icon: FileText,
              title: "Executive Leave-Behind",
              desc: "Post-meeting 1–2 page narrative: Tungsten value prop, agreed next steps, personalised to the account.",
            },
            {
              icon: Video,
              title: "Video Script Drafts",
              desc: "Structured scripts for standard formats: product overview, customer story, use case demonstrations.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-tungsten-border rounded-xl p-5 shadow-sm opacity-60">
              <div className="flex items-start gap-2 mb-2">
                <Icon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
                  <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">Phase 2</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team context */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-2">Team Context</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Strategic Account Services is led by Mark DeBartolo — Director, Content & Highspot Governance.
          The team produces GKO content, Digital Rooms, win story videos, and exec presentations.
          Phase 2 will integrate the <span className="font-medium text-tungsten-navy">TungstenAutomation_PPT_Template_2026.potx</span> brand
          template with Claude-generated content for fully personalized, account-specific presentations.
        </p>
      </div>
    </div>
  );
}
