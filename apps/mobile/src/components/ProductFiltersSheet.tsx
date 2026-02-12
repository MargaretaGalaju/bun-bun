import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { CategoryDto, CityDto } from '@bun-bun/shared';
import type { PublicProductParams } from '../lib/api/products';
import { getCategories } from '../lib/api/categories';
import { getCities } from '../lib/api/cities';

export type SortOption = PublicProductParams['sort'];

function getCategoryName(cat: CategoryDto, locale: string): string {
  if (locale === 'ru' && cat.nameRu) return cat.nameRu;
  if (locale === 'ro' && cat.nameRo) return cat.nameRo;
  return cat.name;
}

function getCityName(city: CityDto, locale: string): string {
  return locale === 'ro' ? city.nameRo : city.nameRu;
}

export interface FilterState {
  sort: SortOption;
  categoryId: string;
  city: string;
}

const SORT_OPTIONS: { value: SortOption; labelKey: string }[] = [
  { value: 'newest', labelKey: 'products.sortNewest' },
  { value: 'oldest', labelKey: 'products.sortOldest' },
  { value: 'price_asc', labelKey: 'products.sortPriceAsc' },
  { value: 'price_desc', labelKey: 'products.sortPriceDesc' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  productCount: number;
  onApply: (filters: FilterState) => void;
  /** Called immediately when user changes any filter (sort/category/city). Parent can refetch in background. */
  onFiltersChange?: (filters: FilterState) => void;
};

export function ProductFiltersSheet({
  visible,
  onClose,
  initialFilters,
  productCount,
  onApply,
  onFiltersChange,
}: Props) {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ro' ? 'ro' : 'ru';

  const [sort, setSort] = useState<SortOption>(initialFilters.sort);
  const [categoryId, setCategoryId] = useState(initialFilters.categoryId);
  const [city, setCity] = useState(initialFilters.city);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [cities, setCities] = useState<CityDto[]>([]);
  const [picker, setPicker] = useState<'sort' | 'category' | 'city' | null>(null);

  useEffect(() => {
    if (visible) {
      setSort(initialFilters.sort);
      setCategoryId(initialFilters.categoryId);
      setCity(initialFilters.city);
      getCategories()
        .then(setCategories)
        .catch(() => {});
      getCities()
        .then(setCities)
        .catch(() => {});
    }
  }, [visible, initialFilters.sort, initialFilters.categoryId, initialFilters.city]);

  const emitFilters = (next: FilterState) => {
    onFiltersChange?.(next);
  };

  const handleClearAll = () => {
    setSort('newest');
    setCategoryId('');
    setCity('');
    emitFilters({ sort: 'newest', categoryId: '', city: '' });
  };

  const handleApply = () => {
    onApply({ sort, categoryId, city });
    onClose();
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedCity = cities.find((c) => c.id === city);

  const hasActiveFilters = categoryId !== '' || city !== '' || sort !== 'newest';

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{t('products.filters')}</Text>
            <TouchableOpacity onPress={handleClearAll} disabled={!hasActiveFilters}>
              <Text style={[styles.clearAll, !hasActiveFilters && styles.clearAllDisabled]}>
                {t('products.clearAll')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.row}
            onPress={() => setPicker((p) => (p === 'sort' ? null : 'sort'))}
          >
            <Text style={styles.rowLabel}>{t('products.sortBy')}</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>
                {t(SORT_OPTIONS.find((o) => o.value === sort)?.labelKey ?? 'products.sortNewest')}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => setPicker((p) => (p === 'category' ? null : 'category'))}
          >
            <Text style={styles.rowLabel}>{t('products.categories')}</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue} numberOfLines={1}>
                {selectedCategory
                  ? getCategoryName(selectedCategory, language)
                  : t('products.allCategories')}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => setPicker((p) => (p === 'city' ? null : 'city'))}
          >
            <Text style={styles.rowLabel}>{t('products.city')}</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue} numberOfLines={1}>
                {selectedCity ? getCityName(selectedCity, language) : t('products.allCities')}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
          </TouchableOpacity>

          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply} activeOpacity={0.85}>
              <Text style={styles.applyButtonText}>
                {t('products.showProducts', { count: productCount })}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>

      {/* Picker modal */}
      <Modal visible={picker !== null} transparent onRequestClose={() => setPicker(null)}>
        <Pressable style={styles.pickerBackdrop} onPress={() => setPicker(null)}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>
                {picker === 'sort' && t('products.sortBy')}
                {picker === 'category' && t('products.categories')}
                {picker === 'city' && t('products.city')}
              </Text>
              <TouchableOpacity onPress={() => setPicker(null)}>
                <Text style={styles.pickerDone}>{t('products.done')}</Text>
              </TouchableOpacity>
            </View>
            {picker === 'sort' && (
              <ScrollView style={styles.pickerList}>
                {SORT_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.pickerRow}
                    onPress={() => {
                      setSort(opt.value);
                      setPicker(null);
                      emitFilters({ sort: opt.value, categoryId, city });
                    }}
                  >
                    <Text style={styles.pickerRowText}>{t(opt.labelKey)}</Text>
                    {sort === opt.value && <Ionicons name="checkmark" size={22} color="#016730" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {picker === 'category' && (
              <FlatList
                data={[
                  {
                    id: '',
                    name: t('products.allCategories'),
                    nameRo: null,
                    nameRu: null,
                    slug: '',
                    imageUrl: null,
                    parentId: null,
                  },
                  ...categories,
                ]}
                keyExtractor={(item) => item.id || 'all'}
                renderItem={({ item }) => {
                  const label = item.id
                    ? getCategoryName(item, language)
                    : t('products.allCategories');
                  const isSelected = categoryId === (item.id || '');
                  return (
                    <TouchableOpacity
                      style={styles.pickerRow}
                      onPress={() => {
                        const nextCategoryId = item.id || '';
                        setCategoryId(nextCategoryId);
                        setPicker(null);
                        emitFilters({ sort, categoryId: nextCategoryId, city });
                      }}
                    >
                      <Text style={styles.pickerRowText} numberOfLines={1}>
                        {label}
                      </Text>
                      {isSelected && <Ionicons name="checkmark" size={22} color="#016730" />}
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            {picker === 'city' && (
              <FlatList
                data={[
                  { id: '', nameRo: t('products.allCities'), nameRu: t('products.allCities') },
                  ...cities,
                ]}
                keyExtractor={(item) => item.id || 'all'}
                renderItem={({ item }) => {
                  const label = item.id ? getCityName(item, language) : t('products.allCities');
                  const isSelected = city === (item.id || '');
                  return (
                    <TouchableOpacity
                      style={styles.pickerRow}
                      onPress={() => {
                        const nextCity = item.id || '';
                        setCity(nextCity);
                        setPicker(null);
                        emitFilters({ sort, categoryId, city: nextCity });
                      }}
                    >
                      <Text style={styles.pickerRowText} numberOfLines={1}>
                        {label}
                      </Text>
                      {isSelected && <Ionicons name="checkmark" size={22} color="#016730" />}
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '85%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  clearAll: {
    fontSize: 16,
    color: '#016730',
  },
  clearAllDisabled: {
    color: '#aaa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowLabel: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 12,
  },
  rowValue: {
    fontSize: 15,
    color: '#666',
    maxWidth: 180,
  },
  buttonWrap: {
    marginTop: 24,
  },
  applyButton: {
    backgroundColor: '#016730',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  pickerDone: {
    fontSize: 16,
    color: '#016730',
    fontWeight: '600',
  },
  pickerList: {
    maxHeight: 320,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  pickerRowText: {
    fontSize: 16,
    color: '#111',
    flex: 1,
  },
});
