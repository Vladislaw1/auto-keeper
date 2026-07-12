import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentRouteKey } from '@/store/slices/routeKeySlice';
import { setLayout, setPreviousLayout } from '@/store/slices/themeSlice';
import type { LayoutType } from '@/@types/theme';
import type { ComponentType } from 'react';

export type AppRouteProps<T> = {
  component: ComponentType<T>;
  routeKey: string;
  layout?: LayoutType;
};

const AppRoute = <T extends Record<string, unknown>>({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps<T>) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.theme.layout);

  const { type: layoutType, previousType: previousLayout } = layout;

  const handleLayoutChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey));

    if (props.layout && props.layout !== layoutType) {
      dispatch(setPreviousLayout(layoutType));
      dispatch(setLayout(props.layout));
    }

    if (!props.layout && previousLayout && layoutType !== previousLayout) {
      dispatch(setLayout(previousLayout));
      dispatch(setPreviousLayout(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.layout, routeKey]);

  useEffect(() => {
    handleLayoutChange();
  }, [location, handleLayoutChange]);

  return <Component {...(props as T)} />;
};

export default AppRoute;
