import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { handleApiError, handleApiResponse } from '~/utils/apiUtils';
export interface Article {
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  source: string;
  pubDate: Date;
}
export interface ReaderView {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
  description: string;
  source: string;
  categories: string[];
  img?: string;
  shareCount: number;
}
export interface ArticleSlice {
  allArticles: Article[];
  articleView: Article | null;
  fetchAllArticles: (categories: string[], sources: string[]) => void;
  fetchParsedArticle: (url: string) => void;
}

type StoreState = {
  articleSlice: ArticleSlice;
};

// export const API_URL = `https://project-api-all-good-things.onrender.com/api`;
export const API_URL = `http://localhost:9090/api`;
function createArticleSlice(set: any, get: any): ArticleSlice {
  return {
    allArticles: [],
    articleView: null,
    fetchAllArticles: async (categories: string[], sources: string[]) => {
      try {
        // example string: /api/articles?category=Science&category=Health&source=yes%20magazine&source=NYTimes%20Magazine
        let query = '';
        if (categories.length > 0) {
          query += categories
            .map((category) => `category=${encodeURIComponent(category)}`)
            .join('&');
        }
        if (sources.length > 0) {
          query +=
            (query ? '&' : '') +
            sources.map((source) => `source=${encodeURIComponent(source)}`).join('&');
        }
        console.log('query string', query);
        const response = await fetch(`${API_URL}/articles?${query}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        // console.log('retrieved data', data);
        const mappedArticles: Article[] = data.map((item: any) => ({
          title: item.title,
          description: item.description,
          img: item.img || '',
          tags: item.categories || [],
          link: item.link,
          source: item.source,
          pubDate: new Date(item.pubDate),
        }));
        set((state: { articleSlice: ArticleSlice }) => {
          state.articleSlice.allArticles = mappedArticles;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
    fetchParsedArticle: async (url: string) => {
      try {
        const response = await fetch(`${API_URL}/parse?url=${url}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;
        console.log('retrieved reader view data', data);
        set((state: { articleSlice: ArticleSlice }) => {
          state.articleSlice.articleView = data;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
  };
}

export const articleStore = create<StoreState>()(
  devtools(
    immer((set: any, get: any) => ({
      articleSlice: createArticleSlice(set, get),
    }))
  )
);
