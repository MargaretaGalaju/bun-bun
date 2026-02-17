-- Category seed data for bun-bun marketplace
-- Auto-generated from local database export
-- Total: 117 categories (14 main + 103 subcategories)
-- Generated on: 2026-02-17

-- Clear existing data (in correct order to avoid FK violations)
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Main Categories (with images)
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('f6e04fa3-74c1-4394-9992-539c9e38808a', 'Băuturi', 'Напитки', 'Băuturi', 'bauturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/f6e04fa3-74c1-4394-9992-539c9e38808a/8c349779-846f-410f-ae5c-775ca11f20d5.png', NULL, 1),
('33c283d7-a4e1-4592-87bc-565c6aefadef', 'Carne & Produse din Carne', 'Мясо и мясные продукты', 'Carne & Produse din Carne', 'carne-produse-carne', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/33c283d7-a4e1-4592-87bc-565c6aefadef/3c092026-53e9-45b9-82b7-55d893b3bab4.png', NULL, 98),
('6126b032-c0e2-427f-bdb3-291dd52e864b', 'Cereale & Produse de Moară', 'Зерновые и мукомольные продукты', 'Cereale & Produse de Moară', 'cereale-produse-moara', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/6126b032-c0e2-427f-bdb3-291dd52e864b/59a8f575-c656-4048-9480-1f414fdf2659.png', NULL, 1),
('398a57db-b9da-4524-af3b-5a150a67f5e0', 'Condimente & Mixuri', 'Специи и пряности', 'Condimente & Mixuri', 'condimente-mixuri', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/398a57db-b9da-4524-af3b-5a150a67f5e0/ce40ab1a-c9f5-4124-8d0f-306cb3565b71.png', NULL, 1),
('1b9956b7-a6df-433f-875a-31c3833f24e8', 'Conserve & Murături', 'Консервы и соленья', 'Conserve & Murături', 'conserve-muraturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/1b9956b7-a6df-433f-875a-31c3833f24e8/7c691159-9055-4431-9beb-517a5b4d65ed.png', NULL, 95),
('c7492181-fcdf-4940-a3de-f940bca13f17', 'Dulciuri & Gustări', 'Сладости и закуски', 'Dulciuri & Gustări', 'dulciuri-gustari', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/c7492181-fcdf-4940-a3de-f940bca13f17/74d654ea-9c3e-412b-aabe-6de80dcd7eb9.png', NULL, 1),
('f9e4ebae-05d2-4706-b8bf-78752867482e', 'Fructe & Legume', 'Фрукты и овощи', 'Fructe & Legume', 'fructe-legume', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/f9e4ebae-05d2-4706-b8bf-78752867482e/fbeb66d5-1c48-4cf7-85fb-a8b5d5dea5a3.png', NULL, 100),
('1d708f63-5712-419e-a135-fecb7e389e32', 'Lactate & Brânzeturi', 'Молочные продукты и сыры', 'Lactate & Brânzeturi', 'lactate-branzeturi', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/1d708f63-5712-419e-a135-fecb7e389e32/00b8b96f-efd5-4663-85e2-c72f6b7b12a7.png', NULL, 99),
('407f1d14-4595-4070-9ee5-ac849b05eefb', 'Miere & Produse Apicole', 'Мёд и продукты пчеловодства', 'Miere & Produse Apicole', 'miere-produse-apicole', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/407f1d14-4595-4070-9ee5-ac849b05eefb/7f5bf79a-39d4-4675-ae58-2019176114d5.png', NULL, 97),
('df692b73-2cc4-4bbc-96d1-8aec71be628b', 'Nuci, Semințe & Produse Derivate', 'Орехи, семена и продукты из них', 'Nuci, Semințe & Produse Derivate', 'nuci-seminte-produse', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/df692b73-2cc4-4bbc-96d1-8aec71be628b/6c9faf96-6348-445d-8169-a0ce496dbb5e.png', NULL, 93),
('3f0475dc-57e3-4166-8639-11a8f45dc3eb', 'Ouă & Produse din Ouă', 'Яйца и яичные продукты', 'Ouă & Produse din Ouă', 'oua-produse-oua', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/3f0475dc-57e3-4166-8639-11a8f45dc3eb/811a0233-7258-4273-891a-8e651153ccaa.png', NULL, 96),
('e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 'Panificație & Patiserie', 'Хлебопекарные изделия и выпечка', 'Panificație & Patiserie', 'panificatie-patiserie', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/e32a50d1-ae9e-4689-ba23-275ed5fc25f5/5ce2ac64-2a2c-4827-984e-0f4c6ce015f2.png', NULL, 94),
('d89a0ee1-82ad-4780-949c-dfffdc74d811', 'Pește & Produse din Pește', 'Рыба и рыбные продукты', 'Pește & Produse din Pește', 'peste-produse-peste', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/d89a0ee1-82ad-4780-949c-dfffdc74d811/12851236-5485-498c-b516-0ccfa01f9867.png', NULL, 1),
('506b2240-02b3-49b9-bd12-ae6eca09e38b', 'Produse Naturale & Dietetice', 'Натуральные и диетические продукты', 'Produse Naturale & Dietetice', 'produse-naturale-dietetice', 'https://pub-82a0121d9a324bf3a27b7bd9e2511bba.r2.dev/categories/506b2240-02b3-49b9-bd12-ae6eca09e38b/0a0cb76d-2380-459d-9491-32e9e3e9088f.png', NULL, 1);

-- Subcategories for Panificație & Patiserie
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('e207f1cc-90ed-4e12-b8b4-bdc7174379fb', 'Biscuiți & fursecuri', 'Печенье', 'Biscuiți & fursecuri', 'biscuiti-fursecuri', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('a3e4d783-05eb-4b4a-a052-8151540ebdb9', 'Colaci & cozonaci', 'Калачи и куличи', 'Colaci & cozonaci', 'colaci-cozonaci', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('402984cf-c57c-4d4f-b1f4-746db4a5bc26', 'Plăcinte tradiționale', 'Традиционные пироги', 'Plăcinte tradiționale', 'placinte-traditionale', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('d2455f3d-f1af-44ac-871a-0116473c97da', 'Produse fără gluten', 'Безглютеновые продукты', 'Produse fără gluten', 'produse-fara-gluten', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('90e55415-0346-4328-a66e-63d95a1c1e64', 'Pâine artizanală', 'Ремесленный хлеб', 'Pâine artizanală', 'paine-artizanala', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('e18297b0-fc54-4659-b421-6c2a6c8bfeb5', 'Pâine integrală / cu maia', 'Цельнозерновой хлеб / на закваске', 'Pâine integrală / cu maia', 'paine-integrala-cu-maia', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1),
('11a89953-d0f5-4f5e-a931-34382dfe8652', 'Tarte & deserturi de casă', 'Торты и домашние десерты', 'Tarte & deserturi de casă', 'tarte-deserturi-casa', NULL, 'e32a50d1-ae9e-4689-ba23-275ed5fc25f5', 1);

-- Subcategories for Lactate & Brânzeturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('ab1cb5c0-915d-40df-85b0-3ea04875d264', 'Brânză de capră', 'Козий сыр', 'Brânză de capră', 'branza-capra', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('c4933330-d2ea-4f62-bfdf-02786f2d7181', 'Brânză de oaie', 'Овечий сыр', 'Brânză de oaie', 'branza-oaie', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('996b5329-d8b1-492e-ad62-067b6554949e', 'Brânză de vacă', 'Коровий сыр', 'Brânză de vacă', 'branza-vaca', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('b476132c-2dbf-42a7-85fe-4120c84f2bfc', 'Cașcaval', 'Кашкавал', 'Cașcaval', 'cascaval', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('d68d4483-9a54-469a-8147-7602f8b64f79', 'Chefir', 'Кефир', 'Chefir', 'chefir', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('6461a553-37aa-442e-8748-4a0e27f1859e', 'Iaurt natural', 'Натуральный йогурт', 'Iaurt natural', 'iaurt-natural', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('bf2d4a33-5654-4d49-9afd-48bad29401f1', 'Smântână', 'Сметана', 'Smântână', 'smantana', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('75e9653f-00ab-4689-8cc7-5a21e0721a65', 'Telemea', 'Телемя', 'Telemea', 'telemea', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1),
('51a29031-8983-4310-a4e5-bb1b04dcf2c7', 'Unt artizanal', 'Ремесленное масло', 'Unt artizanal', 'unt-artizanal', NULL, '1d708f63-5712-419e-a135-fecb7e389e32', 1);

-- Subcategories for Carne & Produse din Carne
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('76e48b96-4e81-4cd3-82a6-74f18539c607', 'Cârnați artizanali', 'Ремесленные колбаски', 'Cârnați artizanali', 'carnati-artizanali', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('98e430b8-a601-4771-b22b-3cd9941f1dff', 'Carne maturată', 'Выдержанное мясо', 'Carne maturată', 'carne-maturata', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('319f6ea9-445f-4fc0-98b6-31d581d0aac7', 'Carne proaspătă (vită, porc, pasăre)', 'Свежее мясо (говядина, свинина, птица)', 'Carne proaspătă (vită, porc, pasăre)', 'carne-proaspata', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('96582264-1942-4265-8060-66d861bf61db', 'Conserve din carne', 'Мясные консервы', 'Conserve din carne', 'conserve-carne', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('9984a4d5-31b8-4231-bdfe-5f47b91c81dd', 'Mezeluri tradiționale', 'Традиционные колбасные изделия', 'Mezeluri tradiționale', 'mezeluri-traditionale', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('57a38f07-b070-4422-8ee8-36535558e80e', 'Pateuri', 'Паштеты', 'Pateuri', 'pateuri', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('a44c8fd5-613d-4c44-b9a9-b45c20880410', 'Salamuri uscate', 'Сухие колбасы', 'Salamuri uscate', 'salamuri-uscate', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1),
('5c7c0b24-a616-425a-a9a8-5cf3529e3270', 'Slănină', 'Сало', 'Slănină', 'slanina', NULL, '33c283d7-a4e1-4592-87bc-565c6aefadef', 1);

-- Subcategories for Pește & Produse din Pește
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('775f6044-01af-47c6-84cb-3f10a24d1705', 'Conserve din pește', 'Рыбные консервы', 'Conserve din pește', 'conserve-peste', NULL, 'd89a0ee1-82ad-4780-949c-dfffdc74d811', 1),
('abbf01ed-41eb-47e3-b7d2-fd059aca0cba', 'Icre', 'Икра', 'Icre', 'icre', NULL, 'd89a0ee1-82ad-4780-949c-dfffdc74d811', 1),
('8b8bda01-ed5d-448c-92d1-ab6480b2952e', 'Pește afumat', 'Копчёная рыба', 'Pește afumat', 'peste-afumat', NULL, 'd89a0ee1-82ad-4780-949c-dfffdc74d811', 1),
('879b8df6-0c48-4393-a07f-27cd6c630910', 'Pește proaspăt', 'Свежая рыба', 'Pește proaspăt', 'peste-proaspat', NULL, 'd89a0ee1-82ad-4780-949c-dfffdc74d811', 1),
('63e97b50-2bc0-47d3-99f5-a74f4361e2ea', 'Pește sărat', 'Солёная рыба', 'Pește sărat', 'peste-sarat', NULL, 'd89a0ee1-82ad-4780-949c-dfffdc74d811', 1);

-- Subcategories for Miere & Produse Apicole
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('427f06d4-b771-415a-8bcc-f2622eb2be75', 'Fagure', 'Соты', 'Fagure', 'fagure', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('b9655243-2c08-44b5-bb49-9b18bef20000', 'Lăptișor de matcă', 'Маточное молочко', 'Lăptișor de matcă', 'laptisor-matca', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('c274d5e0-901f-4c0b-988d-0b486ec96820', 'Miere de rapiță', 'Рапсовый мёд', 'Miere de rapiță', 'miere-rapita', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('883d8716-4922-4f51-aef4-d03f3872f9a4', 'Miere de salcâm', 'Акациевый мёд', 'Miere de salcâm', 'miere-salcam', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('ec2b824e-d553-4e65-a2c3-09da8a7c1531', 'Miere de tei', 'Липовый мёд', 'Miere de tei', 'miere-tei', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('f583b50b-8e82-40f6-9207-342f64f7ad12', 'Miere polifloră', 'Полифлорный мёд', 'Miere polifloră', 'miere-poliflora', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('598164d7-1d6a-4ad6-bfe9-ff02e0c8136b', 'Mixuri apicole', 'Пчелиные смеси', 'Mixuri apicole', 'mixuri-apicole', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('a362e6d2-dd5b-4366-b445-654c21eeef7d', 'Polen', 'Пыльца', 'Polen', 'polen', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1),
('193d2dbd-2265-4d07-8545-51470ea0f2e6', 'Propolis', 'Прополис', 'Propolis', 'propolis', NULL, '407f1d14-4595-4070-9ee5-ac849b05eefb', 1);

-- Subcategories for Fructe & Legume
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('5f716d74-21f6-4193-afe7-581a486a972d', 'Fructe proaspete', 'Свежие фрукты', 'Fructe proaspete', 'fructe-proaspete', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('126de295-95b5-424e-96dc-f607d7a8af6c', 'Fructe uscate', 'Сушёные фрукты', 'Fructe uscate', 'fructe-uscate', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('5fdf8b34-956a-427b-b6ab-abc4e6e6fa63', 'Legume proaspete', 'Свежие овощи', 'Legume proaspete', 'legume-proaspete', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('2765c43b-216a-428c-b574-5e4fc73bb887', 'Legume uscate', 'Сушёные овощи', 'Legume uscate', 'legume-uscate', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('c98ae5ab-bc1e-4b0d-8adc-3c8159cb2d95', 'Produse bio certificate', 'Сертифицированные био-продукты', 'Produse bio certificate', 'produse-bio-certificate', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('e038fdb6-ddf0-4246-89e6-83386d4378d9', 'Produse de sezon', 'Сезонные продукты', 'Produse de sezon', 'produse-sezon', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1),
('ba491c9e-7427-4eec-8fb0-b40f2186e415', 'Verdețuri', 'Зелень', 'Verdețuri', 'verdeturi', NULL, 'f9e4ebae-05d2-4706-b8bf-78752867482e', 1);

-- Subcategories for Conserve & Murături
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('9135af98-800e-4656-9361-a6c629ba5e5d', 'Compot', 'Компот', 'Compot', 'compot', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('7b031a2c-42fc-4bd2-bd94-777cd75fa002', 'Dulceață', 'Варенье', 'Dulceață', 'dulceata', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('cf2b386d-8c10-4f34-8493-7f9a92bb3d3c', 'Gem', 'Джем', 'Gem', 'gem', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('4ee28e63-e9f0-41a0-ade5-d405aa729c52', 'Murături', 'Соленья', 'Murături', 'muraturi', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('f6c41c6d-d979-4263-85ae-412b0029ace2', 'Pastă de tomate', 'Томатная паста', 'Pastă de tomate', 'pasta-tomate', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('f12190cf-325e-4da8-94f4-2433d5a6a829', 'Siropuri naturale', 'Натуральные сиропы', 'Siropuri naturale', 'siropuri-naturale', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('af4ebc81-9cd5-4c7f-8d5f-57bb438597fa', 'Suc de roșii', 'Томатный сок', 'Suc de roșii', 'suc-rosii', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1),
('8919381f-0438-4219-9575-81bc54f47c05', 'Zacuscă', 'Закуска', 'Zacuscă', 'zacusca', NULL, '1b9956b7-a6df-433f-875a-31c3833f24e8', 1);

-- Subcategories for Băuturi
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 'Băuturi alcoolice', 'Алкогольные напитки', 'Băuturi alcoolice', 'bauturi-alcoolice', NULL, 'f6e04fa3-74c1-4394-9992-539c9e38808a', 1),
('88dafa6b-d0b5-4362-b835-2486da93e94d', 'Băuturi non-alcoolice', 'Безалкогольные напитки', 'Băuturi non-alcoolice', 'bauturi-non-alcoolice', NULL, 'f6e04fa3-74c1-4394-9992-539c9e38808a', 1);

-- Subcategories for Băuturi alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('cfc6a763-d42a-4a94-8abb-5400d23a3a66', 'Divin', 'Дивин', 'Divin', 'divin', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('9ddcad03-7378-483a-8014-996e0c4f1faf', 'Lichioruri artizanale', 'Ремесленные ликёры', 'Lichioruri artizanale', 'lichioruri-artizanale', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('80603498-c5fc-428c-abaa-6a663331c29d', 'Vin alb', 'Белое вино', 'Vin alb', 'vin-alb', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('de398339-1ac7-4059-a786-f32dea1b2acb', 'Vin rose', 'Розовое вино', 'Vin rose', 'vin-rose', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('a38b0622-a5bb-4bfa-9e10-66b34ec36106', 'Vin roșu', 'Красное вино', 'Vin roșu', 'vin-rosu', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('0f3f12ed-1e2d-49e6-af62-1122575324b7', 'Vin spumant', 'Игристое вино', 'Vin spumant', 'vin-spumant', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1),
('4a0b0dbe-a7a7-4bde-9821-08c40809b197', 'Țuică / rachiu', 'Цуйка / ракия', 'Țuică / rachiu', 'tuica-rachiu', NULL, '93ac20e5-ed50-4a10-aeb1-9a08415fd03b', 1);

-- Subcategories for Băuturi non-alcoolice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('f7219c0d-ca2c-4947-9ca6-4c86ddf44637', 'Apă minerală locală', 'Местная минеральная вода', 'Apă minerală locală', 'apa-minerala-locala', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1),
('dc4e5e60-bc7e-4959-9ffb-155705de8168', 'Cvas', 'Квас', 'Cvas', 'cvas', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1),
('5c7e0675-f619-4f1a-b41b-162ede08c6b3', 'Kombucha', 'Комбуча', 'Kombucha', 'kombucha', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1),
('93d580f5-46b7-4c90-be5e-5762e8c6a5b8', 'Nectare', 'Нектары', 'Nectare', 'nectare', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1),
('92af988c-c423-47e0-a22d-ad69b0440366', 'Siropuri', 'Сиропы', 'Siropuri', 'siropuri', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1),
('5c3c91dc-a806-4e19-b963-3969e001b1a2', 'Sucuri naturale', 'Натуральные соки', 'Sucuri naturale', 'sucuri-naturale', NULL, '88dafa6b-d0b5-4362-b835-2486da93e94d', 1);

-- Subcategories for Nuci, Semințe & Produse Derivate
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('be561713-482c-454e-ba3f-3774a44b8dac', 'Mixuri sănătoase', 'Здоровые смеси', 'Mixuri sănătoase', 'mixuri-sanatoase', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1),
('8a6feaa7-2052-4f9c-bffe-f882e5ee02d6', 'Nuci decojite', 'Очищенные орехи', 'Nuci decojite', 'nuci-decojite', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1),
('ad2d0fee-0744-4732-a9b0-32e5ef2ce83a', 'Nuci prăjite', 'Жареные орехи', 'Nuci prăjite', 'nuci-prajite', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1),
('52573a57-a58c-4309-9a03-85e23fe1291e', 'Pastă de semințe', 'Паста из семян', 'Pastă de semințe', 'pasta-seminte', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1),
('ff9f687e-eab5-4ab7-b878-8093dc4262b3', 'Semințe', 'Семена', 'Semințe', 'seminte', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1),
('3cbcc84a-63bf-486f-adf9-ea7fd3a05ce1', 'Unt de nuci', 'Ореховое масло', 'Unt de nuci', 'unt-nuci', NULL, 'df692b73-2cc4-4bbc-96d1-8aec71be628b', 1);

-- Subcategories for Dulciuri & Gustări
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('aef2f7bb-579b-4211-85d7-519bc03e2a18', 'Batoane proteice artizanale', 'Ремесленные протеиновые батончики', 'Batoane proteice artizanale', 'batoane-proteice', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1),
('778f88a6-03d9-4911-8603-9e1d9b220121', 'Bomboane handmade', 'Конфеты ручной работы', 'Bomboane handmade', 'bomboane-handmade', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1),
('1470d4fb-783e-4346-964b-be71d2551990', 'Ciocolată artizanală', 'Ремесленный шоколад', 'Ciocolată artizanală', 'ciocolata-artizanala', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1),
('fb0c104e-5f09-460a-bb96-c4f6799c20e4', 'Halva', 'Халва', 'Halva', 'halva', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1),
('2b5608a8-dd09-4967-809f-1f906d8293d8', 'Produse din carob', 'Продукты из кароба', 'Produse din carob', 'produse-carob', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1),
('9a87d8ee-09ad-42d3-a65d-08e35bb5cc1d', 'Snacks-uri naturale', 'Натуральные снэки', 'Snacks-uri naturale', 'snacks-naturale', NULL, 'c7492181-fcdf-4940-a3de-f940bca13f17', 1);

-- Subcategories for Produse Naturale & Dietetice
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('d635fff4-c228-44e3-ad91-8278d78b7121', 'Făinuri alternative', 'Альтернативная мука', 'Făinuri alternative', 'fainuri-alternative', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('badba779-d847-46fd-add5-e3f3755b8306', 'Produse fără gluten (dietetice)', 'Безглютеновые продукты', 'Produse fără gluten (dietetice)', 'produse-fara-gluten-dietetice', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('a5398261-542d-4f7c-9e5a-c4798cfdf471', 'Produse fără zahăr', 'Продукты без сахара', 'Produse fără zahăr', 'produse-fara-zahar', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('8f1d97f8-0717-43da-a809-51f458555306', 'Produse raw', 'Сыроедческие продукты', 'Produse raw', 'produse-raw', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('ab0b7dbc-5fab-4d0c-9f5d-8700a2e00587', 'Produse vegane', 'Веганские продукты', 'Produse vegane', 'produse-vegane', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('923c180c-6152-4a58-b2e0-33cc9f407651', 'Superfoods', 'Суперфуды', 'Superfoods', 'superfoods', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1),
('adc74364-38d9-4655-aed8-c5ca81b0f1c4', 'Uleiuri presate la rece', 'Масла холодного отжима', 'Uleiuri presate la rece', 'uleiuri-presate-rece', NULL, '506b2240-02b3-49b9-bd12-ae6eca09e38b', 1);

-- Subcategories for Cereale & Produse de Moară
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('59018319-eb51-4db7-bec5-1ff9c7b5511b', 'Crupe', 'Крупы', 'Crupe', 'crupe', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('b77b12cd-1911-4637-bdec-9457f403ab4a', 'Fulgi', 'Хлопья', 'Fulgi', 'fulgi', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('428d55e3-106d-480b-8cc4-146c49bd4435', 'Făină albă', 'Белая мука', 'Făină albă', 'faina-alba', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('04138253-d8cf-47d7-9f13-92a342962edf', 'Făină de porumb', 'Кукурузная мука', 'Făină de porumb', 'faina-porumb', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('5427c08c-f455-4e5f-bf28-a3b8fadf4cef', 'Făină integrală', 'Цельнозерновая мука', 'Făină integrală', 'faina-integrala', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('07103c3a-1a54-46b0-aa6c-47ff1c881b5a', 'Mălai', 'Мамалыга', 'Mălai', 'malai', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1),
('c4d8cc94-5c2f-41b1-9a1b-23114f573877', 'Paste artizanale', 'Ремесленные макароны', 'Paste artizanale', 'paste-artizanale', NULL, '6126b032-c0e2-427f-bdb3-291dd52e864b', 1);

-- Subcategories for Ouă & Produse din Ouă
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('1f9ecfc1-005c-4cb3-b340-723d44193d08', 'Ouă bio', 'Био яйца', 'Ouă bio', 'oua-bio', NULL, '3f0475dc-57e3-4166-8639-11a8f45dc3eb', 1),
('b420ee18-359d-4278-83fa-c97a4d8c4382', 'Ouă de casă', 'Домашние яйца', 'Ouă de casă', 'oua-casa', NULL, '3f0475dc-57e3-4166-8639-11a8f45dc3eb', 1),
('dd9b27b0-bd1f-4473-b35c-d27ffd792cbb', 'Paste cu ou', 'Макароны с яйцом', 'Paste cu ou', 'paste-ou', NULL, '3f0475dc-57e3-4166-8639-11a8f45dc3eb', 1),
('dba757f5-16ce-4895-ae93-2347bf9ce747', 'Produse pe bază de ou', 'Продукты на основе яиц', 'Produse pe bază de ou', 'produse-baza-ou', NULL, '3f0475dc-57e3-4166-8639-11a8f45dc3eb', 1);

-- Subcategories for Condimente & Mixuri
INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId") VALUES
('98727cdd-54cd-4629-be65-d03c644eeb6f', 'Ceaiuri din plante', 'Травяные чаи', 'Ceaiuri din plante', 'ceaiuri-plante', NULL, '398a57db-b9da-4524-af3b-5a150a67f5e0', 1),
('efdbbdb9-a357-444f-b41b-1e7123e2a749', 'Condimente uscate', 'Сушёные специи', 'Condimente uscate', 'condimente-uscate', NULL, '398a57db-b9da-4524-af3b-5a150a67f5e0', 1),
('373ce359-8b4d-4174-a6fb-8b31ab1708b1', 'Mixuri tradiționale', 'Традиционные смеси', 'Mixuri tradiționale', 'mixuri-traditionale', NULL, '398a57db-b9da-4524-af3b-5a150a67f5e0', 1),
('84bcb885-9a76-4947-af85-4d0d3b64ffd5', 'Plante medicinale', 'Лекарственные травы', 'Plante medicinale', 'plante-medicinale', NULL, '398a57db-b9da-4524-af3b-5a150a67f5e0', 1),
('9d8d391a-0114-4d11-b6cb-9948d5a399ec', 'Sare aromatizată', 'Ароматизированная соль', 'Sare aromatizată', 'sare-aromatizata', NULL, '398a57db-b9da-4524-af3b-5a150a67f5e0', 1);

