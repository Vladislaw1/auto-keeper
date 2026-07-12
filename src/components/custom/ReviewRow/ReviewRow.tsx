export const ReviewRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-start justify-between gap-3 border-b border-gray-200/80 py-1.5 last:border-0 dark:border-gray-700/80">
    <span className="shrink-0 text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-medium text-gray-900 break-all dark:text-gray-100">
      {value || '—'}
    </span>
  </div>
);
