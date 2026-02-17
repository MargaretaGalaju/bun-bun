import { PrismaClient } from '@prisma/client';
import { categories } from './seeds/categories';

const prisma = new PrismaClient();

// Mode: 'delete' or 'upsert'
// - 'delete': Deletes all categories and inserts fresh (use for empty/fresh DB)
// - 'upsert': Updates existing or creates new (use when products reference categories)
const MODE: 'delete' | 'upsert' = 'delete';

async function main() {
  console.log(`🌱 Seeding categories in ${MODE.toUpperCase()} mode...`);
  console.log(`📊 Total categories to seed: ${categories.length}\n`);

  if (MODE === 'delete') {
    // Delete mode: Clean slate
    console.log('🗑️  Deleting existing data...');
    
    // Delete in correct order to avoid foreign key violations
    await prisma.orderItem.deleteMany({});
    console.log('   ✓ Deleted order items');
    
    await prisma.productImage.deleteMany({});
    console.log('   ✓ Deleted product images');
    
    await prisma.product.deleteMany({});
    console.log('   ✓ Deleted products');
    
    await prisma.category.deleteMany({});
    console.log('   ✓ Deleted categories\n');

    // Insert all categories in order (parents before children)
    console.log('📝 Inserting categories...');
    let inserted = 0;
    
    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
      inserted++;
      
      if (inserted % 10 === 0) {
        console.log(`   Progress: ${inserted}/${categories.length}`);
      }
    }
    
    console.log(`\n✅ Successfully inserted ${inserted} categories!`);
  } else {
    // Upsert mode: Update existing or create new
    console.log('🔄 Upserting categories...');
    let created = 0;
    let updated = 0;
    
    for (const category of categories) {
      const result = await prisma.category.upsert({
        where: { id: category.id },
        update: {
          name: category.name,
          nameRu: category.nameRu,
          nameRo: category.nameRo,
          slug: category.slug,
          imageUrl: category.imageUrl,
          parentId: category.parentId,
          rating: category.rating,
        },
        create: category,
      });
      
      // Check if it was created or updated (simple heuristic)
      const existing = await prisma.category.findFirst({
        where: { id: category.id },
        select: { id: true },
      });
      
      if (existing) {
        updated++;
      } else {
        created++;
      }
      
      if ((created + updated) % 10 === 0) {
        console.log(`   Progress: ${created + updated}/${categories.length}`);
      }
    }
    
    console.log(`\n✅ Successfully processed ${created + updated} categories!`);
    console.log(`   📌 Created: ${created}`);
    console.log(`   📝 Updated: ${updated}`);
  }

  // Summary statistics
  console.log('\n📊 Database Summary:');
  const totalCategories = await prisma.category.count();
  const mainCategories = await prisma.category.count({
    where: { parentId: null },
  });
  const subCategories = await prisma.category.count({
    where: { parentId: { not: null } },
  });
  
  console.log(`   Total categories: ${totalCategories}`);
  console.log(`   Main categories: ${mainCategories}`);
  console.log(`   Subcategories: ${subCategories}`);

  // Show categories with images
  const categoriesWithImages = await prisma.category.count({
    where: {
      imageUrl: { not: null },
      parentId: null,
    },
  });
  console.log(`   Main categories with images: ${categoriesWithImages}/${mainCategories}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
