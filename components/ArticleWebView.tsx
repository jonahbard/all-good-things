import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface ArticleWebViewProps {
  //   title: string;
  //   content: string;
}

const ArticleWebView: React.FC<ArticleWebViewProps> = ({}) => {
  return (
    <div>
      <WebView style={styles.container} source={{ uri: 'https://expo.dev' }} />
    </div>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
export default ArticleWebView;
