import React from 'react';
import { View, StyleSheet } from 'react-native';
import BunbunLogo from '../../assets/bunbun-logo-white.svg';

const LOGO_HEIGHT = 24;
const LOGO_WIDTH = (816 / 148) * LOGO_HEIGHT; // preserve aspect ratio from viewBox

/**
 * Same logo as web navbar (bunbun-logo-white).
 * Renders white logo; use with dark header background.
 */
export function HeaderLogo() {
  return (
    <View style={styles.container}>
      <BunbunLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
