// migrations/[timestamp]_create_contracts_table.js

exports.up = function(knex) {
    return knex.schema.createTable('contracts', table => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description');
        table.date('signed_date');
        table.date('expiration_date');
        table.text('parties_involved');
        table.string('status', 50);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('contracts');
};
