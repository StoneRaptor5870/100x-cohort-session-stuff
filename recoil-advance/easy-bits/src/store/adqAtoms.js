import { atom, selector } from 'recoil';
import axios from 'axios';

// an atom for initial state 
export const initialNotificationsState = atom({
  key: 'initialNotificationsState',
  default: {
    network: 0,
    jobs: 0,
    messaging: 0,
    notifications: 0
  }
});

// a selector for fetching data
export const notifications = selector({
  key: 'networkAtom',
  get: async ({ get }) => {
    try {
      const response = await axios.get("https://sum-server.100xdevs.com/notifications");
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      return get(initialNotificationsState);
    }
  }
});

export const totalNotificationSelector = selector({
  key: 'totalNotificationSelector',
  get: ({ get }) => {
    const data = get(notifications);
    return data.network + data.jobs + data.notifications + data.messaging;
  }
});
