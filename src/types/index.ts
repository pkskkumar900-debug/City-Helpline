export type Role = 'user' | 'contributor' | 'admin';

export const ADMIN_EMAILS = ['pkskkumar900@gmail.com', 'kusprince.raj@gmail.com'];

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
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
