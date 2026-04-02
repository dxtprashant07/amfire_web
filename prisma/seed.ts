import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@amfire.in";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@1234";
  const name = process.env.SEED_ADMIN_NAME || "amfire Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`Created admin user: ${email}`);
  console.log("IMPORTANT: Change this password immediately after first login!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
