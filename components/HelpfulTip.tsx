import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Tabs from '@radix-ui/react-tabs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HelpfulTipTab {
  id: string;
  label: string;
  markdown: string;
}

export const HelpfulTip: React.FC<{ tabs: HelpfulTipTab[]; ariaLabel?: string }> = ({ tabs, ariaLabel = 'Ajuda' }) => {
  const initial = tabs[0]?.id || 'tab1';
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button aria-label={ariaLabel} className="help-button" type="button">?</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="card-surface shadow-amberLg w-[360px] p-3 outline-none" sideOffset={8}>
          <Tabs.Root defaultValue={initial}>
            <Tabs.List aria-label="Conteúdo de ajuda" className="flex gap-1 mb-2">
              {tabs.map(t => (
                <Tabs.Trigger key={t.id} value={t.id} className="px-2 py-1 rounded-md text-sm hover:bg-primary/10 data-[state=active]:bg-primary/20">
                  {t.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {tabs.map(t => (
              <Tabs.Content key={t.id} value={t.id} className="text-sm leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{t.markdown}</ReactMarkdown>
              </Tabs.Content>
            ))}
          </Tabs.Root>
          <Popover.Arrow className="fill-[rgb(var(--color-surface))]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};


