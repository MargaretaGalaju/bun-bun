import React from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n'; // initialize i18next
import { AuthProvider } from './src/lib/auth/AuthContext';
import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </AuthProvider>
  );
}
