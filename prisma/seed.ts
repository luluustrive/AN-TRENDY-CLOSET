import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Read data
  const dataDir = path.join(process.cwd(), 'data');
  const categoriesPath = path.join(dataDir, 'categories.json');
  const productsPath = path.join(dataDir, 'products.json');

  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  // Seed Categories
  console.log(`Seeding ${categories.length} categories...`);
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        icon: cat.icon,
        subcategories: JSON.stringify(cat.subcategories),
        productCount: cat.productCount,
      },
    });
  }

  // Seed Products
  console.log(`Seeding ${products.length} products...`);
  for (const prod of products) {
    // some products may not have slug or it might be numeric, ensure string
    const slug = prod.id || `prod-${Math.random().toString(36).substring(2, 9)}`;
    const sku = prod.sku || `SKU-${slug}`;
    
    await prisma.product.upsert({
      where: { sku: sku },
      update: {},
      create: {
        sku: sku,
        name: prod.name,
        slug: slug,
        description: prod.description || prod.name,
        shortDescription: prod.shortDescription || prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice || prod.price,
        discount: prod.discount || 0,
        currency: 'BDT',
        images: JSON.stringify(prod.images || [prod.image]),
        categorySlug: prod.categorySlug || 'general',
        categoryName: prod.categoryName || 'General',
        brand: prod.brand || 'AN Trendy',
        rating: prod.rating || 0,
        reviewCount: prod.reviewCount || 0,
        inStock: prod.inStock !== false,
        stockCount: prod.stockCount || 100,
        status: 'active',
        isFeatured: prod.isFeatured || false,
        isNewArrival: prod.isNewArrival || false,
        isBestSeller: prod.isBestSeller || false,
        isFlashSale: prod.isFlashSale || false,
        specifications: JSON.stringify(prod.specifications || {}),
        supplierId: prod.supplierId || null,
        supplierName: prod.supplierName || null,
      },
    });
  }

  // Create a default admin user
  const adminEmail = 'admin@antrendycloset.com';
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash: 'password_hash_placeholder',
      role: 'super_admin',
      isVerified: true,
    },
  });

  console.log('Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
