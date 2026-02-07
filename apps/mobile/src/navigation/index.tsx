import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  ProductDetails: { productId: string };
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

const MainStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function MainNavigator() {
  const { t } = useTranslation();

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('nav.marketplace') }}
      />
      <MainStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: t('nav.products') }}
      />
      <MainStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: t('nav.productDetails') }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('nav.profile') }}
      />
    </MainStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0070f3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
