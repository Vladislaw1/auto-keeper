import { RootState } from '@/store';

export const getOwnersSelector = (state: RootState) => state.owners.owners;
