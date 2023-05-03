import { roleEnum } from '../enum/roleEnum';

export const isSeller = (role?: string): boolean => {
  return role === roleEnum.SELLER;
};
