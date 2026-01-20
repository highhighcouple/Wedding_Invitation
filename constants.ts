
import { WeddingData, EffectStyle } from './types';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  mainImage: 'https://picsum.photos/1200/1800?wedding=1',
  overlayText: 'Wedding Invitation',
  overlayPos: 'top',
  mainText: '조현우 그리고 류하영\n\n2026년 05월 02일 토요일 PM 13시 00분\n강남 마리아쥬 스퀘어\n\n영원히 함께할\n사랑의 맹세\n같이 축복해주세요.',
  
  groom: {
    name: '조현우',
    father: '조복래',
    mother: '나선희',
    rank: '장남',
    phone: '010-3366-4848',
    bank: '기업',
    account: '040-086067-01-014',
    bankName: '조현우'
  },
  bride: {
    name: '류하영',
    father: '류민석',
    mother: '고우희',
    rank: '장녀',
    phone: '010-6556-7525',
    bank: '국민',
    account: '926-54-7559-46',
    bankName: '류하영'
  },
  
  weddingDate: '2026-05-02T13:00:00',
  youtubeLink: 'https://youtu.be/UmdCDfXQ8wQ?si=IirtVYdyD2qBEybR',
  galleryImages: [
    'https://picsum.photos/800/1200?wedding=2',
    'https://picsum.photos/800/1200?wedding=3',
    'https://picsum.photos/800/1200?wedding=4',
    'https://picsum.photos/800/1200?wedding=5',
    'https://picsum.photos/800/1200?wedding=6',
    'https://picsum.photos/800/1200?wedding=7'
  ],
  
  venue: {
    address: '서울특별시 강남구 도산대로 318 SB타워 G층 마리아쥬스퀘어',
    phone: '02-541-5007',
    homepage: 'http://www.mariagesquare.com/',
    mapFile: '',
    guideText: '셔틀운행\n7호선, 분당선 강남구청역 3번출구 셔틀버스 이용\nㄴ예식 있을 시 수시 운행\n\n지하철\n7호선, 분당선 강남구청역 하차\n\n버스\n도산공원사거리 하차',
    naverMap: 'https://map.naver.com/p/entry/place/21413303',
    kakaoMap: 'https://map.kakao.com/?itemId=17416438',
    tmap: 'https://poi.tmobiweb.com/app/share/position?contents=...',
    googleMap: 'https://maps.app.goo.gl/iQ5VbCdJjo3anBcx6',
    kakaoNavi: 'https://map.kakao.com/?itemId=17416438',
    tmapNavi: 'https://poi.tmobiweb.com/app/share/position?contents=...'
  },
  
  sections: [
    { id: 'names', order: 0, isFolded: false, isVisible: true },
    { id: 'calendar', order: 1, isFolded: false, isVisible: true },
    { id: 'youtube', order: 2, isFolded: true, isVisible: true },
    { id: 'gallery', order: 3, isFolded: false, isVisible: true },
    { id: 'phone', order: 4, isFolded: true, isVisible: true },
    { id: 'bank', order: 5, isFolded: true, isVisible: true },
    { id: 'location', order: 6, isFolded: false, isVisible: true },
    { id: 'guestbook', order: 7, isFolded: false, isVisible: true },
    { id: 'rsvp', order: 8, isFolded: true, isVisible: true },
    { id: 'share', order: 9, isFolded: false, isVisible: true }
  ],
  effectStyle: EffectStyle.PETAL,
  bgmList: [],
  adminPassword: 'admin1234!',
  ogImages: {
    kakao: '',
    facebook: '',
    instagram: '',
    x: '',
    blog: ''
  }
};

export const LANG_OPTIONS = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];
