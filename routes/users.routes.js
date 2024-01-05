import Router from 'koa-router';
import UserController from '../controllers/users.controllers.js';

const router = new Router();

router.post('/auth/signup', UserController.signUp);
router.post('/auth/login', UserController.login);
router.get('/auth/logout', UserController.logout);

// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
// router.post('/', UserController.createUser);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;
// export default router;
