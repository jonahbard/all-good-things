import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { handleApiError, handleApiResponse, API_URL } from '~/utils/apiUtils';

export interface UserInfo {
  categories: string[];
  sources: string[];
  bookmarks: string[];
}
export interface UserSlice {
  userID: string | null;
  categories: string[];
  sources: string[];
  bookmarks: [];
  setUserID: (id: string) => void;
  setCategories: (categoryName: string) => void;
  setSources: (sourceName: string) => void;
  createNewUser: (info: UserInfo) => void;
  fetchUserCateogries: (userID: string) => void;
  fetchUserSources: (userID: string) => void;
  updateUserSetting: (info: UserInfo, userID: string) => void;
}

type StoreState = {
  userSlice: UserSlice;
};

function createUserSlice(set: any, get: any): UserSlice {
  return {
    userID: null,
    categories: [],
    sources: [],
    bookmarks: [],
    setCategories: (categoryName: string) => {
      set((state: { userSlice: UserSlice }) => {
        if (state.userSlice.categories.includes(categoryName)) {
          state.userSlice.categories = state.userSlice.categories.filter(
            (item) => item !== categoryName
          ); // deselction
        } else {
          state.userSlice.categories.push(categoryName); // selectiom
        }
      });
    },
    setSources: (sourceName: string) => {
      set((state: { userSlice: UserSlice }) => {
        if (state.userSlice.sources.includes(sourceName)) {
          state.userSlice.sources = state.userSlice.sources.filter((item) => item !== sourceName); // deselction
        } else {
          state.userSlice.sources.push(sourceName);
        }
      });
    },
    setUserID: (id: string) => {
      set((state: { userSlice: UserSlice }) => {
        state.userSlice.userID = id;
      });
    },
    fetchUserCateogries: async (userID: string) => {
      try {
        const response = await fetch(`${API_URL}/user/categories/${userID}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        console.log('fetched categories', data);
        set((state: { userSlice: UserSlice }) => {
          state.userSlice.categories = data;
        });
        console.log('categories', data);
      } catch (error) {
        handleApiError(error, get);
      }
    },
    fetchUserSources: async (userID: string) => {
      try {
        const response = await fetch(`${API_URL}/user/sources/${userID}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        set((state: { userSlice: UserSlice }) => {
          state.userSlice.sources = data;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
    updateUserSetting: async (info: UserInfo, userID: string) => {
      try {
        const response = await fetch(`${API_URL}/user/updateUser/${userID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info),
        });
        const data = await handleApiResponse(response, set);
        if (!data) return;
        console.log('User settings updated successfully', data);
        set((state: { userSlice: UserSlice }) => {
          state.userSlice.categories = [...info.categories];
          state.userSlice.sources = [...info.sources];
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
    createNewUser: async (info: UserInfo) => {
      try {
        const response = await fetch(`${API_URL}/user/createUser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info),
        });
        const data = await handleApiResponse(response, set);
        if (!data) return;
        console.log('data', data);
        const userData = {
          userID: data.userId,
        };
        await AsyncStorage.setItem('user-storage', JSON.stringify(userData)); // ensure its saved
        console.log('new user:', data.userId);
      } catch (error) {
        handleApiError(error, get);
      }
    },
  };
}

export const userStore = create<StoreState>()(
  devtools(
    immer((set: any, get: any) => ({
      userSlice: createUserSlice(set, get),
    }))
  )
);
