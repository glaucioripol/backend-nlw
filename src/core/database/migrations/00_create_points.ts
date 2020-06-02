import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists('points', (table) => {
    table.uuid('id').primary()
    table.string('image').notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable() // segundo parametro é tipo varchar(2)
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists('points')
}
