import type { ReactNode } from 'react';
import cn from 'classnames';

type StepLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  hideHeader?: boolean;
};

export const StepLayout = ({ title, description, children, hideHeader = false }: StepLayoutProps) => {
  return (
    <div className="flex h-full min-h-full flex-1 flex-col">
      {!hideHeader && (
        <div className="shrink-0">
          <h6 className="mb-1 font-semibold">{title}</h6>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      )}
      <div className={cn('flex min-h-0 flex-1 flex-col', hideHeader ? 'p-0' : 'mt-4 p-4')}>
        {children}
      </div>
    </div>
  );
};
