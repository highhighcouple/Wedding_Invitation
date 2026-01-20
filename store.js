// 초기 기본 데이터 설정
export const DEFAULT_WEDDING_DATA = {
  mainImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80',
  overlayText: 'Our Wedding Day',
  overlayPos: 'top',
  mainText: '조현우 그리고 류하영\n\n2026년 05월 02일 토요일 PM 13시 00분\n강남 마리아쥬 스퀘어\n\n서로가 마주 보며 걸어온 길을\n이제는 같은 곳을 바라보며 함께 가려 합니다.\n귀한 걸음 하시어 축복해 주시면 감사하겠습니다.',
  
  groom: { name: '조현우', father: '조복래', mother: '나선희', rank: '장남', phone: '010-1234-5678', bank: '신한', account: '110-123-456789', bankName: '조현우' },
  bride: { name: '류하영', father: '류민석', mother: '고우희', rank: '장녀', phone: '010-8765-4321', bank: '국민', account: '926502-01-123456', bankName: '류하영' },
  
  weddingDate: '2026-05-02T13:00:00',
  youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  galleryImages: [
    'https://picsum.photos/800/1200?wedding=1',
    'https://picsum.photos/800/1200?wedding=2',
    'https://picsum.photos/800/1200?wedding=3',
    'https://picsum.photos/800/1200?wedding=4',
    'https://picsum.photos/800/1200?wedding=5'
  ],
  venue: {
    name: '마리아쥬 스퀘어',
    address: '서울특별시 강남구 도산대로 318 SB타워 G층',
    phone: '02-541-5007',
    guideText: '지하철 7호선 강남구청역 3번출구 셔틀버스 상시운행'
  },
  sections: [
    { id: 'names', order: 0, isVisible: true, title: '소개' },
    { id: 'calendar', order: 1, isVisible: true, title: '달력' },
    { id: 'gallery', order: 2, isVisible: true, title: '갤러리' },
    { id: 'location', order: 3, isVisible: true, title: '오시는 길' },
    { id: 'guestbook', order: 4, isVisible: true, title: '방명록' },
    { id: 'rsvp', order: 5, isVisible: true, title: '참석의사' }
  ],
  adminPassword: 'admin1234!',
  effectStyle: 'PETAL' // Align with EffectStyle enum key
};

// 데이터 로드 및 저장 함수
export const WeddingStore = {
  get: () => {
    const data = localStorage.getItem('wedding_v2_data');
    return data ? JSON.parse(data) : DEFAULT_WEDDING_DATA;
  },
  save: (data) => {
    localStorage.setItem('wedding_v2_data', JSON.stringify(data));
  },
  getRSVP: () => JSON.parse(localStorage.getItem('wedding_rsvp') || '[]'),
  saveRSVP: (list) => localStorage.setItem('wedding_rsvp', JSON.stringify(list)),
  getGuestbook: () => JSON.parse(localStorage.getItem('wedding_guestbook') || '[]'),
  saveGuestbook: (list) => localStorage.setItem('wedding_guestbook', JSON.stringify(list))
};
