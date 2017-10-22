import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  userId: attr('string'),
  title: attr('string'),
  createTime: attr('date'),
  slug: attr('string'),
});
