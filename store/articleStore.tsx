import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { handleApiError, handleApiResponse, API_URL } from '~/utils/apiUtils';

export interface Article {
  id: string;
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  source: string;
  pubDate: Date;
  categories: string[];
}
export interface ReaderView {
  title: string;
  byline: string;
  dir: string | null;
  lang: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
  publishedTime: string;
}
export interface ArticleSlice {
  allArticles: Article[];
  readerView: ReaderView | null;
  articleView: Article | null;
  fetchAllArticles: (categories: string[], sources: string[]) => void;
  fetchParsedArticle: (url: string) => void;
  updateShare: (articleID: string) => void;
}

type StoreState = {
  articleSlice: ArticleSlice;
};

function createArticleSlice(set: any, get: any): ArticleSlice {
  return {
    allArticles: [],
    articleView: null,
    readerView: null,
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

        const response = await fetch(`${API_URL}/articles?${query}`);
        const data = await handleApiResponse(response, set);
        if (!data) return;

        const mappedArticles: Article[] = data
          .map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            img: item.img || '',
            tags: item.categories || [],
            link: item.link,
            source: item.source,
            pubDate: new Date(item.pubDate),
            categories: item.categories || [],
          }))
          .sort((a: Article, b: Article) => {
            const dateA = new Date(a.pubDate);
            const dateB = new Date(b.pubDate);
            return dateB.getTime() - dateA.getTime();
          });

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
        // console.log('retrieved reader view data', data);
        set((state: { articleSlice: ArticleSlice }) => {
          state.articleSlice.readerView = data;
        });
      } catch (error) {
        handleApiError(error, get);
      }
    },
    updateShare: async (articleID: string) => {
      try {
        const response = await fetch(`${API_URL}/articles/share/${articleID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await handleApiResponse(response, set);
        if (!data) return;
        console.log('Returned response for share update', data);
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
