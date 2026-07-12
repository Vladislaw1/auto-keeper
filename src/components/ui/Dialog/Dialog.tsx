import Modal from 'react-modal';
import classNames from 'classnames';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';
import type ReactModal from 'react-modal';
import type { MouseEvent, ReactNode } from 'react';

const VIEWPORT_MAX_HEIGHT = 'calc(100dvh - 4rem)';

interface DialogSectionProps {
  children?: ReactNode;
  className?: string;
}

const DialogHeader = ({ children, className }: DialogSectionProps) => (
  <div className={classNames('dialog-header', className)}>{children}</div>
);

const DialogBody = ({ children, className }: DialogSectionProps) => (
  <div className={classNames('dialog-body', className)}>{children}</div>
);

export interface DialogProps extends ReactModal.Props {
  closable?: boolean;
  contentClassName?: string;
  height?: string | number;
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void;
  width?: number;
}

const Dialog = (props: DialogProps) => {
  const currentSize = useWindowSize();

  const {
    bodyOpenClassName,
    children,
    className,
    closable = true,
    closeTimeoutMS = 150,
    contentClassName,
    height,
    isOpen,
    onClose,
    overlayClassName,
    portalClassName,
    style,
    width = 520,
    ...rest
  } = props;

  const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
    onClose?.(e);
  };

  const renderCloseButton = (
    <CloseButton
      absolute
      className="ltr:right-6 rtl:left-6 top-4.5"
      onClick={onCloseClick}
    />
  );

  const contentStyle = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative',
      inset: 'unset',
      top: 'unset',
      left: 'unset',
      right: 'unset',
      bottom: 'unset',
      margin: 0,
      padding: 0,
      border: 'none',
      height: 'auto',
      maxHeight: VIEWPORT_MAX_HEIGHT,
      overflow: 'hidden',
    },
    ...style,
  };

  if (width !== undefined) {
    contentStyle.content.width = width;

    if (typeof currentSize.width !== 'undefined' && currentSize.width <= width) {
      contentStyle.content.width = 'auto';
    }
  }

  if (height !== undefined) {
    const heightValue = typeof height === 'number' ? `${height}px` : height;
    contentStyle.content.height = heightValue;
    contentStyle.content.maxHeight = `min(${heightValue}, ${VIEWPORT_MAX_HEIGHT})`;
  }

  const defaultDialogContentClass = 'dialog-content';

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  return (
    <Modal
      className={{
        base: classNames('dialog', className as string),
        afterOpen: 'dialog-after-open',
        beforeClose: 'dialog-before-close',
      }}
      overlayClassName={{
        base: classNames('dialog-overlay', overlayClassName as string),
        afterOpen: 'dialog-overlay-after-open',
        beforeClose: 'dialog-overlay-before-close',
      }}
      portalClassName={classNames('dialog-portal', portalClassName)}
      bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{
        ...contentStyle,
      }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 1 : 0.9 }}
      >
        {closable && renderCloseButton}
        {children}
      </motion.div>
    </Modal>
  );
};

Dialog.displayName = 'Dialog';

type DialogComponent = typeof Dialog & {
  Header: typeof DialogHeader;
  Body: typeof DialogBody;
};

const DialogWithSections = Dialog as DialogComponent;

DialogWithSections.Header = DialogHeader;
DialogWithSections.Body = DialogBody;

export default DialogWithSections;
