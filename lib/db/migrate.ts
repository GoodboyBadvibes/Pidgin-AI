import { existsSync } from "node:fs";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// Load .env.local if it exists, otherwise load .env
const envPath = existsSync(".env.local") ? ".env.local" : ".env";
config({
  path: envPath,
});

const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    console.warn(
      "⚠️  POSTGRES_URL is not defined. Skipping migrations. This is expected during build if running without environment variables."
    );
    process.exit(0);
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./lib/db/migrations" });
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
