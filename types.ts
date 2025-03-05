export type Article = {
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  source: string;
  publishedDate: Date;
};


export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Tabs: undefined;
  Home: undefined; 
  Explore: undefined;
  Bookmark: undefined;
  Customize: undefined;
  ArticleDetail: { article: Article , }; //need list out prop that it recieves
};