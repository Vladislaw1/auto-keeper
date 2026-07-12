import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDirection } from '@/store/slices/themeSlice';
import type { Direction } from '@/@types/theme';

function useDirection(): [direction: Direction, setDirection: (dir: Direction) => void] {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.theme.direction);

  const updateDirection = (dir: Direction) => {
    dispatch(setDirection(dir));
  };

  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    root.setAttribute('dir', direction);
  }, [direction]);

  return [direction, updateDirection];
}

export default useDirection;
