import {pgTable, text, uuid, integer, boolean} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import path from "path";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
})