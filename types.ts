/**
 * Wedding data types and interfaces for the mobile invitation application.
 */

// Effect styles for the background particles
export enum EffectStyle {
  PETAL = 'PETAL',
  SNOW = 'SNOW',
  LEAF = 'LEAF',
  STAR = 'STAR',
  RAIN = 'RAIN',
  DANDELION = 'DANDELION',
  BUTTERFLY = 'BUTTERFLY',
  DRAGONFLY = 'DRAGONFLY',
  PIGEON = 'PIGEON'
}

// Configuration for individual sections in the invitation
export interface SectionConfig {
  id: string;
  order: number;
  isVisible: boolean;
  isFolded?: boolean;
  title?: string;
}

// Entry in the guestbook
export interface GuestbookEntry {
  id: string;
  name: string;
  content: string;
  date: string;
}

// RSVP response data
export interface RSVP {
  id: string;
  side: 'groom' | 'bride';
  attendance: boolean;
  name: string;
  phone: string;
  willEat: boolean;
  count: number;
  date: string;
}

// Full wedding data structure
export interface WeddingData {
  mainImage: string;
  overlayText: string;
  overlayPos: 'top' | 'middle' | 'bottom';
  mainText: string;
  groom: {
    name: string;
    father: string;
    mother: string;
    rank: string;
    phone: string;
    bank: string;
    account: string;
    bankName: string;
  };
  bride: {
    name: string;
    father: string;
    mother: string;
    rank: string;
    phone: string;
    bank: string;
    account: string;
    bankName: string;
  };
  weddingDate: string;
  youtubeLink: string;
  galleryImages: string[];
  venue: {
    name: string;
    address: string;
    phone: string;
    guideText: string;
    naverMap?: string;
    kakaoMap?: string;
    tmap?: string;
    googleMap?: string;
  };
  sections: SectionConfig[];
  adminPassword: string;
  effectStyle: EffectStyle;
}
