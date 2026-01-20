
import { WeddingData, GuestbookEntry, RSVP } from './types';
import { DEFAULT_WEDDING_DATA } from './constants';

const DB_KEY = 'wedding_data_v1';
const GUESTBOOK_KEY = 'wedding_guestbook_v1';
const RSVP_KEY = 'wedding_rsvp_v1';

export const getWeddingData = (): WeddingData => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : DEFAULT_WEDDING_DATA;
};

export const saveWeddingData = (data: WeddingData) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const getGuestbook = (): GuestbookEntry[] => {
  const data = localStorage.getItem(GUESTBOOK_KEY);
  return data ? JSON.parse(data) : [];
};

export const addGuestbook = (entry: Omit<GuestbookEntry, 'id' | 'date' | 'ip'>) => {
  const entries = getGuestbook();
  const newEntry: GuestbookEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ip: '127.0.0.1' // 시뮬레이션
  };
  localStorage.setItem(GUESTBOOK_KEY, JSON.stringify([newEntry, ...entries]));
};

export const getRSVPs = (): RSVP[] => {
  const data = localStorage.getItem(RSVP_KEY);
  return data ? JSON.parse(data) : [];
};

export const addRSVP = (rsvp: Omit<RSVP, 'id' | 'date'>) => {
  const rsvps = getRSVPs();
  const newRSVP: RSVP = {
    ...rsvp,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  localStorage.setItem(RSVP_KEY, JSON.stringify([...rsvps, newRSVP]));
};
