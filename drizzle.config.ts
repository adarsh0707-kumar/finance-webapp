import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({path: ".env"})


export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: "public",
    table: "__drizzle_migrations"
  },
  verbose: true,
  strict: true
})
