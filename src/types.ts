export type Banner = {
  id: number;
  image: string;
  is_catalog_banner: boolean;
  category: number;
  sub_category: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  products: [];
  sub_categories: [];
  parent_category: null | number;
};

export type SubCategory = {
  id: number;
  name: string;
  parent: number;
  image: string;
  products: Product[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  old_price: number;
  category: Category;
  sub_category: {};
  characteristics: [];
  is_used: boolean;
  is_new: boolean;
  is_sale: boolean;
};

export type Cart = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: {};
  quantity: number;
};

export type Characteristics = {
  id: number;
  key: string;
  value: string;
  product: number;
};
