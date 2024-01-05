import Job from '../models/jobs.model.js';
import knexConfig from '../knexfile.js';
import knexFactory from 'knex';
const knex = knexFactory(knexConfig.development);

const JobService = {
  getAllJobs: async (queryParams) => {
    let query = Job.query();

    Object.keys(queryParams).forEach((param) => {
      console.log('ngtyujbvg', param);
      if (param === 'description') {
        query.where('description', 'like', `%${queryParams[param]}%`);
      }

      if (param === 'location') {
        query.where('location', 'like', `%${queryParams[param]}%`);
      }

      if (param === 'full-time' && queryParams[param] === 'true') {
        query.where('type', 'full-time');
      }
    });

    // ~~~ All query ~~~
    // Object.keys(queryParams).forEach((param) => {
    //   query.where(param, 'like', `%${queryParams[param]}%`);
    // });

    return query;
  },

  getJobById: async (id) => {
    return Job.query().findById(id);
  },

  createJob: async (data) => {
    return Job.query().insert(data);
  },

  updateJob: async (id, data) => {
    return Job.query().patchAndFetchById(id, {
      ...data,
      updated_at: knex.fn.now(),
    });
  },

  deleteJob: async (id) => {
    return Job.query().deleteById(id);
  },
};

// module.exports = JobService;
export default JobService;
