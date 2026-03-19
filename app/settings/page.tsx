export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-tungsten-navy">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Connection status and configuration</p>
      </div>
      <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-tungsten-border bg-tungsten-surface">
          <h2 className="text-sm font-semibold text-tungsten-navy">Data Connections</h2>
        </div>
        <div className="px-5 py-4 space-y-3">
          {[
            { label: "Claude API", status: "Connected", ok: true },
            { label: "Account Context Store", status: "Seed data loaded (10 accounts)", ok: true },
            { label: "Salesforce CRM", status: "Not connected — Phase 1", ok: false },
            { label: "Microsoft Graph (SharePoint)", status: "Not connected — Phase 1", ok: false },
            { label: "Azure AD SSO", status: "Not connected — Phase 1", ok: false },
          ].map(({ label, status, ok }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-tungsten-border/60 last:border-0">
              <span className="text-sm text-gray-700 font-medium">{label}</span>
              <span className={`text-xs font-medium ${ok ? "text-emerald-600" : "text-amber-500"}`}>{status}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 bg-tungsten-surface border-t border-tungsten-border">
          <div className="text-sm font-semibold text-tungsten-navy mb-1">Prototype Mode</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Running with seeded data for 10 strategic accounts. Phase 1 will connect to live Salesforce and SharePoint data
            with Azure AD SSO for Tungsten employees.
          </p>
        </div>
      </div>
    </div>
  );
}
