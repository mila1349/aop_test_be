/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('username', 255);
      table.string('password', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('users');
};
