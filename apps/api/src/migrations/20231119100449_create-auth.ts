import { Knex } from 'knex';

import config from '../libs/config';

export async function up(knex: Knex): Promise<void> {
  const { user, password } = config.get('db:connection');

  if (!user || !password) {
    throw new Error('user or password is empty');
  }
  await knex.schema.raw(`create role ${user} noreplication login password '${password}'`);

  await knex.raw('create extension "uuid-ossp"');
  await knex.schema.raw('create schema core$');
  await knex.schema.raw(`grant usage on schema "core$" to ${user}`);
  await knex.schema.raw('revoke all on schema "core$" from public');

  await knex.schema
    .withSchema('core$')
    .createTable('user', table => {
      table.uuid('id').notNullable().primary({ constraintName: 'user_pk' });
      table.text('name').notNullable();
      table.text('email').notNullable();
      table.text('password').notNullable();
      table.boolean('is_email_subscription').defaultTo(true).notNullable();

      table.timestamps(true, true);
    })
    .raw('create unique index user_email_u on core$.user using btree(upper(email))');

  await knex.schema.raw(`grant insert, select, update, delete on table core$.user to ${user}`);

  await knex.schema.withSchema('core$').createTable('session', table => {
    table.uuid('id').primary({ constraintName: 'session_pk' });
    table.uuid('user_id').notNullable().index('session_user_id');
    table.foreign('user_id', 'session_2_user').references('id').inTable('core$.user').onDelete('cascade');
    table.text('user_agent');
    table.boolean('is_active').defaultTo(true);
    table.timestamp('last_access_time').notNullable();
    table.specificType('ip', 'inet');
    table.integer('requests_count');
    table.timestamps(true, true);
  });

  await knex.schema.raw(`grant insert, select, update, delete on table core$.session to ${user}`);
}

export async function down(knex: Knex): Promise<void> {
  const { user } = config.get('db:connection');
  if (!user) {
    throw new Error('user is empty');
  }
  await knex.schema.raw('drop table core$.session');
  await knex.schema.raw('drop table core$.user');
  await knex.schema.raw('drop schema core$');
  await knex.schema.raw(`drop role ${user}`);
  await knex.raw('drop extension "uuid-ossp"');
}
