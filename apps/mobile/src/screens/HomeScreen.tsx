import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { MainStackParamList } from '../navigation';
import type { ProductDto, CategoryDto } from '@bun-bun/shared';
import { ProductStatus } from '@bun-bun/shared';
import { getProducts } from '../lib/api/products';
import { getCategories } from '../lib/api/categories';
import { ProductCard } from '../components/ProductCard';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const FALLBACK_PRODUCTS: ProductDto[] = [
  {
    id: 'fallback-1',
    titleRu: 'Овощной набор',
    titleRo: 'Set legume',
    descriptionRu: 'Свежие овощи',
    descriptionRo: 'Legume proaspăt',
    price: 24.5,
    status: ProductStatus.ACTIVE,
    sellerId: 's1',
    categoryId: 'c1',
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    titleRu: 'Помидоры',
    titleRo: 'Roșii',
    descriptionRu: 'Кластерные томаты',
    descriptionRo: 'Roșii în ciorchine',
    price: 2.38,
    status: ProductStatus.ACTIVE,
    sellerId: 's1',
    categoryId: 'c1',
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    titleRu: 'Молоко',
    titleRo: 'Lapte',
    descriptionRu: 'Свежее молоко',
    descriptionRo: 'Lapte proaspăt',
    price: 3.5,
    status: ProductStatus.ACTIVE,
    sellerId: 's1',
    categoryId: 'c1',
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-4',
    titleRu: 'Брюссельская капуста',
    titleRo: 'Varză de Bruxelles',
    descriptionRu: 'Свежая капуста',
    descriptionRo: 'Varză proaspătă',
    price: 4.2,
    status: ProductStatus.ACTIVE,
    sellerId: 's1',
    categoryId: 'c1',
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - 32 - CARD_GAP) / 2;

const BANNER_1_URI =
  'https://www.healthyfood.com/wp-content/uploads/2024/01/iStock-1353393865-1024x684.jpg';
const BANNER_2_URI = 'https://aboutmoldova.md/ckfinder/userfiles/files/balti3.jpg';
const OUR_PRODUCTS_IMAGE_URI =
  'https://media.licdn.com/dms/image/v2/D4E10AQGbAWRAclN3Dw/image-shrink_800/B4EZro.7HvHgAc-/0/1764845401361?e=2147483647&v=beta&t=7zxi2H0Ezm9nDaaERYobh0N6PayJzBuB3-V4RQL7rcE';
const OUR_FARMS_IMAGE_URI =
  'https://cdn.britannica.com/91/58691-050-EA8A808A/combination-vineyard-orchard-valley-Dniester-River-Moldova.jpg';

export function HomeScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const language = i18n.language === 'ro' ? 'ro' : 'ru';

  useEffect(() => {
    getProducts()
      .then((items) => setProducts(items.slice(0, 6)))
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const popularProducts = products.length > 0 ? products : FALLBACK_PRODUCTS.slice(0, 4);

  const openProductDetails = (productId: string) => {
    const tabNav = navigation.getParent() as
      | { navigate: (name: string, params?: object) => void }
      | undefined;
    tabNav?.navigate('Catalogue', { screen: 'ProductDetails', params: { productId } });
  };

  const openCatalogue = () => {
    const tabNav = navigation.getParent() as { navigate: (name: string) => void } | undefined;
    tabNav?.navigate('Catalogue');
  };

  const categoryName = (c: CategoryDto) =>
    language === 'ro' ? (c.nameRo ?? c.name) : (c.nameRu ?? c.name);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.banner1Wrap} activeOpacity={1} onPress={openCatalogue}>
        <Image source={{ uri: BANNER_1_URI }} style={styles.banner1Image} resizeMode="cover" />
        <View style={styles.banner1Overlay} pointerEvents="none">
          <Text style={styles.heroTitle}>{t('home.heroTitle')}</Text>
          <Text style={styles.heroSubtitle}>{t('home.heroSubtitle')}</Text>
          <Text style={styles.heroCta}>{t('home.heroCta')}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('home.searchPlaceholder')}
          placeholderTextColor="#888"
          editable={false}
        />
      </View>

      <Text style={styles.sectionTitle}>{t('home.popularCategories')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesScrollContent}
      >
        {categories.map((c) => (
          <View key={c.id} style={styles.categoryChip}>
            {c.imageUrl ? (
              <Image
                source={{ uri: c.imageUrl }}
                style={styles.categoryChipImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.categoryChipImage, styles.categoryChipImagePlaceholder]} />
            )}
            <Text style={styles.categoryChipText} numberOfLines={1}>
              {categoryName(c)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.banner2Wrap} activeOpacity={1} onPress={openCatalogue}>
        <View style={styles.banner2Left}>
          <Text style={styles.banner2Headline}>{t('home.banner2Headline')}</Text>
          <Text style={styles.banner2Body}>{t('home.banner2Body')}</Text>
          <View style={styles.banner2CtaWrap}>
            <Text style={styles.banner2CtaText}>{t('home.readMore')}</Text>
          </View>
        </View>
        <View style={styles.banner2ImageWrap}>
          <Image source={{ uri: BANNER_2_URI }} style={styles.banner2Image} resizeMode="cover" />
        </View>
      </TouchableOpacity>

      <View style={styles.categoryRow}>
        <TouchableOpacity style={styles.categoryCard} onPress={openCatalogue}>
          <Image
            source={{ uri: OUR_PRODUCTS_IMAGE_URI }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryLabel}>{t('home.ourProducts')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={openCatalogue}>
          <Image
            source={{ uri: OUR_FARMS_IMAGE_URI }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryLabel}>{t('home.ourFarms')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('home.popularProducts')}</Text>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#e6b800" />
        </View>
      ) : (
        <View style={styles.grid}>
          {popularProducts.slice(0, 4).map((product, index) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                product={product}
                index={index}
                language={language}
                onPress={() => openProductDetails(product.id)}
              />
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.showAllButton} onPress={openCatalogue}>
        <Text style={styles.showAllButtonText}>{t('home.showAllProducts')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const BANNER_HEIGHT = 180;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
  },
  banner1Wrap: {
    width,
    marginHorizontal: -16,
    marginBottom: 16,
    position: 'relative',
    height: BANNER_HEIGHT,
  },
  banner1Image: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: BANNER_HEIGHT,
    backgroundColor: '#eee',
  },
  banner1Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.95,
    marginBottom: 4,
  },
  heroCta: {
    fontSize: 12,
    color: '#fff',
    fontStyle: 'italic',
    opacity: 0.9,
  },
  banner2Wrap: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
    backgroundColor: '#FFF9E6',
  },
  banner2Left: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 12,
    justifyContent: 'space-between',
  },
  banner2Headline: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d9488',
    marginBottom: 6,
  },
  banner2Body: {
    fontSize: 13,
    color: '#0f766e',
    lineHeight: 18,
    marginBottom: 10,
    flex: 1,
  },
  banner2CtaWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  banner2CtaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  banner2ImageWrap: {
    width: 140,
    height: 140,
    overflow: 'hidden',
  },
  banner2Image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
  categoriesScroll: {
    marginHorizontal: -16,
    marginBottom: 16,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  categoryChip: {
    width: 100,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryChipImage: {
    width: '100%',
    height: 60,
  },
  categoryChipImagePlaceholder: {
    backgroundColor: '#e6b800',
  },
  categoryChipText: {
    padding: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: 1.1,
  },
  categoryImage: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryImageProducts: {
    backgroundColor: '#86efac',
  },
  categoryImageFarms: {
    backgroundColor: '#93c5fd',
  },
  categoryLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  loadingWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 6,
  },
  showAllButton: {
    backgroundColor: '#e6b800',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  showAllButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});
