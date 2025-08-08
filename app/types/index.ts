export type Store = {
  id: string;
  name: string;
  employeeId: string;
  accessToken: string;
};

export type LineItem = {
  id: string;
  name: string;
  price: number;
  note?: string;
  printed: boolean;
};

export type Order = {
  id: string;
  title: string;
  total: number;
  paymentState: string;
  note?: string;
  lineItems?: { elements: LineItem[] };
  createdTime: number;
};

export type SocialUser = {
    id: string;
    email: string;
}

export type POSEmployee = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'EMPLOYEE' | 'ADMIN' ;
};