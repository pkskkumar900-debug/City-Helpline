export type Role = 'user' | 'contributor' | 'admin';

export const ADMIN_EMAILS = ['pkskkumar900@gmail.com', 'kusprince.raj@gmail.com', 'prkus82@gmail.com'];

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export interface UserLocation {
  city: string;
  state?: string;
  district?: string;
  area?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  formattedAddress?: string;
  isLiveDetected: boolean;
  updatedAt: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: Role;
  createdAt: number;
  savedListings?: string[];
  photoURL?: string;
  themePreference?: 'light' | 'dark' | 'system';
  phone?: string;
  businessName?: string;
  businessType?: string;
  city?: string;
  address?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  banned?: boolean;
}

export type ListingStatus = 'pending' | 'approved' | 'rejected';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  address: string;
  price: number;
  contact: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
  authorId: string;
  authorName: string;
  createdAt: number;
  averageRating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export type MarketplaceCategory = 
  | 'Books & Notes' 
  | 'Study Furniture' 
  | 'Coolers & Fans' 
  | 'Cycles & Bikes' 
  | 'Electronics & Gadgets' 
  | 'Mattress & Bedding' 
  | 'Other Essentials';

export type ItemCondition = 'Like New' | 'Good Condition' | 'Fair / Usable';
export type ItemStatus = 'available' | 'sold';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: MarketplaceCategory;
  condition: ItemCondition;
  city: string;
  area?: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  whatsappNumber?: string;
  status: ItemStatus;
  createdAt: number;
  featured?: boolean;
}

