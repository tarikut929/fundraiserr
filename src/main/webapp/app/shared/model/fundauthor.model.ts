export interface IFundauthor {
  id?: number;
  name?: string | null;
  username?: string | null;
  password?: string | null;
  authorid?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IFundauthor> = {};
