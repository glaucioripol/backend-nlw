import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists('point_items', (table) => {
    table.integer('id').primary()
    table.integer('fk_id_point').references('id').inTable('points').notNullable()
    table.integer('fk_id_item').references('id').inTable('items').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists('point_items')
}
