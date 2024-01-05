import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    client: process.env.DATABASE_DIALECT,
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    debug: true,
  },
};
