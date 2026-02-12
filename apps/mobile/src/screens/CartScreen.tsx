import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function CartScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>{t('cart.empty')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Catalogue' as never)}
      >
        <Text style={styles.buttonText}>{t('cart.goToCatalogue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#e6b800',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
