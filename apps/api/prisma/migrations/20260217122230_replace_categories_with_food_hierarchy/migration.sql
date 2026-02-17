-- Category seed data for bun-bun marketplace
-- Auto-generated from local database export
-- Total: 117 categories (14 main + 103 subcategories)
-- Generated on: 2026-02-17

-- Clear existing data (in correct order to avoid FK violations)
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;
-- Add rating column first (will be made idempotent in later migration)
ALTER TABLE "categories" ADD COLUMN "rating" INTEGER NOT NULL DEFAULT 1;

-- Main Categories (with images)
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('2e5064b1-993c-4f4e-b748-cf7ef48d36a9', 'Băuturi', 'Напитки', 'Băuturi', 'bauturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/2e5064b1-993c-4f4e-b748-cf7ef48d36a9/8c349779-846f-410f-ae5c-775ca11f20d5.png', NULL, 1),
('426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 'Carne & Produse din Carne', 'Мясо и мясные продукты', 'Carne & Produse din Carne', 'carne-produse-carne', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/426c26d9-4ae2-45d0-aba9-6876bb89e4d3/3c092026-53e9-45b9-82b7-55d893b3bab4.png', NULL, 98),
('e63f7076-70d5-4826-8ea9-22734b390ffe', 'Cereale & Produse de Moară', 'Зерновые и мукомольные продукты', 'Cereale & Produse de Moară', 'cereale-produse-moara', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/e63f7076-70d5-4826-8ea9-22734b390ffe/59a8f575-c656-4048-9480-1f414fdf2659.png', NULL, 1),
('79c48e38-f7a6-4c4d-8645-fc35aedb913a', 'Condimente & Mixuri', 'Специи и пряности', 'Condimente & Mixuri', 'condimente-mixuri', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/79c48e38-f7a6-4c4d-8645-fc35aedb913a/ce40ab1a-c9f5-4124-8d0f-306cb3565b71.png', NULL, 1),
('1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 'Conserve & Murături', 'Консервы и соленья', 'Conserve & Murături', 'conserve-muraturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7/7c691159-9055-4431-9beb-517a5b4d65ed.png', NULL, 95),
('a7cf5a12-5bc5-4b56-a859-355973351da7', 'Dulciuri & Gustări', 'Сладости и закуски', 'Dulciuri & Gustări', 'dulciuri-gustari', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/a7cf5a12-5bc5-4b56-a859-355973351da7/74d654ea-9c3e-412b-aabe-6de80dcd7eb9.png', NULL, 1),
('e17caaa4-27a8-448d-8585-3eedd2b4f082', 'Fructe & Legume', 'Фрукты и овощи', 'Fructe & Legume', 'fructe-legume', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/e17caaa4-27a8-448d-8585-3eedd2b4f082/fbeb66d5-1c48-4cf7-85fb-a8b5d5dea5a3.png', NULL, 100),
('2713bb84-2f50-4011-af3d-9e3b60d42d20', 'Lactate & Brânzeturi', 'Молочные продукты и сыры', 'Lactate & Brânzeturi', 'lactate-branzeturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/2713bb84-2f50-4011-af3d-9e3b60d42d20/00b8b96f-efd5-4663-85e2-c72f6b7b12a7.png', NULL, 99),
('ef34831a-46b0-4504-bc90-96bd9c5a065c', 'Miere & Produse Apicole', 'Мёд и продукты пчеловодства', 'Miere & Produse Apicole', 'miere-produse-apicole', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/ef34831a-46b0-4504-bc90-96bd9c5a065c/7f5bf79a-39d4-4675-ae58-2019176114d5.png', NULL, 97),
('ef1ef081-1b20-4291-b95f-f64a528044a2', 'Nuci, Semințe & Produse Derivate', 'Орехи, семена и продукты из них', 'Nuci, Semințe & Produse Derivate', 'nuci-seminte-produse', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/ef1ef081-1b20-4291-b95f-f64a528044a2/6c9faf96-6348-445d-8169-a0ce496dbb5e.png', NULL, 93),
('5a70b47e-8003-45f0-b740-db6ed8754a95', 'Ouă & Produse din Ouă', 'Яйца и яичные продукты', 'Ouă & Produse din Ouă', 'oua-produse-oua', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/5a70b47e-8003-45f0-b740-db6ed8754a95/811a0233-7258-4273-891a-8e651153ccaa.png', NULL, 96),
('0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 'Panificație & Patiserie', 'Хлебопекарные изделия и выпечка', 'Panificație & Patiserie', 'panificatie-patiserie', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/0b4c0ff2-1265-4bb2-ac9d-8d306844c77e/5ce2ac64-2a2c-4827-984e-0f4c6ce015f2.png', NULL, 94),
('b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 'Pește & Produse din Pește', 'Рыба и рыбные продукты', 'Pește & Produse din Pește', 'peste-produse-peste', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/b3990796-d0f4-4fc5-a07d-d4a4ef069e16/12851236-5485-498c-b516-0ccfa01f9867.png', NULL, 1),
('37f5d7f0-77a7-4298-9439-52e33f206782', 'Produse Naturale & Dietetice', 'Натуральные и диетические продукты', 'Produse Naturale & Dietetice', 'produse-naturale-dietetice', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/37f5d7f0-77a7-4298-9439-52e33f206782/0a0cb76d-2380-459d-9491-32e9e3e9088f.png', NULL, 1);

-- Subcategories for Panificație & Patiserie
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('3be1c501-0eca-4208-b1a3-b571f6085072', 'Biscuiți & fursecuri', 'Печенье', 'Biscuiți & fursecuri', 'biscuiti-fursecuri', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('59c39cae-946c-4a82-aaca-66593b661e4f', 'Colaci & cozonaci', 'Калачи и куличи', 'Colaci & cozonaci', 'colaci-cozonaci', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('c78729f1-039f-4fc7-9d18-6e28d2317860', 'Plăcinte tradiționale', 'Традиционные пироги', 'Plăcinte tradiționale', 'placinte-traditionale', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('e81a8da4-84d0-48ad-8169-ff64294f701f', 'Produse fără gluten', 'Безглютеновые продукты', 'Produse fără gluten', 'produse-fara-gluten', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('2273d337-40a1-4a02-9789-631179dfac8b', 'Pâine artizanală', 'Ремесленный хлеб', 'Pâine artizanală', 'paine-artizanala', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('94a34429-e0b2-434a-a55c-db08f179f568', 'Pâine integrală / cu maia', 'Цельнозерновой хлеб / на закваске', 'Pâine integrală / cu maia', 'paine-integrala-cu-maia', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1),
('ec29fa6c-0125-4b66-8464-10669852920f', 'Tarte & deserturi de casă', 'Торты и домашние десерты', 'Tarte & deserturi de casă', 'tarte-deserturi-casa', NULL, '0b4c0ff2-1265-4bb2-ac9d-8d306844c77e', 1);

-- Subcategories for Lactate & Brânzeturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('7336f21c-7193-4fb6-9b3c-713c0bc95832', 'Brânză de capră', 'Козий сыр', 'Brânză de capră', 'branza-capra', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('3d800493-3591-419f-b786-f9fb1c417b80', 'Brânză de oaie', 'Овечий сыр', 'Brânză de oaie', 'branza-oaie', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('0defb256-ac6d-4021-b40f-10db4ba78ba4', 'Brânză de vacă', 'Коровий сыр', 'Brânză de vacă', 'branza-vaca', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('36e7ed0c-f7a3-419e-86bd-09eed63f513d', 'Cașcaval', 'Кашкавал', 'Cașcaval', 'cascaval', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('20b0fa27-f243-4117-b27d-03669f7eb7fa', 'Chefir', 'Кефир', 'Chefir', 'chefir', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('6d98c727-676a-4abe-9889-19ea9a448adb', 'Iaurt natural', 'Натуральный йогурт', 'Iaurt natural', 'iaurt-natural', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('11bd1f56-9ed5-4e41-9cb0-c5665480ff2d', 'Smântână', 'Сметана', 'Smântână', 'smantana', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('4b8820a8-673e-4059-8eda-02245c31a37d', 'Telemea', 'Телемя', 'Telemea', 'telemea', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1),
('96bae7bb-e1e1-442c-b9eb-24bee48aa71b', 'Unt artizanal', 'Ремесленное масло', 'Unt artizanal', 'unt-artizanal', NULL, '2713bb84-2f50-4011-af3d-9e3b60d42d20', 1);

-- Subcategories for Carne & Produse din Carne
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('1c370ec3-9b26-4a80-be8c-291c3d91599e', 'Cârnați artizanali', 'Ремесленные колбаски', 'Cârnați artizanali', 'carnati-artizanali', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('4141008e-0366-46ea-9dd4-9cb6690ed12b', 'Carne maturată', 'Выдержанное мясо', 'Carne maturată', 'carne-maturata', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('5c54ab24-705f-4249-a86a-56d8b916b479', 'Carne proaspătă (vită, porc, pasăre)', 'Свежее мясо (говядина, свинина, птица)', 'Carne proaspătă (vită, porc, pasăre)', 'carne-proaspata', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('fdc6f030-5991-4a2c-b4db-791a0b17dd78', 'Conserve din carne', 'Мясные консервы', 'Conserve din carne', 'conserve-carne', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('efe585fa-7e08-4a58-a9af-0073dae817c5', 'Mezeluri tradiționale', 'Традиционные колбасные изделия', 'Mezeluri tradiționale', 'mezeluri-traditionale', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('979e6e27-93af-4e46-aee7-481762e1f743', 'Pateuri', 'Паштеты', 'Pateuri', 'pateuri', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('5c6e81b5-cc74-4e3f-a297-39c93739eaed', 'Salamuri uscate', 'Сухие колбасы', 'Salamuri uscate', 'salamuri-uscate', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1),
('c175704c-a305-4345-aa9c-1a37843139d9', 'Slănină', 'Сало', 'Slănină', 'slanina', NULL, '426c26d9-4ae2-45d0-aba9-6876bb89e4d3', 1);

-- Subcategories for Pește & Produse din Pește
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('690cbd38-a83c-4b76-b05b-0a0d590f4a68', 'Conserve din pește', 'Рыбные консервы', 'Conserve din pește', 'conserve-peste', NULL, 'b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 1),
('ce48de13-237f-4906-aef2-72c13f749a93', 'Icre', 'Икра', 'Icre', 'icre', NULL, 'b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 1),
('a28fd092-1e70-437d-a144-e7b46e12bfbd', 'Pește afumat', 'Копчёная рыба', 'Pește afumat', 'peste-afumat', NULL, 'b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 1),
('a4727b80-c6d1-41b6-bb15-4d1ad2472b53', 'Pește proaspăt', 'Свежая рыба', 'Pește proaspăt', 'peste-proaspat', NULL, 'b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 1),
('c57b7821-0467-4932-a74f-9a5d1bca89b4', 'Pește sărat', 'Солёная рыба', 'Pește sărat', 'peste-sarat', NULL, 'b3990796-d0f4-4fc5-a07d-d4a4ef069e16', 1);

-- Subcategories for Miere & Produse Apicole
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('231c66a0-2409-4656-a5f1-0d82d2a8bf8b', 'Fagure', 'Соты', 'Fagure', 'fagure', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('4147d4ff-b05f-4e09-acab-dfd458318d9b', 'Lăptișor de matcă', 'Маточное молочко', 'Lăptișor de matcă', 'laptisor-matca', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('0de594a9-bf42-453a-be3f-901a501fe3eb', 'Miere de rapiță', 'Рапсовый мёд', 'Miere de rapiță', 'miere-rapita', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('805cd0f1-898c-4e6d-b1bb-fab462f954dd', 'Miere de salcâm', 'Акациевый мёд', 'Miere de salcâm', 'miere-salcam', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('79088cca-dfcb-43ff-8da6-90bbccee9357', 'Miere de tei', 'Липовый мёд', 'Miere de tei', 'miere-tei', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('939d4596-8482-4266-a5b2-f27152581013', 'Miere polifloră', 'Полифлорный мёд', 'Miere polifloră', 'miere-poliflora', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('f29c43d0-45fd-4979-bff8-4a70199abbba', 'Mixuri apicole', 'Пчелиные смеси', 'Mixuri apicole', 'mixuri-apicole', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('fc4a0ed9-a0e4-4f9b-85a9-77856e3bdb62', 'Polen', 'Пыльца', 'Polen', 'polen', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1),
('223f1589-1d32-4819-a3fd-387fb82d1b4a', 'Propolis', 'Прополис', 'Propolis', 'propolis', NULL, 'ef34831a-46b0-4504-bc90-96bd9c5a065c', 1);

-- Subcategories for Fructe & Legume
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('b68959a8-d58b-481e-a6f3-5ffbf439da26', 'Fructe proaspete', 'Свежие фрукты', 'Fructe proaspete', 'fructe-proaspete', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('90c8ce31-6422-4acc-9b5a-a4c75bcff012', 'Fructe uscate', 'Сушёные фрукты', 'Fructe uscate', 'fructe-uscate', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('3c3823fc-2a30-4e51-9bd5-b605d34f6783', 'Legume proaspete', 'Свежие овощи', 'Legume proaspete', 'legume-proaspete', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('40d4d029-a732-4cfd-9080-0f1c13fe7d19', 'Legume uscate', 'Сушёные овощи', 'Legume uscate', 'legume-uscate', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('c4414427-b975-480a-9327-cc6ec93d0354', 'Produse bio certificate', 'Сертифицированные био-продукты', 'Produse bio certificate', 'produse-bio-certificate', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('23f84269-0f5b-4a0f-b717-0b4c13ae6a86', 'Produse de sezon', 'Сезонные продукты', 'Produse de sezon', 'produse-sezon', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1),
('8c91f081-fee7-4596-b56d-9620a1fbaae6', 'Verdețuri', 'Зелень', 'Verdețuri', 'verdeturi', NULL, 'e17caaa4-27a8-448d-8585-3eedd2b4f082', 1);

-- Subcategories for Conserve & Murături
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('9c931116-c56d-4443-864a-b6f21db1c536', 'Compot', 'Компот', 'Compot', 'compot', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('9797c270-ec7a-4203-b853-247ca808bb57', 'Dulceață', 'Варенье', 'Dulceață', 'dulceata', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('c85ff054-2d75-4add-8f47-b3af6c57cc34', 'Gem', 'Джем', 'Gem', 'gem', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('0c291dd6-6bb8-41d5-8639-96d9d2d7756a', 'Murături', 'Соленья', 'Murături', 'muraturi', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('ea963941-5f4e-4e54-9fc5-e78bd4a74313', 'Pastă de tomate', 'Томатная паста', 'Pastă de tomate', 'pasta-tomate', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('a0ed4410-f023-427d-b22f-8e2353a2af09', 'Siropuri naturale', 'Натуральные сиропы', 'Siropuri naturale', 'siropuri-naturale', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('63ae91e6-2062-446b-b25e-0a69515a9004', 'Suc de roșii', 'Томатный сок', 'Suc de roșii', 'suc-rosii', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1),
('5a52c6f2-0d3c-448c-92b8-f883f4d4c43e', 'Zacuscă', 'Закуска', 'Zacuscă', 'zacusca', NULL, '1ab48b7b-ffeb-4910-8cf1-1fedc31ea0e7', 1);

-- Subcategories for Băuturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 'Băuturi alcoolice', 'Алкогольные напитки', 'Băuturi alcoolice', 'bauturi-alcoolice', NULL, '2e5064b1-993c-4f4e-b748-cf7ef48d36a9', 1),
('898ed146-756a-430e-82ed-6410e199b8ec', 'Băuturi non-alcoolice', 'Безалкогольные напитки', 'Băuturi non-alcoolice', 'bauturi-non-alcoolice', NULL, '2e5064b1-993c-4f4e-b748-cf7ef48d36a9', 1);

-- Subcategories for Băuturi alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('264d40c9-95f6-41f9-8d85-0e78503f394b', 'Divin', 'Дивин', 'Divin', 'divin', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('b2f30c3c-4e8b-4f09-8405-61e37b9ab7ce', 'Lichioruri artizanale', 'Ремесленные ликёры', 'Lichioruri artizanale', 'lichioruri-artizanale', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('897e96c4-6f3d-43e0-a1f9-7ddc5f754efa', 'Vin alb', 'Белое вино', 'Vin alb', 'vin-alb', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('7298ad92-20f7-4bfb-aaab-eca47c937b7e', 'Vin rose', 'Розовое вино', 'Vin rose', 'vin-rose', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('015bece7-cc76-4010-944e-33b886e809ad', 'Vin roșu', 'Красное вино', 'Vin roșu', 'vin-rosu', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('3cba16ec-2bc2-42d5-82d9-d056446cc144', 'Vin spumant', 'Игристое вино', 'Vin spumant', 'vin-spumant', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1),
('44e46109-4d6a-41c6-9c73-cc383913b97b', 'Țuică / rachiu', 'Цуйка / ракия', 'Țuică / rachiu', 'tuica-rachiu', NULL, 'b308dcc1-a36f-4f1f-bd5c-81406aca0feb', 1);

-- Subcategories for Băuturi non-alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('64138690-2c75-4cf2-a18a-38b3898084c0', 'Apă minerală locală', 'Местная минеральная вода', 'Apă minerală locală', 'apa-minerala-locala', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1),
('2771783c-427f-48be-9f8a-62c584fe1016', 'Cvas', 'Квас', 'Cvas', 'cvas', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1),
('9e368bda-e361-44dc-8429-ec8ac1e0fd0e', 'Kombucha', 'Комбуча', 'Kombucha', 'kombucha', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1),
('78efad8b-eb70-463c-9f32-a750472e6b31', 'Nectare', 'Нектары', 'Nectare', 'nectare', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1),
('77f68866-d97f-49d6-a435-380ebf456d7b', 'Siropuri', 'Сиропы', 'Siropuri', 'siropuri', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1),
('002fb9b9-8f66-4837-92bc-9e0bfd328e57', 'Sucuri naturale', 'Натуральные соки', 'Sucuri naturale', 'sucuri-naturale', NULL, '898ed146-756a-430e-82ed-6410e199b8ec', 1);

-- Subcategories for Nuci, Semințe & Produse Derivate
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('699ebfa2-7532-4660-b43b-1be869803dea', 'Mixuri sănătoase', 'Здоровые смеси', 'Mixuri sănătoase', 'mixuri-sanatoase', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1),
('7f5b97e3-3f25-4d79-a083-e8b6d68d018e', 'Nuci decojite', 'Очищенные орехи', 'Nuci decojite', 'nuci-decojite', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1),
('1758cb0c-0ef0-46f6-bc07-11d38be6fddd', 'Nuci prăjite', 'Жареные орехи', 'Nuci prăjite', 'nuci-prajite', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1),
('aecab5cf-2f60-438f-83a5-7d2311ab56b5', 'Pastă de semințe', 'Паста из семян', 'Pastă de semințe', 'pasta-seminte', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1),
('08cfdf49-a3d4-4b78-b61c-b283bfaafbf2', 'Semințe', 'Семена', 'Semințe', 'seminte', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1),
('23e7c79a-65c1-4f09-9466-d2969d829af8', 'Unt de nuci', 'Ореховое масло', 'Unt de nuci', 'unt-nuci', NULL, 'ef1ef081-1b20-4291-b95f-f64a528044a2', 1);

-- Subcategories for Dulciuri & Gustări
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('8fc4efd5-1624-4a76-bb6f-e54c37df89c5', 'Batoane proteice artizanale', 'Ремесленные протеиновые батончики', 'Batoane proteice artizanale', 'batoane-proteice', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1),
('c953c8dc-e7eb-4e2f-b2c9-d1d0d13e4ce6', 'Bomboane handmade', 'Конфеты ручной работы', 'Bomboane handmade', 'bomboane-handmade', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1),
('1fccb8dc-c668-4fd9-9cc8-f0ad045a2035', 'Ciocolată artizanală', 'Ремесленный шоколад', 'Ciocolată artizanală', 'ciocolata-artizanala', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1),
('4f92bd55-cb19-4b47-a947-17ee4e35ac50', 'Halva', 'Халва', 'Halva', 'halva', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1),
('017f592e-3778-4c01-b78e-cb94e9b6c0c5', 'Produse din carob', 'Продукты из кароба', 'Produse din carob', 'produse-carob', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1),
('2dc97237-aba4-42f5-bd99-0ccb9c7724e4', 'Snacks-uri naturale', 'Натуральные снэки', 'Snacks-uri naturale', 'snacks-naturale', NULL, 'a7cf5a12-5bc5-4b56-a859-355973351da7', 1);

-- Subcategories for Produse Naturale & Dietetice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('5f8e9ee1-57c4-4a69-835b-a9497aaffce5', 'Făinuri alternative', 'Альтернативная мука', 'Făinuri alternative', 'fainuri-alternative', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('1af30ea9-bce9-4326-9b3b-faeedea5a230', 'Produse fără gluten (dietetice)', 'Безглютеновые продукты', 'Produse fără gluten (dietetice)', 'produse-fara-gluten-dietetice', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('415f52c1-010c-4240-bb3d-3d530db64fde', 'Produse fără zahăr', 'Продукты без сахара', 'Produse fără zahăr', 'produse-fara-zahar', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('3e0a7afc-879a-40fa-9a3a-85ad5df9fcfd', 'Produse raw', 'Сыроедческие продукты', 'Produse raw', 'produse-raw', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('7726960a-319a-4336-9b80-10df31d52f8e', 'Produse vegane', 'Веганские продукты', 'Produse vegane', 'produse-vegane', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('9e5a6e6d-2c44-4aee-b085-134794b6cbe2', 'Superfoods', 'Суперфуды', 'Superfoods', 'superfoods', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1),
('4119caba-fed2-4785-b42d-66ceefe15c04', 'Uleiuri presate la rece', 'Масла холодного отжима', 'Uleiuri presate la rece', 'uleiuri-presate-rece', NULL, '37f5d7f0-77a7-4298-9439-52e33f206782', 1);

-- Subcategories for Cereale & Produse de Moară
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('ed9d2bbc-fe03-43f7-8051-86e16683a2a2', 'Crupe', 'Крупы', 'Crupe', 'crupe', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('cfeea8f7-e03a-442f-8ed3-5d55e792099d', 'Fulgi', 'Хлопья', 'Fulgi', 'fulgi', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('1f77edc9-d3df-4c26-a363-9d9fbcbda98a', 'Făină albă', 'Белая мука', 'Făină albă', 'faina-alba', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('57a48860-1d54-4b89-ab74-8f5ee308171d', 'Făină de porumb', 'Кукурузная мука', 'Făină de porumb', 'faina-porumb', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('add3bc2e-7202-4e8c-943a-59effce2c1f8', 'Făină integrală', 'Цельнозерновая мука', 'Făină integrală', 'faina-integrala', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('26d7665d-7eaa-4c1e-8cfe-d3bb039fcce3', 'Mălai', 'Мамалыга', 'Mălai', 'malai', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1),
('0d7e1e41-6052-4c83-8fe9-98338abd71b5', 'Paste artizanale', 'Ремесленные макароны', 'Paste artizanale', 'paste-artizanale', NULL, 'e63f7076-70d5-4826-8ea9-22734b390ffe', 1);

-- Subcategories for Ouă & Produse din Ouă
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('3d34105d-e5a8-4c74-afb8-afaeb43f0cd9', 'Ouă bio', 'Био яйца', 'Ouă bio', 'oua-bio', NULL, '5a70b47e-8003-45f0-b740-db6ed8754a95', 1),
('873ac82d-75fa-42c2-94b5-a6c9cf04f8a0', 'Ouă de casă', 'Домашние яйца', 'Ouă de casă', 'oua-casa', NULL, '5a70b47e-8003-45f0-b740-db6ed8754a95', 1),
('2f3c6f5b-4125-4dec-980b-15769ab13bd2', 'Paste cu ou', 'Макароны с яйцом', 'Paste cu ou', 'paste-ou', NULL, '5a70b47e-8003-45f0-b740-db6ed8754a95', 1),
('219d45ea-3490-4c88-bfea-f29429e9be71', 'Produse pe bază de ou', 'Продукты на основе яиц', 'Produse pe bază de ou', 'produse-baza-ou', NULL, '5a70b47e-8003-45f0-b740-db6ed8754a95', 1);

-- Subcategories for Condimente & Mixuri
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES
('b0e1d2ab-6ac2-48d1-a0c0-f2f9cf67d22e', 'Ceaiuri din plante', 'Травяные чаи', 'Ceaiuri din plante', 'ceaiuri-plante', NULL, '79c48e38-f7a6-4c4d-8645-fc35aedb913a', 1),
('4a5afa15-cf5c-44bb-b451-4cae3c8779a8', 'Condimente uscate', 'Сушёные специи', 'Condimente uscate', 'condimente-uscate', NULL, '79c48e38-f7a6-4c4d-8645-fc35aedb913a', 1),
('02c2d30c-630f-4465-b2c7-54f61acf0893', 'Mixuri tradiționale', 'Традиционные смеси', 'Mixuri tradiționale', 'mixuri-traditionale', NULL, '79c48e38-f7a6-4c4d-8645-fc35aedb913a', 1),
('65d0a445-f702-4f89-95f1-7386c826c5b1', 'Plante medicinale', 'Лекарственные травы', 'Plante medicinale', 'plante-medicinale', NULL, '79c48e38-f7a6-4c4d-8645-fc35aedb913a', 1),
('a9b12161-6863-4b45-9758-72c23e775bd4', 'Sare aromatizată', 'Ароматизированная соль', 'Sare aromatizată', 'sare-aromatizata', NULL, '79c48e38-f7a6-4c4d-8645-fc35aedb913a', 1);

