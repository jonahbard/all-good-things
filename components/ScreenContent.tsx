import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import ArticlePreview from './ArticlePreview';

type Article = {
  title: string;
  description: string;
};

export default function ScreenContent() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://project-api-all-good-things.onrender.com/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);
  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 text-4xl font-bold">Articles</Text>
      <ScrollView>
        {articles.map((article, index) => (
          <ArticlePreview key={index} title={article.title} description={article.description} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
