import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';
import type { CommonProps } from '@/@types/common';
import { useAuth } from '@/auth';
import { useAppSelector } from '@/store/hooks';
import PostLoginLayout from './PostLoginLayout';
import PreLoginLayout from './PreLoginLayout';

const Layout = ({ children }: CommonProps) => {
  const layoutType = useAppSelector((state) => state.theme.layout.type);

  const { authenticated } = useAuth();

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      {authenticated ? (
        <PostLoginLayout layoutType={layoutType}>{children}</PostLoginLayout>
      ) : (
        <PreLoginLayout>{children}</PreLoginLayout>
      )}
    </Suspense>
  );
};

export default Layout;
