import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { ProductDto } from '@bun-bun/shared';

const BADGES = ['BIO', 'NEW!', 'SEASONAL'] as const;
const RATING_TEXT = '4.5 (42)';

type ProductCardProps = {
  product: ProductDto;
  index: number;
  onPress: () => void;
  language: 'ru' | 'ro';
};

export function ProductCard({ product, index, onPress, language }: ProductCardProps) {
  const { t } = useTranslation();
  const title = language === 'ro' ? product.titleRo : product.titleRu;
  const badge = BADGES[index % BADGES.length];
  const priceUnit = index % 2 === 0 ? t('home.forItem') : t('home.for500g');
  const imageUrl = product.images?.[0]?.url;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Ionicons name="image-outline" size={32} color="#999" />
          </View>
        )}
        <View
          style={[
            styles.badge,
            badge === 'BIO' && styles.badgeBio,
            badge === 'NEW!' && styles.badgeNew,
            badge === 'SEASONAL' && styles.badgeSeasonal,
          ]}
        >
          <Text style={[styles.badgeText, badge === 'NEW!' && styles.badgeTextNew]}>{badge}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.rating}>★ {RATING_TEXT}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>
          €{product.price.toFixed(2)} {priceUnit}
        </Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <Ionicons name="cart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.deliveryRow}>
        <Ionicons name="car-outline" size={14} color="#666" />
        <Text style={styles.deliveryText}>{t('home.deliveryOn')}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
    marginHorizontal: 6,
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeBio: {
    backgroundColor: '#22c55e',
  },
  badgeNew: {
    backgroundColor: '#eab308',
  },
  badgeTextNew: {
    color: '#000',
  },
  badgeSeasonal: {
    backgroundColor: '#f97316',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 10,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginHorizontal: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 10,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartButton: {
    padding: 4,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    gap: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: '#666',
  },
});
