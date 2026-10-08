export type ProductCategory =
  | 'Aesthetic Notebooks and Journals'
  | 'Cute Pens and Gel Pens'
  | 'Highlighters and Colorful Markers'
  | 'Premium Pencil Cases'
  | 'Sticky Notes and Memo Pads'
  | 'Planners and Study Organizers'
  | 'Art and Craft Supplies'
  | 'Desk Accessories'
  | 'Bookmarks and Page Flags'
  | 'Creative School Supplies'
  | 'Exam Preparation Essentials'
  | 'Personalized Stationery'
  | 'Kawaii and Cute Stationery'
  | 'Gift Sets for Students'
  | 'Unique and Innovative Stationery Gadgets'
  | 'School Bags and Backpacks'
  | 'Lunch Boxes and Bento Sets'
  | 'Water Bottles and Tumblers';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricePKR: number;
  originalPricePKR?: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  studentTag?: string; // e.g. "MDCAT & FSc Fav", "University Notes", "O/A Levels"
  colors?: ProductColor[];
  details: string[];
  specs: ProductSpec[];
  has3DModel?: boolean;
  modelType?: 'notebook' | 'pen' | 'pencil_case' | 'highlighter' | 'desk_organizer' | 'bottle';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified' | 'paid_on_delivery';
  trackingNumber: string;
  courier: 'TCS Courier' | 'Trax Logistics' | 'CallCourier' | 'Leopard';
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
}

export interface Review {
  id: string;
  author: string;
  city: string;
  institution: string; // e.g. "LUMS", "NUST", "Dow Medical College", "IBA Karachi"
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'policies'
  | '3d-studio'
  | 'orders';
