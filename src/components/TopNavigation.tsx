import React, { useState } from 'react';
import logoImage from '../assets/logo.png';

interface TopNavigationProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onDeleteCanvas: () => void;
  onActivatePublish: () => void;
  onNavigateToHome?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  workflowName,
  onWorkflowNameChange,
  onDeleteCanvas,
  onActivatePublish,
  onNavigateToHome,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L2 7v7h4v-4h4v4h4V7l-6-5z" fill="currentColor"/>
                </svg>
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
            <div className="flex items-center gap-2">
              <span className="text-gray-900 underline decoration-purple-primary">{workflowName}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8 2l4 4-4 4M2 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Toggle Switch (inactive) */}
        <div className="w-10 h-6 bg-gray-200 rounded-full relative">
          <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
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
