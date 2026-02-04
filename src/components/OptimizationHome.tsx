import React, { useState, useEffect } from 'react';
import logoImage from '../assets/logo.png';
import { getMyOptimizations, deleteDraft, type SavedOptimization } from '../utils/drafts';

const EventCaseIconOk = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const EventCaseIconWarning = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M8 2L1 14h14L8 2zM8 6v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const EventCaseIconFailed = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const EventCaseIconOnly = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2v1.5M8 12.5V14M14 8h-1.5M3.5 8H2M12.2 3.8l-1 1.1M4.8 11.2l-1 1.1M11.2 11.2l1 1.1M3.8 3.8l1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const EventCaseIconNoChange = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
    <path d="M8 2a6 6 0 016 6c0 2-1.5 3.5-3 4.5A6 6 0 012 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const OutcomeIconActivated = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block align-middle shrink-0 text-emerald-600" aria-hidden>
    <path d="M8 12V4M8 4L5 7M8 4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const OutcomeIconPaused = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block align-middle shrink-0 text-amber-600" aria-hidden>
    <path d="M6 4h1v8H6V4zm3 0h1v8H9V4z" fill="currentColor"/>
  </svg>
);
const OutcomeIconFailed = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block align-middle shrink-0 text-red-600" aria-hidden>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const OutcomeIconOk = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block align-middle shrink-0 text-emerald-600" aria-hidden>
    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const OutcomeIconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block align-middle shrink-0 text-gray-500" aria-hidden>
    <path d="M4 8h6M9 6l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OUTCOME_EMOJI_ICONS: Record<string, React.ReactNode> = {
  '🔼': <OutcomeIconActivated />,
  '⏸️': <OutcomeIconPaused />,
  '❌': <OutcomeIconFailed />,
  '✅': <OutcomeIconOk />,
  '→': <OutcomeIconArrow />,
};
const OUTCOME_EMOJI_REGEX = /(🔼|⏸️|❌|✅|→)/g;

