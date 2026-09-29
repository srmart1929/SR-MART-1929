export interface Product {
  id: string;
  name: string;
  slug?: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number; // Original MRP in INR
  salePrice: number; // Discounted selling price
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  stock: number;
  sku: string;
  sizes?: string[];
  colors?: { name: string; hex: string; image?: string }[];
  description: string;
  specifications: Record<string, string>;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFlashDeal?: boolean;
  flashDealEndsAt?: string;
  inStock: boolean;
  tags: string[];
  returnDays: number;
  warrantyInfo: string;
  isVisible: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: string[];
  isFeatured: boolean;
}

export interface CartItem {
  id: string; // unique item entry id
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  product: Product;
  savedForLater?: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  pincode: string;
  streetAddress: string;
  locality?: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

export type OrderStatus =
  | 'Payment Pending'
  | 'Payment Successful'
  | 'Order Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned'
  | 'Refunded';

export type PaymentMethod = 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallets';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  comment?: string;
}

export interface Order {
  id: string; // e.g. SRM-728190
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  tax: number; // 18% GST itemized
  total: number;
  paymentMethod: PaymentMethod;
  paymentTransactionId: string;
  paymentStatus: 'Successful' | 'Pending' | 'Failed';
  orderStatus: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  shippingAddress: Address;
  createdAt: string;
  estimatedDeliveryDate: string;
  courierName?: string;
  trackingNumber?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountPercent?: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  ctaText: string;
  ctaCategory: string;
  image: string;
  bgGradient: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  isRead?: boolean;
  type: 'order' | 'promo' | 'system';
  actionLink?: string;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  estimatedDays: number;
  deliveryCharge: number;
}
