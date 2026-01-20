
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

export interface GuestbookEntry {
  id: string;
  name: string;
  content: string;
  date: string;
  ip: string;
}

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

export interface SectionConfig {
  id: string;
  order: number;
  isFolded: boolean;
  isVisible: boolean;
}

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
  
  weddingDate: string; // ISO string
  youtubeLink: string;
  galleryImages: string[];
  
  venue: {
    address: string;
    phone: string;
    homepage: string;
    mapFile: string;
    guideText: string;
    naverMap: string;
    kakaoMap: string;
    tmap: string;
    googleMap: string;
    kakaoNavi: string;
    tmapNavi: string;
  };
  
  sections: SectionConfig[];
  effectStyle: EffectStyle;
  bgmList: string[];
  adminPassword: string;
  ogImages: {
    kakao: string;
    facebook: string;
    instagram: string;
    x: string;
    blog: string;
  };
}
