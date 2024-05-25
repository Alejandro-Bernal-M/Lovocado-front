interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  productImages?: [{img: string, id: string}];
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

interface CartState {
  items: [{_id: string, quantity: number, price: number}];
  totalProducts: number,
  totalPrices: number,
}

export type { Product as ProductType, Category, CartState };