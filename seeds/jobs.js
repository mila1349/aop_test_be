import faker from 'faker';

const getRandomType = () => {
  const statuses = ['full-time', 'part-time', 'contract'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  return knex('jobs')
    .del()
    .then(async function () {
      // Inserts seed entries
      const seedJobs = Array.from({ length: 100 }, () => ({
        title: faker.name.findName(),
        description: faker.lorem.paragraphs(5, '<br/>\n'),
        type: getRandomType(),
        how_to_apply: faker.lorem.lines(2),
        company_url: faker.internet.url(),
        company_logo: 'https://img.freepik.com/free-psd/silver-letters-glass-building-facade_145275-162.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=sph',
        location: faker.address.streetAddress(),
      }));

      return knex('jobs').insert(seedJobs);
    });
};
