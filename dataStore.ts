// Logic for managing wedding data, RSVPs, and guestbook entries in local storage.
import { WeddingData, RSVP, GuestbookEntry } from './types';

const STORAGE_KEY = 'wedding_v2_data';
const RSVP_KEY = 'wedding_rsvp';
const GUESTBOOK_KEY = 'wedding_guestbook';

/**
 * Saves the wedding data configuration.
 */
export const saveWeddingData = (data: WeddingData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Retrieves the list of RSVP responses.
 */
export const getRSVPs = (): RSVP[] => {
  try {
    return JSON.parse(localStorage.getItem(RSVP_KEY) || '[]');
  } catch (e) {
    console.error("Failed to load RSVPs", e);
    return [];
  }
};

/**
 * Adds a new RSVP response.
 */
export const addRSVP = (rsvp: Omit<RSVP, 'id' | 'date'>) => {
  const list = getRSVPs();
  const newRSVP: RSVP = {
    ...rsvp,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  list.push(newRSVP);
  localStorage.setItem(RSVP_KEY, JSON.stringify(list));
};

/**
 * Retrieves the list of guestbook entries.
 */
export const getGuestbook = (): GuestbookEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(GUESTBOOK_KEY) || '[]');
  } catch (e) {
    console.error("Failed to load guestbook", e);
    return [];
  }
};

/**
 * Adds a new guestbook entry.
 */
export const addGuestbook = (entry: Omit<GuestbookEntry, 'id' | 'date'>) => {
  const list = getGuestbook();
  const newEntry: GuestbookEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  list.push(newEntry);
  localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(list));
};
