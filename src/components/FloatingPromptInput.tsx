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
          className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring-0 placeholder:text-[#595959]"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E5D6FA',
            color: '#595959',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </div>
  );
};
