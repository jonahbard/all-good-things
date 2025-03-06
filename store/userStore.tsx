import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
export interface UserInfo {
  categories: string[];
  sources: string[];
  bookmarks: string[];
}
export interface UserSlice {
  userID: string;
  categories: string[];
  sources: string[];
  bookmarks: [];
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

export const handleApiResponse = async (response: Response, set: any) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    set({ isLoading: false, error: errorText }); // Update Zustand state
    return null; // Indicate failure
  }
  return response.json(); // Return parsed response data
};
export const handleApiError = (error: unknown, get: any) => {
  const message = (error as Error).message || 'Unknown error occurred';
  get().errorSlice?.newError?.(message);
  console.error('Fetch Error:', message);
};

const API_URL = `https://project-api-all-good-things.onrender.com/api`;

function createUserSlice(set: any, get: any): UserSlice {
  return {
    userID: '',
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
    fetchUserCateogries: async (userID: string) => {
      try {
        const response = await fetch(`${API_URL}/user/categories/${userID}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        set((state: { userSlice: UserSlice }) => {
          state.userSlice.categories = data;
        });
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
        console.log("User settings updated successfully", data);
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
        set((state: { userSlice: UserSlice }) => {
          state.userSlice.userID = data.uderId;
        });
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
    persist(
      immer((set: any, get: any) => ({
        userSlice: createUserSlice(set, get),
      })),
      {
        name: 'user-storage', // unique name
        storage: createJSONStorage(() => AsyncStorage), // storage provider
      }
    )
  )
);
