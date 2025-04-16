export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  stocksAssigned: Stock[];
}

export interface Stock {
  id: string;
  name: string;
  category: string;
  quantity: number;
  issuedTo?: string;
  returnDate?: Date;
  status: 'issued' | 'returned' | 'pending';
}

export interface Transaction {
  id: string;
  employeeId: string;
  stockId: string;
  type: 'issuance' | 'return';
  quantity: number;
  date: Date;
  amount: number;
}