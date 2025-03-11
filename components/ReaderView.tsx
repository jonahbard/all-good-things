import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { titleCase } from 'title-case';

import { ReaderView } from '~/store/articleStore';

interface ReaderViewProps {
  url: string;
  title: string;
  pubDate: Date;
  source: string;
  readerDetails: ReaderView;
}
const ReaderViewComponent: React.FC<ReaderViewProps> = ({
  url,
  title,
  pubDate,
  source,
  readerDetails,
}) => {
  const { width } = useWindowDimensions();

  const formatDate = (date: any): string => {
    if (!date) return '';
    if (date instanceof Date) return date.toLocaleDateString();
    try {
      return new Date(date).toLocaleDateString();
    } catch  {
      return '';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.belowTitle}>
          <Text>{titleCase(source)}</Text>
          {formatDate(pubDate) !== 'Invalid Date' && (
            <>
              <Text> • </Text>
              <Text>{formatDate(pubDate)}</Text>
            </>
          )}
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
