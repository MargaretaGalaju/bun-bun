import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { authLoginSchema, authRegisterSchema } from '@bun-bun/shared';
import { useAuth } from '../lib/auth/AuthContext';

export function LoginScreen() {
  const { login, register } = useAuth();
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (isRegister) {
      const parsed = authRegisterSchema.safeParse({ email, password, name, role });
      if (!parsed.success) {
        Alert.alert(t('login.validationError'), parsed.error.errors[0]?.message || t('login.invalidInput'));
        return;
      }
      setSubmitting(true);
      try {
        await register(parsed.data);
      } catch (err: unknown) {
        Alert.alert(t('login.registerFailed'), err instanceof Error ? err.message : t('login.unknownError'));
      } finally {
        setSubmitting(false);
      }
    } else {
      const parsed = authLoginSchema.safeParse({ email, password });
      if (!parsed.success) {
        Alert.alert(t('login.validationError'), parsed.error.errors[0]?.message || t('login.invalidInput'));
        return;
      }
      setSubmitting(true);
      try {
        await login(parsed.data);
      } catch (err: unknown) {
        Alert.alert(t('login.loginFailed'), err instanceof Error ? err.message : t('login.unknownError'));
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {isRegister ? t('login.registerTitle') : t('login.title')}
        </Text>

        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder={t('login.name')}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={t('login.email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder={t('login.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {isRegister && (
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'BUYER' && styles.roleActive]}
              onPress={() => setRole('BUYER')}
            >
              <Text style={[styles.roleText, role === 'BUYER' && styles.roleActiveText]}>
                {t('login.buyer')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'SELLER' && styles.roleActive]}
              onPress={() => setRole('SELLER')}
            >
              <Text style={[styles.roleText, role === 'SELLER' && styles.roleActiveText]}>
                {t('login.seller')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegister ? t('login.registerSubmit') : t('login.submit')}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsRegister(!isRegister)}
        >
          <Text style={styles.switchText}>
            {isRegister ? t('login.switchToLogin') : t('login.switchToRegister')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleActive: {
    borderColor: '#0070f3',
    backgroundColor: '#e8f0fe',
  },
  roleText: {
    fontSize: 16,
    color: '#666',
  },
  roleActiveText: {
    color: '#0070f3',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0070f3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchText: {
    color: '#0070f3',
    fontSize: 14,
  },
});
