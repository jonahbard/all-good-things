import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { API_URL } from '~/store/userStore';

const API_REGISTER_PUSH_TOKEN = `${API_URL}/register-token`;

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications
export async function registerForPushNotifications() {
  if (!Constants.isDevice) {
    console.log('Push notifications only work on physical devices.');
    return;
  }

  // Request notification permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Notification permissions denied.');
    return;
  }

  try {
    // Get the push token
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;
    console.log('📩 Expo Push Token:', token);

    const response = await fetch(API_REGISTER_PUSH_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pushToken: token,
        deviceInfo: Platform.OS,
      }),
    });

    if (!response.ok) {
      console.error('Failed to register push token with server');
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error registering push token:', error);
    return null;
  }
}

// Listen for incoming push notifications
export function setupNotificationListeners() {
  // When a notification is received
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('🔔 Notification Received:', notification);
  });

  // When the user interacts with a notification
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('📩 Notification Clicked:', response);
  });
}
