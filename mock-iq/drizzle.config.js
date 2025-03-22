import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  // out: "./drizzle",
  dbCredentials: {
    url: "postgresql://mock-iq_owner:npg_Svh5sBAo7jRq@ep-young-recipe-a5fjkv4z-pooler.us-east-2.aws.neon.tech/mock-iq?sslmode=require",
  }
});