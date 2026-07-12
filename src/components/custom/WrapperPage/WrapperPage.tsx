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
      <div className={cn('w-full h-full flex items-center justify-center')}>
        <Error
          textContent={error}
          card={true}
        />
      </div>
    );

  return (
    <div>
      <div className={cn('flex items-center justify-between')}>
        <div>
          <h4>{header}</h4>
          <p className={cn('text-xs italic')}>{desc}</p>
        </div>
        <div>{side}</div>
      </div>

      <hr className={cn('my-3')} />

      {children}
    </div>
  );
};
