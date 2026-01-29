import React, { useState } from 'react';
import logoImage from '../assets/logo.png';

interface OptimizationHomeProps {
  onNavigateToWorkflowBuilder: () => void;
}

export const OptimizationHome: React.FC<OptimizationHomeProps> = ({ onNavigateToWorkflowBuilder }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'active'>('home');
  const [templatePage, setTemplatePage] = useState(1);
  const [toolPage, setToolPage] = useState(1);

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
                Make the most out of your campaigns by using one of our optimization tools or templates or simply by creating your own optimization workflows that suit your needs.
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
              onClick={() => setActiveTab('active')}
              className={`pb-4 px-1 ${
                activeTab === 'active'
                  ? 'text-purple-primary border-b-2 border-purple-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Optimizations
            </button>
          </div>

          {/* Latest Optimization Events */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest optimization events</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-100 rounded-lg border border-gray-200"></div>
              ))}
            </div>
          </section>

          {/* Workflow Templates */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Workflow templates</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="#3B82F6" fillOpacity="0.3"/>
                    <rect x="16" y="20" width="32" height="4" fill="#3B82F6"/>
                    <rect x="16" y="32" width="24" height="4" fill="#3B82F6"/>
                    <rect x="16" y="44" width="28" height="4" fill="#3B82F6"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {templatePage === 1 && 'Inventory-aware automation'}
                    {templatePage === 2 && 'Saving Your Weekend'}
                    {templatePage === 3 && 'Catching Underspend'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {templatePage === 1 && 'I want to pause or scale ads based on product stock levels so that I avoid wasted spend or missed sales.'}
                    {templatePage === 2 && 'Keep your campaign assets organized by creating and managing projects.'}
                    {templatePage === 3 && 'Next generation of Smartly multi-platform campaign automation and orchestration.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors">
                      {templatePage === 1 && 'Create budget pool'}
                      {templatePage === 2 && 'Create project'}
                      {templatePage === 3 && 'Create workspace'}
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTemplatePage(Math.max(1, templatePage - 1))}
                        disabled={templatePage === 1}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &lt;
                      </button>
                      <span className="text-sm text-gray-600">{templatePage} of 3</span>
                      <button
                        onClick={() => setTemplatePage(Math.min(3, templatePage + 1))}
                        disabled={templatePage === 3}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Insights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Insights</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Channel Efficiency Insights</h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 15L10 8l7 7" stroke="#9138ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tools</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="#9CA3AF" fillOpacity="0.3"/>
                    <rect x="16" y="20" width="32" height="4" fill="#9CA3AF"/>
                    <rect x="16" y="32" width="24" height="4" fill="#9CA3AF"/>
                    <rect x="16" y="44" width="28" height="4" fill="#9CA3AF"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {toolPage === 1 && 'Get started with PBA'}
                    {toolPage === 2 && 'Start a creative project'}
                    {toolPage === 3 && 'Create a campaign workspace'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {toolPage === 1 && 'Next generation of Smartly multi-platform campaign automation and orchestration.'}
                    {toolPage === 2 && 'Keep your campaign assets organized by creating and managing projects.'}
                    {toolPage === 3 && 'Next generation of Smartly multi-platform campaign automation and orchestration.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary transition-colors">
                      {toolPage === 1 && 'Create budget pool'}
                      {toolPage === 2 && 'Create project'}
                      {toolPage === 3 && 'Create workspace'}
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setToolPage(Math.max(1, toolPage - 1))}
                        disabled={toolPage === 1}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &lt;
                      </button>
                      <span className="text-sm text-gray-600">{toolPage} of 3</span>
                      <button
                        onClick={() => setToolPage(Math.min(3, toolPage + 1))}
                        disabled={toolPage === 3}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
