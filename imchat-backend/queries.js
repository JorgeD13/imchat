const {Client} = require('pg')

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})
client.connect();

const createUser = (request, response) => {
    console.log(request.body);
    const { username, password, phone, public_key } = request.body;
  
    client.query('INSERT INTO imchat.user (username, password, phone, public_key) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, phone, public_key], (error, results) => {
        if (error) throw error;
        // response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        response.status(201).json(results);
    })
}

const getUsers = (request, response) => {
    client.query('SELECT * FROM imchat.users ORDER BY id ASC', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM imchat.users WHERE id = $1', [id], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser
    // updateUser,
    // deleteUser,
  }