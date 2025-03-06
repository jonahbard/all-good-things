import { NavigationContainer } from '@react-navigation/native';
import Navigator from 'components/Navigator';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import './global.css';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Fetch notification text from backend
const fetchNotificationText = async () => {
  try {
    console.log('Fetching notification text...');
    const response = await fetch('http://localhost:9090/api/notification');
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error fetching notification text:', error);
    return 'Default notification message'; // Fallback message
  }
};

const scheduleNotifications = async () => {
  try {
    // Cancel existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();

    const times = [
      { hour: 4, minute: 13 }, // 3:30 AM
      { hour: 8, minute: 0 }, // 8:00 AM
      { hour: 12, minute: 0 }, // 12:00 PM
      { hour: 16, minute: 0 }, // 4:00 PM
      { hour: 20, minute: 0 }, // 8:00 PM
    ]; // Hours in 24-hour format
    console.log('Scheduling notifications for times:', times);

    for (const time of times) {
      const message = await fetchNotificationText(); // Fetch latest text

      // Define the trigger with proper typing
      const trigger = {
        hour: time.hour,
        minute: time.minute,
        repeats: true,
      } as Notifications.NotificationTriggerInput;

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: message, // Dynamic content from API
        },
        trigger,
      });

      console.log(
        `Scheduled notification for ${time.hour}:${time.minute.toString().padStart(2, '0')}, ID: ${identifier}`
      );
    }
  } catch (error) {
    console.error('Failed to schedule notifications:', error);
  }
};

// Error handler for registration
function handleRegistrationError(errorMessage: string) {
  console.error(errorMessage);
  return null;
}

// Register for push notifications
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) {
    return handleRegistrationError('Must use physical device for push notifications');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return handleRegistrationError('Permission not granted for push notifications');
  }

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

  if (!projectId) {
    return handleRegistrationError('Project ID not found');
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log('Push token:', token.data);
    return token.data;
  } catch (e) {
    return handleRegistrationError(`Error getting push token: ${e}`);
  }
}

// Send a push notification
async function sendPushNotification(expoPushToken: string) {
  if (!expoPushToken) return;

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Notification',
    body: 'This is a test notification!',
    data: { someData: 'goes here' },
  };

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Notifications component
export function NotificationsComponent() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification: Notifications.Notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    // Schedule daily notifications
    scheduleNotifications();

    // Clean up listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification?.request?.content?.title || 'No notification yet'}</Text>
        <Text>Body: {notification?.request?.content?.body || ''}</Text>
        <Text>
          Data:{' '}
          {notification?.request?.content?.data
            ? JSON.stringify(notification.request.content.data)
            : ''}
        </Text>
      </View>
      <Button
        title="Send Test Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      <Button title="Schedule Daily Notifications" onPress={scheduleNotifications} />
    </View>
  );
}

// Main App component
export default function App() {
  return (
    <>
      <NotificationsComponent />
      <Navigator />
    </>
  );
}