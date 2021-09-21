import "dotenv/config";
import * as Knex from "knex";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.up = (knex: Knex) =>
  knex.schema
    .createTableIfNotExists("orders", (table) => {
      table.increments();
      table.string("user");
      table.timestamp("date").defaultTo(knex.fn.now());
    })
    .createTableIfNotExists("items", (table) => {
      table.increments();
      table.string("name");
      table.float("value");
    })
    .createTableIfNotExists("orders_items", (table) => {
      table.increments();
      table.integer("order_id", 11).nullable().unsigned();
      table.integer("item_id", 11).nullable().unsigned();
      table.foreign("order_id").references("id").inTable("orders");
      table.foreign("item_id").references("id").inTable("items");
    });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.down = (knex: Knex) =>
  knex.schema.dropTable("orders_items").dropTable("orders").dropTable("items");
