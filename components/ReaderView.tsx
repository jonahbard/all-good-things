import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { titleCase } from 'title-case';

import { ReaderView, articleStore } from '~/store/articleStore';

interface ReaderViewProps {
  url: string;
  title: string;
  pubDate: Date;
  source: string;
  readerDetails: ReaderView
}
const ReaderViewComponent: React.FC<ReaderViewProps> = ({ url, title, pubDate, source, readerDetails }) => {
    const { width } = useWindowDimensions();
//   const [readerDetails, setReaderDetails] = useState<ReaderView | null>(null);
//   const { fetchParsedArticle } = articleStore.getState().articleSlice;
//   useEffect(() => {
//     const fetch = async () => {
//       await fetchParsedArticle(url);
//       const details = articleStore.getState().articleSlice.readerView;
//       setReaderDetails(details);
//     };
//     fetch();
//   }, [url]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.belowTitle}>
          <Text>{titleCase(source)}</Text>
          <Text> • </Text>
          <Text>
            {/* GPT parsing this */}
            {pubDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>
      <RenderHtml
        contentWidth={width}
        tagsStyles={tagsStyles}
        source={{ html: readerDetails?.content || '' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
    lineHeight: 36,
    fontFamily: 'Arial',
  },
  belowTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    color: '#666',
    fontFamily: 'Arial',
  },
});

const tagsStyles = {
  p: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    fontFamily: 'Arial',
  },
  h1: {
    fontSize: 26,
    fontWeight: '600' as '600',
    marginBottom: 15,
    color: '#111',
    fontFamily: 'Arial',
  },
  h2: {
    fontSize: 22,
    fontWeight: '500' as '500',
    marginBottom: 15,
    color: '#222',
    fontFamily: 'Arial',
  },
  h3: {
    fontSize: 20,
    fontWeight: '500' as '500',
    marginBottom: 15,
    color: '#333',
    fontFamily: 'Arial',
  },
};
export default ReaderViewComponent;
