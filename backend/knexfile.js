// knexfile.js
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '', // Adicione sua senha aqui se houver
      database: 'contracts_db'
    },
    migrations: {
      directory: './backend/migrations'
    },
    seeds: {
      directory: './backend/seeds'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '', // Adicione sua senha aqui se houver
      database: 'contracts_db'
    },
    migrations: {
      directory: './backend/migrations'
    },
    seeds: {
      directory: './backend/seeds'
    }
  }
};
