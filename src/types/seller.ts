export interface Seller {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  joinedYear: number;
  joinedDate?: string;
  rating: number;
  boostActive?: boolean;
}
