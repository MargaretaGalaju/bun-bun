import { categories } from './categories';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Generate SQL INSERT statements from TypeScript data
function generateSQL(): string {
  let sql = `-- Category seed data for bun-bun marketplace
-- Auto-generated from local database export
-- Total: ${categories.length} categories (14 main + 103 subcategories)
-- Generated on: 2026-02-17

-- Clear existing data (in correct order to avoid FK violations)
DELETE FROM order_items;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Main Categories (with images)
`;

  // Separate main and subcategories
  const mainCategories = categories.filter(c => c.parentId === null);
  const subCategories = categories.filter(c => c.parentId !== null);

  // Insert main categories
  mainCategories.forEach((cat, index) => {
    if (index === 0) {
      sql += `INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES\n`;
    }
    
    const values = [
      `'${cat.id}'`,
      `'${cat.name.replace(/'/g, "''")}'`,
      cat.nameRu ? `'${cat.nameRu.replace(/'/g, "''")}'` : 'NULL',
      cat.nameRo ? `'${cat.nameRo.replace(/'/g, "''")}'` : 'NULL',
      `'${cat.slug}'`,
      cat.imageUrl ? `'${cat.imageUrl}'` : 'NULL',
      'NULL',
      cat.rating.toString(),
    ].join(', ');
    
    sql += `(${values})`;
    sql += index < mainCategories.length - 1 ? ',\n' : ';\n\n';
  });

  // Group subcategories by parent
  const subcategoriesByParent = new Map<string, typeof subCategories>();
  subCategories.forEach(cat => {
    const parentId = cat.parentId!;
    if (!subcategoriesByParent.has(parentId)) {
      subcategoriesByParent.set(parentId, []);
    }
    subcategoriesByParent.get(parentId)!.push(cat);
  });

  // Insert subcategories grouped by parent
  Array.from(subcategoriesByParent.entries()).forEach(([parentId, subs]) => {
    const parentCat = categories.find(c => c.id === parentId);
    sql += `-- Subcategories for ${parentCat?.name || parentId}\n`;
    
    subs.forEach((cat, index) => {
      if (index === 0) {
        sql += `INSERT INTO categories (id, name, "nameRu", "nameRo", slug, "imageUrl", "parentId", rating) VALUES\n`;
      }
      
      const values = [
        `'${cat.id}'`,
        `'${cat.name.replace(/'/g, "''")}'`,
        cat.nameRu ? `'${cat.nameRu.replace(/'/g, "''")}'` : 'NULL',
        cat.nameRo ? `'${cat.nameRo.replace(/'/g, "''")}'` : 'NULL',
        `'${cat.slug}'`,
        cat.imageUrl ? `'${cat.imageUrl}'` : 'NULL',
        `'${cat.parentId}'`,
        cat.rating.toString(),
      ].join(', ');
      
      sql += `(${values})`;
      sql += index < subs.length - 1 ? ',\n' : ';\n\n';
    });
  });

  return sql;
}

// Generate and write SQL file
const sql = generateSQL();
const outputPath = join(__dirname, 'categories.sql');
writeFileSync(outputPath, sql, 'utf-8');

console.log(`✅ Generated SQL file: ${outputPath}`);
console.log(`   Total categories: ${categories.length}`);
console.log(`   File size: ${(sql.length / 1024).toFixed(2)} KB`);
