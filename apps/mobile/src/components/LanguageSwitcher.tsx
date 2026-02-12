import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const nextLang = currentLang === 'ru' ? 'ro' : 'ru';
  const label = currentLang === 'ru' ? 'RU' : 'RO';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => i18n.changeLanguage(nextLang)}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.chevron}>▼</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  chevron: {
    fontSize: 10,
    marginLeft: 4,
    color: '#666',
  },
});
