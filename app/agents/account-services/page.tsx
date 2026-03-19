export default function AccountServicesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Strategic Account Services</h1>
        <p className="text-sm text-gray-400 mt-1">Mark DeBartolo · High-impact presentations, videos & Digital Rooms</p>
      </div>

      {/* Capability cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            title: "Presentation Generator",
            desc: "Account name + meeting objective → Claude drafts structured slide content using the 2026 Tungsten brand template, auto-populated with account data and relevant case studies.",
            status: "Phase 2",
          },
          {
            title: "Digital Room Brief",
            desc: "Recommends content assets from Seismic based on account industry and product mix for a tailored Digital Room.",
            status: "Phase 2",
          },
          {
            title: "Executive Leave-Behind",
            desc: "Post-meeting 1–2 page narrative: Tungsten value prop, agreed next steps, personalised to the account.",
            status: "Phase 2",
          },
          {
            title: "Video Script Drafts",
            desc: "Structured scripts for standard formats: product overview, customer story, use case demonstrations.",
            status: "Phase 2",
          },
        ].map(({ title, desc, status }) => (
          <div key={title} className="bg-white border border-tungsten-border rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-tungsten-navy">{title}</h3>
              <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{status}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* New team note */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-2">Team Context</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Strategic Account Services is a new team under Mark DeBartolo. SharePoint is not yet set up for this team.
          The Phase 2 agent will use the <span className="font-medium text-tungsten-navy">TungstenAutomation_PPT_Template_2026.potx</span> brand
          template and the Account Context Store to personalise all outputs. No additional data connections needed for Phase 2.
        </p>
      </div>
    </div>
  );
}
