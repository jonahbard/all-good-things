import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



export interface ExploreSlice {
  categorizedArticles: string[];
}

type StoreState = {
  exploreSlice: ExploreSlice;
};
function createExploreStore(set: any, get: any): ExploreSlice {
  return {
    categorizedArticles: [],
  };
}

export const exploreStore = create<StoreState>()(
  devtools(
    immer((set: any, get: any) => ({
      exploreSlice: createExploreStore(set, get),
    }))
  )
);
