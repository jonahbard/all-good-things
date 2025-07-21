# All Good Things

[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

Sometimes, it seems like all news is bad news. This can make people avoidant of news/current events altogether, which is bad for democracy and can increase people seeking out congenial information, which can lead to echo chambers and polarization. Current media landscapes also are driven by incentives to increase click/share rates, which often leads to bad news being more widely shared/read than good news; we want to circumvent these incentives and allow people to learn about inspiring and positive developments in the world.

## Set Up
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
    press s
    press i
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Architecture

### Components
	•	customization/
      •	CustomizeModal.tsx 
      •	FollowedItem.tsx
      •	PlusButton.tsx 
	•	explore/
      •	ArticleDetail.tsx 
      •	ArticlePreview.tsx 
	•	Common components:
	•	HomeFeed.tsx
	•	Navigator.tsx
	•	Onboarding1.tsx
	•	Onboarding2.tsx
	•	Onboarding3.tsx
	•	OnboardingStack.tsx 
	•	ReaderView.tsx 
	•	Share.tsx 

### Pages
	•	Bookmarks.tsx
	•	Customize.tsx
	•	Explore.tsx
	•	Onboarding.tsx
	•	HomePage.tsx
### Store
	•	articleStore.tsx 
	•	exploreStore.tsx 
	•	userStore.tsx 

### Utils
	•	apiUtils.tsx — Functions for API interactions.

## Library Used

### Overall
- **Zustand**
- **@react-native-async-storage/async-storage**  
- **expo-sharing**
### Navigation
- **@react-navigation/native**  
- **@react-navigation/stack**  
### Article Detail
- **react-native-svg**  
- **react-native-render-html**  
- **title-case**  
- **@expo/react-native-action-sheet**
### Customization
- **react-native-swipe-list-view'**
- **react-native-actions-sheet**

## Deployment

Coming soon!

## Authors

Made by Aneesh Patnaik '25, Leyla Jacoby '25, Nand Patel '27, Joyce Zou '27, Jonah Bard '27

## Notes
- There warning pop up in the reader view, however those are caused by renderhtml library being old. 

## Extra credit
- Reader view: We implemented this by scraping html websites to be displayed in the app, this is intended to improve user experience by removing ads and unecessary links to unrelated things. You should be able to click between reader and web view
- Push notification in expo 