function renderOutcomeWithIcons(text: string): React.ReactNode {
  const parts = text.split(OUTCOME_EMOJI_REGEX).filter(Boolean);
  return parts.map((part, i) => {
    const icon = OUTCOME_EMOJI_ICONS[part];
    if (icon) return <React.Fragment key={i}>{icon}</React.Fragment>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

interface OptimizationHomeProps {
  onNavigateToWorkflowBuilder: () => void;
  onOpenDraft?: (draft: SavedOptimization) => void;
}

export const OptimizationHome: React.FC<OptimizationHomeProps> = ({
  onNavigateToWorkflowBuilder,
  onOpenDraft,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'my-optimizations' | 'events'>('home');
  const [drafts, setDrafts] = useState<SavedOptimization[]>(() => getMyOptimizations());
  const [eventsLogActionsOpen, setEventsLogActionsOpen] = useState<number | null>(null);

  useEffect(() => {
    if (activeTab === 'my-optimizations') {
      setDrafts(getMyOptimizations());
    }
  }, [activeTab]);

  const handleDeleteDraft = (id: string) => {
    if (typeof window !== 'undefined' && window.confirm('Delete this optimization draft? This cannot be undone.')) {
      deleteDraft(id);
      setDrafts(getMyOptimizations());
    }
  };

  const latestOptimizationEvents = [
    { id: 1, tool: 'Ad Rotation', case: 'ok', caseLabel: 'All OK', logMessage: 'Kept 40 ads active (2 ad sets) — 🔼 20 activated, ⏸️ 20 paused → 40 active', timestamp: '2026-02-02 09:42:15' },
    { id: 2, tool: 'Ad Rotation', case: 'partial_both', caseLabel: 'Partial (both failed)', logMessage: 'Attempted to keep 40 active — 🔼 20 (3❌), ⏸️ 20 (2❌) → 35 active', timestamp: '2026-02-02 09:38:02' },
    { id: 3, tool: 'Ad Rotation', case: 'partial_activation', caseLabel: 'Partial (activation failed)', logMessage: 'Attempted to keep 40 active — 🔼 20 (3❌), ⏸️ 20 ✅ → 37 active', timestamp: '2026-02-02 09:15:44' },
    { id: 4, tool: 'Ad Rotation', case: 'partial_pause', caseLabel: 'Partial (pause failed)', logMessage: 'Attempted to keep 40 active — 🔼 20 ✅, ⏸️ 20 (2❌) → 38 active', timestamp: '2026-02-02 08:52:31' },
    { id: 5, tool: 'Ad Rotation', case: 'activation_failed', caseLabel: 'Activation failed', logMessage: 'Attempted to keep 40 active — 🔼 20 ❌, ⏸️ 20 ✅ → 20 active', timestamp: '2026-02-02 08:30:18' },
    { id: 6, tool: 'Ad Rotation', case: 'pause_failed', caseLabel: 'Pause failed', logMessage: 'Attempted to keep 40 active — 🔼 20 ✅, ⏸️ 20 ❌ → 60 active', timestamp: '2026-02-02 08:05:52' },
    { id: 7, tool: 'Ad Rotation', case: 'both_failed', caseLabel: 'Both failed', logMessage: 'Attempted to keep 40 active — 🔼 20 ❌, ⏸️ 20 ❌ → 40 active (unchanged)', timestamp: '2026-02-02 07:41:09' },
    { id: 8, tool: 'Ad Rotation', case: 'only_activated', caseLabel: 'Only activated', logMessage: 'Activated 20 ads → 60 active', timestamp: '2026-02-02 07:18:33' },
    { id: 9, tool: 'Ad Rotation', case: 'only_paused', caseLabel: 'Only paused', logMessage: 'Paused 20 ads → 20 active', timestamp: '2026-02-02 06:55:47' },
    { id: 10, tool: 'Ad Rotation', case: 'partial_one', caseLabel: 'Partial (one action)', logMessage: 'Attempted to keep 40 active — 🔼 20 (3❌) → 37 active', timestamp: '2026-02-02 06:32:21' },
    { id: 11, tool: 'Ad Rotation', case: 'no_change', caseLabel: 'No change', logMessage: 'No changes made — rotation ended with 40 active', timestamp: '2026-02-02 06:10:05' },
  ];

  /** Combined events log for Optimization events log tab: Ad Rotation + other tools + workflows. */
  const optimizationEventsLog = [
    ...latestOptimizationEvents.map((e) => ({
      time: e.timestamp,
      workflow: e.tool,
      status: e.case === 'ok' ? 'Completed' : e.case === 'no_change' ? 'Completed' : e.case.startsWith('partial') ? 'Partial' : 'Failed',
      outcome: e.logMessage,
    })),
    { time: '2026-02-02 05:48:22', workflow: 'Budget Optimizer', status: 'Completed', outcome: 'Adjusted 3 campaign budgets — total +£120/day reallocated from underperforming.' },
    { time: '2026-02-02 05:22:11', workflow: 'Inventory-aware automation', status: 'Completed', outcome: 'Stock check passed — 12 ads kept active, 0 paused (all in stock).' },
    { time: '2026-02-02 04:55:00', workflow: 'Creative Refresh', status: 'Completed', outcome: 'Rotated 8 creatives across 2 ad sets — new variants live.' },
    { time: '2026-02-02 04:30:45', workflow: 'Catching Underspend', status: 'Partial', outcome: 'Attempted to scale 5 campaigns — 3 updated, 2 skipped (cap reached).' },
    { time: '2026-02-02 04:05:33', workflow: 'Spend alert workflow', status: 'Completed', outcome: 'Daily spend within target — no action taken.' },
    { time: '2026-02-02 03:42:18', workflow: 'Budget Optimizer', status: 'Failed', outcome: 'Budget update failed — API rate limit (retry scheduled).' },
    { time: '2026-02-02 03:18:02', workflow: 'PBA (Performance Budget Automation)', status: 'Completed', outcome: 'Reallocated £450 from low ROAS to high ROAS campaigns.' },
    { time: '2026-02-02 02:55:41', workflow: 'Ad Rotation', status: 'Completed', outcome: 'Kept 40 ads active (2 ad sets) — 🔼 20 activated, ⏸️ 20 paused → 40 active.' },
    { time: '2026-02-02 02:30:00', workflow: 'Inventory-aware automation', status: 'Completed', outcome: 'Paused 5 ads (out of stock) — 35 active remaining.' },
    { time: '2026-02-02 02:00:15', workflow: 'Creative Refresh', status: 'Partial', outcome: 'Refreshed 4/6 ad sets — 2 skipped (pending approval).' },
    { time: '2026-02-02 01:35:52', workflow: 'Catching Underspend', status: 'Completed', outcome: 'Scaled 2 campaigns by +15% — underspend recovered.' },
    { time: '2026-02-02 01:10:08', workflow: 'Budget Optimizer', status: 'Completed', outcome: 'No changes — all budgets within target range.' },
    { time: '2026-02-01 23:45:00', workflow: 'Ad Rotation', status: 'Completed', outcome: 'No changes made — rotation ended with 40 active.' },
    { time: '2026-02-01 23:20:33', workflow: 'Spend alert workflow', status: 'Completed', outcome: 'Alert sent — spend 20% above daily target.' },
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const workflowTemplates = [
    { key: 'inventory', title: 'Inventory-aware automation', description: 'I want to pause or scale ads based on product stock levels so that I avoid wasted spend or missed sales.', button: 'Create Workflow' },
    { key: 'weekend', title: 'Saving Your Weekend', description: 'Keep your campaign assets organized by creating and managing projects.', button: 'Create Workflow' },
    { key: 'underspend', title: 'Catching Underspend', description: 'Next generation of Smartly multi-platform campaign automation and orchestration.', button: 'Create Workflow' },
  ];
  const tools = [
    { title: 'Get started with PBA', description: 'Next generation of Smartly multi-platform campaign automation and orchestration.', button: 'Create budget pool' },
    { title: 'Start a creative project', description: 'Keep your campaign assets organized by creating and managing projects.', button: 'Create project' },
    { title: 'Create a campaign workspace', description: 'Next generation of Smartly multi-platform campaign automation and orchestration.', button: 'Create workspace' },
  ];

  return (
    <div className="h-screen flex" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Left Navigation Sidebar */}
      <div className="w-16 bg-white rounded-2xl m-4 flex flex-col items-center py-4 shadow-sm">
        {/* Logo */}
        <div className="w-10 h-10 bg-purple-primary rounded-full mb-8 flex items-center justify-center overflow-hidden">
          <img src={logoImage} alt="Logo" className="w-6 h-6 object-contain" />
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-4 flex-1">
          <button className="w-10 h-10 bg-purple-primary rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" fill="white"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3v14h14V3H3zm12 12H5V5h10v10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M7 8h6M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5h10v10H5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M8 8h4v4H8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M5 17c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
          <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 7v3M10 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">ES</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L2 7v7h4v-4h4v4h4V7l-6-5z" fill="currentColor"/>
                </svg>
                <span>&gt;</span>
                <span>Optimization</span>
              </div>

              {/* Page Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Optimization</h1>

              {/* Description */}
              <p className="text-gray-600 text-lg max-w-3xl">
                Make the most out of your campaigns by using one of our optimization tools or templates or simply by creating your own custom optimization workflows that suit your needs.
              </p>
            </div>

            {/* Create Workflow Button */}
            <button
              onClick={onNavigateToWorkflowBuilder}
              className="flex items-center gap-2 px-6 py-3 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors font-medium"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Create Optimization Workflow
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 pb-4 px-1 ${
                activeTab === 'home'
                  ? 'text-purple-primary border-b-2 border-purple-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeTab === 'home' && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L2 7v7h4v-4h4v4h4V7l-6-5z" fill="currentColor"/>
                </svg>
              )}
              Optimization Home
            </button>
            <button
              onClick={() => setActiveTab('my-optimizations')}
              className={`pb-4 px-1 ${
                activeTab === 'my-optimizations'
                  ? 'text-purple-primary border-b-2 border-purple-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My optimizations
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`pb-4 px-1 ${
                activeTab === 'events'
                  ? 'text-purple-primary border-b-2 border-purple-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Optimization events log
            </button>
          </div>

          {/* My optimizations tab content */}
          {activeTab === 'my-optimizations' && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">My optimizations</h2>
              <p className="text-gray-600 mb-6">
                Draft workflows you’ve saved from the workflow builder. Open one to continue editing.
              </p>
              {drafts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                      <p className="mb-2">No saved drafts yet.</p>
                      <p className="text-sm mb-4">Create a workflow and use “Save draft” in the top bar to add it here.</p>
                      <button
                        onClick={onNavigateToWorkflowBuilder}
                        className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors"
                      >
                        Create Optimization Workflow
                      </button>
                    </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drafts.map((draft) => (
                      <div
                        key={draft.id}
                        className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-purple-200 transition-colors flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate flex-1 min-w-0">{draft.workflowName}</h3>
                          <button
                            type="button"
                            onClick={() => handleDeleteDraft(draft.id)}
                            className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete draft"
                            aria-label="Delete draft"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M4 4h8v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm2 2v5m4-5v5M2 4h12M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Saved {new Date(draft.savedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        {onOpenDraft && (
                          <button
                            onClick={() => onOpenDraft(draft)}
                            className="w-full px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors text-sm font-medium"
                          >
                            Open
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
              )}
            </section>
          )}

          {/* Latest Optimization Events - only on home tab */}
          {activeTab === 'home' && (
          <>
          {/* Latest Optimization Events */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Latest optimization events</h2>
              <button type="button" onClick={() => setActiveTab('events')} className="text-sm font-medium text-purple-primary hover:text-purple-secondary">See all</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {latestOptimizationEvents.slice(0, 3).map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{evt.tool}</h3>
                    <span className="text-sm text-gray-500">{evt.timestamp}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded text-sm font-medium mb-3 ${
                    evt.case === 'ok' ? 'bg-emerald-100 text-emerald-800' :
                    evt.case === 'no_change' ? 'bg-slate-100 text-slate-700' :
                    evt.case.startsWith('partial') ? 'bg-amber-100 text-amber-800' :
                    evt.case === 'activation_failed' || evt.case === 'pause_failed' || evt.case === 'both_failed' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {evt.case === 'ok' ? <EventCaseIconOk /> : evt.case === 'no_change' ? <EventCaseIconNoChange /> : evt.case.startsWith('partial') ? <EventCaseIconWarning /> : evt.case.includes('failed') ? <EventCaseIconFailed /> : <EventCaseIconOnly />}
                    {evt.caseLabel}
                  </span>
                  <p className="text-sm text-gray-600 flex-1 line-clamp-4 flex flex-wrap items-center gap-x-0.5 gap-y-0.5" title={evt.logMessage}>{renderOutcomeWithIcons(evt.logMessage)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow Templates */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Workflow templates</h2>
              <a href="#" className="text-sm font-medium text-purple-primary hover:text-purple-secondary">See all</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {workflowTemplates.map((t, i) => (
                <div key={t.key} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 mb-4 ${
                    t.key === 'inventory' ? 'bg-emerald-100' : t.key === 'weekend' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    {t.key === 'inventory' ? (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-emerald-600">
                        <path d="M6 12v12h20V12M6 12l4-6h12l4 6M6 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 18h4v4h-4v-4zm8 0h4v4h-4v-4z" fill="currentColor" fillOpacity="0.6"/>
                      </svg>
                    ) : t.key === 'weekend' ? (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-amber-600">
                        <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M4 12h24M10 4v4M22 4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 18h4v2H8v-2zm12 0h4v2h-4v-2z" fill="currentColor" fillOpacity="0.6"/>
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-blue-600">
                        <path d="M4 24V12l6 6 6-8 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 26h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{t.description}</p>
                  <button className="w-full px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors text-sm font-medium">
                    {t.button}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Insights */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Insights</h2>
              <a href="#" className="text-sm font-medium text-purple-primary hover:text-purple-secondary">See all</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Channel Efficiency Insights</h3>
                  <p className="text-sm text-gray-500 mb-3">16th July to 23rd July 2025</p>
                  <p className="text-sm text-gray-700 mb-4">
                    TikTok yields cheaper conversions than Meta. CPA: -20%. Spend share: Meta 60% / TikTok 25%.
                  </p>
                  <div className="bg-purple-light border border-purple-border rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Recommended action</p>
                    <p className="text-sm text-gray-600">Shift 10-15% budget from Meta to TikTok for cost efficiency.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Tools</h2>
              <a href="#" className="text-sm font-medium text-purple-primary hover:text-purple-secondary">See all</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {tools.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                      <rect x="8" y="8" width="48" height="48" rx="4" fill="#9CA3AF" fillOpacity="0.3"/>
                      <rect x="16" y="20" width="32" height="4" fill="#9CA3AF"/>
                      <rect x="16" y="32" width="24" height="4" fill="#9CA3AF"/>
                      <rect x="16" y="44" width="28" height="4" fill="#9CA3AF"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{t.description}</p>
                  <button className="w-full px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors text-sm font-medium">
                    {t.button}
                  </button>
                </div>
              ))}
            </div>
          </section>
          </>
          )}

          {/* Optimization events log tab */}
          {activeTab === 'events' && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Optimization events log</h2>
              <p className="text-gray-600 mb-6">
                A log of optimization runs: what ran and when. Completed, failed, and scheduled runs appear here.
              </p>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 font-semibold text-gray-700">Time</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Workflow</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Outcome</th>
                        <th className="px-4 py-3 font-semibold text-gray-700 w-16 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizationEventsLog.map((evt, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{evt.time}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{evt.workflow}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                              evt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                              evt.status === 'Partial' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {evt.status === 'Completed' ? <EventCaseIconOk /> : evt.status === 'Partial' ? <EventCaseIconWarning /> : <EventCaseIconFailed />}
                              {evt.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 text-sm max-w-md truncate flex flex-wrap items-center gap-x-0.5 gap-y-0.5" title={evt.outcome}>{renderOutcomeWithIcons(evt.outcome)}</td>
                          <td className="px-4 py-3 text-right align-top">
                            <div className="relative inline-block">
                              <button
                                type="button"
                                onClick={() => setEventsLogActionsOpen(eventsLogActionsOpen === idx ? null : idx)}
                                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                aria-expanded={eventsLogActionsOpen === idx}
                                aria-haspopup="true"
                                aria-label="Actions"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                                  <circle cx="8" cy="4" r="1.25" fill="currentColor"/>
                                  <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
                                  <circle cx="8" cy="12" r="1.25" fill="currentColor"/>
                                </svg>
                              </button>
                              {eventsLogActionsOpen === idx && (
                                <>
                                  <div className="fixed inset-0 z-10" aria-hidden onClick={() => setEventsLogActionsOpen(null)} />
                                  <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white rounded-2xl border border-gray-200 shadow-lg py-1">
                                    <button
                                      type="button"
                                      onClick={() => { setEventsLogActionsOpen(null); onNavigateToWorkflowBuilder(); }}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      View in builder
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
