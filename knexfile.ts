import path from 'path'

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'core', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'core', 'database', 'migrations'),
  },
  useNullAsDefault: true, //para o sqlite, ele não aceita  valores default
}
