import { IServiceVisit } from '@/store/slices/cars/cars.type';
import { ReviewCard, ReviewRow } from '@/components/custom';
import moment from 'moment';
import { Button } from '@/components/ui';
import cn from 'classnames';
import { MdMiscellaneousServices } from 'react-icons/md';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const ServiceVisit = ({ visit }: { visit: IServiceVisit }) => {
  const [isShow, setShow] = useState(false);
  return (
    <ReviewCard title={visit?.notes}>
      <ReviewRow
        label={'Дата роботи'}
        value={moment(visit?.date)?.format('DD.MM.YYYY HH:mm')}
      />
      <ReviewRow
        label={'Сумарні витрати'}
        value={`${visit?.totalCost} грн.`}
      />
      <ReviewRow
        label={'Пробіг на момент роботи'}
        value={visit?.mileage}
      />
      <div className={cn('mt-2 mb-1 flex justify-end')}>
        <Button
          size="xs"
          variant="plain"
          icon={<MdMiscellaneousServices />}
          className={cn(
            isShow &&
              'bg-primary/10 text-primary ring-1 ring-inset ring-primary/30 dark:bg-primary/20 dark:text-primary-mild',
          )}
          onClick={() => setShow((prev) => !prev)}
        >
          Список виконаних робіт
        </Button>
      </div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden flex flex-col gap-1"
          >
            {visit?.items?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-1 border-b border-gray-100 py-2 text-xs last:border-0 sm:grid-cols-3 sm:border-0 sm:py-0 dark:border-gray-700"
              >
                <p className="font-medium sm:font-normal">{item?.workType?.name}</p>
                <p>{item?.price} грн.</p>
                <p className={cn('italic text-gray-500')}>{item?.note ?? 'Опис відсутній'}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </ReviewCard>
  );
};
