exports.up = function(knex) {
    return knex.schema.createTable('contracts', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.date('sign_date').notNullable();
      table.date('expiry_date').notNullable();
      table.string('parties').notNullable();
      table.text('summary').notNullable();
      table.string('status').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contracts');
  };
  