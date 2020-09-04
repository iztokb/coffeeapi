module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

// Creating a TypeOrm Migration
// npx typeorm migration:create -n CoffeeRefactor
// CoffeeRefactor being the NAME we are giving "this" migration

/* src/migrations/... file */

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */

// Compile project first
// npm run build

// Run migration(s)
// npx typeorm migration:run

// REVERT migration(s)
// npx typeorm migration:revert

// Let TypeOrm generate migrations (for you)
// npx typeorm migration:generate -n SchemaSync
