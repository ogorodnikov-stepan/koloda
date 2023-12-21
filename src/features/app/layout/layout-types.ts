export type MenuItem = {
  t: string;
  url?: string;
  dropdown?: React.FC;
  component?: React.FC<any>;
};

export type Menu = (x?: any) => MenuItem[];
