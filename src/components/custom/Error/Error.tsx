import { Card } from '@/components/ui';
import { BiErrorAlt } from 'react-icons/bi';
import cn from 'classnames';

export const Error = ({ textContent, card = false }: { textContent: string; card?: boolean }) => {
  if (!textContent) return null;

  if (card)
    return (
      <Card bodyClass={cn('flex flex-col items-center gap-2')}>
        <BiErrorAlt size={24} />
        <p>{textContent}</p>
      </Card>
    );

  return (
    <div className={cn('flex flex-col items-center gap-2 ')}>
      <BiErrorAlt size={24} />
      <p>{textContent}</p>
    </div>
  );
};
