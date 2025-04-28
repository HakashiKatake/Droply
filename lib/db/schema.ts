import {pgTable, text, uuid, integer, boolean, timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import path from "path";
import { create } from "domain";


export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    //storage info

    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    //ownership

    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), //parent folder if  (null for root folder)

    //file/folder flags
    isFolder: boolean("is_folder").notNull().default(false),
    isStarred: boolean("is_starred").notNull().default(false),
    isTrash: boolean("is_trash").notNull().default(false),

    //timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),


})

export const filesRelation = relations(files, ({one, many}) => 
({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    childern: many(files)
}))

//type definations

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;