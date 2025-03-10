import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Article } from './articleStore';

import { handleApiError, handleApiResponse } from '~/utils/apiUtils';
export interface ExploreSlice {
  categorizedArticles: Article[];
  fetchArticleByCategory: (categoryName: string) => void;
}

type StoreState = {
  exploreSlice: ExploreSlice;
};
export const API_URL = `https://project-api-all-good-things.onrender.com/api`;
function createExploreStore(set: any, get: any): ExploreSlice {
  return {
    categorizedArticles: [],
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
