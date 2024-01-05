import { Model } from 'objection';

class job extends Model {
  static get tableName() {
    return 'jobs';
  }

  // $beforeUpdate() {
  //   this.updated_at = new Date();
  // }
}

export default job;
