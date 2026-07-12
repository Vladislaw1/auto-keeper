import { Button, Dialog } from '@/components/ui';
import { useState } from 'react';
import { FcStatistics } from 'react-icons/fc';
import { ServiceVisitsList } from '@/views/cars/components';
import useResponsive from '@/utils/hooks/useResponsive';

export const DetailServiceVisitsDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { smaller } = useResponsive();

  const buttonLabel = smaller.sm ? 'Історія СТО' : 'Детальна інформація відвідування СТО';
  const dialogTitle = smaller.sm ? 'Історія СТО' : 'Детальна інформація відвідування СТО';

  return (
    <>
      <Button
        icon={<FcStatistics />}
        variant="plain"
        size="sm"
        className="w-full justify-start sm:w-auto sm:justify-center"
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
      </Button>
      <Dialog
        isOpen={isOpen}
        height={smaller.md ? 'min(100dvh - 2rem, 640px)' : undefined}
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
      >
        <Dialog.Header>
          <h5 className="text-base sm:text-lg">{dialogTitle}</h5>
        </Dialog.Header>
        <Dialog.Body className="overflow-y-auto">
          <ServiceVisitsList />
        </Dialog.Body>
      </Dialog>
    </>
  );
};
