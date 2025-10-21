import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  // out: "./drizzle",
  dbCredentials: {
    url:'postgresql://mockInterview_owner:9EATRuF0vDUq@ep-icy-river-a5wy08h7-pooler.us-east-2.aws.neon.tech/mockInterview?sslmode=require&channel_binding=require',
  }
});
