import UserService from '../services/users.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserController = {
  getAllUsers: async (ctx) => {
    const users = await UserService.getAllUsers();
    ctx.body = users;
  },

  getUserById: async (ctx) => {
    const user = await UserService.getUserById(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      ctx.body = user;
    }
  },

  signUp: async (ctx) => {
    const { username, password } = ctx.request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserService.createUser({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    );

    ctx.body = { token };

    ctx.status = 201;
    ctx.body = { ...user, token: token, password: password };
  },

  login: async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await UserService.getUserByUsername(username);

    if (!user) {
      ctx.throw(401, 'Invalid username or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      ctx.throw(401, 'Invalid username or password');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    );

    ctx.body = { token };
  },

  logout: async (ctx) => {
    console.log("nbgftyuj",)
    ctx.session = null;
    ctx.body = { message: 'Logout successful' };
  },

  updateUser: async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await UserService.updateUser(ctx.params.id, {
      username,
      password,
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      ctx.body = user;
    }
  },

  deleteUser: async (ctx) => {
    const deletedCount = await UserService.deleteUser(ctx.params.id);
    if (deletedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      ctx.status = 204;
    }
  },
};

export default UserController;
