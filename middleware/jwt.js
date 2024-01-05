import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.throw(401, 'Unauthorized');
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // attach token to context for further use
    ctx.state.user = decoded;

    // continue wit the next step
    await next();
  } catch (error) {
    ctx.throw(401, 'Invalid token');
  }
};

export default jwtMiddleware;
