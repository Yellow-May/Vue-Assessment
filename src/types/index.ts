export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}
