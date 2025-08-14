import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Dialog from '@radix-ui/react-dialog';

interface HelpHintProps {
  title?: string;
  size?: 'popover' | 'dialog';
  triggerClassName?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const HelpHint: React.FC<HelpHintProps> = ({
  title = 'Ajuda',
  size = 'popover',
  triggerClassName = '',
  footer,
  children,
}) => {
  if (size === 'dialog') {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button" aria-label={`Ajuda: ${title}`} className={`help-button ${triggerClassName}`}>?</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,720px)] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-5">
            <Dialog.Title className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">{title}</Dialog.Title>
            <div className="prose dark:prose-invert max-w-none text-sm">{children}</div>
            {footer && <div className="mt-3 text-xs opacity-80">{footer}</div>}
            <div className="mt-4 text-right">
              <Dialog.Close asChild>
                <button type="button" className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">Fechar</button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" aria-label={`Ajuda: ${title}`} className={`help-button ${triggerClassName}`}>?</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={8} className="w-96 card-surface shadow-amberLg p-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="text-sm">
            {title && <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">{title}</div>}
            <div className="prose dark:prose-invert max-w-none">{children}</div>
            {footer && <div className="mt-2 text-xs opacity-70">{footer}</div>}
          </div>
          <Popover.Arrow className="fill-white dark:fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HelpHint;


