import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../lib/auth/AuthContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { HeaderLogo } from '../components/HeaderLogo';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CartScreen } from '../screens/CartScreen';

// Nested stack param lists
export type MainStackParamList = {
  Home: undefined;
};

export type CatalogueStackParamList = {
  Products: undefined;
  ProductDetails: { productId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
};

// Tab param list: each tab has its own stack/screen
export type MainTabParamList = {
  Main: undefined;
  Catalogue: undefined;
  Cart: undefined;
  Profile: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();
const CatalogueStack = createNativeStackNavigator<CatalogueStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ACTIVE = '#e6b800';
const TAB_INACTIVE = '#888';

const HEADER_STYLE = {
  headerStyle: { backgroundColor: '#016730' },
  headerTintColor: '#fff',
} as const;

function MainStackNavigator() {
  const { t } = useTranslation();
  return (
    <MainStack.Navigator screenOptions={HEADER_STYLE}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <LanguageSwitcher />,
        }}
      />
    </MainStack.Navigator>
  );
}

function CatalogueStackNavigator() {
  const { t } = useTranslation();
  return (
    <CatalogueStack.Navigator screenOptions={HEADER_STYLE}>
      <CatalogueStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <CatalogueStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
    </CatalogueStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const { t } = useTranslation();
  return (
    <ProfileStack.Navigator screenOptions={HEADER_STYLE}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <ProfileStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
    </ProfileStack.Navigator>
  );
}

function TabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStackNavigator}
        options={{
          title: t('nav.main'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Catalogue"
        component={CatalogueStackNavigator}
        options={{
          title: t('nav.catalogue'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          ...HEADER_STYLE,
          headerTitle: () => <HeaderLogo />,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: t('nav.profile'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0070f3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
