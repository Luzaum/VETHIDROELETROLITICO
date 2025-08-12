
import React from 'react';
import { ContentBlock } from '../types';

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            return (
              <h1 key={index} className="text-3xl font-bold text-brand-orange-dark border-b-2 border-brand-orange-light pb-2">
                {block.content}
              </h1>
            );
          case 'subheader':
            return (
              <h2 key={index} className="text-2xl font-semibold mt-6 text-gray-700 dark:text-gray-300">
                {block.content}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={index} className="text-base leading-relaxed text-brand-text dark:text-brand-dark-text">
                {block.content}
              </p>
            );
          case 'list':
            return (
              <ul key={index} className="list-disc list-inside space-y-2 pl-4 text-brand-text dark:text-brand-dark-text">
                {block.content}
              </ul>
            );
          case 'warning':
            return (
              <div key={index} className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-r-lg shadow" role="alert">
                <p className="font-bold">{block.title || 'Atenção!'}</p>
                <p>{block.content}</p>
              </div>
            );
          case 'formula':
            return (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4 font-mono text-center text-gray-800 dark:text-gray-200">
                    <code>{block.content}</code>
                </div>
            );
          case 'table':
            return (
              <div key={index} className="overflow-x-auto">
                {block.content}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
