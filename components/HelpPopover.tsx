import React from 'react';
import * as Popover from '@radix-ui/react-popover';

interface HelpPopoverProps {
	ariaLabel?: string;
	children: React.ReactNode;
}

export const HelpPopover: React.FC<HelpPopoverProps> = ({ ariaLabel = 'Ajuda', children }) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button type="button" aria-label={ariaLabel} className="help-button">?</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="card-surface shadow-amberLg w-[380px] p-3 outline-none" sideOffset={8}>
					<div className="text-sm leading-relaxed">
						{children}
					</div>
					<Popover.Arrow className="fill-[rgb(var(--color-surface))]" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default HelpPopover;


