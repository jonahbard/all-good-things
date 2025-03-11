import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Article } from './articleStore';

import { handleApiError, handleApiResponse, API_URL } from '~/utils/apiUtils';
export interface ExploreSlice {
  categorizedArticles: Article[];
  trendingArticles: Article[];
  searchedArticles: Article[];
  loadingSearchedArticles: boolean;
  fetchArticleByCategory: (categoryName: string) => void;
  fetchTrendingArticles: () => void;
  searchArticles: (searchString: string) => void;
  clearSearchedArticles: () => void;
}

type StoreState = {
  exploreSlice: ExploreSlice;
};

function createExploreStore(set: any, get: any): ExploreSlice {
  return {
    categorizedArticles: [],
    trendingArticles: [],
    searchedArticles: [],
    loadingSearchedArticles: false,

    clearSearchedArticles: () => {
      set((state: { exploreSlice: ExploreSlice }) => {
        state.exploreSlice.searchedArticles = [];
      });
    },

    searchArticles: async (searchString: string) => {
      try {
        set((state: { exploreSlice: ExploreSlice }) => {
          state.exploreSlice.loadingSearchedArticles = true;
        });
        const response = await fetch(`${API_URL}/articles/search?query=${searchString}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        const mappedArticles: Article[] = data.map((item: any) => ({
          title: item.title,
          description: item.description,
          img: item.img || '',
          tags: item.categories || [],
          link: item.link,
          source: item.source,
          pubDate: new Date(item.pubDate),
          categories: item.categories || [],
        }));
        set((state: { exploreSlice: ExploreSlice }) => {
          state.exploreSlice.searchedArticles = mappedArticles;
          state.exploreSlice.loadingSearchedArticles = false;
        });
      } catch (error) {
        handleApiError(error, get);
        set((state: { exploreSlice: ExploreSlice }) => {
          state.exploreSlice.loadingSearchedArticles = false;
        });
      }
    },

    fetchTrendingArticles: async () => {
      try {
        const response = await fetch(`${API_URL}/articles/trending`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        const mappedArticles: Article[] = data.map((item: any) => ({
          title: item.title,
          description: item.description,
          img: item.img || '',
          tags: item.categories || [],
          link: item.link,
          source: item.source,
          pubDate: new Date(item.pubDate),
          categories: item.categories || [],
        }));
        set((state: { exploreSlice: ExploreSlice }) => {
          state.exploreSlice.trendingArticles = mappedArticles;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },

    fetchArticleByCategory: async (categoryName: string) => {
      try {
        console.log('category name', categoryName);
        const response = await fetch(`${API_URL}/articles?category=${categoryName}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        const mappedArticles: Article[] = data.map((item: any) => ({
          title: item.title,
          description: item.description,
          img: item.img || '',
          tags: item.categories || [],
          link: item.link,
          source: item.source,
          pubDate: new Date(item.pubDate),
          categories: item.categories || [],
        }));
        set((state: { exploreSlice: ExploreSlice }) => {
          state.exploreSlice.categorizedArticles = mappedArticles;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
  };
}

export const exploreStore = create<StoreState>()(
  devtools(
    immer((set: any, get: any) => ({
      exploreSlice: createExploreStore(set, get),
    }))
  )
);
