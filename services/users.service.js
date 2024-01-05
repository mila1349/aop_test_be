import User from '../models/users.model.js';
import knexConfig from '../knexfile.js';
import knexFactory from 'knex';
const knex = knexFactory(knexConfig.development);

const UserService = {
  getAllUsers: async () => {
    return User.query();
  },

  getUserById: async (id) => {
    return User.query().findById(id);
  },

  getUserByUsername: async (username) => {
    return User.query().findOne({ username });
  },

  createUser: async (data) => {
    return User.query().insert(data);
  },

  updateUser: async (id, data) => {
    return User.query().patchAndFetchById(id, {
      ...data,
      updated_at: knex.fn.now(),
    });
  },

  deleteUser: async (id) => {
    return User.query().deleteById(id);
  },
};

export default UserService;
