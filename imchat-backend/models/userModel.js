var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User", 
    schema: "imchat",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "text",
            nullable: false,
            unique: true,
        },
        password: {
            type: "text",
            nullable: false,
        },
        phone: {
            type: "int",
            nullable: false,
        },
        public_key: {
            type: "text",
            nullable: false
        },
        salt: {
            type: "text",
            nullable: false,
        }
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