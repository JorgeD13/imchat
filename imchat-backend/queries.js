

const createUser = (request, response) => {
    console.log(request.body);
    const { username, password, phone, public_key } = request.body;
  
    client.query('INSERT INTO imchat.user (username, password, phone, public_key) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, phone, public_key], (error, results) => {
        if (error) throw error;
        // response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        response.status(201).json(results.rows[0]);
    })
}

const getUsers = (request, response) => {
    client.query('SELECT * FROM imchat.user ORDER BY id ASC', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM imchat.user WHERE id = $1', [id], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

const getUserByUsername = (request, response) => {
    const username = request.params.username;
    const password = request.params.username;
    console.log(request.params);

    client.query('SELECT * FROM imchat.user WHERE username = $1', [username], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser
    // updateUser,
    // deleteUser,
  }