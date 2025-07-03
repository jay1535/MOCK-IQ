import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  // out: "./drizzle",
  dbCredentials: {
    url: "YOUR_DATABASE_URL",
  }
});
