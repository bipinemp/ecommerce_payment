import { products } from "../src/data/products";
import prisma from "../src/db/prisma";

async function main() {
  for (let product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
