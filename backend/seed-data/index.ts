/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { products } from './data';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  const { mongoose } = adapter;
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    // create product image and get the id
    const { _id } = await mongoose
      .model('ProductImage')
      .create({ image: product.photo, altText: product.description });
    // set product photo to the ProductImage id
    product.photo = _id;
    // create product
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
