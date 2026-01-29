import React from 'react';

interface FloatingPromptInputProps {
  onFocus?: () => void;
}

export const FloatingPromptInput: React.FC<FloatingPromptInputProps> = ({ onFocus }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="relative w-[416px]">
        <input
          type="text"
          placeholder="Ask Smartly"
          onFocus={onFocus}
          className="w-full px-4 py-3 pr-12 rounded-full focus:outline-none focus:ring-0 placeholder:text-[#595959]"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E5D6FA',
            color: '#595959',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center" style={{ gap: '2px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: '-1px', marginRight: '1px' }}>
            <path d="M7 1.5L8.2 5L12 6.2L8.2 7.5L7 11L5.8 7.5L2 6.2L5.8 5L7 1.5Z" fill="#8A2BE2"/>
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1L5.8 3.5L8.5 4.5L5.8 5.5L5 8L4.2 5.5L1.5 4.5L4.2 3.5L5 1Z" fill="#8A2BE2"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
