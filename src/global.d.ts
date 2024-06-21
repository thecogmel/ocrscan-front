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
}
