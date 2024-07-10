// migrations/[timestamp]_create_notifications_table.js

exports.up = function(knex) {
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('contract_id').unsigned().notNullable();
        table.date('notification_date').notNullable();
        table.text('message').notNullable();
        table.timestamps(true, true);

        table.foreign('contract_id').references('contracts.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notifications');
};
