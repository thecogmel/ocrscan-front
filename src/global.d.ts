interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface Invoice {
  id: string;
  user_id: string;
  url: string;
  status: string;
  processed_at: Date | null;
  items: Item[];
}

interface Item {
  id: string;
  quantity: number;
  name: string;
  unit_price: number;
  total_value: number;
  invoiceId: string;
}

interface CreateUserFormValues {
  name: string;
  email: string;
  password: string;
}
