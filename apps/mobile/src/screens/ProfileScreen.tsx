import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth/AuthContext';

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  if (!user) return null;

  const currentLang = i18n.language;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </View>

      {/* Language picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
        <View style={styles.langRow}>
          <TouchableOpacity
            style={[styles.langButton, currentLang === 'ru' && styles.langActive]}
            onPress={() => i18n.changeLanguage('ru')}
          >
            <Text style={[styles.langText, currentLang === 'ru' && styles.langActiveText]}>
              Русский
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, currentLang === 'ro' && styles.langActive]}
            onPress={() => i18n.changeLanguage('ro')}
          >
            <Text style={[styles.langText, currentLang === 'ro' && styles.langActiveText]}>
              Română
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>{t('profile.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0070f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: '#0070f3',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  langRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  langActive: {
    borderColor: '#0070f3',
    backgroundColor: '#e8f0fe',
  },
  langText: {
    fontSize: 16,
    color: '#666',
  },
  langActiveText: {
    color: '#0070f3',
    fontWeight: '600',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e00',
    alignItems: 'center',
  },
  logoutText: {
    color: '#e00',
    fontSize: 16,
    fontWeight: '600',
  },
});
