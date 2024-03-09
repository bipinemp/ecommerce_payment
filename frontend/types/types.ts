type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  Stock: number;
};

type User = {
  createdAt: string;
  email: string;
  emailVerified: null;
  id: string;
  image: string;
  name: string;
  password: string;
};

type CartData = {
  product: Product;
  quantity: number;
  totalPrice: number;
  user: User;
};
