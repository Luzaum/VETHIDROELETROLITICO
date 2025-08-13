import React from 'react';

export const RefsFooter: React.FC<{ refs: string[] }> = ({ refs }) => {
  if (!refs || refs.length === 0) return null;
  return (
    <div className="mt-3 border-t pt-2 text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
      <span aria-hidden>📚</span>
      <div className="space-y-0.5">
        {refs.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
    </div>
  );
};


