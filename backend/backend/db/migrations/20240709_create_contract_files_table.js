// migrations/[timestamp]_create_contract_files_table.js

exports.up = function(knex) {
    return knex.schema.createTable('contract_files', table => {
        table.increments('id').primary();
        table.integer('contract_id').unsigned().notNullable();
        table.string('file_path', 255).notNullable();
        table.timestamps(true, true);

        table.foreign('contract_id').references('contracts.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('contract_files');
};
