import Router from 'koa-router';
import jwtMiddleware from '../middleware/jwt.js';
import jobsControllers from '../controllers/jobs.controllers.js';

const router = new Router({ prefix: '/job' });
router.use(jwtMiddleware);

router.get('/', jobsControllers.getAllJobs);
router.get('/:id', jobsControllers.getJobById);
router.post('/', jobsControllers.createJob);
router.put('/:id', jobsControllers.updateJob);
router.delete('/:id', jobsControllers.deleteJob);

export default router;
