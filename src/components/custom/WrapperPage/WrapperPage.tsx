import { ReactNode } from 'react';
import cn from 'classnames';
import { Error } from '@/components/custom';

export const WrapperPage = ({
  loading,
  error,
  header,
  desc,
  side,
  children,
}: {
  loading: boolean;
  error: string | null;
  header: string;
  desc: string;
  side: ReactNode;
  children: ReactNode;
}) => {
  if (loading) return <div>Loading...</div>;

  if (error && !loading)
    return (
      <div className={cn('flex h-full w-full items-center justify-center')}>
        <Error
          textContent={error}
          card={true}
        />
      </div>
    );

  return (
    <div>
      <div
        className={cn(
          'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className="min-w-0">
          <h4 className="text-lg sm:text-xl">{header}</h4>
          <p className={cn('text-xs italic text-gray-500')}>{desc}</p>
        </div>
        <div className="shrink-0 self-start sm:self-auto">{side}</div>
      </div>

      <hr className={cn('my-3')} />

      {children}
    </div>
  );
};
