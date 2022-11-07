var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Message", 
    schema: "imchat",
    tableName: "message",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        user_to: {
            type: "int",
            nullable: false,
        },
        user_from: {
            type: "int",
            nullable: false,
        },
        content: {
            type: "text",
            nullable: false,
        },
        timestamp: {
            type: "timestamp",
            nullable: false,
        },
    },
/*     relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
    }, */
})