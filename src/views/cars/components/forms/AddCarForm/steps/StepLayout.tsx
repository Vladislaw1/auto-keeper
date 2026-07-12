import type { ReactNode } from 'react';

type StepLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const StepLayout = ({ title, description, children }: StepLayoutProps) => {
  return (
    <div className="flex h-full min-h-full flex-1 flex-col">
      <div className="shrink-0">
        <h6 className="mb-1 font-semibold">{title}</h6>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 flex-col p-4">{children}</div>
    </div>
  );
};
