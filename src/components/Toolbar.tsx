import React from 'react';
import { MaximizeIcon } from '../utils/icons';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onUndo,
  onRedo,
  onDelete,
  zoom,
  canUndo,
  canRedo,
}) => {

  return (
    <div className="fixed top-16 left-0 right-0 h-14 flex items-center justify-between px-6 bg-transparent z-30">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-[341px]">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
        {/* Zoom Controls */}
        <button
          onClick={onZoomOut}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="px-2 text-sm text-gray-700 min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={onResetView}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
        >
          <MaximizeIcon />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-1.5 rounded ${canUndo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M6 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-1.5 rounded ${canRedo ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Delete */}
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 4v4m4-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
