
import React, { useState } from 'react';
import HelpHint from './HelpHint';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)} // for mobile
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg z-20">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export const InfoIcon: React.FC<{ content: React.ReactNode; ariaLabel?: string; size?: 'popover'|'dialog' }> = ({ content, ariaLabel = 'Ajuda', size = 'popover' }) => {
  return (
    <HelpHint title={ariaLabel} size={size}>
      {content}
    </HelpHint>
  );
};
