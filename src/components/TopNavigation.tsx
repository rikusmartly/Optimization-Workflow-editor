import React, { useState } from 'react';
import logoImage from '../assets/logo.png';
import { MaximizeIcon } from '../utils/icons';

interface TopNavigationProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onDeleteCanvas: () => void;
  onActivatePublish: () => void;
  onSaveDraft?: () => void;
  onNavigateToHome?: () => void;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  selectedNodeCount?: number;
  onDeselectNodes?: () => void;
  onDuplicateNodes?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  workflowName,
  onWorkflowNameChange,
  onDeleteCanvas,
  onActivatePublish,
  onSaveDraft,
  onNavigateToHome,
  zoom = 1,
  onZoomIn,
  onZoomOut,
  onResetView,
  onUndo,
  onRedo,
  onDelete,
  canUndo = false,
  canRedo = false,
  selectedNodeCount = 0,
  onDeselectNodes,
  onDuplicateNodes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(workflowName);

  const handleNameSubmit = () => {
    onWorkflowNameChange(editValue);
    setIsEditing(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-transparent z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-8 h-8 rounded-full bg-purple-primary flex items-center justify-center overflow-hidden">
          <img src={logoImage} alt="Logo" className="w-5 h-5 object-contain" />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          {onNavigateToHome && (
            <>
              <button
                onClick={onNavigateToHome}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>Optimization</span>
              </button>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
          <span className="text-gray-500">Workflow Builder</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSubmit();
                if (e.key === 'Escape') {
                  setEditValue(workflowName);
                  setIsEditing(false);
                }
              }}
              className="px-2 py-1 border-b-2 border-purple-primary focus:outline-none"
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-gray-900 underline decoration-purple-primary hover:text-purple-700"
            >
              {workflowName}
            </button>
          )}
        </div>
      </div>

      {/* Center: Search + Zoom + Actions */}
      <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-2 py-1.5 overflow-visible">
        <div className="relative w-[200px]">
          <svg
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-2 py-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none"
          />
        </div>
        <div className="w-px h-5 bg-gray-200" />
        <div className="flex items-center gap-0.5">
          <button
            onClick={onZoomOut}
            className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="px-1.5 text-sm text-gray-700 min-w-[44px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={onResetView}
            className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
          >
            <MaximizeIcon />
          </button>
        </div>
        <div className="w-px h-5 bg-gray-200 shrink-0" />
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 rounded box-border shrink-0 ${canUndo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M3 8h10M6 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 rounded box-border shrink-0 ${canRedo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M13 8H3M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {selectedNodeCount > 0 && (
          <>
            <div className="w-px h-5 bg-gray-200 shrink-0" />
            <button
              onClick={onDeselectNodes}
              className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
              title="Deselect"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 8h8M8 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={onDuplicateNodes}
              className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
              title="Duplicate"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M6 2h6v2H6V2zM4 4h10v8H4V4zm2 2v4h6V6H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
        <div className="w-px h-5 bg-gray-200 shrink-0" />
        <button
          onClick={onDelete}
          className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded box-border shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M2 4h12M5 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 4v4m4-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {onSaveDraft && (
          <button
            onClick={onSaveDraft}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Save draft
          </button>
        )}
        <button
          onClick={onDeleteCanvas}
          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          Delete canvas
        </button>
        <button
          onClick={onActivatePublish}
          className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary"
        >
          Activate & Publish
        </button>
      </div>
    </div>
  );
};
