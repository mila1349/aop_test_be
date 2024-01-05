import JobService from '../services/jobs.service.js';

const JobController = {
  getAllJobs: async (ctx) => {
    const queryParams = ctx.request.query;
    const jobs = await JobService.getAllJobs(queryParams);
    ctx.body = jobs;
  },

  getJobById: async (ctx) => {
    const job = await JobService.getJobById(ctx.params.id);
    if (!job) {
      ctx.status = 404;
      ctx.body = { error: 'Job not found' };
    } else {
      ctx.body = job;
    }
  },

  createJob: async (ctx) => {
    const {
      title,
      description,
      type,
      how_to_apply,
      company_url,
      company_logo,
      location,
    } = ctx.request.body;
    const job = await JobService.createJob({
      title,
      description,
      type,
      how_to_apply,
      company_url,
      company_logo,
      location,
    });
    ctx.status = 201;
    ctx.body = job;
  },

  updateJob: async (ctx) => {
    const {
      title,
      description,
      type,
      how_to_apply,
      company_url,
      company_logo,
      location,
    } = ctx.request.body;
    const job = await JobService.updateJob(ctx.params.id, {
      title,
      description,
      type,
      how_to_apply,
      company_url,
      company_logo,
      location,
    });
    if (!job) {
      ctx.status = 404;
      ctx.body = { error: 'Job not found' };
    } else {
      ctx.body = job;
    }
  },

  deleteJob: async (ctx) => {
    const deletedCount = await JobService.deleteJob(ctx.params.id);
    if (deletedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: 'Job not found' };
    } else {
      ctx.status = 204;
    }
  },
};

export default JobController;
