import { RootState } from '@/store';

export const getOwnersSelector = (state: RootState) => state.owners.owners;

export const getOwnersActionSelector = (state: RootState) => state.owners.action;

export const getAddOwnerFormStateSelector = (state: RootState) => state.owners.action.formState;
