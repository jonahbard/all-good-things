import { Text, View } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'All Good Things';
  const description = 'A positive news app';

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <Text className={styles.getStartedTitle}>{title}</Text>
        <Text className={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedTitle: `text-lg leading-6 text-center font-bold`,
  getStartedText: `text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
