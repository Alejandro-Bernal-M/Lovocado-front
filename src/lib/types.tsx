interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: {name: string, _id: string};
  offer?: number;
  productImages?: {img: string, _id: string}[];
  createdAt?: string;
  createdBy?: {firstName: string, lastName: string, _id: string, fullName: string};
  _id?: string;
}

interface Category {
  name: string;
  categoryImage: string
  parentId?: string;
  slug?: string;
  _id?: string;
}

interface ProductCart {
  _id: string;
  quantity: number;
  price: number;
  offer?: number;
}

interface CartState {
  items: ProductCart [];
  totalProducts: number,
  totalPrices: number,
  showCart: boolean,
}

interface RemoveItem {
  _id: string;
  quantity: number;
}

export type { Product as ProductType, Category, CartState, ProductCart, RemoveItem };