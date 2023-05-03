import React from 'react';
import { atom } from 'recoil';
export interface IModal {
  status: boolean,
  Component: React.ReactNode,
}
export const loadingState = atom({
  key: 'loading',
  default: false,
});

export const modalState = atom<IModal>({
  key: 'modalHOC',
  default: { status: false, Component: ""}
})