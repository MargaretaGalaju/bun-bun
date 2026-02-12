import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CatalogueStackParamList } from '../navigation';
import type { ProductDto } from '@bun-bun/shared';
import { listPublicProducts, type PublicProductParams } from '../lib/api/products';
import { ProductCard } from '../components/ProductCard';
import {
  ProductFiltersSheet,
  type FilterState,
  type SortOption,
} from '../components/ProductFiltersSheet';

type Props = NativeStackScreenProps<CatalogueStackParamList, 'Products'>;

const NUM_COLUMNS = 2;

const SORT_LABEL_KEYS: Record<NonNullable<SortOption>, string> = {
  newest: 'products.sortNewest',
  oldest: 'products.sortOldest',
  price_asc: 'products.sortPriceAsc',
  price_desc: 'products.sortPriceDesc',
};

export function ProductsScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ro' ? 'ro' : 'ru';

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    sort: 'newest',
    categoryId: '',
    city: '',
  });
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchDebounced(q), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: PublicProductParams = { sort: filters.sort };
      if (searchDebounced.trim()) params.q = searchDebounced.trim();
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.city) params.city = filters.city;
      const data = await listPublicProducts(params);
      setProducts(data.items);
      setTotal(data.total);
    } catch {
      setError(t('products.loadError'));
    } finally {
      setLoading(false);
    }
  }, [searchDebounced, filters.sort, filters.categoryId, filters.city, t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleApplyFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const hasActiveFilters =
    filters.categoryId !== '' || filters.city !== '' || filters.sort !== 'newest';

  const listHeader = (
    <View style={styles.headerSection}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('products.searchPlaceholder')}
          placeholderTextColor="#888"
          value={q}
          onChangeText={setQ}
          returnKeyType="search"
          onSubmitEditing={fetchProducts}
        />
        <Ionicons name="search" size={22} color="#666" style={styles.searchIcon} />
      </View>

      <View style={styles.sortFilterRow}>
        <View style={styles.sortBlock}>
          <Ionicons name="swap-vertical" size={18} color="#016730" />
          <View style={styles.sortFilterLabels}>
            <Text style={styles.sortFilterTitle}>{t('products.sort')}</Text>
            <Text style={styles.sortFilterSub}>
              {t(SORT_LABEL_KEYS[filters.sort ?? 'newest'])}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.filterBlock}
          onPress={() => setFiltersVisible(true)}
        >
          <Ionicons name="filter" size={18} color="#016730" />
          <View style={styles.sortFilterLabels}>
            <Text style={styles.sortFilterTitle}>{t('products.filter')}</Text>
            <Text style={styles.sortFilterSub}>
              {hasActiveFilters ? t('products.filtersActive') : t('products.noFilters')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.productCount}>
        {t('products.weFoundProducts', { count: total })}
      </Text>
    </View>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#016730" />
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color="#016730" />
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.empty}>{t('products.empty')}</Text>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <View style={styles.cardWrap}>
            <ProductCard
              product={item}
              index={index}
              language={language}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            />
          </View>
        )}
      />

      <ProductFiltersSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        initialFilters={filters}
        productCount={total}
        onApply={handleApplyFilters}
        onFiltersChange={handleApplyFilters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingWrap: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    marginHorizontal: -6,
  },
  cardWrap: {
    flex: 1,
    paddingHorizontal: 6,
  },
  error: {
    color: '#e53e3e',
    fontSize: 16,
  },
  empty: {
    color: '#666',
    fontSize: 16,
  },
  headerSection: {
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111',
  },
  searchIcon: {
    marginLeft: 8,
  },
  sortFilterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sortBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  filterBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  sortFilterLabels: {
    marginLeft: 8,
  },
  sortFilterTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  sortFilterSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});
