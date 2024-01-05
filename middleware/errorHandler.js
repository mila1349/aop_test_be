async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    console.error('This is error:', error);

    ctx.status = error.status || 500;

    ctx.body = {
      error: {
        message: error.message || 'Internal Server Error',
      },
    };
  }
}

export default errorHandler;
