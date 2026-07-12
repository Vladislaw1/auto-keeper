import type { ReactNode } from 'react';

export const ReviewCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-xl border border-gray-200 bg-white/80 p-3.5 dark:border-gray-700 dark:bg-gray-900/40">
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{title}</p>
    <div>{children}</div>
  </div>
);
