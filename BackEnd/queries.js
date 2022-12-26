const { response } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgres://pymotowt:mFyQCYDp01DADTYYtnYcSFk9hUQOXL_v@ella.db.elephantsql.com/pymotowt',
    ssl: {
    rejectUnauthorized: false
    }
   });
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, role, imageurl } = request.body;

  pool.query('INSERT INTO users (name, email, role, imageurl) VALUES ($1, $2, $3, $4)', [name, email, role, imageurl], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, role, imageurl } = request.body;
  pool.query(
    'UPDATE users SET name = $1, email = $2, role = $3, imageurl = $4 WHERE id = $5',
    [name, email, role, imageurl, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getUsersByNameorEmail = (request, response) => {
  const { searchText } = request.params;
  pool.query('SELECT * FROM users WHERE position(LOWER($1) in LOWER(name))>0', [searchText], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsersByRole = (request, response) => {
  const { role } = request.params;
  pool.query('SELECT * FROM users WHERE role = $1', [role], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByNameorEmail,
  getUsersByRole
}