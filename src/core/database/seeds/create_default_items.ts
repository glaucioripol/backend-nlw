import Knex from 'knex'

export async function seed(knex: Knex) {
  // criar um json disto
  return await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelão.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Residuos Orgânicos', image: 'organicos.svg' },
    { title: 'Oléo de Cozinha', image: 'oleo.svg' },
  ])
}