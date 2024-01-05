/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('jobs', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title', 255);
      table.text('description');
      table.enum('type', ['full-time', 'part-time', 'contract']);
      table.string('how_to_apply', 255);
      table.string('company_url', 255);
      table.string('company_logo', 255);
      table.string('location', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('jobs');
};
