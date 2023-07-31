interface IBill {
  date: string | number | Date;
  map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  _id: string;
  key: string;
  name: string;
  email: string;
  phone: number;
  address: string,
  items: Itembill[];
  total: number;
  status: String;
  orderCode:number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface Itembill {
  [x: string]: any;
  _id: string;
  image: string;
  name: string;
  price: number;
  size: number;
  quantity: number;
}
export default IBill


export interface IBillState {
  BillItems: IBill[];
}

