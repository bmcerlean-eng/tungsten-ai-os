export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-5 space-y-4">
        <div>
          <div className="text-sm font-medium text-white mb-1">Data Connections</div>
          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex justify-between"><span>Salesforce CRM</span><span className="text-amber-400">Not connected (Phase 1)</span></div>
            <div className="flex justify-between"><span>Microsoft Graph (SharePoint)</span><span className="text-amber-400">Not connected (Phase 1)</span></div>
            <div className="flex justify-between"><span>Account Context Store</span><span className="text-emerald-400">Seed data loaded ✓</span></div>
            <div className="flex justify-between"><span>Claude API</span><span className="text-emerald-400">Connected ✓</span></div>
          </div>
        </div>
        <div className="border-t border-tungsten-border pt-4">
          <div className="text-sm font-medium text-white mb-1">Prototype Mode</div>
          <p className="text-xs text-slate-400">Running with seeded data for 10 strategic accounts. Phase 1 will connect to live Salesforce and SharePoint data.</p>
        </div>
      </div>
    </div>
  );
}
