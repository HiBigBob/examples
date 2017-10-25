import Ember from 'ember';
import moment from 'npm:moment';

export function formatMoment(params/*, hash*/) {
  return moment(params[0]).fromNow();
}

export default Ember.Helper.helper(formatMoment);
