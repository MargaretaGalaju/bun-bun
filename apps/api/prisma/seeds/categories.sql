-- Category seed data for bun-bun marketplace
-- Auto-generated from local database export
-- Total: 117 categories (14 main + 103 subcategories)
-- Generated on: 2026-02-17

-- Clear existing data (in correct order to avoid FK violations)
DELETE FROM order_items;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Main Categories (with images)
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0000-000000000008', 'Băuturi', 'Напитки', 'Băuturi', 'bauturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000008/8c349779-846f-410f-ae5c-775ca11f20d5.png', NULL, 1),
('10000000-0000-0000-0000-000000000003', 'Carne & Produse din Carne', 'Мясо и мясные продукты', 'Carne & Produse din Carne', 'carne-produse-carne', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000003/3c092026-53e9-45b9-82b7-55d893b3bab4.png', NULL, 98),
('10000000-0000-0000-0000-000000000012', 'Cereale & Produse de Moară', 'Зерновые и мукомольные продукты', 'Cereale & Produse de Moară', 'cereale-produse-moara', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000012/59a8f575-c656-4048-9480-1f414fdf2659.png', NULL, 1),
('10000000-0000-0000-0000-000000000014', 'Condimente & Mixuri', 'Специи и пряности', 'Condimente & Mixuri', 'condimente-mixuri', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000014/ce40ab1a-c9f5-4124-8d0f-306cb3565b71.png', NULL, 1),
('10000000-0000-0000-0000-000000000007', 'Conserve & Murături', 'Консервы и соленья', 'Conserve & Murături', 'conserve-muraturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000007/7c691159-9055-4431-9beb-517a5b4d65ed.png', NULL, 95),
('10000000-0000-0000-0000-000000000010', 'Dulciuri & Gustări', 'Сладости и закуски', 'Dulciuri & Gustări', 'dulciuri-gustari', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000010/74d654ea-9c3e-412b-aabe-6de80dcd7eb9.png', NULL, 1),
('10000000-0000-0000-0000-000000000006', 'Fructe & Legume', 'Фрукты и овощи', 'Fructe & Legume', 'fructe-legume', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000006/fbeb66d5-1c48-4cf7-85fb-a8b5d5dea5a3.png', NULL, 100),
('10000000-0000-0000-0000-000000000002', 'Lactate & Brânzeturi', 'Молочные продукты и сыры', 'Lactate & Brânzeturi', 'lactate-branzeturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000002/00b8b96f-efd5-4663-85e2-c72f6b7b12a7.png', NULL, 99),
('10000000-0000-0000-0000-000000000005', 'Miere & Produse Apicole', 'Мёд и продукты пчеловодства', 'Miere & Produse Apicole', 'miere-produse-apicole', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000005/7f5bf79a-39d4-4675-ae58-2019176114d5.png', NULL, 97),
('10000000-0000-0000-0000-000000000009', 'Nuci, Semințe & Produse Derivate', 'Орехи, семена и продукты из них', 'Nuci, Semințe & Produse Derivate', 'nuci-seminte-produse', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000009/6c9faf96-6348-445d-8169-a0ce496dbb5e.png', NULL, 93),
('10000000-0000-0000-0000-000000000013', 'Ouă & Produse din Ouă', 'Яйца и яичные продукты', 'Ouă & Produse din Ouă', 'oua-produse-oua', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000013/811a0233-7258-4273-891a-8e651153ccaa.png', NULL, 96),
('10000000-0000-0000-0000-000000000001', 'Panificație & Patiserie', 'Хлебопекарные изделия и выпечка', 'Panificație & Patiserie', 'panificatie-patiserie', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000001/5ce2ac64-2a2c-4827-984e-0f4c6ce015f2.png', NULL, 94),
('10000000-0000-0000-0000-000000000004', 'Pește & Produse din Pește', 'Рыба и рыбные продукты', 'Pește & Produse din Pește', 'peste-produse-peste', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000004/12851236-5485-498c-b516-0ccfa01f9867.png', NULL, 1),
('10000000-0000-0000-0000-000000000011', 'Produse Naturale & Dietetice', 'Натуральные и диетические продукты', 'Produse Naturale & Dietetice', 'produse-naturale-dietetice', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/10000000-0000-0000-0000-000000000011/0a0cb76d-2380-459d-9491-32e9e3e9088f.png', NULL, 1);

-- Subcategories for Panificație & Patiserie
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0001-000000000005', 'Biscuiți & fursecuri', 'Печенье', 'Biscuiți & fursecuri', 'biscuiti-fursecuri', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000003', 'Colaci & cozonaci', 'Калачи и куличи', 'Colaci & cozonaci', 'colaci-cozonaci', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000004', 'Plăcinte tradiționale', 'Традиционные пироги', 'Plăcinte tradiționale', 'placinte-traditionale', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000007', 'Produse fără gluten', 'Безглютеновые продукты', 'Produse fără gluten', 'produse-fara-gluten', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000001', 'Pâine artizanală', 'Ремесленный хлеб', 'Pâine artizanală', 'paine-artizanala', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000002', 'Pâine integrală / cu maia', 'Цельнозерновой хлеб / на закваске', 'Pâine integrală / cu maia', 'paine-integrala-cu-maia', NULL, '10000000-0000-0000-0000-000000000001', 1),
('10000000-0000-0000-0001-000000000006', 'Tarte & deserturi de casă', 'Торты и домашние десерты', 'Tarte & deserturi de casă', 'tarte-deserturi-casa', NULL, '10000000-0000-0000-0000-000000000001', 1);

-- Subcategories for Lactate & Brânzeturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0002-000000000003', 'Brânză de capră', 'Козий сыр', 'Brânză de capră', 'branza-capra', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000002', 'Brânză de oaie', 'Овечий сыр', 'Brânză de oaie', 'branza-oaie', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000001', 'Brânză de vacă', 'Коровий сыр', 'Brânză de vacă', 'branza-vaca', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000004', 'Cașcaval', 'Кашкавал', 'Cașcaval', 'cascaval', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000007', 'Chefir', 'Кефир', 'Chefir', 'chefir', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000006', 'Iaurt natural', 'Натуральный йогурт', 'Iaurt natural', 'iaurt-natural', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000009', 'Smântână', 'Сметана', 'Smântână', 'smantana', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000005', 'Telemea', 'Телемя', 'Telemea', 'telemea', NULL, '10000000-0000-0000-0000-000000000002', 1),
('10000000-0000-0000-0002-000000000008', 'Unt artizanal', 'Ремесленное масло', 'Unt artizanal', 'unt-artizanal', NULL, '10000000-0000-0000-0000-000000000002', 1);

-- Subcategories for Carne & Produse din Carne
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0003-000000000004', 'Cârnați artizanali', 'Ремесленные колбаски', 'Cârnați artizanali', 'carnati-artizanali', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000002', 'Carne maturată', 'Выдержанное мясо', 'Carne maturată', 'carne-maturata', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000001', 'Carne proaspătă (vită, porc, pasăre)', 'Свежее мясо (говядина, свинина, птица)', 'Carne proaspătă (vită, porc, pasăre)', 'carne-proaspata', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000008', 'Conserve din carne', 'Мясные консервы', 'Conserve din carne', 'conserve-carne', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000003', 'Mezeluri tradiționale', 'Традиционные колбасные изделия', 'Mezeluri tradiționale', 'mezeluri-traditionale', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000007', 'Pateuri', 'Паштеты', 'Pateuri', 'pateuri', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000005', 'Salamuri uscate', 'Сухие колбасы', 'Salamuri uscate', 'salamuri-uscate', NULL, '10000000-0000-0000-0000-000000000003', 1),
('10000000-0000-0000-0003-000000000006', 'Slănină', 'Сало', 'Slănină', 'slanina', NULL, '10000000-0000-0000-0000-000000000003', 1);

-- Subcategories for Pește & Produse din Pește
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0004-000000000004', 'Conserve din pește', 'Рыбные консервы', 'Conserve din pește', 'conserve-peste', NULL, '10000000-0000-0000-0000-000000000004', 1),
('10000000-0000-0000-0004-000000000005', 'Icre', 'Икра', 'Icre', 'icre', NULL, '10000000-0000-0000-0000-000000000004', 1),
('10000000-0000-0000-0004-000000000002', 'Pește afumat', 'Копчёная рыба', 'Pește afumat', 'peste-afumat', NULL, '10000000-0000-0000-0000-000000000004', 1),
('10000000-0000-0000-0004-000000000001', 'Pește proaspăt', 'Свежая рыба', 'Pește proaspăt', 'peste-proaspat', NULL, '10000000-0000-0000-0000-000000000004', 1),
('10000000-0000-0000-0004-000000000003', 'Pește sărat', 'Солёная рыба', 'Pește sărat', 'peste-sarat', NULL, '10000000-0000-0000-0000-000000000004', 1);

-- Subcategories for Miere & Produse Apicole
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0005-000000000005', 'Fagure', 'Соты', 'Fagure', 'fagure', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000008', 'Lăptișor de matcă', 'Маточное молочко', 'Lăptișor de matcă', 'laptisor-matca', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000004', 'Miere de rapiță', 'Рапсовый мёд', 'Miere de rapiță', 'miere-rapita', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000002', 'Miere de salcâm', 'Акациевый мёд', 'Miere de salcâm', 'miere-salcam', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000003', 'Miere de tei', 'Липовый мёд', 'Miere de tei', 'miere-tei', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000001', 'Miere polifloră', 'Полифлорный мёд', 'Miere polifloră', 'miere-poliflora', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000009', 'Mixuri apicole', 'Пчелиные смеси', 'Mixuri apicole', 'mixuri-apicole', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000006', 'Polen', 'Пыльца', 'Polen', 'polen', NULL, '10000000-0000-0000-0000-000000000005', 1),
('10000000-0000-0000-0005-000000000007', 'Propolis', 'Прополис', 'Propolis', 'propolis', NULL, '10000000-0000-0000-0000-000000000005', 1);

-- Subcategories for Fructe & Legume
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0006-000000000001', 'Fructe proaspete', 'Свежие фрукты', 'Fructe proaspete', 'fructe-proaspete', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000003', 'Fructe uscate', 'Сушёные фрукты', 'Fructe uscate', 'fructe-uscate', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000002', 'Legume proaspete', 'Свежие овощи', 'Legume proaspete', 'legume-proaspete', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000004', 'Legume uscate', 'Сушёные овощи', 'Legume uscate', 'legume-uscate', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000007', 'Produse bio certificate', 'Сертифицированные био-продукты', 'Produse bio certificate', 'produse-bio-certificate', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000006', 'Produse de sezon', 'Сезонные продукты', 'Produse de sezon', 'produse-sezon', NULL, '10000000-0000-0000-0000-000000000006', 1),
('10000000-0000-0000-0006-000000000005', 'Verdețuri', 'Зелень', 'Verdețuri', 'verdeturi', NULL, '10000000-0000-0000-0000-000000000006', 1);

-- Subcategories for Conserve & Murături
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0007-000000000007', 'Compot', 'Компот', 'Compot', 'compot', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000001', 'Dulceață', 'Варенье', 'Dulceață', 'dulceata', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000002', 'Gem', 'Джем', 'Gem', 'gem', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000004', 'Murături', 'Соленья', 'Murături', 'muraturi', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000006', 'Pastă de tomate', 'Томатная паста', 'Pastă de tomate', 'pasta-tomate', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000008', 'Siropuri naturale', 'Натуральные сиропы', 'Siropuri naturale', 'siropuri-naturale', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000005', 'Suc de roșii', 'Томатный сок', 'Suc de roșii', 'suc-rosii', NULL, '10000000-0000-0000-0000-000000000007', 1),
('10000000-0000-0000-0007-000000000003', 'Zacuscă', 'Закуска', 'Zacuscă', 'zacusca', NULL, '10000000-0000-0000-0000-000000000007', 1);

-- Subcategories for Băuturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0008-000000000001', 'Băuturi alcoolice', 'Алкогольные напитки', 'Băuturi alcoolice', 'bauturi-alcoolice', NULL, '10000000-0000-0000-0000-000000000008', 1),
('10000000-0000-0000-0008-000000000009', 'Băuturi non-alcoolice', 'Безалкогольные напитки', 'Băuturi non-alcoolice', 'bauturi-non-alcoolice', NULL, '10000000-0000-0000-0000-000000000008', 1);

-- Subcategories for Băuturi alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0008-000000000006', 'Divin', 'Дивин', 'Divin', 'divin', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000008', 'Lichioruri artizanale', 'Ремесленные ликёры', 'Lichioruri artizanale', 'lichioruri-artizanale', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000002', 'Vin alb', 'Белое вино', 'Vin alb', 'vin-alb', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000004', 'Vin rose', 'Розовое вино', 'Vin rose', 'vin-rose', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000003', 'Vin roșu', 'Красное вино', 'Vin roșu', 'vin-rosu', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000005', 'Vin spumant', 'Игристое вино', 'Vin spumant', 'vin-spumant', NULL, '10000000-0000-0000-0008-000000000001', 1),
('10000000-0000-0000-0008-000000000007', 'Țuică / rachiu', 'Цуйка / ракия', 'Țuică / rachiu', 'tuica-rachiu', NULL, '10000000-0000-0000-0008-000000000001', 1);

-- Subcategories for Băuturi non-alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0008-000000000014', 'Apă minerală locală', 'Местная минеральная вода', 'Apă minerală locală', 'apa-minerala-locala', NULL, '10000000-0000-0000-0008-000000000009', 1),
('10000000-0000-0000-0008-000000000015', 'Cvas', 'Квас', 'Cvas', 'cvas', NULL, '10000000-0000-0000-0008-000000000009', 1),
('10000000-0000-0000-0008-000000000013', 'Kombucha', 'Комбуча', 'Kombucha', 'kombucha', NULL, '10000000-0000-0000-0008-000000000009', 1),
('10000000-0000-0000-0008-000000000011', 'Nectare', 'Нектары', 'Nectare', 'nectare', NULL, '10000000-0000-0000-0008-000000000009', 1),
('10000000-0000-0000-0008-000000000012', 'Siropuri', 'Сиропы', 'Siropuri', 'siropuri', NULL, '10000000-0000-0000-0008-000000000009', 1),
('10000000-0000-0000-0008-000000000010', 'Sucuri naturale', 'Натуральные соки', 'Sucuri naturale', 'sucuri-naturale', NULL, '10000000-0000-0000-0008-000000000009', 1);

-- Subcategories for Nuci, Semințe & Produse Derivate
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0009-000000000006', 'Mixuri sănătoase', 'Здоровые смеси', 'Mixuri sănătoase', 'mixuri-sanatoase', NULL, '10000000-0000-0000-0000-000000000009', 1),
('10000000-0000-0000-0009-000000000001', 'Nuci decojite', 'Очищенные орехи', 'Nuci decojite', 'nuci-decojite', NULL, '10000000-0000-0000-0000-000000000009', 1),
('10000000-0000-0000-0009-000000000002', 'Nuci prăjite', 'Жареные орехи', 'Nuci prăjite', 'nuci-prajite', NULL, '10000000-0000-0000-0000-000000000009', 1),
('10000000-0000-0000-0009-000000000005', 'Pastă de semințe', 'Паста из семян', 'Pastă de semințe', 'pasta-seminte', NULL, '10000000-0000-0000-0000-000000000009', 1),
('10000000-0000-0000-0009-000000000003', 'Semințe', 'Семена', 'Semințe', 'seminte', NULL, '10000000-0000-0000-0000-000000000009', 1),
('10000000-0000-0000-0009-000000000004', 'Unt de nuci', 'Ореховое масло', 'Unt de nuci', 'unt-nuci', NULL, '10000000-0000-0000-0000-000000000009', 1);

-- Subcategories for Dulciuri & Gustări
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0010-000000000006', 'Batoane proteice artizanale', 'Ремесленные протеиновые батончики', 'Batoane proteice artizanale', 'batoane-proteice', NULL, '10000000-0000-0000-0000-000000000010', 1),
('10000000-0000-0000-0010-000000000002', 'Bomboane handmade', 'Конфеты ручной работы', 'Bomboane handmade', 'bomboane-handmade', NULL, '10000000-0000-0000-0000-000000000010', 1),
('10000000-0000-0000-0010-000000000001', 'Ciocolată artizanală', 'Ремесленный шоколад', 'Ciocolată artizanală', 'ciocolata-artizanala', NULL, '10000000-0000-0000-0000-000000000010', 1),
('10000000-0000-0000-0010-000000000003', 'Halva', 'Халва', 'Halva', 'halva', NULL, '10000000-0000-0000-0000-000000000010', 1),
('10000000-0000-0000-0010-000000000004', 'Produse din carob', 'Продукты из кароба', 'Produse din carob', 'produse-carob', NULL, '10000000-0000-0000-0000-000000000010', 1),
('10000000-0000-0000-0010-000000000005', 'Snacks-uri naturale', 'Натуральные снэки', 'Snacks-uri naturale', 'snacks-naturale', NULL, '10000000-0000-0000-0000-000000000010', 1);

-- Subcategories for Produse Naturale & Dietetice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0011-000000000006', 'Făinuri alternative', 'Альтернативная мука', 'Făinuri alternative', 'fainuri-alternative', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000004', 'Produse fără gluten (dietetice)', 'Безглютеновые продукты', 'Produse fără gluten (dietetice)', 'produse-fara-gluten-dietetice', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000003', 'Produse fără zahăr', 'Продукты без сахара', 'Produse fără zahăr', 'produse-fara-zahar', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000002', 'Produse raw', 'Сыроедческие продукты', 'Produse raw', 'produse-raw', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000001', 'Produse vegane', 'Веганские продукты', 'Produse vegane', 'produse-vegane', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000005', 'Superfoods', 'Суперфуды', 'Superfoods', 'superfoods', NULL, '10000000-0000-0000-0000-000000000011', 1),
('10000000-0000-0000-0011-000000000007', 'Uleiuri presate la rece', 'Масла холодного отжима', 'Uleiuri presate la rece', 'uleiuri-presate-rece', NULL, '10000000-0000-0000-0000-000000000011', 1);

-- Subcategories for Cereale & Produse de Moară
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0012-000000000006', 'Crupe', 'Крупы', 'Crupe', 'crupe', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000007', 'Fulgi', 'Хлопья', 'Fulgi', 'fulgi', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000001', 'Făină albă', 'Белая мука', 'Făină albă', 'faina-alba', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000003', 'Făină de porumb', 'Кукурузная мука', 'Făină de porumb', 'faina-porumb', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000002', 'Făină integrală', 'Цельнозерновая мука', 'Făină integrală', 'faina-integrala', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000004', 'Mălai', 'Мамалыга', 'Mălai', 'malai', NULL, '10000000-0000-0000-0000-000000000012', 1),
('10000000-0000-0000-0012-000000000005', 'Paste artizanale', 'Ремесленные макароны', 'Paste artizanale', 'paste-artizanale', NULL, '10000000-0000-0000-0000-000000000012', 1);

-- Subcategories for Ouă & Produse din Ouă
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0013-000000000002', 'Ouă bio', 'Био яйца', 'Ouă bio', 'oua-bio', NULL, '10000000-0000-0000-0000-000000000013', 1),
('10000000-0000-0000-0013-000000000001', 'Ouă de casă', 'Домашние яйца', 'Ouă de casă', 'oua-casa', NULL, '10000000-0000-0000-0000-000000000013', 1),
('10000000-0000-0000-0013-000000000003', 'Paste cu ou', 'Макароны с яйцом', 'Paste cu ou', 'paste-ou', NULL, '10000000-0000-0000-0000-000000000013', 1),
('10000000-0000-0000-0013-000000000004', 'Produse pe bază de ou', 'Продукты на основе яиц', 'Produse pe bază de ou', 'produse-baza-ou', NULL, '10000000-0000-0000-0000-000000000013', 1);

-- Subcategories for Condimente & Mixuri
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('10000000-0000-0000-0014-000000000005', 'Ceaiuri din plante', 'Травяные чаи', 'Ceaiuri din plante', 'ceaiuri-plante', NULL, '10000000-0000-0000-0000-000000000014', 1),
('10000000-0000-0000-0014-000000000001', 'Condimente uscate', 'Сушёные специи', 'Condimente uscate', 'condimente-uscate', NULL, '10000000-0000-0000-0000-000000000014', 1),
('10000000-0000-0000-0014-000000000002', 'Mixuri tradiționale', 'Традиционные смеси', 'Mixuri tradiționale', 'mixuri-traditionale', NULL, '10000000-0000-0000-0000-000000000014', 1),
('10000000-0000-0000-0014-000000000004', 'Plante medicinale', 'Лекарственные травы', 'Plante medicinale', 'plante-medicinale', NULL, '10000000-0000-0000-0000-000000000014', 1),
('10000000-0000-0000-0014-000000000003', 'Sare aromatizată', 'Ароматизированная соль', 'Sare aromatizată', 'sare-aromatizata', NULL, '10000000-0000-0000-0000-000000000014', 1);

