import Navigator from 'components/Navigator';
import React, { useEffect } from 'react';

import './global.css';
import { registerForPushNotifications, setupNotificationListeners } from './lib/notifications';

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
    setupNotificationListeners();
  }, []);

  return (
    <>
      <Navigator />
    </>
  );
}
