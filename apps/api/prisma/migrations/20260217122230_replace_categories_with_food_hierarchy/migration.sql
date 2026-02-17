-- Clear existing food product data only (preserve users and orders)
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Insert Main Categories (15 total)
-- 1. Panificație & Patiserie
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c', 'Panificație & Patiserie', 'Хлебопекарные изделия и выпечка', 'Panificație & Patiserie', 'panificatie-patiserie', NULL, NULL);

-- Subcategories for Panificație & Patiserie
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('a2d4f6b8-3c5e-4f7a-9b1d-8e2f4c6a9b3d', 'Pâine artizanală', 'Ремесленный хлеб', 'Pâine artizanală', 'paine-artizanala', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('b5e7c9d1-4a6f-5e8b-a2c4-9f3e5d7b1a4e', 'Pâine integrală / cu maia', 'Цельнозерновой хлеб / на закваске', 'Pâine integrală / cu maia', 'paine-integrala-cu-maia', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('c8f1a3e5-5b7d-6f9c-b3d5-a4f6e8c2b5f1', 'Colaci & cozonaci', 'Калачи и куличи', 'Colaci & cozonaci', 'colaci-cozonaci', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('d1e4b6c8-6c8e-7a1d-c4e6-b5d7f9a3c6e2', 'Plăcinte tradiționale', 'Традиционные пироги', 'Plăcinte tradiționale', 'placinte-traditionale', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('e4f7c9d2-7d9f-8b2e-d5f7-c6e8a1b4d7f3', 'Biscuiți & fursecuri', 'Печенье', 'Biscuiți & fursecuri', 'biscuiti-fursecuri', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('f7a1d3e6-8e1a-9c3f-e6a8-d7f9b2c5e8a4', 'Tarte & deserturi de casă', 'Торты и домашние десерты', 'Tarte & deserturi de casă', 'tarte-deserturi-casa', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c'),
('a9b2c4d7-9f2b-1d4a-f7b9-e8a1c3d6f9b5', 'Produse fără gluten', 'Безглютеновые продукты', 'Produse fără gluten', 'produse-fara-gluten', NULL, '8f3a2b4c-1e5d-4a9f-b8c7-6d2e9f4a1b3c');

-- 2. Lactate & Brânzeturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6', 'Lactate & Brânzeturi', 'Молочные продукты и сыры', 'Lactate & Brânzeturi', 'lactate-branzeturi', NULL, NULL);

-- Subcategories for Lactate & Brânzeturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('2d6f8b1e-b4d6-3f6c-b9d2-a1c4e5f8b3d7', 'Brânză de vacă', 'Коровий сыр', 'Brânză de vacă', 'branza-vaca', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('3e7a9c2f-c5e7-4a7d-c1e3-b2d5f6a9c4e8', 'Brânză de oaie', 'Овечий сыр', 'Brânză de oaie', 'branza-oaie', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('4f8b1d3a-d6f8-5b8e-d2f4-c3e6a7b1d5f9', 'Brânză de capră', 'Козий сыр', 'Brânză de capră', 'branza-capra', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('5a9c2e4b-e7a9-6c9f-e3a5-d4f7b8c2e6a1', 'Cașcaval', 'Кашкавал', 'Cașcaval', 'cascaval', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('6b1d3f5c-f8b1-7d1a-f4b6-e5a8c9d3f7b2', 'Telemea', 'Телемя', 'Telemea', 'telemea', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('7c2e4a6d-a9c2-8e2b-a5c7-f6b9d1e4a8c3', 'Iaurt natural', 'Натуральный йогурт', 'Iaurt natural', 'iaurt-natural', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('8d3f5b7e-b1d3-9f3c-b6d8-a7c1e2f5b9d4', 'Chefir', 'Кефир', 'Chefir', 'chefir', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('9e4a6c8f-c2e4-1a4d-c7e9-b8d2f3a6c1e5', 'Unt artizanal', 'Ремесленное масло', 'Unt artizanal', 'unt-artizanal', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6'),
('1f5b7d9a-d3f5-2b5e-d8f1-c9e3a4b7d2f6', 'Smântână', 'Сметана', 'Smântână', 'smantana', NULL, '1c5e7a9d-a3c5-2e5b-a8c1-f9b3d4e7a2c6');

-- 3. Carne & Produse din Carne
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7', 'Carne & Produse din Carne', 'Мясо и мясные продукты', 'Carne & Produse din Carne', 'carne-produse-carne', NULL, NULL);

-- Subcategories for Carne & Produse din Carne
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('3b7d9f2c-f5b7-4d7a-c1f3-e2a5b6d9f4c8', 'Carne proaspătă (vită, porc, pasăre)', 'Свежее мясо (говядина, свинина, птица)', 'Carne proaspătă (vită, porc, pasăre)', 'carne-proaspata', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('4c8e1a3d-a6c8-5e8b-d2a4-f3b6c7e1a5d9', 'Carne maturată', 'Выдержанное мясо', 'Carne maturată', 'carne-maturata', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('5d9f2b4e-b7d9-6f9c-e3b5-a4c7d8f2b6e1', 'Mezeluri tradiționale', 'Традиционные колбасные изделия', 'Mezeluri tradiționale', 'mezeluri-traditionale', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('6e1a3c5f-c8e1-7a1d-f4c6-b5d8e9a3c7f2', 'Cârnați artizanali', 'Ремесленные колбаски', 'Cârnați artizanali', 'carnati-artizanali', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('7f2b4d6a-d9f2-8b2e-a5d7-c6e9f1b4d8a3', 'Salamuri uscate', 'Сухие колбасы', 'Salamuri uscate', 'salamuri-uscate', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('8a3c5e7b-e1a3-9c3f-b6e8-d7f1a2c5e9b4', 'Slănină', 'Сало', 'Slănină', 'slanina', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('9b4d6f8c-f2b4-1d4a-c7f9-e8a2b3d6f1c5', 'Pateuri', 'Паштеты', 'Pateuri', 'pateuri', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7'),
('1c5e7a9d-a3c5-2e5b-d8a1-f9b3c4e7a2d6', 'Conserve din carne', 'Мясные консервы', 'Conserve din carne', 'conserve-carne', NULL, '2a6c8e1b-e4a6-3c6f-b9e2-d1f4a5c8e3b7');

-- 4. Pește & Produse din Pește
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7', 'Pește & Produse din Pește', 'Рыба и рыбные продукты', 'Pește & Produse din Pește', 'peste-produse-peste', NULL, NULL);

-- Subcategories for Pește & Produse din Pește
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('4e8a1c2f-c5e7-5a8d-d1c3-f2b5a6e9c4f8', 'Pește proaspăt', 'Свежая рыба', 'Pește proaspăt', 'peste-proaspat', NULL, '3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7'),
('5f9b2d3a-d6f8-6b9e-e2d4-a3c6b7f1d5a9', 'Pește afumat', 'Копчёная рыба', 'Pește afumat', 'peste-afumat', NULL, '3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7'),
('6a1c3e4b-e7a9-7c1f-f3e5-b4d7c8a2e6b1', 'Pește sărat', 'Солёная рыба', 'Pește sărat', 'peste-sarat', NULL, '3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7'),
('7b2d4f5c-f8b1-8d2a-a4f6-c5e8d9b3f7c2', 'Conserve din pește', 'Рыбные консервы', 'Conserve din pește', 'conserve-peste', NULL, '3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7'),
('8c3e5a6d-a9c2-9e3b-b5a7-d6f9e1c4a8d3', 'Icre', 'Икра', 'Icre', 'icre', NULL, '3d7f9b1e-b4d6-4f7c-c9b2-e1a4f5d8b3e7');

-- 5. Miere & Produse Apicole
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8', 'Miere & Produse Apicole', 'Мёд и продукты пчеловодства', 'Miere & Produse Apicole', 'miere-produse-apicole', NULL, NULL);

-- Subcategories for Miere & Produse Apicole
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('5f1b2e4a-c2e4-6a5d-e7d9-f8c1a3b6d2f9', 'Miere polifloră', 'Полифлорный мёд', 'Miere polifloră', 'miere-poliflora', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('6a2c3f5b-d3f5-7b6e-f8e1-a9d2b4c7e3a1', 'Miere de salcâm', 'Акациевый мёд', 'Miere de salcâm', 'miere-salcam', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('7b3d4a6c-e4a6-8c7f-a9f2-b1e3c5d8f4b2', 'Miere de tei', 'Липовый мёд', 'Miere de tei', 'miere-tei', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('8c4e5b7d-f5b7-9d8a-b1a3-c2f4d6e9a5c3', 'Miere de rapiță', 'Рапсовый мёд', 'Miere de rapiță', 'miere-rapita', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('9d5f6c8e-a6c8-1e9b-c2b4-d3a5e7f1b6d4', 'Fagure', 'Соты', 'Fagure', 'fagure', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('1e6a7d9f-b7d9-2f1c-d3c5-e4b6f8a2c7e5', 'Polen', 'Пыльца', 'Polen', 'polen', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('2f7b8e1a-c8e1-3a2d-e4d6-f5c7a9b3d8f6', 'Propolis', 'Прополис', 'Propolis', 'propolis', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('3a8c9f2b-d9f2-4b3e-f5e7-a6d8b1c4e9a7', 'Lăptișor de matcă', 'Маточное молочко', 'Lăptișor de matcă', 'laptisor-matca', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8'),
('4b9d1a3c-e1a3-5c4f-a6f8-b7e9c2d5f1b8', 'Mixuri apicole', 'Пчелиные смеси', 'Mixuri apicole', 'mixuri-apicole', NULL, '4e9a1d3f-b1d3-5f4c-d6c8-e7b9f2a5c1e8');

-- 6. Fructe & Legume
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9', 'Fructe & Legume', 'Фрукты и овощи', 'Fructe & Legume', 'fructe-legume', NULL, NULL);

-- Subcategories for Fructe & Legume
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('6d2f3c5e-a3c5-7e6b-c8b1-d9a2e4f7b3d1', 'Fructe proaspete', 'Свежие фрукты', 'Fructe proaspete', 'fructe-proaspete', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('7e3a4d6f-b4d6-8f7c-d9c2-e1b3f5a8c4e2', 'Legume proaspete', 'Свежие овощи', 'Legume proaspete', 'legume-proaspete', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('8f4b5e7a-c5e7-9a8d-e1d3-f2c4a6b9d5f3', 'Fructe uscate', 'Сушёные фрукты', 'Fructe uscate', 'fructe-uscate', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('9a5c6f8b-d6f8-1b9e-f2e4-a3d5b7c1e6a4', 'Legume uscate', 'Сушёные овощи', 'Legume uscate', 'legume-uscate', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('1b6d7a9c-e7a9-2c1f-a3f5-b4e6c8d2f7b5', 'Verdețuri', 'Зелень', 'Verdețuri', 'verdeturi', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('2c7e8b1d-f8b1-3d2a-b4a6-c5f7d9e3a8c6', 'Produse de sezon', 'Сезонные продукты', 'Produse de sezon', 'produse-sezon', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9'),
('3d8f9c2e-a9c2-4e3b-c5b7-d6a8e1f4b9d7', 'Produse bio certificate', 'Сертифицированные био-продукты', 'Produse bio certificate', 'produse-bio-certificate', NULL, '5c1e2b4d-f2b4-6d5a-b7a9-c8f1d3e6a2c9');

-- 7. Conserve & Murături
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8', 'Conserve & Murături', 'Консервы и соленья', 'Conserve & Murături', 'conserve-muraturi', NULL, NULL);

-- Subcategories for Conserve & Murături
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7f1b2e4a-c2e4-6a5d-e7d9-f8a1c3d6b2e9', 'Dulceață', 'Варенье', 'Dulceață', 'dulceata', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('8a2c3f5b-d3f5-7b6e-f8e1-a9b2d4e7c3f1', 'Gem', 'Джем', 'Gem', 'gem', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('9b3d4a6c-e4a6-8c7f-a9f2-b1c3e5f8d4a2', 'Zacuscă', 'Закуска', 'Zacuscă', 'zacusca', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('1c4e5b7d-f5b7-9d8a-b1a3-c2d4f6a9e5b3', 'Murături', 'Соленья', 'Murături', 'muraturi', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('2d5f6c8e-a6c8-1e9b-c2b4-d3e5a7b1f6c4', 'Suc de roșii', 'Томатный сок', 'Suc de roșii', 'suc-rosii', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('3e6a7d9f-b7d9-2f1c-d3c5-e4f6b8c2a7d5', 'Pastă de tomate', 'Томатная паста', 'Pastă de tomate', 'pasta-tomate', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('4f7b8e1a-c8e1-3a2d-e4d6-f5a7c9d3b8e6', 'Compot', 'Компот', 'Compot', 'compot', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8'),
('5a8c9f2b-d9f2-4b3e-f5e7-a6b8d1e4c9f7', 'Siropuri naturale', 'Натуральные сиропы', 'Siropuri naturale', 'siropuri-naturale', NULL, '6e9a1d3f-b1d3-5f4c-d6c8-e7f9a2b5d1e8');

-- 8. Băuturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7b9d1a3c-e1a3-5c4f-a6f8-b7c9e2f5d1a8', 'Băuturi', 'Напитки', 'Băuturi', 'bauturi', NULL, NULL);

-- Subcategories for Băuturi - Alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9', 'Băuturi alcoolice', 'Алкогольные напитки', 'Băuturi alcoolice', 'bauturi-alcoolice', NULL, '7b9d1a3c-e1a3-5c4f-a6f8-b7c9e2f5d1a8'),
('9d2f3c5e-a3c5-7e6b-c8b1-d9e2a4b7f3c1', 'Vin alb', 'Белое вино', 'Vin alb', 'vin-alb', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('1e3a4d6f-b4d6-8f7c-d9c2-e1f3b5c8a4d2', 'Vin roșu', 'Красное вино', 'Vin roșu', 'vin-rosu', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('2f4b5e7a-c5e7-9a8d-e1d3-f2a4c6d9b5e3', 'Vin rose', 'Розовое вино', 'Vin rose', 'vin-rose', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('3a5c6f8b-d6f8-1b9e-f2e4-a3b5d7e1c6f4', 'Vin spumant', 'Игристое вино', 'Vin spumant', 'vin-spumant', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('4b6d7a9c-e7a9-2c1f-a3f5-b4c6e8f2d7a5', 'Divin', 'Дивин', 'Divin', 'divin', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('5c7e8b1d-f8b1-3d2a-b4a6-c5d7f9a3e8b6', 'Țuică / rachiu', 'Цуйка / ракия', 'Țuică / rachiu', 'tuica-rachiu', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9'),
('6d8f9c2e-a9c2-4e3b-c5b7-d6e8a1b4f9c7', 'Lichioruri artizanale', 'Ремесленные ликёры', 'Lichioruri artizanale', 'lichioruri-artizanale', NULL, '8c1e2b4d-f2b4-6d5a-b7a9-c8d1f3a6e2b9');

-- Subcategories for Băuturi - Non-alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8', 'Băuturi non-alcoolice', 'Безалкогольные напитки', 'Băuturi non-alcoolice', 'bauturi-non-alcoolice', NULL, '7b9d1a3c-e1a3-5c4f-a6f8-b7c9e2f5d1a8'),
('8f1b2e4a-c2e4-6a5d-e7d9-f8a1d3c6b2e9', 'Sucuri naturale', 'Натуральные соки', 'Sucuri naturale', 'sucuri-naturale', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8'),
('9a2c3f5b-d3f5-7b6e-f8e1-a9b2e4d7c3f1', 'Nectare', 'Нектары', 'Nectare', 'nectare', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8'),
('1b3d4a6c-e4a6-8c7f-a9f2-b1c3f5e8d4a2', 'Siropuri', 'Сиропы', 'Siropuri', 'siropuri', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8'),
('2c4e5b7d-f5b7-9d8a-b1a3-c2d4a6f9e5b3', 'Kombucha', 'Комбуча', 'Kombucha', 'kombucha', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8'),
('3d5f6c8e-a6c8-1e9b-c2b4-d3e5b7a1f6c4', 'Apă minerală locală', 'Местная минеральная вода', 'Apă minerală locală', 'apa-minerala-locala', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8'),
('4e6a7d9f-b7d9-2f1c-d3c5-e4f6c8b2a7d5', 'Cvas', 'Квас', 'Cvas', 'cvas', NULL, '7e9a1d3f-b1d3-5f4c-d6c8-e7f9b2c5a1d8');

-- 9. Nuci, Semințe & Produse Derivate
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6', 'Nuci, Semințe & Produse Derivate', 'Орехи, семена и продукты из них', 'Nuci, Semințe & Produse Derivate', 'nuci-seminte-produse', NULL, NULL);

-- Subcategories for Nuci, Semințe & Produse Derivate
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('9a8c1f2b-d9f2-7b3e-f5e7-a6b8e1d4c9f7', 'Nuci decojite', 'Очищенные орехи', 'Nuci decojite', 'nuci-decojite', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6'),
('1b9d2a3c-e1a3-8c4f-a6f8-b7c9f2e5d1a8', 'Nuci prăjite', 'Жареные орехи', 'Nuci prăjite', 'nuci-prajite', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6'),
('2c1e3b4d-f2b4-9d5a-b7a9-c8d1a3f6e2b9', 'Semințe', 'Семена', 'Semințe', 'seminte', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6'),
('3d2f4c5e-a3c5-1e6b-c8b1-d9e2b4a7f3c1', 'Unt de nuci', 'Ореховое масло', 'Unt de nuci', 'unt-nuci', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6'),
('4e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2', 'Pastă de semințe', 'Паста из семян', 'Pastă de semințe', 'pasta-seminte', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6'),
('5f4b6e7a-c5e7-3a8d-e1d3-f2a4d6c9b5e3', 'Mixuri sănătoase', 'Здоровые смеси', 'Mixuri sănătoase', 'mixuri-sanatoase', NULL, '8f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6');

-- 10. Dulciuri & Gustări
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4', 'Dulciuri & Gustări', 'Сладости и закуски', 'Dulciuri & Gustări', 'dulciuri-gustari', NULL, NULL);

-- Subcategories for Dulciuri & Gustări
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('1b6d8a9c-e7a9-5c1f-a3f5-b4c6f8e2d7a5', 'Ciocolată artizanală', 'Ремесленный шоколад', 'Ciocolată artizanală', 'ciocolata-artizanala', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4'),
('2c7e9b1d-f8b1-6d2a-b4a6-c5d7a9f3e8b6', 'Bomboane handmade', 'Конфеты ручной работы', 'Bomboane handmade', 'bomboane-handmade', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4'),
('3d8f1c2e-a9c2-7e3b-c5b7-d6e8b1a4f9c7', 'Halva', 'Халва', 'Halva', 'halva', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4'),
('4e9a2d3f-b1d3-8f4c-d6c8-e7f9c2b5a1d8', 'Produse din carob', 'Продукты из кароба', 'Produse din carob', 'produse-carob', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4'),
('5f1b3e4a-c2e4-9a5d-e7d9-f8a1d3c6b2e9', 'Snacks-uri naturale', 'Натуральные снэки', 'Snacks-uri naturale', 'snacks-naturale', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4'),
('6a2c4f5b-d3f5-1b6e-f8e1-a9b2e4d7c3f1', 'Batoane proteice artizanale', 'Ремесленные протеиновые батончики', 'Batoane proteice artizanale', 'batoane-proteice', NULL, '9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4');

-- 11. Produse Naturale & Dietetice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2', 'Produse Naturale & Dietetice', 'Натуральные и диетические продукты', 'Produse Naturale & Dietetice', 'produse-naturale-dietetice', NULL, NULL);

-- Subcategories for Produse Naturale & Dietetice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('8c4e6b7d-f5b7-3d8a-b1a3-c2d4f6a9e5b3', 'Produse vegane', 'Веганские продукты', 'Produse vegane', 'produse-vegane', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('9d5f7c8e-a6c8-4e9b-c2b4-d3e5a7b1f6c4', 'Produse raw', 'Сыроедческие продукты', 'Produse raw', 'produse-raw', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('1e6a8d9f-b7d9-5f1c-d3c5-e4f6b8c2a7d5', 'Produse fără zahăr', 'Продукты без сахара', 'Produse fără zahăr', 'produse-fara-zahar', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('2f7b9e1a-c8e1-6a2d-e4d6-f5a7c9d3b8e6', 'Produse fără gluten (dietetice)', 'Безглютеновые продукты (диетические)', 'Produse fără gluten (dietetice)', 'produse-fara-gluten-diet', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('3a8c1f2b-d9f2-7b3e-f5e7-a6b8d1e4c9f7', 'Superfoods', 'Суперфуды', 'Superfoods', 'superfoods', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('4b9d2a3c-e1a3-8c4f-a6f8-b7c9e2f5d1a8', 'Făinuri alternative', 'Альтернативная мука', 'Făinuri alternative', 'fainuri-alternative', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2'),
('5c1e3b4d-f2b4-9d5a-b7a9-c8d1f3a6e2b9', 'Uleiuri presate la rece', 'Масла холодного отжима', 'Uleiuri presate la rece', 'uleiuri-presate-rece', NULL, '7b3d5a6c-e4a6-2c7f-a9f2-b1c3f5e8d4a2');

-- 12. Cereale & Produse de Moară
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1', 'Cereale & Produse de Moară', 'Зерновые и мукомольные продукты', 'Cereale & Produse de Moară', 'cereale-produse-moara', NULL, NULL);

-- Subcategories for Cereale & Produse de Moară
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7e3a5d6f-b4d6-2f7c-d9c2-e1f3b5c8a4d2', 'Făină albă', 'Белая мука', 'Făină albă', 'faina-alba', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('8f4b6e7a-c5e7-3a8d-e1d3-f2a4c6d9b5e3', 'Făină integrală', 'Цельнозерновая мука', 'Făină integrală', 'faina-integrala', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('9a5c7f8b-d6f8-4b9e-f2e4-a3b5d7e1c6f4', 'Făină de porumb', 'Кукурузная мука', 'Făină de porumb', 'faina-porumb', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('1b6d8a9c-e7a9-5c1f-a3f5-b4c6e8f2d7a5', 'Mălai', 'Мамалыга', 'Mălai', 'malai', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('2c7e9b1d-f8b1-6d2a-b4a6-c5d7f9a3e8b6', 'Paste artizanale', 'Ремесленные макароны', 'Paste artizanale', 'paste-artizanale', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('3d8f1c2e-a9c2-7e3b-c5b7-d6e8a1b4f9c7', 'Crupe', 'Крупы', 'Crupe', 'crupe', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1'),
('4e9a2d3f-b1d3-8f4c-d6c8-e7f9b2c5a1d8', 'Fulgi', 'Хлопья', 'Fulgi', 'fulgi', NULL, '6d2f4c5e-a3c5-1e6b-c8b1-d9e2a4b7f3c1');

-- 13. Ouă & Produse din Ouă
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('5f1b3e4a-c2e4-9a5d-e7d9-f8a1c3d6b2e9', 'Ouă & Produse din Ouă', 'Яйца и яичные продукты', 'Ouă & Produse din Ouă', 'oua-produse-oua', NULL, NULL);

-- Subcategories for Ouă & Produse din Ouă
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('6a2c4f5b-d3f5-1b6e-f8e1-a9b2d4e7c3f1', 'Ouă de casă', 'Домашние яйца', 'Ouă de casă', 'oua-casa', NULL, '5f1b3e4a-c2e4-9a5d-e7d9-f8a1c3d6b2e9'),
('7b3d5a6c-e4a6-2c7f-a9f2-b1c3e5f8d4a2', 'Ouă bio', 'Био яйца', 'Ouă bio', 'oua-bio', NULL, '5f1b3e4a-c2e4-9a5d-e7d9-f8a1c3d6b2e9'),
('8c4e6b7d-f5b7-3d8a-b1a3-c2d4f6a9e5b3', 'Paste cu ou', 'Макароны с яйцом', 'Paste cu ou', 'paste-ou', NULL, '5f1b3e4a-c2e4-9a5d-e7d9-f8a1c3d6b2e9'),
('9d5f7c8e-a6c8-4e9b-c2b4-d3e5a7b1f6c4', 'Produse pe bază de ou', 'Продукты на основе яиц', 'Produse pe bază de ou', 'produse-baza-ou', NULL, '5f1b3e4a-c2e4-9a5d-e7d9-f8a1c3d6b2e9');

-- 14. Condimente & Mixuri
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5', 'Condimente & Mixuri', 'Специи и пряности', 'Condimente & Mixuri', 'condimente-mixuri', NULL, NULL);

-- Subcategories for Condimente & Mixuri
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('2f7b9e1a-c8e1-6a2d-e4d6-f5a7d9c3b8e6', 'Condimente uscate', 'Сушёные специи', 'Condimente uscate', 'condimente-uscate', NULL, '1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5'),
('3a8c1f2b-d9f2-7b3e-f5e7-a6b8e1d4c9f7', 'Mixuri tradiționale', 'Традиционные смеси', 'Mixuri tradiționale', 'mixuri-traditionale', NULL, '1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5'),
('4b9d2a3c-e1a3-8c4f-a6f8-b7c9f2e5d1a8', 'Sare aromatizată', 'Ароматизированная соль', 'Sare aromatizată', 'sare-aromatizata', NULL, '1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5'),
('5c1e3b4d-f2b4-9d5a-b7a9-c8d1a3f6e2b9', 'Plante medicinale', 'Лекарственные травы', 'Plante medicinale', 'plante-medicinale', NULL, '1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5'),
('6d2f4c5e-a3c5-1e6b-c8b1-d9e2b4a7f3c1', 'Ceaiuri din plante', 'Травяные чаи', 'Ceaiuri din plante', 'ceaiuri-plante', NULL, '1e6a8d9f-b7d9-5f1c-d3c5-e4f6c8b2a7d5');

-- 15. Pachete Alimentare
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('7e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2', 'Pachete Alimentare', 'Продуктовые наборы', 'Pachete Alimentare', 'pachete-alimentare', NULL, NULL);

-- Subcategories for Pachete Alimentare
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('8f4b6e7a-c5e7-3a8d-e1d3-f2a4d6c9b5e3', 'Coșuri tradiționale', 'Традиционные корзины', 'Coșuri tradiționale', 'cosuri-traditionale', NULL, '7e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2'),
('9a5c7f8b-d6f8-4b9e-f2e4-a3b5e7d1c6f4', 'Pachete de sezon', 'Сезонные наборы', 'Pachete de sezon', 'pachete-sezon', NULL, '7e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2'),
('1b6d8a9c-e7a9-5c1f-a3f5-b4c6f8e2d7a5', 'Seturi degustare', 'Дегустационные наборы', 'Seturi degustare', 'seturi-degustare', NULL, '7e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2'),
('2c7e9b1d-f8b1-6d2a-b4a6-c5d7a9f3e8b6', 'Pachete corporate', 'Корпоративные наборы', 'Pachete corporate', 'pachete-corporate', NULL, '7e3a5d6f-b4d6-2f7c-d9c2-e1f3c5b8a4d2');
